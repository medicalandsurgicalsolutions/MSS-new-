
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
              <p className="text-red-600 text-sm font-semibold uppercase tracking-widest mb-2">About Medipulse</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h2>
            </div>
            <div>
              <p className="text-slate-600 text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. contary popul Quis ipsum pendisse ultrices gravida. Risus commodo viverra
                maen
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">
              {/* Left: Stats Grid */}
              <div className="flex items-center">
                <div className="grid grid-cols-2 gap-0 w-fit">
                  {[
                    { number: "456+", label: "SATISFIED PATIENTS" },
                    { number: "326+", label: "SUCCESS HEART SURGERY" },
                    { number: "878+", label: "WORLDWIDE BRANCHES" },
                    { number: "750+", label: "SUPPORT TEAM" },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-900 text-white px-8 py-8 text-center border border-slate-800">
                      <h4 className="text-4xl font-bold mb-2">{item.number}</h4>
                      <p className="text-xs font-bold tracking-wide">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex justify-end">
                <Image
                  src="/doctor-with-elderly-patient.jpg"
                  alt="Doctor helping patient"
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
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-2">Cardiology Steps</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
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
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-2">Trust Medipulse</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
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
                        className="h-2 bg-red-600 rounded-full transition-all duration-500"
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
                src="/doctor-consulting-patient.jpg"
                alt="Doctor consulting patient"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Expert Team */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-2">Professional Doctors</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              MEET OUR PROFESSIONAL DEDICATED
              <br />
              EXPERT TEAM
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Dr. Andrew White", role: "Cardiology Specialist" },
              { name: "Dr. Sarah Khan", role: "Heart Surgeon" },
              { name: "Dr. Priya Menon", role: "Rehabilitation Expert" },
              { name: "Dr. James Miller", role: "Cardiac Nurse" },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square bg-slate-200 flex items-center justify-center">
                  <Image
                    src={`/professional-doctor-.jpg?height=300&width=300&query=professional-doctor-${i + 1}`}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 text-center">
                  <h5 className="text-base font-bold text-slate-900 mb-1">{member.name}</h5>
                  <p className="text-sm text-slate-600">{member.role}</p>
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
