import Image from "next/image";

// internal imports
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { FaMapMarkerAlt, FaPhoneAlt, FaHeartbeat } from "react-icons/fa";
import { FaUsers, FaGift, FaTag, FaGlobe, FaLeaf, FaCog } from "react-icons/fa";

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

      {/* Section 2: section two */}
     <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-[#b52228] mb-3">
          Medical & Surgical Solutions –
        </h2>
        <p className="text-[#0891b2] mb-16">
          India’s #1 Online Platform for Medical Equipment, Surgical Instruments, and Healthcare Products.
        </p>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {[
            { icon: <FaUsers />, title: "Worldwide Clients" },
            { icon: <FaGift />, title: "Special Discounts" },
            { icon: <FaTag />, title: "Seasonal Offers" },
            { icon: <FaGlobe />, title: "International Supply" },
            { icon: <FaLeaf />, title: "Eco Friendly" },
            { icon: <FaCog />, title: "24/7 Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 group transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-black text-3xl">{item.icon}</div>

              {/* Text */}
              <h4 className="text-[#0891b2] font-semibold text-lg group-hover:text-[#b52228] transition-colors duration-300">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
 {/* Section 2: section two end */}

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
      <section className="bg-[#b52228] py-5 md:py-6 px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d52727] text-center text-white">
        
        {/* Column 1 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <div className="flex items-center gap-4 text-center">
           <FaMapMarkerAlt className="text-4xl md:text-5xl flex-shrink-0" />
            <span className="text-base md:text-lg font-semibold tracking-wide uppercase">
              402, Ground Floor, Near Bagga Link, Patparganj Industrial Area, Delhi-110092 (India)
            </span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
           <FaPhoneAlt className="text-2xl md:text-3xl" />
              <span className="text-base md:text-lg font-semibold uppercase">
                Call Us Now
              </span>
             
            </div>
            <span className="text-sm md:text-base font-medium mt-1">
              +91 9643344588
            </span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-2xl md:text-3xl" />
            <span className="text-base md:text-lg font-semibold uppercase">
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
