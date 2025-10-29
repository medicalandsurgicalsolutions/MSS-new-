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
      {/* Header */}
      <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.about_us?.title)}
      />

      {/* About Section */}
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Side Text */}
            <div>
              <p className="text-red-600 font-semibold mb-2 text-sm">
                About Medipluse
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                TRUST MEDIPLUSE FOR YOUR LOVED ONES
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Commodo viverra maecenas accumsan lacus vel facilisis.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-0 text-white font-bold text-center rounded-lg overflow-hidden">
                <div className="bg-[#0A1A35] p-6">
                  <div className="text-3xl">456+</div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    SATISFIED PATIENTS
                  </div>
                </div>
                <div className="bg-[#0A1A35] p-6 border-l border-slate-700">
                  <div className="text-3xl">326+</div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    SUCCESS HEART SURGERY
                  </div>
                </div>
                <div className="bg-[#0A1A35] p-6 border-t border-slate-700">
                  <div className="text-3xl">878+</div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    WORLDWIDE BRANCHES
                  </div>
                </div>
                <div className="bg-[#0A1A35] p-6 border-l border-t border-slate-700">
                  <div className="text-3xl">750+</div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    SUPPORT TEAM
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="flex justify-center">
              <Image
                width={900}
                height={650}
                src={
                  storeCustomizationSetting?.about_us?.content_right_img ||
                  "/about-us.jpg"
                }
                alt="About Us"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step Section */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-red-600 font-semibold mb-2 text-sm">
            Cardiology Steps
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-10">
            HEART CARE CARDIOLOGY STEP BY STEP
          </h3>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl font-bold text-red-600 mb-3">01</div>
              <div className="text-xl font-bold mb-2 text-slate-800">
                SURF MEDIPLUSE WEBSITE
              </div>
              <p className="text-slate-600 text-sm">
                Search us on your browser & get all the informations of our
                hospital.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl font-bold text-red-600 mb-3">02</div>
              <div className="text-xl font-bold mb-2 text-slate-800">
                EXPERT’S TREATMENT
              </div>
              <p className="text-slate-600 text-sm">
                Expertise treatments by our expert team and be forever healthy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-xl border border-slate-200 bg-red-600 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold mb-3">03</div>
              <div className="text-xl font-bold mb-2">BOOK AN APPOINTMENT</div>
              <p className="text-sm opacity-90">
                Regarding your health issue, book an appointment with our
                experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-red-400 font-semibold mb-2 text-sm">
              Leadership Team
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <CMSkeleton
                count={1}
                height={70}
                loading={loading}
                data={storeCustomizationSetting?.about_us?.founder_title}
              />
            </h3>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              <CMSkeleton
                count={3}
                height={28}
                loading={loading}
                data={storeCustomizationSetting?.about_us?.founder_description}
              />
            </p>
          </div>

          {/* Team Members */}
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
                className="group flex flex-col items-center text-center"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl border-2 border-slate-700 group-hover:border-red-500 transition-colors flex justify-center">
                  <Image
                    width={300}
                    height={300}
                    src={member.img || "/placeholder.svg"}
                    alt={showingTranslateValue(member.name) || "Team member"}
                    className="rounded-2xl w-auto h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h5 className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                  {showingTranslateValue(member.name)}
                </h5>
                <p className="text-sm text-slate-300">
                  {showingTranslateValue(member.role)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
