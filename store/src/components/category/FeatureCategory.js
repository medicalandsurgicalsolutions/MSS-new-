import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation , Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { SidebarContext } from "@context/SidebarContext";
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import DUMMY_IMAGE from "@components/constants";
import { FaCapsules } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const { data, error, loading } = useAsync(CategoryServices.getShowingCategory);

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <div className="relative w-full">
          {/* Custom Navigation Buttons */}
          <div className="absolute top-[-65px] right-0 z-10 flex items-center">
            <div className="flex bg-white border border-gray-200 rounded-full shadow-md overflow-hidden w-[95px] h-[48px] items-center justify-center">
              
              {/* Prev Button (Red hover) */}
              <button
                ref={swiperNavPrevRef}
                className="group swiper-button-prev !static flex-1 h-full flex items-center justify-center 
                bg-white text-gray-700 hover:bg-[#b52228] hover:text-white active:bg-[#9d1d22] 
                transition-all duration-300 border-r border-gray-200"
              >
                <FiChevronLeft className="text-[22px]" />
              </button>
          
              {/* Next Button (Blue hover) */}
              <button
                ref={swiperNavNextRef}
                className="group swiper-button-next !static flex-1 h-full flex items-center justify-center 
                bg-white text-gray-700 hover:bg-[#0891B2] hover:text-white active:bg-[#067c99] 
                transition-all duration-300"
              >
                <FiChevronRight className="text-[22px]" />
              </button>
          
            </div>
          </div>

          {/* Remove Swiper default margin-top & position */}
          <style jsx global>{`
            .swiper-button-prev,
            .swiper-button-next {
              position: static !important;
              top: auto !important;
              margin-top: 0 !important;
              transform: none !important;
            }
            .swiper-button-prev::after,
            .swiper-button-next::after {
              display: none !important;
            }
          `}</style>

         <Swiper
  modules={[Navigation, Autoplay]}
  spaceBetween={30}
  slidesPerView={1} // default - for very small screens
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  onInit={(swiper) => {
    swiper.params.navigation.prevEl = swiperNavPrevRef.current;
    swiper.params.navigation.nextEl = swiperNavNextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }}
  breakpoints={{
    0: { slidesPerView: 1 },       // ✅ Mobile - show one card
    380: { slidesPerView: 2 },     // Small screens
    768: { slidesPerView: 3 },     // Tablets
    1024: { slidesPerView: 4 },    // Laptops
    1280: { slidesPerView: 5 },    // Desktops
  }}
>
  {data[0]?.children?.map((category, i) => (
    <SwiperSlide key={i + 1}>
      <div
        className="group cursor-pointer bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        onClick={() =>
          handleCategoryClick(category._id, showingTranslateValue(category?.name))
        }
      >
        {/* Image */}
        <div className="relative w-full h-44 md:h-52 overflow-hidden rounded-t-3xl">
          <Image
            src={category?.icon || DUMMY_IMAGE}
            alt="category"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Bottom Card */}
        <div className="bg-white -mt-5 mx-3 rounded-b-3xl shadow-sm pb-4 pt-6 text-center">
          <FaCapsules className="text-cyan-500 text-xl mx-auto group-hover:text-[#0891B2] transition-colors duration-300 mb-1" />
          <h4 className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-[#0891B2]">
            {showingTranslateValue(category?.name)}
          </h4>
          <p className="text-xs md:text-sm text-gray-500">
            Born For Medicine
          </p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
      )}
    </>
  );
};

export default FeatureCategory;
