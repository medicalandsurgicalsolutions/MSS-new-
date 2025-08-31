require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");
const stripe = require("stripe");
const Razorpay = require("razorpay");
// const stripe = require("stripe")(`${process.env.STRIPE_KEY}` || null); /// use hardcoded key if env not work

const mongoose = require("mongoose");

const Order = require("../models/Order");
const Setting = require("../models/Setting");
const Customer = require("../models/Customer");

const { handleProductQuantity } = require("../lib/stock-controller/others");
const { formatAmountForStripe } = require("../lib/stripe/stripe");
const Coupon = require("../models/Coupon");

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your email provider's SMTP server
  port: process.env.EMAIL_PORT, // Commonly 465 for SSL
  secure: false, // True for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send order confirmation email
const sendOrderConfirmationEmail = (user, invoice) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL, // Sender email address
    to: user, // Customer email address
    subject: "Order Confirmed", // Subject of the email
    text: `Thank you for your order! Your order number is ${invoice}. We are processing your order and expect it to be delivered within 7 days. If you have any questions, feel free to reach out to our support team. We appreciate your business!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #333;">Thank You for Your Order!</h2>
        <p>We are excited to let you know that your order number is <strong>${invoice}</strong>.</p>
        <p>Your order is being processed, and you can expect delivery within <strong>7 days</strong>.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:care@medicalsurgical.org">care@medicalsurgical.org</a>.</p>
        <p>Thank you for choosing us! We truly appreciate your business and look forward to serving you again.</p>
        <p style="margin-top: 20px;">Best Regards,<br>Medical & Surgical Solutions Team</p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const sendOrderConfirmationEmailToAdmin = (invoice) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL, // Sender email address
    to: process.env.ADMIN_EMAIL, // Customer email address
    subject: "New Order Confirmation", // Subject of the email
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
        📦 New Order Received! \nOrder Number: ${invoice} \nPlease check the admin dashboard for details. Thank you!
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email to admin:", error);
    } else {
      console.log("Email sent to admin:", info.response);
    }
  });
};

const addOrder = async (req, res) => {
  try {
    console.log(addOrder)
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,
    });

    // Fetch global settings for coupon logic
    const globalSetting = await Setting.findOne({ name: "globalSetting" });
    const minCouponAmount = Number(globalSetting.setting.min_coupon_amount) || 5000;

    const percentCoupon = await Coupon.findOne({ 
      minimumAmount: { $gte: minCouponAmount }, 
      'discountType.type': 'percentage' 
    });

    const isEligibleForCoupon = (newOrder?.total - newOrder?.shippingCost) >= minCouponAmount;
    let couponId = isEligibleForCoupon ? (percentCoupon?._id || null) : null;

    // Handle coupon logic for customers
    if (req.body.couponId != null) {
      await Customer.updateOne(
        { _id: req.user._id },
        { $pull: { coupons: { coupon: req.body.couponId } } }
      );
    } else if (isEligibleForCoupon) {
      await Customer.updateOne(
        { _id: req.user._id },
        { $set: { coupons: [] } }
      );
    }

    if (couponId !== null && isEligibleForCoupon) {
      await Customer.updateOne(
        { _id: req.user._id },
        { $push: { coupons: { coupon: couponId, isUsed: false } } }
      );
    }

    // Save the order
    const order = await newOrder.save();

    // console.log("Order 1 ", order);
    
    // Send order confirmation email after order is saved
    // sendOrderConfirmationEmail(order?.user_info?.email, order?.invoice);
    // console.log("Order Response ", response);
    // sendOrderConfirmationEmailToAdmin(order?.invoice);

    // Return the response
    res.status(201).send(order);

    // Handle product quantity updates
    handleProductQuantity(order.cart);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const cancelOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(500).send({
        message: "Invalid Order!",
      });
    }
    if (order.paymentMethod == "RazorPay") {
      const data = await refundOrderRazorPay(order);
      res.send(data);
    }
    if (order.paymentMethod == "Cash") {
      order.status = "Cancel";
      order.isCancelByCustomer = true;
      order.save();
      res.send({message:"Order cancelled Successfully"});
    }
   
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

//create payment intent for stripe
const createPaymentIntent = async (req, res) => {
  const { total: amount, cardInfo: payment_intent, email } = req.body;
  // console.log("req.body", amount);
  // Validate the amount that was passed from the client.
  if (!(amount >= process.env.MIN_AMOUNT && amount <= process.env.MAX_AMOUNT)) {
    return res.status(500).json({ message: "Invalid amount." });
  }
  const storeSetting = await Setting.findOne({ name: "storeSetting" });
  const stripeSecret = storeSetting?.setting?.stripe_secret;
  const stripeInstance = stripe(stripeSecret);
  if (payment_intent.id) {
    try {
      const current_intent = await stripeInstance.paymentIntents.retrieve(
        payment_intent.id
      );
      // If PaymentIntent has been created, just update the amount.
      if (current_intent) {
        const updated_intent = await stripeInstance.paymentIntents.update(
          payment_intent.id,
          {
            amount: formatAmountForStripe(amount, "usd"),
          }
        );
        // console.log("updated_intent", updated_intent);
        return res.send(updated_intent);
      }
    } catch (err) {
      if (err.code !== "resource_missing") {
        const errorMessage =
          err instanceof Error ? err.message : "Internal server error";
        return res.status(500).send({ message: errorMessage });
      }
    }
  }
  try {
    // Create PaymentIntent from body params.
    const params = {
      amount: formatAmountForStripe(amount, "usd"),
      currency: "usd",
      description: process.env.STRIPE_PAYMENT_DESCRIPTION || "",
      automatic_payment_methods: {
        enabled: true,
      },
    };
    const payment_intent = await stripeInstance.paymentIntents.create(params);
    // console.log("payment_intent", payment_intent);

    res.send(payment_intent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).send({ message: errorMessage });
  }
};

const createOrderByRazorPay = async (req, res) => {
  try {
    const storeSetting = await Setting.findOne({ name: "storeSetting" });
    // console.log("createOrderByRazorPay", storeSetting?.setting);

    const instance = new Razorpay({
      key_id: storeSetting?.setting?.razorpay_id,
      key_secret: storeSetting?.setting?.razorpay_secret,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    if (!order)
      return res.status(500).send({
        message: "Error occurred when creating order!",
      });
    // console.log("Order 2 ", order);
    res.send(order);

    // Send order confirmation email after order is saved
    // sendOrderConfirmationEmail(order?.user_info?.email, order?.invoice);
    // console.log("Order Response 2", response);
    // sendOrderConfirmationEmailToAdmin(order?.invoice);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const refundOrderRazorPay = async (order) => {
  try {
    const storeSetting = await Setting.findOne({ name: "storeSetting" });
    const globalSetting = await Setting.findOne({ name: "globalSetting" });
    // console.log("createOrderByRazorPay", storeSetting?.setting);

    const instance = new Razorpay({
      key_id: storeSetting?.setting?.razorpay_id,
      key_secret: storeSetting?.setting?.razorpay_secret,
    });

    const paymentId = order?.razorpay?.razorpayPaymentId;
    const amount = order?.razorpay?.amount; 

    const refund = await instance.payments.refund(paymentId, { amount });
      
    order.razorpay = {
      ...order.razorpay,   // Spread operator to keep existing data
      refundId: refund.id, // Add the new refundId
    };
    order.status = "Cancel";
    order.isCancelByCustomer = true;
    order.save();
    return {message:`Order cancelled Successfully. Refund will take ${globalSetting.max_refund_days || "10 - 15"} days.`};
  
  } catch (err) {
    return { message: err.message };
  }
};

const addRazorpayOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,
    });
    const globalSetting = await Setting.findOne({ name: "globalSetting" });
    const minCouponAmount = globalSetting.min_coupon_amount || 5000;
    const coupon = await Coupon.findOne({ minimumAmount: { $gte: minCouponAmount } });
    const isEligibleForCoupon = minCouponAmount >= (newOrder?.total - newOrder?.shippingCost);
    if(newOrder.couponId != null){
      await Customer.updateOne(
        { _id: req.user._id, 'coupons.coupon': newOrder.couponId }, 
        {
          $set: {
            'coupons.$.isUsed': true
          },
        }
      );
    }
    if (coupon && isEligibleForCoupon) {
      await Customer.updateOne(
        { _id: req.user._id },
        {
          $push: {
            coupons: {
              coupon: coupon._id,
              isUsed: false
            },
          },
        }
      );
    }
    const order = await newOrder.save();
    sendMSM(order?.invoice, order?.user_info?.contact)
    // Send order confirmation email after order is saved
    sendOrderConfirmationEmail(order?.user_info?.email, order?.invoice);
    sendOrderConfirmationEmailToAdmin(order?.invoice);
    handleProductQuantity(order.cart);
    return res.status(201).send(order);

  } catch (err) {
    // console.log("Add Razorpay :> ", err);
    res.status(500).send({
      message: err.message,
    });
  }
};

const sendMSM=async(invoice, phone)=>{
  try{
    const hvyuhdc = await axios.get(`${process.env.SMS_API_URL}?username=${process.env.SMS_USER_NAME}&msg_token=${process.env.SMS_MESSAGE_TOKEN}&sender_id=${process.env.SMS_SENDER_ID}&message=Thank+you+for+ordering+from+MSS.+Your+order+%23${invoice}+is+confirmed+and+we+are+working+on+it%2C+we+will+update+you+once+it+is+shipped.&mobile=${phone}`);
    // console.log("Message Success ", hvyuhdc);
  }catch(err){
    console.log("Error", err)
  }
}

// get all orders user
const getOrderCustomer = async (req, res) => {
  try {
    // console.log("getOrderCustomer 1");
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const totalDoc = await Order.countDocuments({ user: req.user._id });

    // total padding order count
    const totalPendingOrder = await Order.aggregate([
      {
        $match: {
          status: "Pending",
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total padding order count
    const totalProcessingOrder = await Order.aggregate([
      {
        $match: {
          status: "Processing",
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const totalDeliveredOrder = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // today order amount

    // query for orders
    const orders = await Order.find({ user: req.user._id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limits);

    res.send({
      orders,
      limits,
      pages,
      pending: totalPendingOrder.length === 0 ? 0 : totalPendingOrder[0].count,
      processing:
        totalProcessingOrder.length === 0 ? 0 : totalProcessingOrder[0].count,
      delivered:
        totalDeliveredOrder.length === 0 ? 0 : totalDeliveredOrder[0].count,

      totalDoc,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getOrderCustomer,
  createPaymentIntent,
  createOrderByRazorPay,
  addRazorpayOrder,
  cancelOrderById
};
