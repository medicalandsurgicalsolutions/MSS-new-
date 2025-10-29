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

      {/* Main Content */}
      <div className="bg-slate-50">
        <div className="max-w-screen-2xl mx-auto py-16 px-4 lg:px-10">

          {/* Section 1 - Trust Medipulse */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-24">
            {/* Text */}
            <div>
              <h2 className="text-[#0891B2] uppercase tracking-wide text-sm font-semibold mb-2">
                About Medipulse
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h3>
              <p className="text-slate-600 text-sm md:text-base mb-6">
                Learn expert skills and care, modernized adaptive features, and
                advanced healing experiences. Our dedicated team ensures top-quality
                treatment and compassionate support.
              </p>

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-4">
                {[
                  { number: "456+", label: "Satisfied Patients" },
                  { number: "326+", label: "Success Heart Surgery" },
                  { number: "878+", label: "Worldwide Branches" },
                  { number: "750+", label: "Support Team" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-[#0891B2] text-white rounded-xl px-6 py-4 shadow-md hover:scale-105 transition-transform"
                  >
                    <span className="text-2xl md:text-3xl font-bold">{item.number}</span>
                    <span className="text-xs md:text-sm font-medium text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="/about/about-trust.jpg"
                alt="Doctor with patient"
                width={500}
                height={350}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>

          {/* Section 2 - Heart Care Steps */}
          <div className="text-center mb-24">
            <h4 className="text-[#0891B2] uppercase tracking-wide text-sm font-semibold mb-2">
              Cardiology Steps
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
              HEART CARE CARDIOLOGY STEP BY STEP
            </h2>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏥",
                  title: "Surf Medipulse Website",
                  desc: "Search our site to explore the best facilities and services we offer.",
                },
                {
                  icon: "💊",
                  title: "Expert Treatment",
                  desc: "Receive expert care from experienced professionals for faster recovery.",
                },
                {
                  icon: "📅",
                  title: "Book an Appointment",
                  desc: "Schedule an appointment online to connect with our specialists.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#0891B2] transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h5 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h5>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 - Trust Medipulse (Progress Bars) */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-24">
            {/* Text */}
            <div>
              <h4 className="text-[#0891B2] uppercase tracking-wide text-sm font-semibold mb-2">
                Trust Medipulse
              </h4>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h3>
              <p className="text-slate-600 text-sm md:text-base mb-6">
                Medipulse has established a reputation for providing excellent
                healthcare with advanced surgical and rehabilitation support.
              </p>

              <div className="space-y-4">
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
                        className="h-2 bg-[#0891B2] rounded-full transition-all duration-700"
                        style={{ width: `${bar.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="/about/about-doctor.jpg"
                alt="Doctor consultation"
                width={500}
                height={350}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>

          {/* Section 4 - Expert Team */}
          <div className="text-center mb-10">
            <h4 className="text-[#0891B2] uppercase tracking-wide text-sm font-semibold mb-2">
              Professional Doctors
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
              MEET OUR PROFESSIONAL DEDICATED EXPERT TEAM
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { img: "/team/team-1.jpg", name: "Dr. Andrew White", role: "Cardiology Specialist" },
                { img: "/team/team-2.jpg", name: "Dr. Sarah Khan", role: "Heart Surgeon" },
                { img: "/team/team-3.jpg", name: "Dr. Priya Menon", role: "Rehabilitation Expert" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="group bg-white p-4 rounded-2xl shadow-md hover:shadow-lg hover:border-[#0891B2] border border-transparent transition-all duration-300"
                >
                  <div className="overflow-hidden rounded-xl mb-4">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={400}
                      height={300}
                      className="rounded-xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-slate-800 group-hover:text-[#0891B2] transition-colors">
                    {member.name}
                  </h5>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
