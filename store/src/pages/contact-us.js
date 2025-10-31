import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

// internal imports
import Layout from "@layout/Layout";
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import { notifyError, notifySuccess } from "@utils/toast";
import PageHeader from "@components/header/PageHeader";
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import CustomerServices from "@services/CustomerServices";

const ContactUs = () => {
  const { t } = useTranslation();
  const [mailLoading, setMailLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  const submitHandler = async (data) => {
    const supportData = {
      email: data.email,
      name: data.name,
      number: data.number,
      subject: data.subject,
      message: data.message,
    };

    setMailLoading(true);
    try {
      const res = await CustomerServices.contactSupport(supportData);
      setValue("email", "");
      setValue("name", "");
      setValue("number", "");
      setValue("subject", "");
      setValue("message", "");
      notifySuccess(res.message);
      setMailLoading(false);
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setMailLoading(false);
    }
  };

  return (
    <Layout
      title="Contact Medical & Surgical Solutions | Get in Touch"
      description="Reach out to Medical & Surgical Solutions for inquiries, orders, or support. Trusted supplier of medical and surgical equipment for hospitals and clinics in India."
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.contact_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.contact_us?.title)}
      />

      {/* 🌈 Next-Gen Contact Section */}
      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-cyan-100" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[700px] h-[700px] bg-cyan-400/30 rounded-full blur-3xl bottom-0 right-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 flex flex-col lg:flex-row items-center gap-16">
          {/* Left side — Form & Info */}
          <div className="flex-1 w-full">
            <div className="mb-10">
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-800 leading-tight">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-700">
                  Touch With Us
                </span>
              </h2>
              <p className="mt-4 text-gray-600 text-lg max-w-md">
                We’d love to hear from you! Whether you’re curious about our
                products, need a quote, or want support — we’re ready to answer
                all your questions.
              </p>
            </div>

            {/* Floating contact badges */}
            <div className="flex items-center gap-4 mb-10">
              <a
                href={`mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition"
              >
                <FiMail className="text-cyan-600 text-xl" />
                <span className="text-gray-700 text-sm">
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.email_box_email
                  )}
                </span>
              </a>
              <a
                href={`tel:${storeCustomizationSetting?.contact_us?.call_box_phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition"
              >
                <FiBell className="text-cyan-600 text-xl" />
                <span className="text-gray-700 text-sm">
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.call_box_phone
                  )}
                </span>
              </a>
            </div>

            {/* Glass Form Card */}
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-cyan-100">
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputArea
                      register={register}
                      label={t("common:contact-page-form-input-name")}
                      name="name"
                      type="text"
                      placeholder={t("common:contact-page-form-plaholder-name")}
                    />
                    <Error errorName={errors.name} />
                  </div>
                  <div>
                    <InputArea
                      register={register}
                      label={t("common:contact-page-form-input-email")}
                      name="email"
                      type="email"
                      placeholder={t("common:contact-page-form-plaholder-email")}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputArea
                      register={register}
                      label={"Enter Number"}
                      name="number"
                      type="number"
                      placeholder={"Enter Number"}
                    />
                    <Error errorName={errors.number} />
                  </div>
                  <div>
                    <InputArea
                      register={register}
                      label={t("common:contact-page-form-input-subject")}
                      name="subject"
                      type="text"
                      placeholder={t("common:contact-page-form-plaholder-subject")}
                    />
                    <Error errorName={errors.subject} />
                  </div>
                </div>

                <div>
                  <Label label={t("common:contact-page-form-input-message")} />
                  <textarea
                    {...register("message", { required: "Message is required!" })}
                    rows="4"
                    className="px-4 py-3 w-full rounded-lg text-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-cyan-500 transition-all duration-300 outline-none"
                    placeholder={t("common:contact-page-form-plaholder-message")}
                  ></textarea>
                  <Error errorName={errors.message} />
                </div>

                <div>
                  {mailLoading ? (
                    <button
                      disabled
                      className="w-full flex items-center justify-center py-3 rounded-lg bg-cyan-500 text-white font-medium shadow-md"
                    >
                      <img
                        src="/loader/spinner.gif"
                        alt="Loading"
                        width={20}
                        height={10}
                        className="mr-2"
                      />
                      Processing...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-cyan-300/60 hover:scale-[1.02] transition-all duration-300"
                    >
                      {t("common:contact-page-form-send-btn")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right side — Background Blended Illustration */}
          <div className="flex-1 hidden lg:flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100 via-white to-cyan-50 opacity-80 rounded-full blur-3xl"></div>
              <Image
                width={700}
                height={700}
                src={
                  storeCustomizationSetting?.contact_us?.midLeft_col_img ||
                  "/contact-us.png"
                }
                alt="Contact Illustration"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[650px] h-auto object-contain opacity-90 hover:opacity-100 transition-all duration-700"
              />
          </div>
        </div>
      </section>

      {/* ✅ Contact Info Cards */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 mt-20 mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-8 text-center border-t-4 border-cyan-500">
          <div className="flex justify-center text-4xl text-cyan-600 mb-4">
            <FiMail />
          </div>
          <h5 className="text-xl font-semibold mb-2 text-gray-800">
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.email_box_title)}
          </h5>
          <p className="text-gray-600">
            <a
              href={`mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`}
              className="text-cyan-600 font-medium"
            >
              {showingTranslateValue(storeCustomizationSetting?.contact_us?.email_box_email)}
            </a>
            <br />
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.email_box_text)}
          </p>
        </div>

        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-8 text-center border-t-4 border-cyan-500">
          <div className="flex justify-center text-4xl text-cyan-600 mb-4">
            <FiBell />
          </div>
          <h5 className="text-xl font-semibold mb-2 text-gray-800">
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_title)}
          </h5>
          <p className="text-gray-600">
            <a
              href={`tel:${
                storeCustomizationSetting?.contact_us?.call_box_phone || "+099949343"
              }`}
              className="text-cyan-600 font-medium"
            >
              {showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_phone)}
            </a>
            <br />
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_text)}
          </p>
        </div>

        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-8 text-center border-t-4 border-cyan-500">
          <div className="flex justify-center text-4xl text-cyan-600 mb-4">
            <FiMapPin />
          </div>
          <h5 className="text-xl font-semibold mb-2 text-gray-800">
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_title)}
          </h5>
          <p className="text-gray-600">
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_one)}
            <br />
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_two)}
            <br />
            {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_three)}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
