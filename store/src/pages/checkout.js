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

// internal imports
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
  const [prescriptions, setPrescriptions] = useState({}); // store files for each cart item

  // --------------------------
  // COD UI helper
  // --------------------------
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
      this.Elements.forEach((el) => {
        el.style.cursor = "auto";
      });
    },
    disable() {
      this.init();
      if (!this.Elements || !this.Elements.length) return;
      this.Elements[0].style.borderColor = "red";
      notifyError("COD is unavailable for this pincode");
      this.Elements.forEach((el) => {
        el.style.cursor = "not-allowed";
      });
    },
  };

  // --------------------------
  // Check Pin
  // --------------------------
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

  // --------------------------
  // Prescription Upload
  // --------------------------
  const handlePrescriptionUpload = (itemId, file) => {
    setPrescriptions((prev) => ({ ...prev, [itemId]: file }));
    // store in localStorage temporarily for persistence
    localStorage.setItem(`prescription_${itemId}`, JSON.stringify({ name: file.name }));
    notifySuccess(`Prescription uploaded for item ${itemId}`);
  };

  const attachPrescriptionsToItems = (cartItems) => {
    return cartItems.map((item) => {
      const prescriptionFile = prescriptions[item.id] || localStorage.getItem(`prescription_${item.id}`);
      return {
        ...item,
        prescription: prescriptionFile ? JSON.parse(prescriptionFile) : null,
      };
    });
  };

  // --------------------------
  // Form submission wrapper
  // --------------------------
  const onSubmitWithPrescriptions = handleSubmit(async (formData) => {
    const augmentedItems = attachPrescriptionsToItems(items || []);

    const payload = {
      cart: augmentedItems,
      user_info: {
        name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim(),
        contact: formData.phone || "",
        address: formData.address || "",
        flat: formData.flat || "",
        district: formData.district || "",
        landmark: formData.landmark || "",
        state: formData.state || "",
        city: formData.city || "",
        country: formData.country || "",
        zipCode: formData.zipCode || "",
        email: formData.email || "",
      },
      paymentMethod: formData.paymentMethod,
      subTotal: cartTotal,
      shippingCost: deliveryChargeToApply || 0,
      discount: discountAmount || 0,
      total: total || 0,
      shippingOption: formData.shippingOption || null,
    };

    const result = await submitHandler(payload);

    if (result && (result.success || result.status === 201 || result.order)) {
      // Clear uploaded prescriptions
      augmentedItems.forEach((item) => {
        localStorage.removeItem(`prescription_${item.id}`);
      });
      setPrescriptions({});
    }

    return result;
  });

  return (
    <Layout title="Checkout" description="this is checkout page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
          <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={onSubmitWithPrescriptions}>
                {/* === Personal Details === */}
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

                <div className="form-group">
                  <h2 className="font-semibold  text-base text-gray-700 pb-3">
                    01.{" "}
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.personal_details
                    )}
                  </h2>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.first_name
                        )}
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                      />
                      <Error errorName={errors.firstName} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.last_name
                        )}
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        required={false}
                      />
                      <Error errorName={errors.lastName} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.checkout_phone
                        )}
                        name="phone"
                        type="tel"
                        placeholder="Enter phone number"
                      />
                      <Error errorName={errors.contact} />
                    </div>
                  </div>
                </div>

                {/* === Shipping Details === */}
                <div className="form-group mt-12">
                  <h2 className="font-semibold  text-base text-gray-700 pb-3">
                    02.{" "}
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.shipping_details
                    )}
                  </h2>
                  <div className="grid grid-cols-6 gap-6 mb-8">
                    <div className="col-span-6">
                      <InputArea
                        register={register}
                        label={"Plat, House number, floor, building"}
                        name="flat"
                        type="text"
                        placeholder="Eg: 402, Ground Floor"
                      />
                      <Error errorName={errors.flat} />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.street_address
                        )}
                        name="address"
                        type="text"
                        placeholder="Eg: Patparganj Industrial Area, Sector 36"
                      />
                      <Error errorName={errors.address} />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea
                        register={register}
                        label={"Landmark"}
                        name="landmark"
                        type="text"
                        placeholder="Eg: Near Bagga Link"
                      />
                      <Error errorName={errors.landmark} />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.city
                        )}
                        name="city"
                        type="text"
                        placeholder="Eg: New Delhi"
                      />
                      <Error errorName={errors.city} />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea
                        register={register}
                        label={"District"}
                        name="district"
                        type="text"
                        placeholder="Eg: New Delhi"
                      />
                      <Error errorName={errors.district} />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea
                        register={register}
                        label={"State"}
                        name="state"
                        type="text"
                        placeholder="Eg: Uttar Pradesh"
                      />
                      <Error errorName={errors.state} />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.country
                        )}
                        name="country"
                        type="text"
                        placeholder="Eg: India"
                      />
                      <Error errorName={errors.country} />
                    </div>

                    <div
                      id="PinInput"
                      className="col-span-6 sm:col-span-3 lg:col-span-2"
                    >
                      <InputArea
                        register={register}
                        label={showingTranslateValue(
                          storeCustomizationSetting?.checkout?.zip_code
                        )}
                        value={inputPincode}
                        name="zipCode"
                        type="text"
                        placeholder="Eg: 110092"
                      />
                      <Error errorName={errors.zipCode} />
                    </div>
                  </div>
                </div>

                {/* === Payment Method === */}
                <div className="form-group mt-12">
                  <h2 className="font-semibold text-base text-gray-700 pb-3">
                    03.{" "}
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.payment_method
                    )}
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

                {/* === Buttons === */}
                <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                  <div className="col-span-6 sm:col-span-3">
                    <Link
                      href="/"
                      className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center  w-full"
                    >
                      <span className="text-xl mr-2">
                        <IoReturnUpBackOutline />
                      </span>
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.continue_button
                      )}
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
                          {showingTranslateValue(
                            storeCustomizationSetting?.checkout?.confirm_button
                          )}
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

          {/* === Order Summary with Prescription Upload === */}
          <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
            <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
              <h2 className="font-semibold  text-lg pb-4">
                {showingTranslateValue(
                  storeCustomizationSetting?.checkout?.order_summary
                )}
              </h2>
              <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                {items.map((item) => (
                  <div key={item.id} className="mb-4">
                    <CartItem item={item} currency={currency} />
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Prescription
                      </label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) =>
                          handlePrescriptionUpload(item.id, e.target.files[0])
                        }
                        className="mt-1 block w-full text-sm text-gray-600"
                      />
                    </div>
                  </div>
                ))}

                {isEmpty && (
                  <div className="text-center py-10">
                    <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                      <IoBagHandle />
                    </span>
                    <h2 className="font-medium  text-sm pt-2 text-gray-600">
                      No Item Added Yet!
                    </h2>
                  </div>
                )}
              </div>

              {/* Totals, shipping, discounts unchanged */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
