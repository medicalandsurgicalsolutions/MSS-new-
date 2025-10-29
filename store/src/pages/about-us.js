import Image from "next/image"

// internal imports
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
      {/* Page Header */}
      <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.about_us?.title)}
      />

      {/* === HERO SECTION === */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div>
            <p className="text-brand-red font-semibold uppercase text-sm tracking-wide mb-2">
              About Medipluse
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mb-6 leading-tight">
              TRUST MEDIPLUSE FOR YOUR LOVED ONES
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Commodo viverra maecenas accumsan lacus vel facilisis.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200">
              {[
                { num: "456+", label: "SATISFIED PATIENTS" },
                { num: "326+", label: "SUCCESS HEART SURGERY" },
                { num: "878+", label: "WORLDWIDE BRANCHES" },
                { num: "750+", label: "SUPPORT TEAM" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-brand-navy text-white text-center py-8 border-[0.5px] border-slate-700 hover:bg-brand-red transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold">{item.num}</div>
                  <div className="text-xs font-medium text-slate-300 mt-2 tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/20 to-brand-navy/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
            <Image
              width={900}
              height={650}
              src={
                storeCustomizationSetting?.about_us?.content_right_img ||
                "/about-us.jpg"
              }
              alt="About Us"
              className="relative rounded-3xl shadow-xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* === STEP SECTION === */}
      <section className="bg-slate-50 py-20 px-4 md:px-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-brand-red font-semibold uppercase text-sm tracking-wide mb-3">
            Cardiology Steps
          </p>
          <h3 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-12">
            HEART CARE CARDIOLOGY STEP BY STEP
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "SURF MEDIPLUSE WEBSITE",
                desc: "Search us on your browser & get all the informations of our hospital.",
              },
              {
                step: "02",
                title: "EXPERT’S TREATMENT",
                desc: "Expert treatments by our team and be forever healthy.",
              },
              {
                step: "03",
                title: "BOOK AN APPOINTMENT",
                desc: "Regarding your health issue, book an appointment with our experts.",
                highlight: true,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`p-10 rounded-2xl shadow-md border ${
                  card.highlight
                    ? "bg-brand-red text-white border-brand-red hover:bg-brand-navy"
                    : "bg-white border-slate-200 hover:shadow-lg hover:border-brand-red"
                } transition-all duration-300`}
              >
                <div
                  className={`text-4xl font-bold mb-4 ${
                    !card.highlight ? "text-brand-red" : ""
                  }`}
                >
                  {card.step}
                </div>
                <div className="text-xl font-bold mb-2">{card.title}</div>
                <p
                  className={`text-sm ${
                    card.highlight ? "text-slate-100" : "text-slate-600"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === LEADERSHIP TEAM === */}
      <section className="relative bg-gradient-to-b from-brand-navy via-slate-900 to-brand-navy text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-red font-semibold uppercase text-sm tracking-wide mb-3">
            Leadership Team
          </p>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6">
            <CMSkeleton
              count={1}
              height={70}
              loading={loading}
              data={storeCustomizationSetting?.about_us?.founder_title}
            />
          </h3>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-14 leading-relaxed">
            <CMSkeleton
              count={3}
              height={28}
              loading={loading}
              data={storeCustomizationSetting?.about_us?.founder_description}
            />
          </p>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ].map((member, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center hover:scale-105 transition-transform duration-500"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl border-2 border-slate-700 group-hover:border-brand-red transition-all duration-300 flex justify-center">
                  <Image
                    width={300}
                    height={300}
                    src={member.img || "/placeholder.svg"}
                    alt={showingTranslateValue(member.name) || "Team member"}
                    className="rounded-2xl object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h5 className="text-lg font-bold text-white mb-1 group-hover:text-brand-red transition-colors">
                  {showingTranslateValue(member.name)}
                </h5>
                <p className="text-sm text-slate-300">
                  {showingTranslateValue(member.role)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AboutUs
