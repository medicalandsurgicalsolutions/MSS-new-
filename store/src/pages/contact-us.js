import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

import Layout from "@layout/Layout";
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import { notifyError, notifySuccess } from "@utils/toast";
import PageHeader from "@components/header/PageHeader";
import useGetSetting from "@hooks/useGetSetting";
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
  const { storeCustomizationSetting } = useGetSetting();

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
      ["email", "name", "number", "subject", "message"].forEach((f) => setValue(f, ""));
      notifySuccess(res.message);
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    } finally {
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

      {/* 🌈 Responsive Contact Section */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-cyan-100" />
        <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-200/40 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-cyan-400/30 rounded-full blur-3xl bottom-0 right-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left side — form */}
          <div className="flex-1 w-full">
            <div className="mb-8 md:mb-10 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 leading-tight">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-700">
                  Touch With Us
                </span>
              </h2>
              <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                We’d love to hear from you! Whether you’re curious about our
                products, need a quote, or want support — we’re ready to answer
                all your questions.
              </p>
            </div>

            {/* Contact badges */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-8 md:mb-10">
              <a
                href={`mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition text-sm md:text-base"
              >
                <FiMail className="text-cyan-600 text-lg md:text-xl" />
                <span className="text-gray-700">
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.email_box_email
                  )}
                </span>
              </a>
              <a
                href={`tel:${storeCustomizationSetting?.contact_us?.call_box_phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition text-sm md:text-base"
              >
                <FiBell className="text-cyan-600 text-lg md:text-xl" />
                <span className="text-gray-700">
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.call_box_phone
                  )}
                </span>
              </a>
            </div>

            {/* Glass form */}
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-cyan-100">
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

          {/* Right side — image */}
          <div className="flex-1 flex justify-center relative w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100 via-white to-cyan-50 opacity-80 rounded-full blur-3xl"></div>
            <Image
              width={600}
              height={600}
              src={
                storeCustomizationSetting?.contact_us?.midLeft_col_img ||
                "/contact-us.png"
              }
              alt="Contact Illustration"
              className="relative w-[80%] sm:w-[70%] md:w-[90%] lg:w-[650px] h-auto object-contain opacity-90 hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* ✅ Info cards */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-16 mt-16 mb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      icon: <FiMail />,
      title: storeCustomizationSetting?.contact_us?.email_box_title,
      text: storeCustomizationSetting?.contact_us?.email_box_text,
      link: `mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`,
      linkText: storeCustomizationSetting?.contact_us?.email_box_email,
    },
    {
      icon: <FiBell />,
      title: storeCustomizationSetting?.contact_us?.call_box_title,
      text: storeCustomizationSetting?.contact_us?.call_box_text,
      link: `tel:${storeCustomizationSetting?.contact_us?.call_box_phone}`,
      linkText: storeCustomizationSetting?.contact_us?.call_box_phone,
    },
    {
      icon: <FiMapPin />,
      title: storeCustomizationSetting?.contact_us?.address_box_title,
      text: [
        showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_one),
        showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_two),
        showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_three),
      ]
        .filter(Boolean) // remove undefined, null, empty values
        .join("\n"),
    },
  ].map((item, idx) => (
    <div
      key={idx}
      className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-8 text-center border-t-4 border-cyan-500"
    >
      <div className="flex justify-center text-4xl text-cyan-600 mb-4">
        {item.icon}
      </div>
      <h5 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
        {showingTranslateValue(item.title)}
      </h5>

      {item.link ? (
        <p className="text-gray-600">
          <a href={item.link} className="text-cyan-600 font-medium">
            {showingTranslateValue(item.linkText)}
          </a>
          <br />
          {showingTranslateValue(item.text)}
        </p>
      ) : (
        <p className="text-gray-600 whitespace-pre-line">{item.text}</p>
      )}
    </div>
  ))}
</div>

    </Layout>
  );
};

export default ContactUs;
