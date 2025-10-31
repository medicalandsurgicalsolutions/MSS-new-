"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import useTranslation from "next-translate/useTranslation"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi"
import { Layout, Label, Error, PageHeader, CMSkeleton, InputArea } from "@components/index"
import { notifyError, notifySuccess } from "@utils/toast"
import useGetSetting from "@hooks/useGetSetting"
import useUtilsFunction from "@hooks/useUtilsFunction"
import CustomerServices from "@services/CustomerServices"

const ContactPage = () => {
  const { t } = useTranslation()
  const [mailLoading, setMailLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { showingTranslateValue } = useUtilsFunction()
  const { storeCustomizationSetting, loading, error } = useGetSetting()

  const submitHandler = async (data: any) => {
    const supportData = {
      email: data.email,
      name: data.name,
      number: data.number,
      subject: data.subject,
      message: data.message,
    }

    setMailLoading(true)
    try {
      const res = await CustomerServices.contactSupport(supportData)
      setValue("email", "")
      setValue("name", "")
      setValue("number", "")
      setValue("subject", "")
      setValue("message", "")
      notifySuccess(res.message)
      setMailLoading(false)
    } catch (err: any) {
      notifyError(err ? err?.response?.data?.message : err?.message)
      setMailLoading(false)
    }
  }

  return (
    <Layout
      title="Contact Medical & Surgical Solutions I Get in Touch"
      description="Reach out to Medical & Surgical Solutions for inquiries, orders, or support. Trusted supplier of medical and surgical equipment for hospitals and clinics in India."
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.contact_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.contact_us?.title)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-blue-50 py-12 md:py-20 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
            {/* Left - Image */}
            <div className="hidden lg:flex items-center justify-center perspective">
              <div className="relative w-full aspect-square max-w-md">
                {loading ? (
                  <div className="w-full h-full bg-muted rounded-2xl animate-pulse" />
                ) : (
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                    <Image
                      width={500}
                      height={500}
                      src={
                        storeCustomizationSetting?.contact_us?.midLeft_col_img ||
                        "/placeholder.svg?height=500&width=500&query=medical-team-professional" ||
                        "/placeholder.svg"
                      }
                      alt="Medical team"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
                  </div>
                )}
              </div>
            </div>

            {/* Right - Form */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  <CMSkeleton
                    count={1}
                    height={50}
                    loading={loading}
                    data={storeCustomizationSetting?.contact_us?.form_title}
                  />
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  <CMSkeleton
                    count={2}
                    height={20}
                    loading={loading}
                    data={storeCustomizationSetting?.contact_us?.form_description}
                  />
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <InputArea
                      register={register}
                      label={"Phone Number"}
                      name="number"
                      type="tel"
                      placeholder={"Enter your phone number"}
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

                {/* Message */}
                <div>
                  <Label label={t("common:contact-page-form-input-message")} />
                  <textarea
                    {...register("message", {
                      required: `Message is required!`,
                    })}
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={5}
                    placeholder={t("common:contact-page-form-plaholder-message")}
                  />
                  <Error errorName={errors.message} />
                </div>

                {/* Submit Button */}
                <button
                  disabled={mailLoading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {mailLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    t("common:contact-page-form-send-btn")
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="border-t border-border pt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Get in Touch With Us</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Email Card */}
              {loading ? (
                <div className="h-48 bg-muted rounded-xl animate-pulse" />
              ) : (
                <div className="group relative bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4 text-blue-600">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.email_box_title)}
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.email_box_text)}
                    </p>
                    <a
                      href={`mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.email_box_email)}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Phone Card */}
              {loading ? (
                <div className="h-48 bg-muted rounded-xl animate-pulse" />
              ) : (
                <div className="group relative bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4 text-blue-600">
                      <FiPhone className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_title)}
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_text)}
                    </p>
                    <a
                      href={`tel:${storeCustomizationSetting?.contact_us?.call_box_phone || "+099949343"}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_phone)}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Address Card */}
              {loading ? (
                <div className="h-48 bg-muted rounded-xl animate-pulse" />
              ) : (
                <div className="group relative bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4 text-blue-600">
                      <FiMapPin className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_title)}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="block">
                        {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_one)}
                      </span>
                      <span className="block">
                        {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_two)}
                      </span>
                      <span className="block">
                        {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_three)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage
