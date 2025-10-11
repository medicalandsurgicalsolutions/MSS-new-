import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import { CardElement } from "@stripe/react-stripe-js";
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
    // stripe,
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

  const codObj = {
    Elements: null,
    cover: null,
    init() {
      if (!this.Elements) {
        this.Elements = document.querySelectorAll("#cod_input *");
      }
    },

    enable() {
      this.init();
      if (!this.Elements.length) return;
      notifySuccess("cod is available for this pincode");
      this.Elements[0].style.borderColor = "rgb(40, 204, 40)";
      this.Elements.forEach((element) => {
        element.style.cursor = "auto";
      });
    },

    disable() {
      this.init();
      if (!this.Elements.length) return;
      this.Elements[0].style.borderColor = "red";

      notifyError("cod is unavailable for this pincode");
      this.Elements.forEach((element) => {
        element.style.cursor = "not-allowed";
      });
    },
  };

  // 🔹 Add this above CheckPin
const createOrderRazorpay = async (orderData) => {
  try {
    const response = await fetch("https://api.medicalsurgicalsolutions.com/api/order/create/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log("Order Response:", data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    notifyError("Failed to create order. Please try again.");
  }
};


  const Checkout = () => {
  // ✅ Get token from localStorage
  const token =
    localStorage.getItem("userToken") || localStorage.getItem("token"); // added by Suman Kumar

  // 🔹 Ye function define karo yaha, CheckPin ke upar ya niche
  const createOrderRazorpay = async (orderData) => {
    try {
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

      const data = await response.json();
      console.log("Order Response:", data);
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      notifyError("Failed to create order. Please try again.");
    }
  };


 const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: order.currency,
        name: "Your Store Name",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          fsubmitHandler(formData)
          
          // call backend to verify payment and save order
          notifySuccess("Payment Successful!");
        },
        prefill: {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      return;
    }

    // baki submitHandler ka existing code yaha chalega (Cash on Delivery etc.)
    submitHandler(formData);
  };




  const CheckPin = async (pin) => {
    const response = await PinncodeService.getOnePin(pin).catch((e) => {
      if (e.response.data.error !== "pincode not found") {
        console.error(e.message);
      }
      return undefined;
    });
    if (response === undefined) {
      setIsCodDisable(true);
      codObj.disable();
    } else {
      if (response && response.status && response.status === "show") {
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

    if (pinInput) {
      const handleInputChange = (event) => {
        const newPin = event.target.value;
        setInputPincode(newPin);

        if (newPin.length >= 6) {
          CheckPin(newPin);
        }
      };

      pinInput.addEventListener("input", handleInputChange);

      return () => {
        pinInput.removeEventListener("input", handleInputChange); // ✅ Cleanup to prevent memory leaks
      };
    }
  }, []);

  // console.log(
  //   "shippingCost",
  //   shippingCost,
  //   "  storeCustomizationSetting?.checkout",
  //   storeCustomizationSetting?.checkout
  // );

  // console.log("storeCustomizationSetting", storeCustomizationSetting);

  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(newSubmitHandler)}>
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

                      {/* <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.email_address
                          )}
                          name="email"
                          type="email"
                          // readOnly={true}
                          placeholder="Enter your email address"
                        />
                        <Error errorName={errors.email} />
                      </div> */}

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.checkout_phone
                          )}
                          name="phone"
                          type="tel"
                          // readOnly={true}
                          placeholder="Enter phone number"
                        />

                        <Error errorName={errors.contact} />
                      </div>
                    </div>
                  </div>

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
                        {/* pincode  */}

                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.zip_code
                          )}
                          value={inputPincode}
                          name="zipCode"
                          type={"text"}
                          placeholder="Eg: 110092"
                        />
                        <Error errorName={errors.zipCode} />
                      </div>
                    </div>

                    {storeCustomizationSetting?.checkout?.shipping_two_cost && (
                      <>
                        <Label
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.shipping_cost
                          )}
                        />
                        <div className="grid grid-cols-6 gap-6">
                          {showingTranslateValue(
                            storeCustomizationSetting?.checkout
                              ?.shipping_one_desc
                          ) && (
                            <div className="col-span-6 sm:col-span-3">
                              <InputShipping
                                currency={currency}
                                handleShippingCost={handleShippingCost}
                                register={register}
                                // value="FedEx"
                                value={showingTranslateValue(
                                  storeCustomizationSetting?.checkout
                                    ?.shipping_name_two
                                )}
                                description={showingTranslateValue(
                                  storeCustomizationSetting?.checkout
                                    ?.shipping_one_desc
                                )}
                                // time="Today"
                                cost={
                                  Number(
                                    storeCustomizationSetting?.checkout
                                      ?.shipping_one_cost
                                  ) || 60
                                }
                              />
                              <Error errorName={errors.shippingOption} />
                            </div>
                          )}
                          {showingTranslateValue(
                            storeCustomizationSetting?.checkout
                              ?.shipping_two_desc
                          ) && (
                            <div className="col-span-6 sm:col-span-3">
                              <InputShipping
                                currency={currency}
                                handleShippingCost={handleShippingCost}
                                register={register}
                                value={showingTranslateValue(
                                  storeCustomizationSetting?.checkout
                                    ?.shipping_name_two
                                )}
                                description={showingTranslateValue(
                                  storeCustomizationSetting?.checkout
                                    ?.shipping_two_desc
                                )}
                                // time="7 Days"
                                cost={
                                  Number(
                                    storeCustomizationSetting?.checkout
                                      ?.shipping_two_cost
                                  ) || 0
                                }
                              />
                              <Error errorName={errors.shippingOption} />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="form-group mt-12">
                    <h2 className="font-semibold text-base text-gray-700 pb-3">
                      03.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.payment_method
                      )}
                    </h2>
                    {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}

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

                      {/* {storeSetting?.stripe_status && (
                        <div className="">
                          <InputPayment
                            setShowCard={setShowCard}
                            register={register}
                            name={t("common:creditCard")}
                            value="Card"
                            Icon={ImCreditCard}
                          />
                          <Error errorMessage={errors.paymentMethod} />
                        </div>
                      )} */}

                      {/* {storeSetting?.razorpay_status && ( */}
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
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">
                              {t("common:processing")}
                            </span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {showingTranslateValue(
                              storeCustomizationSetting?.checkout
                                ?.confirm_button
                            )}
                            <span className="text-xl ml-2">
                              {" "}
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

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold  text-lg pb-4">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.order_summary
                  )}
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
                      <h2 className="font-medium  text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {couponInfo.couponCode ? (
                      <span className="bg-green-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        {" "}
                        <p className="text-green-600">Coupon Applied </p>{" "}
                        <span className="text-green-500 text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          ref={couponRef}
                          type="text"
                          placeholder={t("common:couponCode")}
                          className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
                        />
                        {isCouponAvailable ? (
                          <button
                            disabled={isCouponAvailable}
                            type="submit"
                            className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                          >
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />
                            <span className=" ml-2 font-light">Processing</span>
                          </button>
                        ) : (
                          <button
                            disabled={isCouponAvailable}
                            onClick={handleCouponCode}
                            className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                          >
                            {showingTranslateValue(
                              storeCustomizationSetting?.checkout?.apply_button
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.sub_total
                  )}
                  {/* <p className="pb-0 mb-0 ml-2 text-green-600 text-[11px]">(Inclusive of 12% GST)</p> */}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {cartTotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.shipping_cost
                  )}
                  {deliveryChargeToApply > 0 ? (
                    <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {deliveryChargeToApply?.toFixed(2)}
                  </span>
                  ) : (
                    <span className="ml-auto flex-shrink-0 text-green-600 font-bold">
                     Free Delivery
                  </span>
                  )}
                </div>
                {codDisplay > 0 && (
                  <div className="flex items-center py-2 text-sm w-full font-semibold text-red-600 last:border-b-0 last:text-base last:pb-0">
                    COD Charge
                    <span className="ml-auto flex-shrink-0 font-bold text-red-600">
                      {currency}
                      {codDisplay.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center py-2 text-sm w-full font-semibold text-green-600 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.discount
                  )}
                  <span className="ml-auto flex-shrink-0 font-bold text-green-600">
                    {currency}
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold  justify-between pt-5 text-sm uppercase">
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.total_cost
                    )}
                    <span className=" font-extrabold text-lg">
                      {currency}
                      {parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </>
      </Layout>

  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
