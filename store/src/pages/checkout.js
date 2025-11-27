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
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useGetSetting from "@hooks/useGetSetting";
import SettingServices from "@services/SettingServices";
import PinncodeService from "@services/PincodeServices";
import SwitchToggle from "@components/form/SwitchToggle";
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

  const [inputPincode, setInputPincode] = useState("");
  const [isCodDisable, setIsCodDisable] = useState(false);

  // ✔ Stores { itemId : { name, base64 } }
  // 🔥 FIXED: PRESCRIPTIONS STORED AS REAL File
  const [prescriptions, setPrescriptions] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("prescriptions");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert back to File objects
      const reconstructed = {};
      Object.keys(parsed).forEach((id) => {
        const p = parsed[id];
        reconstructed[id] = dataURLtoFile(p.base64, p.name);
      });
      setPrescriptions(reconstructed);
    }
  }, []);

  // Convert base64 from localStorage → real File again
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // COD helper
  const codObj = {
    Elements: null,
    init() {
      if (!this.Elements)
        this.Elements = document.querySelectorAll("#cod_input *");
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
      notifyError("COD is unavailable for this pincode");
      this.Elements[0].style.borderColor = "red";
      this.Elements.forEach((el) => (el.style.cursor = "not-allowed"));
    },
  };

  const CheckPin = async (pin) => {
    const response = await PinncodeService.getOnePin(pin).catch((e) => {
      if (e?.response?.data?.error !== "pincode not found") console.error(e);
      return undefined;
    });

    if (!response || response.status !== "show") {
      setIsCodDisable(true);
      codObj.disable();
    } else {
      setIsCodDisable(false);
      codObj.enable();
    }
  };

  useEffect(() => {
    const pinInput = document.querySelector("#PinInput input");
    if (!pinInput) return;

    const handleInputChange = (event) => {
      const newPin = event.target.value;
      setInputPincode(newPin);
      if (newPin.length >= 6) CheckPin(newPin);
    };

    pinInput.addEventListener("input", handleInputChange);
    return () => pinInput.removeEventListener("input", handleInputChange);
  }, []);

  // File → Base64 for storing in localStorage only
  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

  // 🔥 FIXED: Stores both File + base64 in localStorage
  const handlePrescriptionUpload = async (file, itemId) => {
    if (!file) return;

    const base64 = await fileToBase64(file);

    const updated = {
      ...prescriptions,
      [itemId]: file,
    };

    // save file as base64 in localStorage
    const storeObj = {
      ...JSON.parse(localStorage.getItem("prescriptions") || "{}"),
      [itemId]: { name: file.name, base64 },
    };

    localStorage.setItem("prescriptions", JSON.stringify(storeObj));
    setPrescriptions(updated);

    notifySuccess("Prescription added successfully");
  };

  // 🔥 FINAL FIX — REAL FILE SENT TO BACKEND
  const enhancedSubmitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("user_info", JSON.stringify(data.user_info));
      formData.append("paymentMethod", data.paymentMethod);
      formData.append("cart", JSON.stringify(data.cart));

      // Attach prescriptions
      Object.keys(prescriptions).forEach((itemId) => {
        formData.append("prescriptions", prescriptions[itemId]);
      });

      await originalSubmitHandler(formData);

      notifySuccess("Order submitted successfully!");

      localStorage.removeItem("prescriptions");
      setPrescriptions({});
    } catch (err) {
      console.error("Checkout submit error:", err);
      notifyError("Failed to submit order.");
    }
  };

  return (
    <Layout title="Checkout" description="Checkout page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col md:flex-row">
          {/* LEFT FORM */}
          <div className="md:w-full lg:w-3/5">
            <form onSubmit={handleSubmit(enhancedSubmitHandler)}>
              {/* Shipping toggle */}
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

              {/* PERSONAL DETAILS */}
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

              {/* PRESCRIPTION UPLOAD */}
              <div className="form-group mt-10">
                <h2 className="font-semibold text-base text-gray-700 pb-3">
                  Upload Prescription
                </h2>

                {items.map((item) => (
                  <div key={item.id} className="mb-4">
                    <p className="text-sm font-medium">{item.name}</p>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) =>
                        handlePrescriptionUpload(e.target.files[0], item.id)
                      }
                      className="border p-2 rounded w-full"
                    />
                    {prescriptions[item.id] && (
                      <p className="text-green-600 text-sm mt-1">
                        {prescriptions[item.id].name}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* PAYMENT METHOD */}
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
                        disable={isCodDisable}
                        Icon={IoWalletSharp}
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

              {/* BUTTONS */}
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
                        <img
                          src="/loader/spinner.gif"
                          alt="loading"
                          width={20}
                        />
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

          {/* RIGHT SUMMARY */}
          <div className="md:w-full lg:w-2/5 lg:ml-10 mt-10 md:mt-0">
            <div className="border p-5 rounded-lg bg-white">
              <h2 className="font-semibold text-lg pb-4">Order Summary</h2>

              <div className="overflow-y-scroll max-h-64 bg-gray-50">
                {items.map((item) => (
                  <div key={item.id}>
                    <CartItem item={item} currency={currency} />

                    {prescriptions[item.id] && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Prescription:</p>
                        <img
                          src={prescriptions[item.id].base64}
                          alt={prescriptions[item.id].name}
                          className="h-20 w-20 object-cover border rounded"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {isEmpty && (
                  <div className="text-center py-10">
                    <IoBagHandle className="text-4xl mx-auto text-gray-500" />
                    <h2 className="text-gray-600 text-sm">No Item Added Yet!</h2>
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
