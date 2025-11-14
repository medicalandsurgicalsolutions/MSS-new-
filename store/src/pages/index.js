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
import OurPartner from "@layout/footer/OurPartner";
import ClientSection from "@layout/footer/ClientSection";
import BrandSlider from "@components/brand/BrandSlider";
import Image from "next/image";
import DUMMY_IMAGE from "@components/constants";
import { FaTruck, FaMoneyBillWave, FaShieldAlt, FaPercent } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Head from "next/head";

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
     <Head>
      <meta name="google-site-verification" content="IBBg0v-nPS4AjAlu_2W3k_nnDeTEvt2dmccu43vojiQ" />
     <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FQFCKJZ2DF"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-FQFCKJZ2DF');
        </script>
    </Head>
  
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

            {/* Feature Category */}
            {storeCustomizationSetting?.home?.featured_status && (
              <div className="bg-gray-100 py-8">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10">
                    <h2 className="text-xl lg:text-3xl">
                      <CMSkeleton
                        count={1}
                        height={30}
                        loading={loading}
                        data={storeCustomizationSetting?.home?.feature_title}
                      />
                    </h2>
                  </div>
                  <FeatureCategory />
                </div>
              </div>
            )}

            {/* Brands Section */}
            <div className="bg-white lg:py-8">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-2 lg:mb-10 flex items-center justify-between">   
                  <h2 className="text-xl lg:text-3xl text-gray-800">
                    <CMSkeleton count={1} height={30} loading={loading} data={{ en: "Brands" }} />
                  </h2>
                  <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md overflow-hidden w-[95px] h-[48px] mr-1 sm:mr-3 lg:mr-5">
                    <button
                      onClick={() => document.querySelector(".brand-slider-prev")?.click()}
                      className="group flex-1 h-full flex items-center justify-center 
                        bg-white text-[#0891B2] hover:bg-[#b52228] hover:text-white transition-all duration-300 border-r border-gray-200"
                    >
                      <IoIosArrowBack className="text-[22px]" />
                    </button>

                    <button
                      onClick={() => document.querySelector(".brand-slider-next")?.click()}
                      className="group flex-1 h-full flex items-center justify-center 
                        bg-white text-[#0891B2] hover:bg-[#0891B2] hover:text-white transition-all duration-300"
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
              <h2 className="text-2xl lg:text-3xl mb-4">Offer Deals</h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4"
              >
                {DisProduct.sort((a, b) => {
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
                      className="relative cursor-pointer bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="relative w-full h-56">
                        <Image
                          src={item?.image[0] || DUMMY_IMAGE}
                          alt={item?.title || "product item"}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-left truncate">
                          {item?.title?.en}
                        </h3>
                        <p
                          className={`text-sm font-semibold ${
                            item.discount === "Special Offer" ? "text-red-600" : "text-green-600"
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
                    </div>
                  ))}
              </div>
            </div>

            {/* New Arrivals */}
            <div className="bg-white py-8 px-3 sm:px-8 md:px-12 lg:px-10">
              <div className="flex justify-between items-center mb-6">
                <div className="text-left text-xl lg:text-3xl text-gray-800">New Arrivals</div>
                <div className="flex gap-2">
                  <button
                    onClick={viewNewArr}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#0891B2] hover:bg-[#0891B2] hover:text-white transition-all duration-300"
                  >
                    <IoIosArrowForward className="text-[22px]" />
                  </button>
                </div>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4"
              >
                {allProduct
                  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 12)
                  .map((category, index) => (
                    <div
                      onClick={() => handleMoreInfo(category?.slug)}
                      key={index}
                      className="relative bg-white/90 hover:bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md overflow-hidden group transform transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="relative w-full h-56">
                        <Image
                          src={category?.image?.[0] || DUMMY_IMAGE}
                          alt={category?.title?.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                        <h6 className="text-sm font-semibold leading-tight truncate">
                          {category.title.en}
                        </h6>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Popular Products */}
            {storeCustomizationSetting?.home?.popular_products_status && (
              <div className="bg-gray-50 py-8 mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-10">
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

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                >
                  {showProduct
                    ?.slice(0, storeCustomizationSetting?.home?.popular_product_limit)
                    .map((product) => (
                      <div key={product._id} className="transform transition duration-200 hover:scale-[1.02]">
                        <ProductCard product={product} attributes={attributes} />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Discounted Products */}
            {storeCustomizationSetting?.home?.discount_product_status &&
              DisProduct?.length > 0 && (
                <div className="bg-white py-8 mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10">
                    <h2 className="text-xl lg:text-3xl text-gray-800">
                      <CMSkeleton
                        count={1}
                        height={30}
                        loading={loading}
                        data={storeCustomizationSetting?.home?.latest_discount_title}
                      />
                    </h2>
                  </div>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                  >
                    {DisProduct.slice(
                      0,
                      storeCustomizationSetting?.home?.latest_discount_product_limit
                    ).map((product) => (
                      <ProductCard key={product._id} product={product} attributes={attributes} />
                    ))}
                  </div>
                </div>
              )}
          </div>

          <ClientSection />

          {/* Info Feature Section */}
          <div className="bg-white py-8">
              <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: FaTruck, title: "WORLDWIDE SHIPPING" },
                  { Icon: FaMoneyBillWave, title: "SECURE PAYMENTS" },
                  { Icon: FaShieldAlt, title: "ONLINE CUSTOMER SUPPORT" },
                  { Icon: FaPercent, title: "SPECIAL OFFERS" },
                ].map((item, idx) => {
                  const IconComp = item.Icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200 bg-white group"
                    >
                      {/* icon receives color via currentColor and will change on group hover */}
                      <div className="text-[#0891B2] text-3xl mr-4 transition duration-300 group-hover:text-[#b52228]">
                        <IconComp />
                      </div>
            
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-[11px]">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        {/* Info Feature Section end */}
        </Layout>
      )}
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
      cookies,
      allProducts: data?.allProducts,
      attributes,
    },
  };
};

export default Home;
