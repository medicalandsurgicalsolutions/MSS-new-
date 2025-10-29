import Image from "next/image";

// internal imports
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

export default function AboutUs() {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Layout
      title="About Medipulse | Trusted Heart & Medical Care"
      description="Learn more about Medipulse — trusted by thousands for world-class cardiology, surgery, and rehabilitation care."
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.about_us?.title) || "About Medipulse"}
      />

      <div className="bg-slate-50">
        <div className="max-w-screen-xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          {/* Section 1: Trust Medipulse */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Content */}
            <div>
              <h2 className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-2">
                About Medipulse
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-10">
                Learn expert skills and care, modernized adaptive features, and
                advanced healing experiences. Our dedicated team ensures top-quality
                treatment and compassionate support.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { number: "456+", label: "Satisfied Patients" },
                  { number: "326+", label: "Success Heart Surgery" },
                  { number: "878+", label: "Worldwide Branches" },
                  { number: "750+", label: "Support Team" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#0891B2] text-white rounded-2xl px-6 py-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-3xl font-bold mb-1">{item.number}</h4>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <Image
                src="/about/about-1.jpg"
                alt="Doctor helping patient"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>

          {/* Section 2: Heart Care Step by Step */}
          <div className="text-center mb-24">
            <h4 className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-2">
              Cardiology Steps
            </h4>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-14 leading-tight">
              HEART CARE CARDIOLOGY STEP BY STEP
            </h2>

            <div className="grid sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                {
                  img: "/about/icon-1.png",
                  title: "Surf Medipulse Website",
                  desc: "Search our site to explore the best facilities and services we offer.",
                },
                {
                  img: "/about/icon-2.png",
                  title: "Expert Treatment",
                  desc: "Receive expert care from experienced professionals for faster recovery.",
                },
                {
                  img: "/about/icon-3.png",
                  title: "Book an Appointment",
                  desc: "Schedule an appointment online to connect with our specialists.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#0891B2] transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={60}
                      height={60}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <h5 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h5>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Progress Bars */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Text */}
            <div>
              <h4 className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-2">
                Trust Medipulse
              </h4>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Medipulse has established a reputation for providing excellent
                healthcare with advanced surgical and rehabilitation support.
              </p>

              {/* Progress Bars */}
              <div className="space-y-5">
                {[
                  { label: "Heart Surgery", value: 90 },
                  { label: "Manage Treatment", value: 70 },
                  { label: "Rehabilitation", value: 80 },
                  { label: "Heart Transplant", value: 85 },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 bg-[#0891B2] rounded-full"
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
                src="/about/about-2.jpg"
                alt="Doctor consulting patient"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>

          {/* Section 4: Expert Team */}
          <div className="text-center">
            <h4 className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-2">
              Professional Doctors
            </h4>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-14 leading-tight">
              MEET OUR PROFESSIONAL DEDICATED EXPERT TEAM
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {[
                { img: "/team/team-1.jpg", name: "Dr. Andrew White", role: "Cardiology Specialist" },
                { img: "/team/team-2.jpg", name: "Dr. Sarah Khan", role: "Heart Surgeon" },
                { img: "/team/team-3.jpg", name: "Dr. Priya Menon", role: "Rehabilitation Expert" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="text-lg font-bold text-slate-800 mb-1 hover:text-[#0891B2] transition-colors">
                      {member.name}
                    </h5>
                    <p className="text-sm text-slate-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
