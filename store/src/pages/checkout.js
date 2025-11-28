import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IoReturnUpBackOutline, IoArrowForward, IoBagHandle, IoWalletSharp } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";

// Internal imports
import Layout from "@layout/Layout";
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import CartItem from "@components/cart/CartItem";
import InputArea from "@components/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import InputPayment from "@components/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import SwitchToggle from "@components/form/SwitchToggle";
import PinncodeService from "@services/PincodeServices";
import { notifyError, notifySuccess } from "@utils/toast";

const Checkout = () => {
  const { t } = useTranslation();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const {
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    register,
    errors,
    showCard,
    setActiveCharge,
    setShowCard,
    handleSubmit,
    isCheckoutSubmit,
    useExistingAddress,
    hasShippingAddress,
    handleDefaultShippingAddress,
    deliveryChargeToApply,
    discountAmount,
  } = useCheckoutSubmit();

  const [inputPincode, setInputPincode] = useState("");
  const [isCodDisable, setIsCodDisable] = useState(false);
  const [prescriptionFiles, setPrescriptionFiles] = useState([]);

  // COD availability check
  const codObj = {
    Elements: null,
    init() {
      if (!this.Elements) this.Elements = document.querySelectorAll("#cod_input *");
    },
    enable() {
      this.init();
      if (!this.Elements?.length) return;
      notifySuccess("COD is available for this pincode");
      this.Elements[0].style.borderColor = "rgb(40, 204, 40)";
      this.Elements.forEach((el) => (el.style.cursor = "auto"));
    },
    disable() {
      this.init();
      if (!this.Elements?.length) return;
      this.Elements[0].style.borderColor = "red";
      notifyError("COD is unavailable for this pincode");
      this.Elements.forEach((el) => (el.style.cursor = "not-allowed"));
    },
  };

  const checkPincode = async (pin) => {
    try {
      const response = await PinncodeService.getOnePin(pin);
      if (!response || response?.status !== "show") {
        setIsCodDisable(true);
        codObj.disable();
      } else {
        setIsCodDisable(false);
        codObj.enable();
      }
    } catch {
      setIsCodDisable(true);
      codObj.disable();
    }
  };

  useEffect(() => {
    const pinInput = document.querySelector("#PinInput input");
    if (!pinInput) return;
    const handleInputChange = (event) => {
      const newPin = event.target.value;
      setInputPincode(newPin);
      if (newPin.length >= 6) checkPincode(newPin);
    };
    pinInput.addEventListener("input", handleInputChange);
    return () => pinInput.removeEventListener("input", handleInputChange);
  }, []);

  // --- Save Order in LocalStorage ---
  const handleFormSubmit = (data) => {
    try {
      // Attach prescription files to items
      const itemsWithPrescriptions = items.map((item, idx) => ({
        ...item,
        prescriptionFile: prescriptionFiles[idx] || null,
      }));

      const orderData = {
        _id: Date.now().toString(), // unique id
        invoice: `INV-${Date.now()}`,
        createdAt: new Date().toISOString(),
        user_info: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          flat: data.flat,
          address: data.address,
          landmark: data.landmark,
          city: data.city,
          district: data.district || "",
          state: data.state || "",
          country: data.country || "India",
          zipCode: data.zipCode,
        },
        items: itemsWithPrescriptions,
        total,
        cartTotal,
        discount: discountAmount,
        shippingCost: deliveryChargeToApply,
        paymentMethod: data.paymentMethod,
        status: "pending",
        isCancelByCustomer: false,
      };

      // Get existing orders from localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Add new order
      existingOrders.push(orderData);

      // Save back to localStorage
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      notifySuccess("Order placed successfully!");

      // Optionally, clear cart, prescriptionFiles, etc.
      setPrescriptionFiles([]);
      window.location.href = "/order-success"; // redirect page
    } catch (err) {
      console.error(err);
      notifyError("Order submission failed!");
    }
  };

  return (
    <Layout title="Checkout" description="Checkout page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col md:flex-row">
          {/* Left Form */}
          <div className="md:w-full lg:w-3/5 flex flex-col">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Default Shipping */}
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

              {/* Personal Details */}
              <div className="form-group">
                <h2 className="font-semibold text-base text-gray-700 pb-3">
                  01. Personal Details
                </h2>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <InputArea register={register} label="First Name" name="firstName" type="text" placeholder="Enter your first name" />
                    <Error errorName={errors.firstName} />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <InputArea register={register} label="Last Name" name="lastName" type="text" placeholder="Enter your last name" />
                    <Error errorName={errors.lastName} />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <InputArea register={register} label="Phone" name="phone" type="tel" placeholder="Enter phone number" />
                    <Error errorName={errors.phone} />
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="form-group mt-12">
                <h2 className="font-semibold text-base text-gray-700 pb-3">02. Shipping Details</h2>
                <div className="grid grid-cols-6 gap-6 mb-8">
                  <div className="col-span-6">
                    <InputArea register={register} label="Flat/House Number" name="flat" type="text" placeholder="Eg: 402, Ground Floor" />
                    <Error errorName={errors.flat} />
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea register={register} label="Street Address" name="address" type="text" placeholder="Eg: Patparganj Industrial Area" />
                    <Error errorName={errors.address} />
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea register={register} label="Landmark" name="landmark" type="text" placeholder="Eg: Near Bagga Link" />
                    <Error errorName={errors.landmark} />
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea register={register} label="City" name="city" type="text" placeholder="Eg: New Delhi" />
                    <Error errorName={errors.city} />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2" id="PinInput">
                    <InputArea register={register} label="Zip Code" value={inputPincode} name="zipCode" type="text" placeholder="Eg: 110092" />
                    <Error errorName={errors.zipCode} />
                  </div>
                </div>

                {/* Prescription Upload */}
                <div className="form-group mt-4">
                  <Label label="Upload Prescription (if any)" />
                  {items.map((item, idx) => (
                    <div key={item.id} className="mb-3">
                      <span className="block font-semibold mb-1">{item.title}</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setPrescriptionFiles((prev) => {
                            const copy = [...prev];
                            copy[idx] = file;
                            return copy;
                          });
                        }}
                        className="form-input w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="form-group mt-12">
                <h2 className="font-semibold text-base text-gray-700 pb-3">03. Payment Methods</h2>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                  <div id="cod_input">
                    <InputPayment setShowCard={setShowCard} register={register} name="Cash" value="Cash" disable={isCodDisable} Icon={IoWalletSharp} setActiveCharge={setActiveCharge} />
                    <Error errorMessage={errors.paymentMethod} />
                  </div>
                  <div>
                    <InputPayment setShowCard={setShowCard} register={register} name="RazorPay" value="RazorPay" Icon={ImCreditCard} setActiveCharge={setActiveCharge} />
                    <Error errorMessage={errors.paymentMethod} />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                <div className="col-span-6 sm:col-span-3">
                  <Link href="/" className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center w-full">
                    <span className="text-xl mr-2"><IoReturnUpBackOutline /></span>
                    Continue Shopping
                  </Link>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <button
                    type="submit"
                    disabled={isEmpty || isCheckoutSubmit}
                    className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-medium text-white flex justify-center w-full"
                  >
                    Confirm Order <span className="text-xl ml-2"><IoArrowForward /></span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Summary */}
          <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28">
            <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white">
              <h2 className="font-semibold text-lg pb-4">Order Summary</h2>
              <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                {items.map((item) => <CartItem key={item.id} item={item} currency={currency} />)}
                {isEmpty && (
                  <div className="text-center py-10">
                    <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl"><IoBagHandle /></span>
                    <h2 className="font-medium text-sm pt-2 text-gray-600">No Item Added Yet!</h2>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                Subtotal
                <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">{currency}{cartTotal?.toFixed(2)}</span>
              </div>

              <div className="border-t mt-4">
                <div className="flex items-center font-bold justify-between pt-5 text-sm uppercase">
                  Total Cost
                  <span className="font-extrabold text-lg">{currency}{parseFloat(total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
