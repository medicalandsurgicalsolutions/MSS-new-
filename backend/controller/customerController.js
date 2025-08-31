require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Customer = require("../models/Customer");
const { signInToken, tokenForVerify } = require("../config/auth");
const { sendEmail } = require("../lib/email-sender/sender");
const {
  customerRegisterBody,
} = require("../lib/email-sender/templates/register");
const {
  forgetPasswordEmailBody,
} = require("../lib/email-sender/templates/forget-password");
const { emailVerificationBody } = require("../lib/email-sender/templates/email-verification");
const Otp = require("../models/Otp");
const { response } = require("express");

const verifyEmailAddress = async (req, res) => {
  const isAdded = await Customer.findOne({ email: req.body.email });
  if (isAdded) {
    return res.status(403).send({
      message: "This Email already Added!",
    });
  } else {
    const token = tokenForVerify(req.body);
    const option = {
      name: req.body.name,
      email: req.body.email,
      token: token,
    };
    const body = {
      from: process.env.EMAIL_USER,
      // from: "info@demomailtrap.com",
      to: `${req.body.email}`,
      subject: "Email Activation",
      subject: "Verify Your Email",
      html: customerRegisterBody(option),
    };

    const message = "Please check your email to verify your account!";
    sendEmail(body, res, message);
  }
};

const registerCustomer = async (token) => {
  // const token = req.params.token;
  const { name, email, password } = jwt.decode(token);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return {
          message: "Token Expired, Please try again!",
        };
      } else {
        const newUser = new Customer({
          name,
          email,
          password: bcrypt.hashSync(password),
        });
        newUser.save();
        const token = signInToken(newUser);
        return {
          message: "Email Verified, Please Login Now!",
        };
      }
    });
  }
};

const addAllCustomers = async (req, res) => {
  try {
    await Customer.deleteMany();
    await Customer.insertMany(req.body);
    res.send({
      message: "Added all users successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// const loginCustomer = async (req, res) => {
//   try {
//     const customer = await Customer.findOne({ email: req.body.email });

//     // console.log("loginCustomer", req.body.password, "customer", customer);

//     if (
//       customer &&
//       customer.password &&
//       bcrypt.compareSync(req.body.password, customer.password)
//     ) {
      // const token = signInToken(customer);
      // res.send({
      //   token,
      //   _id: customer._id,
      //   name: customer.name,
      //   email: customer.email,
      //   address: customer.address,
      //   phone: customer.phone,
      //   image: customer.image,
      // });
//     } else {
//       res.status(401).send({
//         message: "Invalid user or password!",
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

const generateUniqueEmail = (email) => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Remove special characters
  const [localPart, domain] = email.split("@"); // Split email into local and domain parts
  return `${localPart}+${timestamp}@${domain}`; // Append timestamp before @
};

const loginCustomer = async (req, res) => {
  try {

    const {phone, password } = req.body;
    // console.log("undefined", phone, password);
    
    if(password === undefined){
      // console.log("undefined");
      return directSignUpCustomer(req, res);
    }

    const customer = await Customer.findOne({ phone: phone });
    const saveOtp = await Otp.findOne({ phone: phone });

    if(!saveOtp){
      // console.log("!saveOtp");
      return directSignUpCustomer(req, res);
    }
    
    // console.log("Save otp in database ", saveOtp);

    if(saveOtp.otp !== password){
      // console.log("saveOtp");
      return res.status(400).json({
        message: "Invalid otp!",
      });
    }
    await Otp.deleteMany({ phone: phone });
    if(customer){
      // console.log("customer");
      const token = signInToken(customer);
      res.send({
        token,
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
        image: customer.image,
      });

    }else{
      // console.log("new customer");
      const newUser = new Customer({
        phone,
        email: generateUniqueEmail("test@gmail.com")
      });
      newUser.save();
      const token = signInToken(newUser);
      res.send({
        token,
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone,
        image: newUser.image,
      });
    }

  } catch (err) {
    // console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};


// const directSignUpCustomer = async (req, res) => {
//   try {
//       const { email, name, password, otp } = req.body
//       const customer = await Customer.findOne({ email: req.body.email });
//       const token = tokenForVerify({name, email, password});

//       if (customer) {
//         res.status(400).send({
//           message:"Email already registed. please login!"
//         });
//       }
//       else if(otp){
//         const { name, email, password } = jwt.decode(token);

//         if (token) {
//           const saveOtp = await Otp.findOne({ email: req.body.email });
//           if(otp == saveOtp.otp){
//             jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, async (err, decoded) => {
//               if (err) {
//                 res.status(401).send({
//                   message: "Token Expired, Please try again!",
//                 });
//               } else {
//                 const newUser = new Customer({
//                   name,
//                   email,
//                   password: bcrypt.hashSync(password),
//                 });
//                 newUser.save();
//                 const token = signInToken(newUser);
//                 await Otp.deleteOne({ email: req.body.email });
//                 res.send({
//                   token,
//                   _id: newUser._id,
//                   status: 100,
//                   name: newUser.name,
//                   email: newUser.email,
//                   password:password,
//                   message: "Otp Verified, Please Login Now!",
//                 });
//               }
//             });
//           }else{
//             res.send({
//               status: 300,
//               message: "Wrong Otp!",
//             })
//           }
//         }
//       }
//       else{
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         // console.log("OTP ", otp);
//         const option = {
//           name,
//           email,
//           token,
//           otp
//         };

//         const body = {
//           from: process.env.EMAIL_USER,
//           to: `${req.body.email}`,
//           subject: "Verify Email",
//           html: emailVerificationBody(option),
//         };

//         const newOtp = new Otp({
//           email,
//           otp,
//         });
//         newOtp.save();

//         const message = "We Send Otp to your email!";
//         sendEmail(body, res, message);
//       }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

const otpMessage = (otp, number) => {
  return `${otp} is your OTP for ${number}. OTP is valid for XXXX minutes. For any help, Please contact us at XXXX - MSS Team`
};



const directSignUpCustomer = async (req, res) => {
  try {
      const { phone } = req.body;
      await Otp.deleteMany({ phone: phone });
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // const option = {
        //   email,
        //   otp
        // };

        // const body = {
        //   from: process.env.EMAIL_USER,
        //   to: `${req.body.email}`,
        //   subject: "Verify Email",
        //   html: emailVerificationBody(option),
        // };

        const newOtp = new Otp({
          phone,
          otp,
        });
        newOtp.save();

        // HiveMSG API URL
        // const hiveMsgApiUrl = `https://manage.hivemsg.com/api/send_transactional_sms.php`;

        // API parameters
        // const params = {
        //   username: "u7670", // Your HiveMSG username
        //   msg_token: "dMDSay", // Your HiveMSG API token
        //   sender_id: "MSSMED", // Your sender ID
        //   message: `${otp} is your OTP for MSSMED. OTP is valid for 10 minutes. For any help, please contact us at 9460917486 - MSS Team`,
        //   mobile: phone, // User's phone number
        // };

        // Send OTP via HiveMSG API
        // const response = await axios.get(hiveMsgApiUrl, { params });

        const response = await axios.get(`${process.env.SMS_API_URL}?username=${process.env.SMS_USER_NAME}&msg_token=${process.env.SMS_MESSAGE_TOKEN}&sender_id=${process.env.SMS_SENDER_ID}&message=${otp}+is+your+OTP+for+MSS.+OTP+is+valid+for+15+minutes.+For+any+help%2C+Please+contact+us+at+6392899521+-+MSS+Team&mobile=${phone}`);

        // console.log("Run Function", response);

        // Check if OTP was successfully sent
        if (response?.status) {
          res.json({ message: "OTP sent successfully to your phone!" });
        } else {
          res.status(400).json({ message: "Failed to send OTP!" });
        }        

        // const message = "We Send Otp to your email!";
        // sendEmail(body, res, message);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const sendEmailToAdmin = async (req, res) => {
  try {
      const { email, name, number, subject, message } = req.body
      const contactUsEmailBody = `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="background-color: #B52427; color: white; padding: 10px; text-align: center; border-radius: 10px 10px 0 0;">New Contact Us Message</h2>
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${number}</p>
            <p style="font-size: 16px; color: #555;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 16px; color: #555;"><strong>Subject:</strong> ${subject}</p>
            <div style="font-size: 16px; color: #555; margin-top: 20px;">
              <strong style="font-size: 24px;">Message :-</strong>
              <span style="padding-left: 10px; color: #333; max-width: 100%; word-wrap: break-word;">${message}</span>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background-color: #B52427; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to ${name}</a>
            </div>
          </div>
          <div style="padding: 10px; background-color: #f1f1f1; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #777;">
            <p>This message was sent from your website’s Contact Us form.</p>
          </div>
        </div>
      `;
      const body = {
        from: process.env.EMAIL_USER,
        to: `${req.body.email}`,
        from: process.env.EMAIL_USER,
        html: contactUsEmailBody,
      };

      const resMessage = "your message sent successfully. We will contact you shortly.";
      sendEmail(body, res, resMessage);
      
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {  
  const isAdded = await Customer.findOne({ email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: "User Not found with this email!",
    });
  } else {
    const token = tokenForVerify(isAdded);
    const option = {
      name: isAdded.name,
      email: isAdded.email,
      token: token,
    };

    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: "Password Reset",
      html: forgetPasswordEmailBody(option),
    };

    const message = "Please check your email to reset password!";
    sendEmail(body, res, message);
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const customer = await Customer.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        customer.password = bcrypt.hashSync(req.body.newPassword);
        customer.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // console.log("changePassword", req.body);
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer.password) {
      return res.status(403).send({
        message:
          "For change password,You need to sign up with email & password!",
      });
    } else if (
      customer &&
      bcrypt.compareSync(req.body.currentPassword, customer.password)
    ) {
      customer.password = bcrypt.hashSync(req.body.newPassword);
      await customer.save();
      res.send({
        message: "Your password change successfully!",
      });
    } else {
      res.status(401).send({
        message: "Invalid email or current password!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const signUpWithProvider = async (req, res) => {
  try {
    // const { user } = jwt.decode(req.body.params);
    const user = jwt.decode(req.params.token);

    // console.log("user", user);
    const isAdded = await Customer.findOne({ email: user.email });
    if (isAdded) {
      const token = signInToken(isAdded);
      res.send({
        token,
        _id: isAdded._id,
        name: isAdded.name,
        email: isAdded.email,
        address: isAdded.address,
        phone: isAdded.phone,
        image: isAdded.image,
      });
    } else {
      const newUser = new Customer({
        name: user.name,
        email: user.email,
        image: user.picture,
      });

      const signUpCustomer = await newUser.save();
      const token = signInToken(signUpCustomer);
      res.send({
        token,
        _id: signUpCustomer._id,
        name: signUpCustomer.name,
        email: signUpCustomer.email,
        image: signUpCustomer.image,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const signUpWithOauthProvider = async (req, res) => {
  try {
    // console.log("user", user);
    // console.log("signUpWithOauthProvider", req.body);
    const isAdded = await Customer.findOne({ email: req.body.email });
    if (isAdded) {
      const token = signInToken(isAdded);
      res.send({
        token,
        _id: isAdded._id,
        name: isAdded.name,
        email: isAdded.email,
        address: isAdded.address,
        phone: isAdded.phone,
        image: isAdded.image,
      });
    } else {
      const newUser = new Customer({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
      });

      const signUpCustomer = await newUser.save();
      const token = signInToken(signUpCustomer);
      res.send({
        token,
        _id: signUpCustomer._id,
        name: signUpCustomer.name,
        email: signUpCustomer.email,
        image: signUpCustomer.image,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const users = await Customer.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Shipping address create or update
const addShippingAddress = async (req, res) => {
  try {
    const customerId = req.params.id;
    const newShippingAddress = req.body;

    // Find the customer by ID and update the shippingAddress field
    const result = await Customer.updateOne(
      { _id: customerId },
      {
        $set: {
          shippingAddress: newShippingAddress,
        },
      },
      { upsert: true } // Create a new document if no document matches the filter
    );

    if (result.nModified > 0 || result.upserted) {
      return res.send({
        message: "Shipping address added or updated successfully.",
      });
    } else {
      return res.status(404).send({ message: "Customer not found." });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShippingAddress = async (req, res) => {
  try {
    const customerId = req.params.id;
    // const addressId = req.query.id;

    // console.log("getShippingAddress", customerId, addressId);
    // console.log("addressId", req.query);

    const customer = await Customer.findById(customerId);
    res.send({ shippingAddress: customer?.shippingAddress });

    // if (addressId) {
    //   // Find the specific address by its ID
    //   const address = customer.shippingAddress.find(
    //     (addr) => addr._id.toString() === addressId.toString()
    //   );

    //   if (!address) {
    //     return res.status(404).send({
    //       message: "Shipping address not found!",
    //     });
    //   }

    //   return res.send({ shippingAddress: address });
    // } else {
    //   res.send({ shippingAddress: customer?.shippingAddress });
    // }
  } catch (err) {
    // console.error("Error adding shipping address:", err);
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateShippingAddress = async (req, res) => {
  try {
    const activeDB = req.activeDB;

    const Customer = activeDB.model("Customer", CustomerModel);
    const customer = await Customer.findById(req.params.id);

    if (customer) {
      customer.shippingAddress.push(req.body);

      await customer.save();
      res.send({ message: "Success" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteShippingAddress = async (req, res) => {
  try {
    const activeDB = req.activeDB;
    const { userId, shippingId } = req.params;

    const Customer = activeDB.model("Customer", CustomerModel);
    await Customer.updateOne(
      { _id: userId },
      {
        $pull: {
          shippingAddress: { _id: shippingId },
        },
      }
    );

    res.send({ message: "Shipping Address Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    // Validate the input
    const { name, email, address, phone, image, coupons } = req.body;

    // Find the customer by ID
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send({
        message: "Customer not found!",
      });
    }

    // Check if the phone already exists and does not belong to the current customer
    const existingCustomer = await Customer.findOne({ phone });
    if (
      existingCustomer &&
      existingCustomer._id.toString() !== customer._id.toString()
    ) {
      return res.status(400).send({
        message: "phone already exists.",
      });
    }

    // Update customer details
    customer.name = name;
    customer.email = email;
    customer.address = address;
    customer.phone = phone;
    customer.image = image;
    customer.coupons = coupons;

    // Save the updated customer
    const updatedUser = await customer.save();

    // Generate a new token
    const token = signInToken(updatedUser);

    // Send the updated customer data with the new token
    res.send({
      token,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      image: updatedUser.image,
      message: "Customer updated successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "User Deleted Successfully!",
      });
    }
  });
};

module.exports = {
  loginCustomer,
  sendEmailToAdmin,
  registerCustomer,
  addAllCustomers,
  signUpWithProvider,
  directSignUpCustomer,
  signUpWithOauthProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  addShippingAddress,
  getShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
