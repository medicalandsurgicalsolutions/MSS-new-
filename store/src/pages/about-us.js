// ======================= src/pages/about-us.js =======================
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
      title="Buy Surgical Instruments & Products in Bulk | Medical & Surgical Solutions"
      description="Buy top-quality surgical instruments and medical products in bulk from Medical & Surgical Solutions. Trusted by hospitals and clinics for reliable, sterile, and affordable healthcare supplies."
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.about_us?.title)}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white font-montserrat">
        <div className="max-w-screen-2xl mx-auto py-16 px-4 sm:px-8 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 transition-all duration-700 ease-in-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b52228]/10 border border-[#b52228]/30">
              <div className="w-2 h-2 bg-[#b52228] rounded-full"></div>
              <span className="text-sm font-semibold text-[#b52228]">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0891b2] leading-tight">
              <CMSkeleton
                count={1}
                height={70}
                loading={loading}
                data={storeCustomizationSetting?.about_us?.top_title}
              />
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              <CMSkeleton
                count={5}
                height={28}
                loading={loading}
                data={storeCustomizationSetting?.about_us?.top_description}
              />
            </p>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-5 pt-4">
              {[
                {
                  title: storeCustomizationSetting?.about_us?.card_one_title,
                  sub: storeCustomizationSetting?.about_us?.card_one_sub,
                  desc: storeCustomizationSetting?.about_us?.card_one_description,
                },
                {
                  title: storeCustomizationSetting?.about_us?.card_two_title,
                  sub: storeCustomizationSetting?.about_us?.card_two_sub,
                  desc: storeCustomizationSetting?.about_us?.card_two_description,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group bg-[#0f172a] border border-slate-800 text-white rounded-2xl p-6 transition-all duration-300 hover:border-[#b52228] hover:shadow-lg"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-[#0891b2] mb-2">
                    {showingTranslateValue(card.title)}
                  </div>
                  <h4 className="text-sm font-semibold text-white/80 mb-1 group-hover:text-[#b52228] transition-colors">
                    {showingTranslateValue(card.sub)}
                  </h4>
                  <p className="text-xs text-white/70">
                    {showingTranslateValue(card.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative transition-all duration-700 ease-in-out">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#b52228]/10 to-[#0891b2]/10 rounded-3xl blur-2xl"></div>
            <Image
              width={920}
              height={750}
              src={
                storeCustomizationSetting?.about_us?.content_right_img ||
                "/about-us.jpg"
              }
              alt="About our company"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ================= MIDDLE TEXT SECTION ================= */}
      <section className="bg-gradient-to-br from-white to-slate-50 py-16">
        <div className="max-w-screen-2xl mx-auto p-6 lg:p-10 border-2 border-slate-200 rounded-3xl shadow-lg space-y-6 text-slate-700">
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            <CMSkeleton
              count={5}
              height={28}
              loading={loading}
              data={storeCustomizationSetting?.about_us?.middle_description_one}
            />
          </p>
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            <CMSkeleton
              count={8}
              height={28}
              error={error}
              loading={loading}
              data={storeCustomizationSetting?.about_us?.middle_description_two}
            />
          </p>
        </div>
      </section>

      {/* ================= BANNER IMAGE ================= */}
      <div className="max-w-screen-2xl mx-auto mb-20 px-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200">
          <Image
            width={1920}
            height={570}
            src={
              storeCustomizationSetting?.about_us?.content_middle_Img ||
              "/about-banner.jpg"
            }
            alt="Company banner"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* ================= LEADERSHIP TEAM ================= */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b52228] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0891b2] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-2 bg-[#b52228]/20 rounded-full border border-[#b52228]/40">
              <div className="w-2 h-2 bg-[#b52228] rounded-full"></div>
              <span className="text-xs sm:text-sm font-semibold text-[#b52228]">
                Leadership Team
              </span>
            </div>

            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-[#0891b2]">
              <CMSkeleton
                count={1}
                height={70}
                loading={loading}
                data={storeCustomizationSetting?.about_us?.founder_title}
              />
            </h3>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              <CMSkeleton
                count={3}
                height={28}
                loading={loading}
                data={storeCustomizationSetting?.about_us?.founder_description}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img:
                  storeCustomizationSetting?.about_us?.founder_one_img ||
                  "/team/team-1.jpg",
                name: storeCustomizationSetting?.about_us?.founder_one_name,
                role: storeCustomizationSetting?.about_us?.founder_one_sub,
              },
              {
                img:
                  storeCustomizationSetting?.about_us?.founder_two_img ||
                  "/team/team-2.jpg",
                name: storeCustomizationSetting?.about_us?.founder_two_name,
                role: storeCustomizationSetting?.about_us?.founder_two_sub,
              },
              {
                img:
                  storeCustomizationSetting?.about_us?.founder_three_img ||
                  "/team/team-3.jpg",
                name: storeCustomizationSetting?.about_us?.founder_three_name,
                role: storeCustomizationSetting?.about_us?.founder_three_sub,
              },
              {
                img:
                  storeCustomizationSetting?.about_us?.founder_four_img ||
                  "/team/team-4.jpg",
                name: storeCustomizationSetting?.about_us?.founder_four_name,
                role: storeCustomizationSetting?.about_us?.founder_four_sub,
              },
              {
                img:
                  storeCustomizationSetting?.about_us?.founder_five_img ||
                  "/team/team-5.jpg",
                name: storeCustomizationSetting?.about_us?.founder_five_name,
                role: storeCustomizationSetting?.about_us?.founder_five_sub,
              },
              {
                img:
                  storeCustomizationSetting?.about_us?.founder_six_img ||
                  "/team/team-6.jpg",
                name: storeCustomizationSetting?.about_us?.founder_six_name,
                role: storeCustomizationSetting?.about_us?.founder_six_sub,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="group flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.03]"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl border-2 border-slate-700 group-hover:border-[#b52228] transition-all duration-500">
                  <Image
                    width={320}
                    height={320}
                    src={member.img || "/placeholder.svg"}
                    alt={showingTranslateValue(member.name) || 'Team member'}
                    className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h5 className="text-lg font-bold text-white mb-1 group-hover:text-[#0891b2] transition-colors">
                  {showingTranslateValue(member.name)}
                </h5>
                <p className="text-sm text-white/70 font-medium">
                  {showingTranslateValue(member.role)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
