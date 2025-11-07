import { useEffect, useRef, useState } from "react";
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
  const [openIndex, setOpenIndex] = useState(null);

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
  
  const faqs = [
    {
      q: "What does Medical Surgical Solutions specialize in?",
      a: "Medical Surgical Solutions is dedicated to providing high-quality surgical products and medical supplies to healthcare providers. We offer a wide range of solutions designed to support medical professionals in delivering optimal care in various surgical and clinical settings.",
    },
    {
      q: "Who are the primary clients of Medical Surgical Solutions?",
      a: "Our primary clients include hospitals, surgical centers, clinics, and healthcare professionals across the nation. We work closely with medical practitioners, providing them with top-tier surgical instruments, medical equipment, and supplies.",
    },
    {
      q: "What sets Medical Surgical Solutions apart from other medical suppliers?",
      a: "We differentiate ourselves by focusing on providing only the highest-quality products that meet rigorous standards. Our team is committed to excellent customer service, fast delivery, and personalized solutions tailored to the needs of each healthcare provider. Additionally, our expertise in surgical solutions ensures that our clients receive the best support and advice.",
    },
    {
      q: "How can I place an order with Medical Surgical Solutions?",
      a: "Ordering from Medical Surgical Solutions is simple. You can place orders through our website by browsing our online catalog or by contacting our sales team directly. For large or custom orders, we encourage reaching out to our customer service department for personalized assistance.",
    },
    {
      q: "Can I request specific surgical products or equipment that are not listed on your website?",
      a: "Yes, we can source a wide variety of medical products that may not be available on our website. If you are looking for a specific item, simply reach out to our team, and we will work with our network of suppliers to fulfill your request.",
    },
  ];

  return (
    <Layout
      title="Buy Surgical Instruments & Products in Bulk | Medical & Surgical Solutions"
      description="Buy top-quality surgical instruments and medical products in bulk from Medical & Surgical Solutions. Trusted by hospitals and clinics for reliable, sterile, and affordable healthcare supplies."
    >
      <PageHeader
        headerBg={about?.header_bg}
        title={safeText(showingTranslateValue(about?.title))}
        className="text-white"
      />

      {/* Section 1: About Section */}
      <div className="bg-slate-50">
    <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="grid lg:grid-cols-2 gap-10 mb-6 items-start">
        <div>
         <p className="text-[#b52228] text-2xl sm:text-3xl font-shortheading font-bold tracking-widest mb-2">
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
  <div className="grid lg:grid-cols-2 gap-8 items-stretch">
      {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 text-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 h-full">
    {[
      { number: "11,000+", label: "HAPPY CUSTOMERS" },
      { number: "15,000+", label: "PREMIUM PRODUCTS" },
      { number: "150+", label: "CUSTOMER SUPPORT TEAM" },
      { number: "750+", label: "GLOBAL CLIENTS" },
    ].map((item, i) => (
      <div
        key={i}
        className="group bg-slate-900 text-white py-6 sm:py-8 px-4 border border-slate-800 rounded-lg transition-all duration-300 hover:bg-[#0891b2]"
      >
        <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 transition-colors duration-300">
          {item.number}
        </h4>
        <p className="text-[10px] sm:text-xs font-bold tracking-wide uppercase transition-colors duration-300">
          {item.label}
        </p>
      </div>
    ))}
  </div>

  {/* Image */}
  <div className="w-full h-full overflow-hidden rounded-xl">
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
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-shortheading font-bold text-[#b52228] mb-4 leading-snug">
          Medical & Surgical Solutions -
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
              { icon: <FaCog />, title: "24/7 Customer Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 group transition-all duration-300 p-3 sm:p-4 rounded-xl hover:bg-gray-100"
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

      {/* Section 3: FAQ Section strt */}
      <div className="bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
           
         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0891b2] mb-4 leading-snug">
          FREQUENTLY ASKED QUESTIONS
          </h2>
        
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all ${
                  openIndex === i ? "ring-1 ring-[#0891b2]" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-slate-800 font-semibold cursor-pointer"
                >
                  {item.q}
                  <span
                    className={`ml-2 text-[#0891b2] transform transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`px-4 sm:px-5 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 transition-all duration-300 overflow-hidden ${
                    openIndex === i ? "max-h-96 pb-4 sm:pb-5" : "max-h-0"
                  }`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Section 4: Faq section end */}


      {/* Section 4: Team Section */}
      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#b52228] text-2xl sm:text-3xl font-shortheading font-bold tracking-widest mb-2">
              Professional Team
            </p>

           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0891b2] mb-4 leading-snug">
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
      <section className="bg-[#b52228] py-8 px-6 sm:px-10 lg:px-16 text-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d52727] text-center">

           <div className="flex flex-col items-center justify-center py-6 px-4 space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaMapMarkerAlt className="text-xl sm:text-2xl md:text-3xl" />
              <span className="text-sm sm:text-base font-semibold uppercase">Location</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium"> 402, Ground Floor, Near Bagga Link, Patparganj Industrial Area, Delhi-110092 
                (India)</span>
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
