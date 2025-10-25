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
        <div className="max-w-screen-2xl mx-auto lg:py-28 py-20 px-4 sm:px-10">
          {/* Hero Section */}
          <div className="grid grid-flow-row lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-28">
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
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full border border-teal-200">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-sm font-semibold text-teal-700">Our Story</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight text-balance">
                <CMSkeleton
                  count={1}
                  height={70}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.top_title}
                />
              </h2>

              <div className="space-y-5 text-lg text-slate-600 leading-relaxed mb-10">
                <p>
                  <CMSkeleton
                    count={5}
                    height={28}
                    loading={loading}
                    data={storeCustomizationSetting?.about_us?.top_description}
                  />
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="group p-7 bg-white border-2 border-slate-200 rounded-2xl hover:border-teal-500 hover:shadow-xl transition-all duration-300">
                  {loading ? (
                    <CMSkeleton count={3} height={20} error={error} loading={loading} />
                  ) : (
                    <>
                      <div className="text-5xl font-bold bg-gradient-to-br from-teal-600 to-blue-600 bg-clip-text text-transparent mb-3">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_two_title)}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_two_sub)}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_two_description)}
                      </p>
                    </>
                  )}
                </div>

                <div className="group p-7 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  {loading ? (
                    <CMSkeleton count={3} height={20} error={error} loading={loading} />
                  ) : (
                    <>
                      <div className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_one_title)}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_one_sub)}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {showingTranslateValue(storeCustomizationSetting?.about_us?.card_one_description)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 lg:p-16 border-2 border-slate-200 mb-28 shadow-lg">
            <div className="max-w-4xl space-y-7 text-slate-700 leading-relaxed">
              <p className="text-lg font-medium">
                <CMSkeleton
                  count={5}
                  height={28}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.middle_description_one}
                />
              </p>

              <p className="text-lg font-medium">
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

          <div className="mb-28 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200">
            <Image
              width={1920}
              height={570}
              src={storeCustomizationSetting?.about_us?.content_middle_Img || "/about-banner.jpg" || "/placeholder.svg"}
              alt="Company banner"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white lg:py-28 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10">
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-teal-500/20 rounded-full border border-teal-500/40">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm font-semibold text-teal-300">Leadership Team</span>
              </div>

              <h3 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
                <CMSkeleton
                  count={1}
                  height={70}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.founder_title}
                />
              </h3>

              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                <CMSkeleton
                  count={3}
                  height={28}
                  loading={loading}
                  data={storeCustomizationSetting?.about_us?.founder_description}
                />
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-3 xl:gap-10">
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
                <div key={index} className="group">
                  <div className="relative mb-5 overflow-hidden rounded-2xl border-2 border-slate-700 group-hover:border-teal-500 transition-colors">
                    <Image
                      width={420}
                      height={420}
                      src={member.img || "/placeholder.svg"}
                      alt={showingTranslateValue(member.name) || "Team member"}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  </div>
                  <h5 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {showingTranslateValue(member.name)}
                  </h5>
                  <p className="text-sm text-teal-300 font-medium">{showingTranslateValue(member.role)}</p>
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
