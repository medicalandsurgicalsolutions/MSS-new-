import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IoReturnUpBackOutline, IoArrowForward, IoBagHandle, IoWalletSharp } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";

// Internal imports
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

  // ---------------------- PRESCRIPTION LOGIC ---------------------- //
  const getPrescriptionUrl = (productId) => {
    try {
      const saved = localStorage.getItem(`prescription_${productId}`);
      return saved || null;
    } catch (err) {
      console.error("Error getting prescription from localStorage", err);
      return null;
    }
  };

  const checkoutSubmitHandler = async (data) => {
  if (isEmpty) return notifyError("Cart is empty!");

  try {
    const token =
      typeof window !== "undefined" &&
      (localStorage.getItem("userToken") || localStorage.getItem("token"));

    // Build FormData
    const formData = new FormData();
      formData.append("user_info", JSON.stringify(user_info));
      formData.append("items", JSON.stringify(cartItems));
      formData.append("total", total);
      formData.append("subTotal", subTotal);
      formData.append("shippingCost", shippingCost);
      formData.append("discount", discount);
      formData.append("paymentMethod", paymentMethod);
      formData.append("status", "Pending");
      formData.append("user", user._id);
      
      if (uploadedFile) {
        formData.append("prescription", uploadedFile);
      }

    // USER INFO
    const user_info = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      flat: data.flat,
      address: data.address,
      landmark: data.landmark,
      city: data.city,
      district: data.district,
      state: data.state,
      country: data.country,
      zipCode: data.zipCode,
    };

    formData.append("user_info", JSON.stringify(user_info));

    // ITEMS + PRESCRIPTION URLS
    const orderItems = items.map((item) => ({
      product: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      prescriptionUrl: getPrescriptionUrl(item.id) || null,
    }));

    formData.append("items", JSON.stringify(orderItems));

    // TOTALS
    formData.append(
      "total",
      cartTotal + deliveryChargeToApply - discountAmount
    );
    formData.append("shippingCost", deliveryChargeToApply);
    formData.append("discount", discountAmount);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("status", "Pending");

    // APPEND FILES (if uploaded)
    items.forEach((item) => {
      const file = localStorage.getItem(`file_${item.id}`);
      if (file) {
        formData.append("prescription", file);
      }
    });

    // SEND REQUEST
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      notifySuccess("Order placed successfully!");
      window.location.href = "/orders";
    } else {
      notifyError(result.message || "Failed to place order.");
    }
  } catch (err) {
    console.error(err);
    notifyError("Something went wrong!");
  }
};


  // ---------------------- COD PIN CHECK ---------------------- //
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
      this.Elements.forEach((el) => (el.style.cursor = "not-allowed"));
      notifyError("COD unavailable for this pincode");
    },
  };

  const CheckPin = async (pin) => {
    const response = await PinncodeService.getOnePin(pin).catch(() => undefined);

    if (!response) {
      setIsCodDisable(true);
      codObj.disable();
    } else if (response.status === "show") {
      setIsCodDisable(false);
      codObj.enable();
    } else {
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
      if (newPin.length >= 6) CheckPin(newPin);
    };
    pinInput.addEventListener("input", handleInputChange);
    return () => pinInput.removeEventListener("input", handleInputChange);
  }, []);

  return (
    <Layout title="Checkout" description="Checkout page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col md:flex-row">
          {/* LEFT FORM */}
          <div className="md:w-full lg:w-3/5 flex flex-col order-2 sm:order-1 lg:order-1">
            <div className="mt-5 md:mt-0">
              <form onSubmit={handleSubmit(checkoutSubmitHandler)}>
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
                    01. {showingTranslateValue(storeCustomizationSetting?.checkout?.personal_details)}
                  </h2>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(storeCustomizationSetting?.checkout?.first_name)}
                        name="firstName"
                        type="text"
                        placeholder="Enter first name"
                      />
                      <Error errorName={errors.firstName} />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(storeCustomizationSetting?.checkout?.last_name)}
                        name="lastName"
                        type="text"
                        placeholder="Enter last name"
                      />
                      <Error errorName={errors.lastName} />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputArea
                        register={register}
                        label={showingTranslateValue(storeCustomizationSetting?.checkout?.checkout_phone)}
                        name="phone"
                        type="tel"
                        placeholder="Enter phone"
                      />
                      <Error errorName={errors.contact} />
                    </div>
                  </div>
                </div>

                {/* SHIPPING DETAILS */}
                <div className="form-group mt-12">
                  <h2 className="font-semibold text-base text-gray-700 pb-3">
                    02. {showingTranslateValue(storeCustomizationSetting?.checkout?.shipping_details)}
                  </h2>
                  <div className="grid grid-cols-6 gap-6 mb-8">
                    <div className="col-span-6">
                      <InputArea register={register} label="Flat, House no, Floor, Building" name="flat" type="text" placeholder="Eg: 402, Ground Floor" />
                      <Error errorName={errors.flat} />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea register={register} label={showingTranslateValue(storeCustomizationSetting?.checkout?.street_address)} name="address" type="text" placeholder="Eg: Patparganj Industrial Area" />
                      <Error errorName={errors.address} />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea register={register} label="Landmark" name="landmark" type="text" placeholder="Eg: Near Bagga Link" />
                      <Error errorName={errors.landmark} />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea register={register} label={showingTranslateValue(storeCustomizationSetting?.checkout?.city)} name="city" type="text" placeholder="Eg: New Delhi" />
                      <Error errorName={errors.city} />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea register={register} label="District" name="district" type="text" placeholder="Eg: New Delhi" />
                      <Error errorName={errors.district} />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <InputArea register={register} label="State" name="state" type="text" placeholder="Eg: Uttar Pradesh" />
                      <Error errorName={errors.state} />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputArea register={register} label={showingTranslateValue(storeCustomizationSetting?.checkout?.country)} name="country" type="text" placeholder="Eg: India" />
                      <Error errorName={errors.country} />
                    </div>
                    <div id="PinInput" className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputArea register={register} label={showingTranslateValue(storeCustomizationSetting?.checkout?.zip_code)} name="zipCode" type="text" value={inputPincode} placeholder="Eg: 110092" />
                      <Error errorName={errors.zipCode} />
                    </div>
                  </div>
                </div>

                {/* PAYMENT METHODS */}
                <div className="form-group mt-12">
                  <h2 className="font-semibold text-base text-gray-700 pb-3">
                    03. {showingTranslateValue(storeCustomizationSetting?.checkout?.payment_method)}
                  </h2>
                  <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                    {storeSetting?.cod_status && (
                      <div id="cod_input">
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

                    <div>
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

                {/* FORM BUTTONS */}
                <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                  <div className="col-span-6 sm:col-span-3">
                    <Link href="/" className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center w-full">
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
                      className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-medium text-white flex justify-center w-full"
                    >
                      {isCheckoutSubmit ? (
                        <span className="flex justify-center text-center">
                          <img src="/loader/spinner.gif" alt="Loading" width={20} height={10} />
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

          {/* RIGHT ORDER SUMMARY */}
          <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28">
            <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white">
              <h2 className="font-semibold text-lg pb-4">
                {showingTranslateValue(storeCustomizationSetting?.checkout?.order_summary)}
              </h2>

              <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} currency={currency} />
                ))}

                {isEmpty && (
                  <div className="text-center py-10">
                    <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                      <IoBagHandle />
                    </span>
                    <h2 className="font-medium text-sm pt-2 text-gray-600">No Item Added Yet!</h2>
                  </div>
                )}
              </div>

              {/* TOTALS */}
              <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500">
                {showingTranslateValue(storeCustomizationSetting?.checkout?.sub_total)}
                <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">{currency}{cartTotal?.toFixed(2)}</span>
              </div>

              <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500">
                {showingTranslateValue(storeCustomizationSetting?.checkout?.shipping_cost)}
                {deliveryChargeToApply > 0 ? (
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">{currency}{deliveryChargeToApply?.toFixed(2)}</span>
                ) : (
                  <span className="ml-auto flex-shrink-0 text-green-600 font-bold">Free Delivery</span>
                )}
              </div>

              {codDisplay > 0 && (
                <div className="flex items-center py-2 text-sm w-full font-semibold text-red-600">
                  COD Charge
                  <span className="ml-auto flex-shrink-0 font-bold text-red-600">{currency}{codDisplay.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center py-2 text-sm w-full font-semibold text-green-600">
                {showingTranslateValue(storeCustomizationSetting?.checkout?.discount)}
                <span className="ml-auto flex-shrink-0 font-bold text-green-600">{currency}{discountAmount.toFixed(2)}</span>
              </div>

              <div className="border-t mt-4">
                <div className="flex items-center font-bold justify-between pt-5 text-sm uppercase">
                  {showingTranslateValue(storeCustomizationSetting?.checkout?.total_cost)}
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
