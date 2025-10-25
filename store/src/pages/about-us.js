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

      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-screen-2xl mx-auto lg:py-16 py-12 px-3 sm:px-6">
          {/* Hero Section */}
          <div className="grid grid-flow-row lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                <Image
                  width={920}
                  height={750}
                  src={storeCustomizationSetting?.about_us?.content_right_img || "/about-us.jpg" || "/placeholder.svg"}
                  alt="About our company"
                  className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full border border-teal-200">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-semibold text-teal-700">Our Story</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 leading-tight text-balance">
                <CMSkeleton
                  count={1}
                  height={70}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.top_title}
                />
              </h2>

              <div className="space-y-3 text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                <p>
                  <CMSkeleton
                    count={5}
                    height={28}
                    loading={loading}
                    data={storeCustomizationSetting?.about_us?.top_description}
                  />
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-teal-500 hover:shadow-xl transition-all duration-300">
                  {loading ? (
                    <CMSkeleton count={3} height={20} error={error} loading={loading} />
                  ) : (
                    <>
                      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_two_title)}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_two_sub)}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_two_description)}
                      </p>
                    </>
                  )}
                </div>

                <div className="group p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  {loading ? (
                    <CMSkeleton count={3} height={20} error={error} loading={loading} />
                  ) : (
                    <>
                      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_one_title)}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_one_sub)}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_one_description)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 lg:p-10 border-2 border-slate-200 mb-16 shadow-lg">
            <div className="max-w-12xl space-y-5 text-slate-700 leading-relaxed">
              <p className="text-base sm:text-lg font-medium">
                <CMSkeleton
                  count={5}
                  height={28}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.middle_description_one}
                />
              </p>

              <p className="text-base sm:text-lg font-medium">
                <CMSkeleton
                  count={8}
                  height={28}
                  error={error}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.middle_description_two}
                />
              </p>
            </div>
          </div>

          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200">
            <Image
              width={1920}
              height={570}
              src={storeCustomizationSetting?.about_us?.content_middle_Img || "/about-banner.jpg" || "/placeholder.svg"}
              alt="Company banner"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white lg:py-16 py-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-2 bg-teal-500/20 rounded-full border border-teal-500/40">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-xs sm:text-sm font-semibold text-teal-300">Leadership Team</span>
              </div>

              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-balance">
                <CMSkeleton
                  count={1}
                  height={70}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.founder_title}
                />
              </h3>

              <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                <CMSkeleton
                  count={3}
                  height={28}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.founder_description}
                />
              </p>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                      <div key={index} className="group flex flex-col items-center justify-center px-2">
                        <div className="relative mb-3 overflow-hidden rounded-2xl border-2 border-slate-700 group-hover:border-[#0891B2] transition-colors flex justify-center">
                          <Image
                            width={300} // You can leave width and height, but class w-auto makes it auto
                            height={300}
                            src={member.img || "/placeholder.svg"}
                            alt={showingTranslateValue(member.name) || "Team member"}
                            className="w-auto h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                          />
                          {/* Colored overlay removed */}
                        </div>
                        <h5 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-[#0891B2] transition-colors text-center">
                          {showingTranslateValue(member.name)}
                        </h5>
                        <p className="text-xs sm:text-sm text-white font-medium text-center">
                          {showingTranslateValue(member.role)}
                        </p>
                      </div>
                    ))}
                  </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
