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
import Layout from "@layout/Layout";
import useAsync from "@hooks/useAsync";
import Error from "@components/form/Error";
import CartItem from "@components/cart/CartItem";

import InputArea from "@components/form/InputArea";
import InputPayment from "@components/form/InputPayment";
import SwitchToggle from "@components/form/SwitchToggle";

import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useGetSetting from "@hooks/useGetSetting";

import SettingServices from "@services/SettingServices";
import PinncodeService from "@services/PincodeServices";
import { notifyError, notifySuccess } from "@utils/toast";

const Checkout = () => {
  const { t } = useTranslation();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const { data: storeSetting } = useAsync(SettingServices.getStoreSetting);

  const {
    error,
    isEmpty,
    items,
    currency,
    register,
    errors,
    showCard,
    setActiveCharge,
    setShowCard,
    handleSubmit,
    submitHandler: originalSubmitHandler,
    isCheckoutSubmit,
    useExistingAddress,
    hasShippingAddress,
    handleDefaultShippingAddress,
  } = useCheckoutSubmit();

  // Store REAL FILE objects — restored from localStorage
  const [prescriptions, setPrescriptions] = useState({});

  //-------------------------------------------------------
  // Restore saved prescriptions from localStorage
  //-------------------------------------------------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("prescriptions") || "{}");
    const restored = {};

    Object.keys(saved).forEach((itemId) => {
      const { name, base64 } = saved[itemId];
      restored[itemId] = dataURLtoFile(base64, name);
    });

    setPrescriptions(restored);
  }, []);

  //-------------------------------------------------------
  // Convert Base64 → File
  //-------------------------------------------------------
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    return new File([u8arr], filename, { type: mime });
  }

  //-------------------------------------------------------
  // COD Check
  //-------------------------------------------------------
  const [inputPincode, setInputPincode] = useState("");
  const [isCodDisable, setIsCodDisable] = useState(false);

  useEffect(() => {
    const pinField = document.querySelector("#PinInput input");
    if (!pinField) return;

    const pinChange = (e) => {
      const code = e.target.value;
      setInputPincode(code);
      if (code.length >= 6) checkPincode(code);
    };

    pinField.addEventListener("input", pinChange);
    return () => pinField.removeEventListener("input", pinChange);
  }, []);

  const checkPincode = async (pin) => {
    const res = await PinncodeService.getOnePin(pin).catch(() => null);

    if (!res || res.status !== "show") {
      notifyError("COD not available on this pincode");
      setIsCodDisable(true);
    } else {
      notifySuccess("COD available for this pincode");
      setIsCodDisable(false);
    }
  };

  //-------------------------------------------------------
  // Final Correct Submit Handler – sends REAL FILES
  //-------------------------------------------------------
  const enhancedSubmitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("user_info", JSON.stringify(data.user_info));
      formData.append("paymentMethod", data.paymentMethod);
      formData.append("cart", JSON.stringify(data.cart));

      // Attach real prescription files
      Object.keys(prescriptions).forEach((id) => {
        formData.append("prescriptions", prescriptions[id]);
      });

      await originalSubmitHandler(formData);

      notifySuccess("Order submitted successfully!");

      localStorage.removeItem("prescriptions");
      setPrescriptions({});
    } catch (err) {
      console.error(err);
      notifyError("Failed to submit order");
    }
  };

  //-------------------------------------------------------
  // UI STARTS
  //-------------------------------------------------------
  return (
    <Layout title="Checkout" description="Checkout page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col md:flex-row">

          {/* LEFT SIDE — CHECKOUT FORM */}
          <div className="md:w-full lg:w-3/5">
            <form onSubmit={handleSubmit(enhancedSubmitHandler)}>

              {/* ADDRESS TOGGLE */}
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

              {/* PERSONAL INFO */}
              <div className="form-group">
                <h2 className="font-semibold text-base text-gray-700 pb-3">
                  01. Personal Details
                </h2>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                    />
                    <Error errorName={errors.firstName} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                    />
                    <Error errorName={errors.lastName} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone"
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>
              </div>

              {/* SHIPPING DETAILS */}
              <div className="form-group mt-10">
                <h2 className="font-semibold text-base text-gray-700 pb-3">
                  02. Shipping Details
                </h2>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <InputArea
                      register={register}
                      label="House / Floor"
                      name="flat"
                      type="text"
                      placeholder="Eg: 102 / First Floor"
                    />
                    <Error errorName={errors.flat} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="Street Address"
                      name="address"
                      type="text"
                      placeholder="Eg: Patparganj, Sector 36"
                    />
                    <Error errorName={errors.address} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="Landmark"
                      name="landmark"
                      type="text"
                      placeholder="Eg: Near Axis Bank"
                    />
                    <Error errorName={errors.landmark} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="City"
                      name="city"
                      type="text"
                      placeholder="Eg: New Delhi"
                    />
                    <Error errorName={errors.city} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="State"
                      name="state"
                      type="text"
                      placeholder="Eg: Delhi"
                    />
                    <Error errorName={errors.state} />
                  </div>

                  <div className="col-span-6 sm:col-span-3" id="PinInput">
                    <InputArea
                      register={register}
                      label="Zip Code"
                      name="zipCode"
                      value={inputPincode}
                      type="text"
                      placeholder="110092"
                    />
                    <Error errorName={errors.zipCode} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label="Country"
                      name="country"
                      type="text"
                      placeholder="India"
                    />
                    <Error errorName={errors.country} />
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="form-group mt-10">
                <h2 className="font-semibold text-base text-gray-700 pb-3">
                  03. Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {storeSetting?.cod_status && (
                    <div id="cod_input">
                      <InputPayment
                        setShowCard={setShowCard}
                        register={register}
                        name="Cash on Delivery"
                        value="Cash"
                        Icon={IoWalletSharp}
                        disable={isCodDisable}
                        setActiveCharge={setActiveCharge}
                      />
                      <Error errorMessage={errors.paymentMethod} />
                    </div>
                  )}

                  <div>
                    <InputPayment
                      setShowCard={setShowCard}
                      register={register}
                      name="Razorpay"
                      value="RazorPay"
                      Icon={ImCreditCard}
                      setActiveCharge={setActiveCharge}
                    />
                    <Error errorMessage={errors.paymentMethod} />
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="grid grid-cols-6 gap-4 mt-10">
                <div className="col-span-6 sm:col-span-3">
                  <Link
                    href="/"
                    className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:border-gray-300"
                  >
                    <IoReturnUpBackOutline className="inline mr-2" />
                    Continue Shopping
                  </Link>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <button
                    type="submit"
                    disabled={isEmpty || isCheckoutSubmit}
                    className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 text-white rounded py-3 text-sm font-medium w-full flex justify-center"
                  >
                    {isCheckoutSubmit ? (
                      <span className="flex items-center">
                        <img src="/loader/spinner.gif" width={20} />
                        <span className="ml-2">Processing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Confirm Order
                        <IoArrowForward className="ml-2" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="md:w-full lg:w-2/5 lg:ml-10 mt-10 md:mt-0">
            <div className="border p-5 rounded-lg bg-white">
              <h2 className="font-semibold text-lg pb-4">
                Order Summary
              </h2>

              <div className="overflow-y-scroll max-h-64 bg-gray-50">
                {items.map((item) => {
                  const saved = JSON.parse(localStorage.getItem("prescriptions") || "{}");
                  const fileInfo = saved[item.id]; // {name, base64}

                  return (
                    <div key={item.id} className="mb-3">
                      <CartItem item={item} currency={currency} />

                      {/* Prescription Preview — ONLY HERE */}
                      {fileInfo && (
                        <div className="mt-2 ml-4">
                          <p className="text-sm text-gray-500">Prescription:</p>
                          <img
                            src={fileInfo.base64}
                            alt="prescription"
                            className="h-20 w-20 border rounded object-cover"
                          />
                          <p className="text-xs text-green-600 mt-1">{fileInfo.name}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {isEmpty && (
                  <div className="text-center py-10">
                    <IoBagHandle className="text-4xl mx-auto text-gray-500" />
                    <h2 className="text-gray-600 text-sm mt-2">No Item Added Yet!</h2>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
