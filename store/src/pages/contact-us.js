"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi"

const ContactPage = () => {
  const [mailLoading, setMailLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      subject: "",
      message: "",
    },
  })

  const submitHandler = async (data) => {
    setMailLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", data)
      setSubmitStatus("success")
      reset()
      setTimeout(() => setSubmitStatus("idle"), 4000)
    } catch (err) {
      console.error("Error:", err)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 4000)
    } finally {
      setMailLoading(false)
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-b from-blue-600 to-blue-700 py-16 md:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-balance">
            Get in Touch With Us
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto text-balance">
            Have questions about our medical and surgical solutions? We are here to help. Reach out to our team today.
          </p>
        </div>
      </div>

      <section className="relative bg-gradient-to-b from-slate-50 via-white to-blue-50 py-12 md:py-20 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                  <Image
                    width={500}
                    height={500}
                    src="/medical-professional-team-healthcare.jpg"
                    alt="Medical professionals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight text-balance">
                  Send us a Message
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Fill out the form below and our team will get back to you as soon as possible. We typically respond
                  within 24 hours.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-semibold">Something went wrong. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {formState.errors.name && (
                      <p className="text-destructive text-sm mt-1">{formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: emailPattern,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {formState.errors.email && (
                      <p className="text-destructive text-sm mt-1">{formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                    <input
                      {...register("number", { required: "Phone number is required" })}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {formState.errors.number && (
                      <p className="text-destructive text-sm mt-1">{formState.errors.number.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                    <input
                      {...register("subject", { required: "Subject is required" })}
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {formState.errors.subject && (
                      <p className="text-destructive text-sm mt-1">{formState.errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">{formState.errors.message.message}</p>
                  )}
                </div>

                <button
                  disabled={mailLoading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  {mailLoading ? (
                    <div className="flex items-center gap-2">
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
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-border pt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12 text-balance">
              Other Ways to Reach Us
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="group relative bg-white border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-blue-100 rounded-xl mb-4 text-blue-600">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">Email Us</h4>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    Send us an email and we will respond within 24 business hours.
                  </p>
                  <a
                    href="mailto:support@example.com"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    support@example.com
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="group relative bg-white border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-blue-100 rounded-xl mb-4 text-blue-600">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">Call Us</h4>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    Speak directly with our team during business hours.
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    +91 9876 543 210
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="group relative bg-white border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-blue-100 rounded-xl mb-4 text-blue-600">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">Visit Us</h4>
                  <p className="text-muted-foreground leading-relaxed space-y-2">
                    <span className="block">Medical and Surgical Solutions</span>
                    <span className="block">123 Healthcare Avenue</span>
                    <span className="block">New Delhi, India 110001</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
