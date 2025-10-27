import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

//internal import
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
import ClientServices from "@services/ClientServices";
import BrandSlider from "@components/brand/BrandSlider";
import Brands from "@components/brand/Brands";
import Image from "next/image";
import DUMMY_IMAGE from "@components/constants";
import { FaTruck, FaMoneyBillWave, FaShieldAlt, FaPercent } from "react-icons/fa";


const Home = ({
  popularProducts,
  discountProducts,
  attributes,
  allProducts,
}) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();

  // console.log("storeCustomizationSetting", storeCustomizationSetting);

  const showProduct = popularProducts.filter(
    (product) => product?.status === "show"
  );
  const DisProduct = discountProducts.filter(
    (product) => product?.status === "show"
  );
  const allProduct = allProducts.filter(
    (product) => product?.status === "show"
  );

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
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
            {/* <StickyCart /> */}
            <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
                <div className="flex w-full">
                  {/* <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5"> */}
                  <MainCarousel />
                  {/* </div> */}
                  {/* <div className="w-full hidden lg:flex h-96">
                    <OfferCard />
                  </div> */}
                </div>
                {/* {storeCustomizationSetting?.home?.promotion_banner_status && (
                  <div className="bg-orange-100 px-2 lg:px-10 py-6 rounded-lg mt-6">
                    <Banner />
                  </div>
                )} */}
              </div>
            </div>

            {/* feature category's */}
            {storeCustomizationSetting?.home?.featured_status && (
              <div className="bg-gray-100 lg:py-10 py-10">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10 flex justify-center">
                    <div className="text-left w-full">
                      <h2 className="text-xl lg:text-3xl ">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          data={storeCustomizationSetting?.home?.feature_title}
                        />
                      </h2>
                      {/* <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={4}
                          height={10}
                          error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home?.feature_description
                          }
                        />
                      </p> */}
                    </div>
                  </div>
                  <FeatureCategory />
                </div>
              </div>
            )}

            {/* Brands category */}

            <div className="bg-gray-100 lg:py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-2 lg:mb-10 flex justify-center">
                  <div className="text-left w-full">
                    <h2 className="text-xl lg:text-3xl ">
                      <CMSkeleton
                        count={1}
                        height={30}
                        loading={loading}
                        data={{ en: "Brands" }}
                      />
                    </h2>
                  </div>
                </div>
                <BrandSlider />
              </div>
            </div>

            {/* <div className="bg-gray-100 lg:py-10 py-10">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10 flex justify-center">
                    <div className="text-left w-full">
                      <h2 className="text-xl lg:text-3xl ">
                        Top Brands
                        <CMSkeleton
                          count={1}
                          height={30}
                          error={error}
                          loading={loading}
                          data={storeCustomizationSetting?.home?.feature_title}
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={4}
                          height={10}
                          error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home?.feature_description
                          }
                        />
                      </p>
                    </div>
                  </div>
                  <Brands />
                </div>
              </div> */}

            <div className="p-4 bg-gray-100 px-2 sm:px-8 md:px-12 lg:px-10 pt-8">
              <div className="block lg:flex grid-cols-1 gap-4">
                {/* Left Section */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl lg:text-3xl mb-4">Offer Deals</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-2 lg:gap-4">
                    {DisProduct?.sort((a, b) => {
                      const discountA =
                        ((a.prices.originalPrice - a.prices.price) /
                          a.prices.originalPrice) *
                        100;
                      const discountB =
                        ((b.prices.originalPrice - b.prices.price) /
                          b.prices.originalPrice) *
                        100;
                      return discountB - discountA; // Sort in descending order of discount percentage
                    })
                      .slice(0, 12) // Take the top 4 discounted products
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
                          <h3 className="text-sm mt-2 font-medium text-left">{`${item?.title?.en.slice(
                            0,
                            28
                          )}...`}</h3>
                          <p
                            className={`text-sm font-semibold ${
                              item.discount === "Special Offer"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {item?.prices?.originalPrice && item?.prices?.price
                              ? `Min. ${Math.floor(
                                  ((item.prices.originalPrice -
                                    item.prices.price) /
                                    item.prices.originalPrice) *
                                    100
                                )}% off`
                              : "No discount"}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Right Section */}
                {/* <div className="bg-blue-500 hidden lg:block rounded-md text-white mt-12 mb-12 justify-center items-center w-[432px] p-6">
        <img
          src={""}
          alt={"image"}
          className="object-contain h-[78%] w-full mb-2"
        />
      <h3 className="text-xl font-bold mb-2">Stay Fit & Active</h3>
      <p className="text-sm text-center mb-4">
        Shop from our Fitness & Sports Equipment Collection
      </p>
      <button className="bg-white text-blue-500 px-4 py-2 rounded font-medium hover:bg-blue-100">
        Explore &rarr;
      </button>
    </div> */}
              </div>
            </div>

            <div className="bg-gray-100 py-8 px-2 sm:px-8 md:px-12 lg:px-10">
              <div className="flex justify-between">
                <div className="text-left mb-4 text-2xl lg:text-3xl">
                  New Arrivals
                </div>
                <div
                  className="text-right cursor-pointer mb-4 text-2xl lg:text-3xl relative"
                  onClick={viewNewArr}
                >
                  <div className="text-right text-xl lg:text-xl rounded-sm relative bg-cyan-600 flex items-center justify-center text-white h-8 w-10 mx-auto">
                    →
                  </div>
                </div>
              </div>
              <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2 lg:gap-4">
                {allProduct
                  ?.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  .slice(0, 12)
                  .map((category, index) => (
                    <div
                      onClick={() => handleMoreInfo(category?.slug)}
                      key={index}
                      className="relative bg-white cursor-pointer rounded-lg h-40 lg:h-60 shadow-md overflow-hidden group"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={category?.image[0] || DUMMY_IMAGE}
                          alt={category?.title?.en}
                          fill // ✅ Replaces layout="fill"
                          className="object-cover" // ✅ Tailwind class replaces objectFit="cover"
                        />
                      </div>

                      <div className="absolute top-0 left-0 w-full h-full"></div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2 lg:p-4 text-white">
                        <h6 className="text-[10px] lg:text-[14px] font-bold">{`${category.title.en.slice(
                          0,
                          56
                        )}...`}</h6>
                        {/* <p className="text-sm">{category.subtitle}</p> */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* popular products */}
            {storeCustomizationSetting?.home?.popular_products_status && (
              <div className="bg-gray-50 lg:py-10 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-left w-full">
                    <h2 className="text-xl lg:text-3xl ">
                      <CMSkeleton
                        count={1}
                        height={30}
                        // error={error}
                        loading={loading}
                        data={storeCustomizationSetting?.home?.popular_title}
                      />
                    </h2>
                    {/* <p className="text-base font-sans text-gray-600 leading-6">
                      <CMSkeleton
                        count={5}
                        height={10}
                        error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home?.popular_description
                        }
                      />
                    </p> */}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {showProduct
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              attributes={attributes}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* promotional banner card */}
            {/* {storeCustomizationSetting?.home?.delivery_status && (
              <div className="block mx-auto max-w-screen-2xl">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                  <div className="lg:p-16 p-6 bg-cyan-600 shadow-sm border rounded-lg">
                    <CardTwo />
                  </div>
                </div>
              </div>
            )} */}

            {/* discounted products */}
            {storeCustomizationSetting?.home?.discount_product_status &&
              DisProduct?.length > 0 && (
                <div
                  id="discount"
                  className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
                >
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2  font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_title
                          }
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={5}
                          height={20}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_description
                          }
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                      {loading ? (
                        <CMSkeleton
                          count={20}
                          height={20}
                          error={error}
                          loading={loading}
                        />
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                          {DisProduct?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.latest_discount_product_limit
                          ).map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              attributes={attributes}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
  
          {/* < OurPartner /> */}
          <ClientSection />


              {/* Info Feature Section start */}
              <div className="bg-white py-12">
                <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
                  {/* Feature Card */}
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
              {/* Info Feature Section end */}

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
      cookies: cookies,
      allProducts: data?.allProducts,
      attributes,
    },
  };
};

export default Home;
