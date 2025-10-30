import Image from "next/image";

// internal imports
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const AboutUs = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  // ✅ Prevent rendering object instead of string
  const safeText = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") {
      // handle translation objects like {en: "...", de: "..."}
      return val.en || Object.values(val)[0] || "";
    }
    return String(val);
  };

  // ✅ Handle loading and errors safely
  if (loading) return <CMSkeleton />;
  if (error) return <div>Error loading About Us page.</div>;
  if (!storeCustomizationSetting) return null;

  const about = storeCustomizationSetting?.about_us || {};

  return (
    <Layout
      title="Buy Surgical Instruments & Products in Bulk | Medical & Surgical Solutions"
      description="Buy top-quality surgical instruments and medical products in bulk from Medical & Surgical Solutions. Trusted by hospitals and clinics for reliable, sterile, and affordable healthcare supplies."
    >
      <PageHeader
        headerBg={about?.header_bg}
        title={safeText(showingTranslateValue(about?.title))}
      />

      {/* Section 1: About Section */}
      <div className="bg-slate-50">
        <div className="max-w-screen-xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          {/* Top: Label, Heading, and Description */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12 items-start">
            <div>
              <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
                About Medical & Surgical Solutions
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0891b2] mb-6 leading-tight">
                OUR TRUSTED PARTNER IN HEALTHCARE EXCELLENCE
              </h2>
            </div>
            <div>
              <p className="text-slate-600 text-base leading-relaxed pt-5">
                Medical & Surgical Solutions delivers trusted, high-quality medical
                equipment and products to healthcare professionals. Our innovative
                range ensures precision, reliability, and safety, empowering
                excellence in patient care across hospitals and institutions.
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
                  src={about?.content_right_img || "/about-us.jpg"}
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
      {/* Section 1: About Section end */}

      {/* Section 2: Heart Care Step by Step */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
              Cardiology Steps
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0891b2] mb-4 leading-tight">
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
                <h5 className="text-lg font-bold text-[#0891b2] mb-3 uppercase">
                  {safeText(step.title)}
                </h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {safeText(step.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
 {/* Section 2: Heart Care Step by Step end */}

      {/* Section 3: Progress Bars */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Text */}
            <div>
              <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
                Trust Medipulse
              </p>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0891b2] mb-6 leading-tight">
                TRUST MEDIPULSE FOR YOUR LOVED ONES
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-10">
                Medipulse has established a reputation for providing excellent healthcare
                with advanced surgical and rehabilitation support.
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
                src={about?.content_middle_Img || "/about-banner.jpg"}
                alt="Company banner"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
 {/* Section 3: Progress Bars end */}

      {/* Section 4: Team Section start */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
              PROFESSIONAL TEAM
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0891b2] mb-4 leading-tight">
              MEET OUR PROFESSIONAL DEDICATED
              <br />
              EXPERT TEAM
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[
              {
                img: about?.founder_one_img || "/team/team-1.jpg",
                name: about?.founder_one_name,
                role: about?.founder_one_sub,
              },
              {
                img: about?.founder_two_img || "/team/team-2.jpg",
                name: about?.founder_two_name,
                role: about?.founder_two_sub,
              },
              {
                img: about?.founder_three_img || "/team/team-3.jpg",
                name: about?.founder_three_name,
                role: about?.founder_three_sub,
              },
              {
                img: about?.founder_four_img || "/team/team-4.jpg",
                name: about?.founder_four_name,
                role: about?.founder_four_sub,
              },
              {
                img: about?.founder_five_img || "/team/team-5.jpg",
                name: about?.founder_five_name,
                role: about?.founder_five_sub,
              },
              {
                img: about?.founder_six_img || "/team/team-6.jpg",
                name: about?.founder_six_name,
                role: about?.founder_six_sub,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square bg-slate-200 flex items-center justify-center">
                  <Image
                    src={member.img}
                    alt={safeText(member.name) || "Team Member"}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 text-center">
                  <h5 className="text-base font-bold text-[#0891b2] mb-1">
                    {safeText(member.name) || "Team Member"}
                  </h5>
                  <p className="text-sm text-[#b52228]">
                    {safeText(member.role) || "Specialist"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  {/* Section 4: teams secton end */}

     {/* Section 5: Info Banner */}
      <section className="bg-[#b52228] py-10 md:py-14">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d52727] text-center text-white">
          {/* Column 1 */}
          <div className="flex flex-col items-center justify-center py-6 px-4">
            <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl font-extrabold tracking-wide uppercase">
                402, Ground Floor, Near Bagga Link, Patparganj Industrial Area, Delhi-110092 (India)
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 md:w-10 md:h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s8-6.5 8-13a8 8 0 10-16 0c0 6.5 8 13 8 13z"
                />
              </svg>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center justify-center py-6 px-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-xl font-extrabold uppercase">
                 Call Us Now 
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-10 md:h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.517 4.55a1 1 0 01-.272.987l-2.12 2.12a16 16 0 006.364 6.364l2.12-2.12a1 1 0 01.987-.272l4.55 1.517a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className="text-sm md:text-base font-medium mt-1">
                +91 9643344588
              </span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center justify-center py-6 px-4">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 md:w-10 md:h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.24 8.24a6 6 0 10-8.48 8.48L12 18l.24-.24a6 6 0 008.48-8.48z"
                />
              </svg>
              <span className="text-lg md:text-xl font-extrabold uppercase">
                24x7 Our Help Line:
              </span>
            </div>
              <span className="text-sm md:text-base font-medium mt-1">
                +91 9643344588
              </span>
          </div>
        </div>
      </section>
      {/*  Section 5: Info Banner end */}
    </Layout>
  );
};

export default AboutUs;
