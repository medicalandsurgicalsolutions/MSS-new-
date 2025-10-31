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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
      ["email", "name", "number", "subject", "message"].forEach(f => setValue(f, ""));
      notifySuccess(res.message);
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    } finally {
      setMailLoading(false);
    }
  };

  return (
    <Layout
      title="Contact Medical & Surgical Solutions | Get in Touch"
      description="Reach out to Medical & Surgical Solutions for inquiries, orders, or support."
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.contact_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.contact_us?.title)}
      />

      {/* 🌟 Compact Contact Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 via-white to-cyan-100 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Contact Form */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              Get in <span className="text-cyan-600">Touch</span>
            </h2>
            <p className="text-gray-600 mb-8 text-base">
              We'd love to hear from you! Whether you’re curious about our products or need support, we’re here to help.
            </p>

            <form onSubmit={handleSubmit(submitHandler)} className="bg-white/80 backdrop-blur-lg border border-cyan-100 p-6 rounded-2xl shadow-md space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <InputArea register={register} name="name" label="Name" placeholder="Enter your name" />
                  <Error errorName={errors.name} />
                </div>
                <div>
                  <InputArea register={register} name="email" label="Email" type="email" placeholder="Enter your email" />
                  <Error errorName={errors.email} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <InputArea register={register} name="number" label="Phone" type="number" placeholder="Enter number" />
                  <Error errorName={errors.number} />
                </div>
                <div>
                  <InputArea register={register} name="subject" label="Subject" placeholder="Enter subject" />
                  <Error errorName={errors.subject} />
                </div>
              </div>
              <div>
                <Label label="Message" />
                <textarea
                  {...register("message", { required: "Message is required!" })}
                  rows="4"
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-cyan-500 transition-all outline-none"
                ></textarea>
                <Error errorName={errors.message} />
              </div>

              <button
                type="submit"
                disabled={mailLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold shadow hover:shadow-cyan-300/60 transition-all"
              >
                {mailLoading ? "Processing..." : t("common:contact-page-form-send-btn")}
              </button>
            </form>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-cyan-100/40 rounded-full blur-3xl -z-10"></div>
            <Image
              width={500}
              height={500}
              src={storeCustomizationSetting?.contact_us?.midLeft_col_img || "/contact-us.png"}
              alt="Contact Illustration"
              className="w-[80%] md:w-[90%] h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-6 mt-14 mb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ].filter(Boolean).join("\n"),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow hover:shadow-lg rounded-2xl p-6 text-center border-t-4 border-cyan-500"
          >
            <div className="flex justify-center text-4xl text-cyan-600 mb-3">{item.icon}</div>
            <h5 className="text-lg font-semibold text-gray-800 mb-1">{showingTranslateValue(item.title)}</h5>
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
