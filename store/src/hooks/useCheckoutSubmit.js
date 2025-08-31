import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import useRazorpay from "react-razorpay";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//internal import
import useAsync from "./useAsync";
import { getUserSession } from "@lib/auth";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import CouponServices from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import NotificationServices from "@services/NotificationServices";
import DUMMY_IMAGE from "@components/constants";
import useAddToCart from "./useAddToCart";
import useGetSetting from "./useGetSetting";

const useCheckoutSubmit = (storeSetting) => {
  const { dispatch } = useContext(UserContext);

  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [activeCharge, setActiveCharge] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [codDisplay, setCodDisplay] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);
  const [couponId, setCouponId] = useState("");

  console.log("Show Card total checkout", total);

  const { globalSetting } = useGetSetting();

  const router = useRouter();
  // const stripe = useStripe();
  // const elements = useElements();
  const couponRef = useRef("");
  const [Razorpay] = useRazorpay();
  const { isEmpty, emptyCart, items, removeItem, addItem, cartTotal } =
    useCart();
    const totalDeliveryCharge = items?.reduce((sum, item) => sum + (item.deliveryCharge || 0), 0);
    const deliveryChargeToApply = cartTotal >= 2000 ? 0 : totalDeliveryCharge;
    const cartTotals= cartTotal + deliveryChargeToApply;
  const { handleAddItem, setItem, item } = useAddToCart();

  const userInfo = getUserSession();

  const { data, loading } = useAsync(() =>
    CustomerServices.getShippingAddress({
      userId: userInfo?.id,
    })
  );

  const hasShippingAddress =
    !loading &&
    data?.shippingAddress &&
    Object.keys(data?.shippingAddress)?.length > 0;

  // console.log("storeSetting", storeSetting);

  // console.log("res", items);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      // console.log('coupon information',coupon)
      setCouponId(coupon._id);

      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountType);
      setMinimumAmount(coupon.minimumAmount);
    }
    setValue("phone", userInfo?.phone);
  }, [isCouponApplied]);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  //calculate total and discount value
  useEffect(() => {
    const discountProductTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );

    let codCharge=0;

    if(activeCharge === true){
      codCharge=codCharge + 40;
    }

    setCodDisplay(codCharge);

    let totalValue = 0;
    const subTotal = parseFloat(cartTotals + Number(shippingCost) + codCharge).toFixed(2);
    const discountAmount =
      discountPercentage?.type === "fixed"
        ? discountPercentage?.value
        : discountProductTotal * (discountPercentage?.value / 100);

    const discountAmountTotal = discountAmount ? discountAmount : 0;

    totalValue = Number(subTotal) - discountAmountTotal;

    setDiscountAmount(discountAmountTotal);

    // console.log("total", totalValue);

    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage, activeCharge]);

  const submitHandler = async (data) => {
    // console.log("data", data);
    // return;
    let codAvailableItems =
      items.filter((item) => item.isCodAvaialble === true) || [];
    let codNotAvailableItems =
      items.filter((item) => item.isCodAvaialble === false) || [];
    let isCashMode = data.paymentMethod === "Cash";
    try {
      // dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
      // Cookies.set("shippingAddress", JSON.stringify(data));
      setIsCheckoutSubmit(true);
      setError("");

      const userDetails = {
        name: `${data.firstName} ${data.lastName}`,
        contact: data.phone,
        email: data.email,
        address: data.address,
        flat: data.flat,
        district: data.district,
        landmark: data.landmark,
        state: data.state,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode,
      };
      let orderInfo = {
        user_info: userDetails,
        shippingOption: data.shippingOption,
        paymentMethod: data.paymentMethod,
        status: "Pending",
        cart: isCashMode ? codAvailableItems : items,
        subTotal: cartTotal,
        shippingCost: shippingCost ? shippingCost : totalDeliveryCharge,
        discount: discountAmount,
        total: total,
      };

      if (couponId !== "") {
        orderInfo.couponId = couponId;
      }

      await CustomerServices.addShippingAddress({
        userId: userInfo?.id,
        shippingAddressData: {
          name: data.firstName + " " + data.lastName,
          contact: userInfo?.phone,
          email: data.email,
          address: data.address,
          flat: data.flat,
          district: data.district,
          landmark: data.landmark,
          state: data.state,
          country: data.country,
          city: data.city,
          // area: data.area,
          zipCode: data.zipCode,
        },
      });

      // console.log(orderInfo);

      // if (data.paymentMethod === "Card") {
      //   if (!stripe || !elements) {
      //     return;
      //   }

      //   const { error, paymentMethod } = await stripe.createPaymentMethod({
      //     type: "card",
      //     card: elements.getElement(CardElement),
      //   });

      //   // console.log('error', error);

      //   if (error && !paymentMethod) {
      //     setError(error.message);
      //     setIsCheckoutSubmit(false);
      //   } else {
      //     setError("");
      //     const orderData = {
      //       ...orderInfo,
      //       cardInfo: paymentMethod,
      //     };

      //     await handlePaymentWithStripe(orderData);

      //     // console.log('cardInfo', orderData);
      //     return;
      //   }
      // }
      if (data.paymentMethod === "RazorPay") {
        await handlePaymentWithRazorpay(orderInfo);
      }
      if (isCashMode) {
        if (codAvailableItems.length <= 0) {
          notifyError("COD Not available on these products.");
          setIsCheckoutSubmit(false);
          return;
        }

        const orderResponse = await OrderServices.addOrder(orderInfo);
        // notification info
        const notificationInfo = {
          orderId: orderResponse?._id,
          message: `${orderResponse?.user_info?.name}, Placed ${parseFloat(
            orderResponse?.total
          ).toFixed(2)} order!`,
          image: DUMMY_IMAGE,
        };
        // notification api call
        await NotificationServices.addNotification(notificationInfo);

        if (codNotAvailableItems.length > 0) {
          notifySuccess("Your COD Order Placed!");
          Cookies.remove("couponInfo");
          codAvailableItems.forEach((i) => {
            removeItem(i.id);
          });
        } else {
          router.push(`/thankyou`);
          notifySuccess("Your Order Placed!");
          Cookies.remove("couponInfo");
          emptyCart();
        }
        setIsCheckoutSubmit(false);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsCheckoutSubmit(false);
    }
  };

  //handle stripe payment

  // const handlePaymentWithStripe = async (order) => {
  //   try {
  //     // console.log('try goes here!', order);
  //     // const updatedOrder = {
  //     //   ...order,
  //     //   currency: 'usd',
  //     // };
  //     const stripeInfo = await OrderServices.createPaymentIntent(order);
  //     // console.log("res", stripeInfo, "order", order);
  //     stripe.confirmCardPayment(stripeInfo?.client_secret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     });

  //     const orderData = {
  //       ...order,
  //       cardInfo: stripeInfo,
  //     };
  //     const orderResponse = await OrderServices.addOrder(orderData);
  //     console.log("orderResponse", orderResponse);
  //     // notification info
  //     const notificationInfo = {
  //       orderId: orderResponse._id,
  //       message: `${orderResponse.user_info.name}, Placed ${parseFloat(
  //         orderResponse.total
  //       ).toFixed(2)} order!`,
  //       image:
  //         "",
  //     };
  //     // notification api call
  //     await NotificationServices.addNotification(notificationInfo);

  //     router.push(`/order/${orderResponse._id}`);
  //     notifySuccess("Your Order Confirmed!");
  //     Cookies.remove("couponInfo");
  //     emptyCart();

  //     setIsCheckoutSubmit(false);
  //   } catch (err) {
  //     // console.log("err", err?.message);
  //     notifyError(err?.response?.data?.message || err?.message);
  //     setIsCheckoutSubmit(false);
  //   }
  // };

  //handle razorpay payment
  const handlePaymentWithRazorpay = async (orderInfo) => {
    try {
      const { amount, id, currency } =
        await OrderServices.createOrderByRazorPay({
          amount: Math.round(total).toString(),
        });

      // console.log("amount:::", amount);
      // setIsCheckoutSubmit(false);

      if ((amount, id, currency)) {
        const razorpayKey = storeSetting?.razorpay_id;

        // console.log("razorpayKey", razorpayKey);

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: "MSS Store",
          description: "This is total cost of your purchase",
          order_id: id,
          handler: async function (response) {
            const razorpay = {
              amount: total,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const orderData = {
              ...orderInfo,
              total: total,
              // cardCharge: cardCharge,
              razorpay,
            };

            const res = await OrderServices.addRazorpayOrder(orderData);
            if (res) {
              router.push(`/thankyou`);
              notifySuccess("Your Order Confirmed!");
              Cookies.remove("couponInfo");
              localStorage.removeItem("products");
              setCouponId("");
              emptyCart();

              await NotificationServices.addNotification({
                message: `${data?.firstName} placed $${total} order!`,
                orderId: res._id,
                image: userInfo?.image,
              });
              // socket.emit("notification", {
              //   message: `${data.firstName} placed $${total} order!`,
              //   orderId: res._id,
              //   image: userInfo?.image,
              // });
            }
          },

          modal: {
            ondismiss: function () {
              setTotal(total);
              setIsCheckoutSubmit(false);
              // console.log("Checkout form closed!");
            },
          },

          prefill: {
            name: "Medical & Surgical Solutions",
            email: "care@medicalsurgical.org",
            contact: "7982508578",
          },
          notes: {
            address: "Mumbai, India",
          },
          theme: {
            color: "#10b981",
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      }
    } catch (err) {
      setIsCheckoutSubmit(false);
      notifyError(err.message);
    }
  };

  const handleShippingCost = (value) => {
    // console.log("handleShippingCost", value);
    setShippingCost(Number(value));
  };

  //handle default shipping address
  const handleDefaultShippingAddress = (value) => {
    // console.log("handle default shipping", value);
    setUseExistingAddress(value);
    if (value) {
      const address = data?.shippingAddress;
      setValue("firstName", address.name);

      setValue("address", address.address);
      setValue("flat", address.flat);
      setValue("district", address.district);
      setValue("landmark", address.landmark);
      setValue("state", address.state);
      setValue("contact", address.contact);
      // setValue("email", address.email);
      setValue("city", address.city);
      setValue("country", address.country);
      setValue("zipCode", address.zipCode);
    } else {
      setValue("firstName");
      setValue("lastName");
      setValue("address");
      setValue("flat");
      setValue("district");
      setValue("landmark");
      setValue("state");
      setValue("contact");
      // setValue("email");
      setValue("city");
      setValue("country");
      setValue("zipCode");
    }
  };
  const handleCouponCode = async (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    setIsCouponAvailable(true);

    try {
      const coupons = await CouponServices.getUserCoupons(userInfo?.id);
      // console.log("Display Coupons ", coupons);
      const result = coupons?.withOk?.filter(
        (coupon) => coupon.couponCode === couponRef.current.value
      );
      setIsCouponAvailable(false);

      if (result.length < 1) {
        notifyError("Please Input a Valid Coupon!");
        return;
      }

      if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
        notifyError("This coupon is not valid!");
        return;
      }

      if (total < result[0]?.minimumAmount) {
        notifyError(
          `Minimum ${result[0].minimumAmount} ₹ required for Apply this coupon!`
        );
        return;
      } else {
        const minCouponAmount = Number(globalSetting.min_coupon_amount) || 5000;
        const maxCouponDiscountPercent =
          Number(globalSetting.max_coupon_discount_percent) || 20;
        const maxCouponDiscountAmount =
          Number(globalSetting.max_coupon_discount_amount) || 10000;
        const percentAmount =
          (cartTotal *
            (result[0]?.discountType?.value || maxCouponDiscountPercent)) /
          100;
        const isPercentEligible = percentAmount <= maxCouponDiscountAmount;

        // console.log(isPercentEligible);

        // return
        if (isPercentEligible) {
          setCouponId(result[0]?._id);
        } else {
          result[0]["minimumAmount"] = minCouponAmount;
          delete result[0]["_id"];
          result[0]["discountType"] = {
            type: "fixed",
            value: maxCouponDiscountAmount,
          };
        }
        notifySuccess(`Your Coupon ${result[0].couponCode} is Applied!`);

        setIsCouponApplied(true);
        setMinimumAmount(result[0]?.minimumAmount);
        setDiscountPercentage(result[0].discountType);
        dispatch({ type: "SAVE_COUPON", payload: result[0] });
        Cookies.set("couponInfo", JSON.stringify(result[0]));
      }
    } catch (error) {
      return notifyError(error.message);
    }
  };

  return {
    register,
    errors,
    showCard,
    setShowCard,
    setActiveCharge,
    codDisplay,
    error,
    // stripe,
    couponInfo,
    couponRef,
    total,
    isEmpty,
    items,
    cartTotal,
    deliveryChargeToApply,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
    isCouponApplied,
    useExistingAddress,
    hasShippingAddress,
    isCouponAvailable,
    handleDefaultShippingAddress,
  };
};

export default useCheckoutSubmit;
