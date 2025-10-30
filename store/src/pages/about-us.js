
import Image from "next/image"

//internal import
import Layout from "@layout/Layout"
import useGetSetting from "@hooks/useGetSetting"
import PageHeader from "@components/header/PageHeader"
import CMSkeleton from "@components/preloader/CMSkeleton"
import useUtilsFunction from "@hooks/useUtilsFunction"

const AboutUs = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting()
  const { showingTranslateValue } = useUtilsFunction()

  return (
    <Layout
      title="Buy Surgical Instruments & Products in Bulk | Medical & Surgical Solutions"
      description="Buy top-quality surgical instruments and medical products in bulk from Medical & Surgical Solutions. Trusted by hospitals and clinics for reliable, sterile, and affordable healthcare supplies."
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.about_us?.title)}
      />

    <div className="bg-slate-50">
        <div className="max-w-screen-xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          {/* Top: Label, Heading, and Description */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12 items-start">
            <div>
              <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
                About Medical & Surgical Solutions
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0891b2] text-slate-900 mb-6 leading-tight ">
                OUR TRUSTED PARTNER IN HEALTHCARE EXCELLENCE
              </h2>
            </div>
            <div>
              <p className="text-slate-600 text-base leading-relaxed pt-5">
                Medical & Surgical Solutions delivers trusted, high-quality medical equipment and products to healthcare
                professionals. Our innovative range ensures precision, reliability, and safety, empowering excellence in
                patient care across hospitals and institutions.
              </p>
            </div>
          </div>

          {/* Stats + Image Section */}
          <div className="relative h-96 lg:h-80">
            <div className="grid lg:grid-cols-2 gap-0 h-full">
              {/* Left: Stats Grid */}
              <div className="relative z-10 flex items-center">
                <div className="grid grid-cols-2 gap-0 w-fit">
                  {[
                    { number: "1100+", label: "HAPPY CUSTOMER" },
                    { number: "1500+", label: "PREMIUM MEDICAL AND SURGICAL PRODUCT" },
                    { number: "150+", label: "CUSTOMER TEAM" },
                    { number: "750+", label: "SUPPORT TEAM" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 text-white px-8 py-8 text-center border border-slate-800"
                    >
                      <h4 className="text-4xl font-bold mb-2">{item.number}</h4>
                      <p className="text-xs font-bold tracking-wide">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex justify-end">
                <Image
                  src={storeCustomizationSetting?.about_us?.content_right_img || "/about-us.jpg"}
                  alt="About our company"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Section 2: Heart Care Step by Step */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0891b2] text-sm font-semibold uppercase tracking-widest mb-2">Cardiology Steps</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0891b2] text-slate-900 mb-4 leading-tight">
              HEART CARE CARDIOLOGY
              <br />
              STEP BY STEP
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Surf Medipulse Website",
                desc: "Search our site to explore the best facilities and services we offer.",
              },
              {
                number: "02",
                title: "Expert Treatment",
                desc: "Receive expert care from experienced professionals for faster recovery.",
              },
              {
                number: "03",
                title: "Book an Appointment",
                desc: "Schedule an appointment online to connect with our specialists.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1 bg-red-600 rounded-full"></div>
                </div>
                <p className="text-red-600 text-sm font-bold mb-4">{step.number}</p>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                </div>
                <h5 className="text-lg font-bold text-slate-900 mb-3 uppercase">{step.title}</h5>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Progress Bars */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Text */}
            <div>
              <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">Trust Medipulse</p>
              <h3 className="text-4xl lg:text-5xl font-boldtext-[#0891b2] text-slate-900 mb-6 leading-tight">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-10">
                Medipulse has established a reputation for providing excellent healthcare with advanced surgical and
                rehabilitation support.
              </p>

              <div className="space-y-6">
                {[
                  { label: "Heart Surgery", value: 90 },
                  { label: "Manage Treatment", value: 70 },
                  { label: "Rehabilitation", value: 80 },
                  { label: "Heart Transplant", value: 85 },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 bg-[#b52228] rounded-full transition-all duration-500"
                        style={{ width: `${bar.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <Image
                src={storeCustomizationSetting?.about_us?.content_middle_Img || "/about-banner.jpg" || "/placeholder.svg"}
                alt="Company banner"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
            PROFESSIONAL TEAM
        </p>
      <h2 className="text-4xl lg:text-5xl font-bold text-[#0891b2] text-slate-900 mb-4 leading-tight">
        MEET OUR PROFESSIONAL DEDICATED
        <br />
        EXPERT TEAM
      </h2>
    </div>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {[
        {
          img: storeCustomizationSetting?.about_us?.founder_one_img || "/team/team-1.jpg",
          name: storeCustomizationSetting?.about_us?.founder_one_name,
          role: storeCustomizationSetting?.about_us?.founder_one_sub,
        },
        {
          img: storeCustomizationSetting?.about_us?.founder_two_img || "/team/team-2.jpg",
          name: storeCustomizationSetting?.about_us?.founder_two_name,
          role: storeCustomizationSetting?.about_us?.founder_two_sub,
        },
        {
          img: storeCustomizationSetting?.about_us?.founder_three_img || "/team/team-3.jpg",
          name: storeCustomizationSetting?.about_us?.founder_three_name,
          role: storeCustomizationSetting?.about_us?.founder_three_sub,
        },
        {
          img: storeCustomizationSetting?.about_us?.founder_four_img || "/team/team-4.jpg",
          name: storeCustomizationSetting?.about_us?.founder_four_name,
          role: storeCustomizationSetting?.about_us?.founder_four_sub,
        },
        {
          img: storeCustomizationSetting?.about_us?.founder_five_img || "/team/team-5.jpg",
          name: storeCustomizationSetting?.about_us?.founder_five_name,
          role: storeCustomizationSetting?.about_us?.founder_five_sub,
        },
        {
          img: storeCustomizationSetting?.about_us?.founder_six_img || "/team/team-6.jpg",
          name: storeCustomizationSetting?.about_us?.founder_six_name,
          role: storeCustomizationSetting?.about_us?.founder_six_sub,
        },
      ].map((member, i) => (
        <div
          key={i}
          className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="aspect-square bg-slate-200 flex items-center justify-center">
            <Image
              src={member.img}
              alt={member.name || "Team Member"}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 text-center">
            <h5 className="text-base font-bold text-[#0891b2] text-slate-900 mb-1">
              {member.name || "Team Member"}
            </h5>
            <p className="text-sm text-[#b52228]">
              {member.role || "Specialist"}
            </p>
          </div>
        </div>
        ))}
      </div>
    </div>
  </div>
    </Layout>
  )
}

export default AboutUs
