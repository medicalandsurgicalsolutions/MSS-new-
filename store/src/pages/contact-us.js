"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import CMSkeleton from "@/components/preloader/CMSkeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

export default function ContactUs() {
  const [mailLoading, setMailLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const submitHandler = async (data) => {
    setMailLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setValue("email", "")
      setValue("name", "")
      setValue("number", "")
      setValue("subject", "")
      setValue("message", "")
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setMailLoading(false)
    } catch (err) {
      setMailLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#0891b2]/5">
      <div className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0891b2]/10 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0891b2]/5 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-screen-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#0891b2]/10 rounded-full border border-[#0891b2]/20 hover:border-[#0891b2]/40 transition-all duration-300 hover:bg-[#0891b2]/15">
            <Sparkles className="w-4 h-4" style={{ color: "#b52228" }} />
            <p className="text-sm font-semibold" style={{ color: "#0891b2" }}>
              We're here to help
            </p>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight text-balance"
            style={{ color: "#0891b2" }}
          >
            Get in Touch
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto lg:py-12 py-8 px-4 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left side - Form */}
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h2
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{ color: "#0891b2" }}
              >
                <CMSkeleton count={1} height={60} loading={loading} data="Send us a Message" />
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                <CMSkeleton
                  count={2}
                  height={24}
                  loading={loading}
                  data="Fill out the form and we'll get back to you as soon as possible."
                />
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="w-full space-y-5">
              {/* Name and Email row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <Label htmlFor="name" className="font-semibold mb-2 block text-xs uppercase tracking-wide text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="John Doe"
                    className="bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/20 transition-all duration-300 h-11 rounded-lg text-sm"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1 font-medium">{errors.name.message}</p>}
                </div>
                <div className="group">
                  <Label htmlFor="email" className="font-semibold mb-2 block text-xs uppercase tracking-wide text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="your@email.com"
                    className="bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/20 transition-all duration-300 h-11 rounded-lg text-sm"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1 font-medium">{errors.email.message}</p>}
                </div>
              </div>

              {/* Message textarea */}
              <div>
                <Label htmlFor="message" className="font-semibold mb-2 block text-xs uppercase tracking-wide text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/20 transition-all duration-300 rounded-lg resize-none text-sm"
                />
                {errors.message && (
                  <p className="text-destructive text-xs mt-1 font-medium">{errors.message.message}</p>
                )}
              </div>

              {/* Success message */}
              {submitted && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 font-semibold text-sm">
                    Message sent successfully! We'll be in touch soon.
                  </p>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={mailLoading}
                style={{ backgroundColor: "#0891b2", color: "#fff" }}
                className="w-full hover:opacity-90 py-3 h-11 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl hover:-translate-y-1"
              >
                {mailLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: "#b52228" }} />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right side - Info Cards */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email Support",
                  description: "support@example.com",
                  subtext: "We respond within 24 hours",
                },
                {
                  icon: Phone,
                  title: "Phone Support",
                  description: "+1 (234) 567-890",
                  subtext: "Monday to Friday, 9am-6pm",
                },
                {
                  icon: MapPin,
                  title: "Office Location",
                  description: "123 Business Street",
                  subtext: "New York, NY 10001, USA",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-card border-2 border-border p-5 rounded-lg hover:border-[#0891b2]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#0891b2]/10 rounded-lg flex items-center justify-center border border-[#0891b2]/20 transition-all duration-300">
                      <item.icon className="w-6 h-6" style={{ color: "#b52228" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1 text-sm" style={{ color: "#0891b2" }}>
                        {item.title}
                      </h3>
                      <p className="text-foreground font-semibold text-sm mb-0.5">{item.description}</p>
                      <p className="text-muted-foreground text-xs">{item.subtext}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
