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

      {/* ✨ New Creative Contact Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100 py-20">
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <span className="absolute w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30 -top-10 -left-16 animate-pulse" />
          <span className="absolute w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 top-40 -right-20 animate-ping" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Column - Text + Form */}
          <div className="flex-1 w-full">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Let’s{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-700">
                  Connect & Collaborate
                </span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-md">
                Got a question or need help? Fill out the form and our team will
                get back to you shortly. We’d love to hear from you!
              </p>
            </div>

            {/* Contact Form Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-100 p-8 md:p-10 hover:shadow-cyan-100/70 transition-all duration-300">
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
                    name="message"
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
                      type="submit"
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
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      {t("common:contact-page-form-send-btn")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex-1 hidden lg:flex justify-center relative">
            <div className="absolute w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-40 -top-10 right-10 animate-pulse" />
            <Image
              width={600}
              height={600}
              src={
                storeCustomizationSetting?.contact_us?.midLeft_col_img ||
                "/contact-us.png"
              }
              alt="Contact Illustration"
              className="relative z-10 w-[500px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Keep your existing contact info cards below */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 mt-20 mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Email */}
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

        {/* Call */}
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

        {/* Address */}
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
