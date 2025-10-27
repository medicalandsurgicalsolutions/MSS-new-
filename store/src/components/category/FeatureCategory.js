import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
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

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const { data, error, loading } = useAsync(
    CategoryServices.getShowingCategory
  );

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
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
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
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
                  className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  onClick={() =>
                    handleCategoryClick(
                      category._id,
                      showingTranslateValue(category?.name)
                    )
                  }
                >
                  {/* Image */}
                  <div className="relative w-full h-40 md:h-44 lg:h-48 overflow-hidden">
                    <Image
                      src={category?.icon || DUMMY_IMAGE}
                      alt="category"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col items-center text-center">
                    <FaCapsules className="text-cyan-500 text-lg group-hover:text-orange-500 transition-colors duration-300 mb-1" />
                    <h4 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-orange-500">
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

          {/* Navigation Buttons */}
          <div
            className="swiper-button-next !text-cyan-500 hover:!text-orange-500 transition-colors duration-300"
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          ></div>
          <div
            className="swiper-button-prev !text-cyan-500 hover:!text-orange-500 transition-colors duration-300"
            style={{
              position: "absolute",
              left: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default FeatureCategory;
