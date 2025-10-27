import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
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
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center">
            <div className="flex bg-white border border-gray-200 rounded-full shadow-md overflow-hidden w-[95px] h-[48px] items-center justify-center">
              {/* Prev Button */}
              <button
                ref={swiperNavPrevRef}
                className="swiper-button-prev !static flex-1 h-full flex items-center justify-center text-gray-700 hover:text-[#0891B2] transition-colors duration-300 border-r border-gray-200"
              >
                <FiChevronLeft className="text-[22px]" />
              </button>

              {/* Next Button */}
              <button
                ref={swiperNavNextRef}
                className="swiper-button-next !static flex-1 h-full flex items-center justify-center text-gray-700 hover:text-[#0891B2] transition-colors duration-300"
              >
                <FiChevronRight className="text-[22px]" />
              </button>
            </div>
          </div>

          {/* Hide default Swiper arrows */}
          <style jsx global>{`
            .swiper-button-prev::after,
            .swiper-button-next::after {
              display: none !important;
            }
          `}</style>

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = swiperNavPrevRef.current;
              swiper.params.navigation.nextEl = swiperNavNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
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
