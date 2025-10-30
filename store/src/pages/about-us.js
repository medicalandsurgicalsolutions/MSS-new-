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

  const safeText = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.en || Object.values(val)[0] || "";
    return String(val);
  };

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
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-10 mb-12 items-start">
            <div>
              <p className="text-[#b52228] text-sm font-semibold uppercase tracking-widest mb-2">
                About Medical & Surgical Solutions
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0891b2] mb-4 leading-snug">
                OUR TRUSTED PARTNER IN HEALTHCARE EXCELLENCE
              </h2>
            </div>
            <div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                Medical & Surgical Solutions delivers trusted, high-quality medical
                equipment and products to healthcare professionals. Our innovative
                range ensures precision, reliability, and safety, empowering
                excellence in patient care across hospitals and institutions.
              </p>
            </div>
          </div>

          {/* Stats + Image */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 text-center">
              {[
                { number: "1100+", label: "HAPPY CUSTOMERS" },
                { number: "1500+", label: "PREMIUM PRODUCTS" },
                { number: "150+", label: "CUSTOMER TEAM" },
                { number: "750+", label: "SUPPORT TEAM" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-900 text-white py-6 sm:py-8 px-4 border border-slate-800 rounded-lg"
                >
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                    {item.number}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-xl">
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

      {/* Section 2 */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b52228] mb-3">
            Medical & Surgical Solutions –
          </h2>
          <p className="text-[#0891b2] text-sm sm:text-base mb-10 sm:mb-16">
            India’s #1 Online Platform for Medical Equipment, Surgical Instruments, and Healthcare Products.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
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
                className="flex items-center gap-4 group transition-all duration-300 p-3 sm:p-4 rounded-xl hover:bg-gray-50"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-[#0891b2] rounded-lg text-black text-2xl sm:text-3xl group-hover:border-[#b52228] transition-colors duration-300">
                  {item.icon}
                </div>
                <h4 className="text-[#0891b2] font-semibold text-base sm:text-lg group-hover:text-[#b52228] transition-colors duration-300">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Progress Bars */}
      <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-[#b52228] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
              Trust Medipulse
            </p>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0891b2] mb-6 leading-tight">
              TRUST MEDIPULSE FOR YOUR LOVED ONES
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10">
              Medipulse has established a reputation for providing excellent healthcare
              with advanced surgical and rehabilitation support.
            </p>

            <div className="space-y-5">
              {[
                { label: "Heart Surgery", value: 90 },
                { label: "Manage Treatment", value: 70 },
                { label: "Rehabilitation", value: 80 },
                { label: "Heart Transplant", value: 85 },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3">
                    <div
                      className="h-2 sm:h-3 bg-[#b52228] rounded-full transition-all duration-500"
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="w-full h-64 sm:h-80 lg:h-[420px]">
            <Image
              src={about?.content_middle_Img || "/about-banner.jpg"}
              alt="Company banner"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Team Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#b52228] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
              Professional Team
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0891b2] leading-tight">
              MEET OUR PROFESSIONAL DEDICATED EXPERT TEAM
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 sm:gap-6">
            {[
              { img: about?.founder_one_img || "/team/team-1.jpg", name: about?.founder_one_name, role: about?.founder_one_sub },
              { img: about?.founder_two_img || "/team/team-2.jpg", name: about?.founder_two_name, role: about?.founder_two_sub },
              { img: about?.founder_three_img || "/team/team-3.jpg", name: about?.founder_three_name, role: about?.founder_three_sub },
              { img: about?.founder_four_img || "/team/team-4.jpg", name: about?.founder_four_name, role: about?.founder_four_sub },
              { img: about?.founder_five_img || "/team/team-5.jpg", name: about?.founder_five_name, role: about?.founder_five_sub },
              { img: about?.founder_six_img || "/team/team-6.jpg", name: about?.founder_six_name, role: about?.founder_six_sub },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square">
                  <Image
                    src={member.img}
                    alt={safeText(member.name) || "Team Member"}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 sm:p-5 text-center">
                  <h5 className="text-sm sm:text-base font-bold text-[#0891b2] mb-1">
                    {safeText(member.name) || "Team Member"}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#b52228]">
                    {safeText(member.role) || "Specialist"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: Info Banner */}
      <section className="bg-[#b52228] py-10 px-6 sm:px-10 lg:px-16 text-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d52727] text-center">
          <div className="flex flex-col items-center justify-center py-6 px-4 space-y-3">
            <FaMapMarkerAlt className="text-4xl md:text-5xl flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base font-medium">
              402, Ground Floor, Near Bagga Link, Patparganj Industrial Area, Delhi-110092 (India)
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-6 px-4 space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaPhoneAlt className="text-xl sm:text-2xl md:text-3xl" />
              <span className="text-sm sm:text-base font-semibold uppercase">Call Us Now</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium">+91 9643344588</span>
          </div>

          <div className="flex flex-col items-center justify-center py-6 px-4 space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaHeartbeat className="text-xl sm:text-2xl md:text-3xl" />
              <span className="text-sm sm:text-base font-semibold uppercase">24x7 Our Help Line:</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium">+91 9643344588</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
