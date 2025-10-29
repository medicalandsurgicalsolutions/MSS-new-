import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

// internal imports
import Layout from "@layout/Layout";
import Banner from "@components/banner/Banner";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import FeatureCategory from "@components/category/FeatureCategory";
import AttributeServices from "@services/AttributeServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import ClientSection from "@layout/footer/ClientSection";
import BrandSlider from "@components/brand/BrandSlider";
import Image from "next/image";
import DUMMY_IMAGE from "@components/constants";
import { FaTruck, FaMoneyBillWave, FaShieldAlt, FaPercent } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Home = ({ popularProducts, discountProducts, attributes, allProducts }) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();

  const showProduct = popularProducts.filter((product) => product?.status === "show");
  const DisProduct = discountProducts.filter((product) => product?.status === "show");
  const allProduct = allProducts.filter((product) => product?.status === "show");

  useEffect(() => {
    setIsLoading(false);
  }, [router]);

  const handleMoreInfo = (slug) => {
    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };

  const viewNewArr = () => {
    router.push("search?query=latest");
    setIsLoading(!isLoading);
  };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
                <MainCarousel />
              </div>
            </div>

            {/* Featured Categories */}
            {storeCustomizationSetting?.home?.featured_status && (
              <div className="bg-gray-100 lg:py-10 py-10">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10 flex justify-center">
                    <div className="text-left w-full">
                      <h2 className="text-xl lg:text-3xl">
                        <CMSkeleton
                          count={1}
                          height={30}
                          loading={loading}
                          data={storeCustomizationSetting?.home?.feature_title}
                        />
                      </h2>
                    </div>
                  </div>
                  <FeatureCategory />
                </div>
              </div>
            )}

            {/* Brands */}
            <div className="bg-white lg:py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-2 lg:mb-10 flex items-center justify-between">
                  <h2 className="text-xl lg:text-3xl text-gray-800">
                    <CMSkeleton count={1} height={30} loading={loading} data={{ en: "Brands" }} />
                  </h2>

                  {/* Arrows */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md overflow-hidden w-[95px] h-[48px] mr-1 sm:mr-3 lg:mr-5">
                    <button
                      onClick={() =>
                        document.querySelector(".brand-slider-prev")?.click()
                      }
                      className="group flex-1 h-full flex items-center justify-center 
                        bg-white text-[#0891B2] hover:bg-[#b52228] hover:text-white active:bg-[#9d1d22]
                        transition-all duration-300 border-r border-gray-200"
                    >
                      <IoIosArrowBack className="text-[22px]" />
                    </button>

                    <button
                      onClick={() =>
                        document.querySelector(".brand-slider-next")?.click()
                      }
                      className="group flex-1 h-full flex items-center justify-center 
                        bg-white text-[#0891B2] hover:bg-[#0891B2] hover:text-white active:bg-[#067c99] 
                        transition-all duration-300"
                    >
                      <IoIosArrowForward className="text-[22px]" />
                    </button>
                  </div>
                </div>
                <BrandSlider />
              </div>
            </div>

            {/* Offer Deals */}
            <div className="p-4 bg-gray-100 px-2 sm:px-8 md:px-12 lg:px-10 pt-8">
              <div className="block lg:flex grid-cols-1 gap-4">
                <div className="lg:col-span-1">
                  <h2 className="text-2xl lg:text-3xl mb-4">Offer Deals</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-2 lg:gap-4">
                    {DisProduct?.sort((a, b) => {
                      const discountA =
                        ((a.prices.originalPrice - a.prices.price) / a.prices.originalPrice) * 100;
                      const discountB =
                        ((b.prices.originalPrice - b.prices.price) / b.prices.originalPrice) * 100;
                      return discountB - discountA;
                    })
                      .slice(0, 12)
                      .map((item, index) => (
                        <div
                          onClick={() => handleMoreInfo(item?.slug)}
                          key={index}
                          className="h-[200px] lg:h-[300px] relative cursor-pointer w-full rounded-md flex flex-col items-left"
                        >
                          <div className="h-[200px] relative w-full bg-gray-50">
                            <div className="relative w-full h-[78%] mb-2">
                              <Image
                                src={item?.image[0] || DUMMY_IMAGE}
                                alt={item?.title || "product item"}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <h3 className="text-sm mt-2 font-medium text-left">
                            {`${item?.title?.en.slice(0, 28)}...`}
                          </h3>
                          <p
                            className={`text-sm font-semibold ${
                              item.discount === "Special Offer"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {item?.prices?.originalPrice && item?.prices?.price
                              ? `Min. ${Math.floor(
                                  ((item.prices.originalPrice - item.prices.price) /
                                    item.prices.originalPrice) *
                                    100
                                )}% off`
                              : "No discount"}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* New Arrivals */}
            <div className="bg-white py-8 px-3 sm:px-8 md:px-12 lg:px-10">
              <div className="flex justify-between items-center mb-6">
                <div className="text-left text-xl lg:text-3xl text-gray-800">
                  New Arrivals
                </div>
                <button
                  onClick={viewNewArr}
                  className="group flex-1 h-full flex items-center justify-center 
                   bg-white text-[#0891B2] hover:bg-[#0891B2] hover:text-white active:bg-[#067c99] 
                   transition-all duration-300"
                >
                  <IoIosArrowForward className="text-[22px]" />
                </button>
              </div>

              <div
                className="
                  container mx-auto 
                  grid 
                  grid-cols-2 
                  sm:grid-cols-3 
                  md:grid-cols-4 
                  custom-lg:grid-cols-4 
                  custom-xl:grid-cols-5 
                  gap-2 sm:gap-3 md:gap-4 lg:gap-5
                "
              >
                {allProduct
                  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 12)
                  .map((category, index) => (
                    <div
                      onClick={() => handleMoreInfo(category?.slug)}
                      key={index}
                      className="
                        relative 
                        bg-white/90 
                        hover:bg-white 
                        cursor-pointer 
                        rounded-xl 
                        shadow-sm 
                        hover:shadow-md 
                        overflow-hidden 
                        group 
                        transform 
                        transition-all 
                        duration-200 
                        hover:scale-[1.02] 
                        lg:hover:scale-[1.03]
                        h-40 sm:h-48 md:h-52 lg:h-60
                      "
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={category?.image?.[0] || DUMMY_IMAGE}
                          alt={category?.title?.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 lg:p-4 text-white">
                        <h6 className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold leading-tight">
                          {`${category.title.en.slice(0, 56)}...`}
                        </h6>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Popular Products */}
            {storeCustomizationSetting?.home?.popular_products_status && (
              <div className="bg-gray-50 py-10 mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-10">
                <div className="mb-8 text-left w-full">
                  <h2 className="text-xl lg:text-3xl text-gray-800">
                    <CMSkeleton
                      count={1}
                      height={30}
                      loading={loading}
                      data={storeCustomizationSetting?.home?.popular_title}
                    />
                  </h2>
                </div>

                <div className="w-full">
                  {loading ? (
                    <CMSkeleton count={20} height={20} error={error} loading={loading} />
                  ) : (
                    <div
                      className="
                        grid 
                        grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        custom-lg:grid-cols-4   
                        custom-xl:grid-cols-5   
                        gap-3 sm:gap-4 lg:gap-5
                      "
                    >
                      {showProduct
                        ?.slice(0, storeCustomizationSetting?.home?.popular_product_limit)
                        .map((product) => (
                          <div
                            key={product._id}
                            className="transform transition-transform duration-200 hover:scale-[1.02] lg:hover:scale-[1.03] group"
                          >
                            <div
                              className="
                                bg-white/90 
                                group-hover:bg-white 
                                rounded-xl 
                                shadow-sm 
                                hover:shadow-md 
                                transition-all 
                                duration-200 
                                p-2 sm:p-3 lg:p-4
                              "
                            >
                              <ProductCard product={product} attributes={attributes} />
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Client Section */}
            <ClientSection />

            {/* Info Feature Section */}
            <div className="bg-white py-12">
              <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: <FaTruck />, title: "FREE & FAST SHIPPING", desc: "Orders All Over $100" },
                  { icon: <FaMoneyBillWave />, title: "MONEY BACK GUARANTEE", desc: "With a 30 Day Minimum" },
                  { icon: <FaShieldAlt />, title: "ALL SECURE PAYMENT", desc: "Up to 12 months installments" },
                  { icon: <FaPercent />, title: "SPECIAL OFFER", desc: "Up to 12 months installments" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200 group bg-white p-[2rem]"
                  >
                    <div className="text-[#0891B2] text-3xl mr-4 transition duration-300 group-hover:text-[#b52228]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> {/* ✅ closes min-h-screen */}
        </Layout> {/* ✅ closes Layout inside conditional */}
      )} {/* ✅ closes isLoading conditional */}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),
    AttributeServices.getShowingAttributes(),
  ]);

  return {
    props: {
      popularProducts: data.popularProducts,
      discountProducts: data.discountedProducts,
      cookies: cookies,
      allProducts: data?.allProducts,
      attributes,
    },
  };
};

export default Home;
