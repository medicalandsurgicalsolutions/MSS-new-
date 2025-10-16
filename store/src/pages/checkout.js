import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";

//internal import
import Layout from "@layout/Layout";
import useAsync from "@hooks/useAsync";
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import CartItem from "@components/cart/CartItem";
import InputArea from "@components/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import InputShipping from "@components/form/InputShipping";
import InputPayment from "@components/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import SettingServices from "@services/SettingServices";
import SwitchToggle from "@components/form/SwitchToggle";
import PinncodeService from "@services/PincodeServices";
import { notifyError, notifySuccess } from "@utils/toast";

const Checkout = () => {
  const { t } = useTranslation();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const { data: storeSetting } = useAsync(SettingServices.getStoreSetting);

  const {
    error,
    couponInfo,
    couponRef,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    register,
    codDisplay,
    errors,
    showCard,
    setActiveCharge,
    setShowCard,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleCouponCode,
    discountAmount,
    deliveryChargeToApply,
    shippingCost,
    isCheckoutSubmit,
    useExistingAddress,
    hasShippingAddress,
    isCouponAvailable,
    handleDefaultShippingAddress,
  } = useCheckoutSubmit();

  const [inputPincode, setInputPincode] = useState("");
  const [isCodDisable, setIsCodDisable] = useState(false);

  // COD order function
  const placeOrderCOD = async (orderData) => {
    try {
      const token =
        typeof window !== "undefined" &&
        (localStorage.getItem("userToken") || localStorage.getItem("token"));

      if (!token) {
        notifyError("Please login first!");
        return;
      }

      const response = await fetch(
        "https://api.medicalsurgicalsolutions.com/api/order/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) throw new Error("COD order failed");

      const data = await response.json();
      notifySuccess("Order placed successfully!");
      return data;
    } catch (err) {
      console.error(err);
      notifyError("Failed to place order. Please try again.");
    }
  };

  // Razorpay order function
  const createOrderRazorpay = async (orderData) => {
    try {
      const token =
        typeof window !== "undefined" &&
        (localStorage.getItem("userToken") || localStorage.getItem("token"));

      if (!token) {
        notifyError("Please login first!");
        return null;
      }

      const response = await fetch(
        "https://api.medicalsurgicalsolutions.com/api/order/create/razorpay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) throw new Error("Razorpay order creation failed");

      const data = await response.json();
      console.log("Razorpay Order:", data);
      return data;
    } catch (err) {
      console.error(err);
      notifyError("Failed to create Razorpay order. Please try again.");
      return null;
    }
  };

  // Updated submitHandler
  const handleCheckoutSubmit = async (formData) => {
    if (!formData.paymentMethod) {
      notifyError("Please select payment method");
      return;
    }

    if (formData.paymentMethod === "Cash") {
      await placeOrderCOD(formData);
    } else if (formData.paymentMethod === "RazorPay") {
      await createOrderRazorpay(formData);
    }
  };

  // COD UI helper
  const codObj = {
    Elements: null,
    init() {
      if (!this.Elements) {
        this.Elements = document.querySelectorAll("#cod_input *");
      }
    },
    enable() {
      this.init();
      if (!this.Elements || !this.Elements.length) return;
      notifySuccess("COD is available for this pincode");
      this.Elements[0].style.borderColor = "rgb(40, 204, 40)";
      this.Elements.forEach((el) => (el.style.cursor = "auto"));
    },
    disable() {
      this.init();
      if (!this.Elements || !this.Elements.length) return;
      this.Elements[0].style.borderColor = "red";
      notifyError("COD is unavailable for this pincode");
      this.Elements.forEach((el) => (el.style.cursor = "not-allowed"));
    },
  };

  const CheckPin = async (pin) => {
    const response = await PinncodeService.getOnePin(pin).catch((e) => {
      if (e?.response?.data?.error !== "pincode not found") {
        console.error(e?.message);
      }
      return undefined;
    });

    if (response === undefined) {
      setIsCodDisable(true);
      codObj.disable();
    } else {
      if (response?.status === "show") {
        setIsCodDisable(false);
        codObj.enable();
      } else {
        setIsCodDisable(true);
        codObj.disable();
      }
    }
  };

  useEffect(() => {
    const pinInput = document.querySelector("#PinInput input");
    if (!pinInput) return;

    const handleInputChange = (event) => {
      const newPin = event.target.value;
      setInputPincode(newPin);
      if (newPin.length >= 6) {
        CheckPin(newPin);
      }
    };

    pinInput.addEventListener("input", handleInputChange);
    return () => pinInput.removeEventListener("input", handleInputChange);
  }, []);

  return (
    <Layout title="Checkout" description="this is checkout page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
          <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(handleCheckoutSubmit)}>
                {hasShippingAddress && (
                  <div className="flex justify-end my-2">
                    <SwitchToggle
                      id="shipping-address"
                      title="Use Default Shipping Address"
                      processOption={useExistingAddress}
                      handleProcess={handleDefaultShippingAddress}
                    />
                  </div>
                )}

                {/* Personal details & shipping inputs remain same */}
                {/* ...your existing code for InputArea and shipping remains unchanged... */}

                <div className="form-group mt-12">
                  <h2 className="font-semibold text-base text-gray-700 pb-3">
                    03. {showingTranslateValue(storeCustomizationSetting?.checkout?.payment_method)}
                  </h2>

                  <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                    {storeSetting?.cod_status && (
                      <div className="" id="cod_input">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:cashOnDelivery")}
                          value="Cash"
                          disable={isCodDisable}
                          Icon={IoWalletSharp}
                          setActiveCharge={setActiveCharge}
                        />
                        <Error errorMessage={errors.paymentMethod} />
                      </div>
                    )}

                    <div className="">
                      <InputPayment
                        setShowCard={setShowCard}
                        register={register}
                        name="RazorPay"
                        value="RazorPay"
                        Icon={ImCreditCard}
                        setActiveCharge={setActiveCharge}
                      />
                      <Error errorMessage={errors.paymentMethod} />
                    </div>
                  </div>
                </div>

                {/* Checkout button */}
                <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                  <div className="col-span-6 sm:col-span-3">
                    <Link
                      href="/"
                      className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center  w-full"
                    >
                      <span className="text-xl mr-2">
                        <IoReturnUpBackOutline />
                      </span>
                      {showingTranslateValue(storeCustomizationSetting?.checkout?.continue_button)}
                    </Link>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <button
                      type="submit"
                      disabled={isEmpty || isCheckoutSubmit}
                      className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm  font-medium text-white flex justify-center w-full"
                    >
                      {isCheckoutSubmit ? (
                        <span className="flex justify-center text-center">
                          <img
                            src="/loader/spinner.gif"
                            alt="Loading"
                            width={20}
                            height={10}
                          />
                          <span className="ml-2">{t("common:processing")}</span>
                        </span>
                      ) : (
                        <span className="flex justify-center text-center">
                          {showingTranslateValue(storeCustomizationSetting?.checkout?.confirm_button)}
                          <span className="text-xl ml-2">
                            <IoArrowForward />
                          </span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary - remains same */}
          {/* ...copy your existing CartItem & summary code here... */}
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
