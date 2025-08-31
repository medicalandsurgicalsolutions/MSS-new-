import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

//internal import

import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import DUMMY_IMAGE from "@components/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const { data, error, loading } = useAsync(
    CategoryServices.getShowingCategory
  );

  // console.log('category',data)

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
        <ul className="w-full relative">
          {" "}
          {/* Add relative positioning to the wrapper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={4}
            slidesPerView={3}
            navigation={{
              nextEl: ".swiper-button-next", // Ensure this is the right class for next button
              prevEl: ".swiper-button-prev", // Ensure this is the right class for prev button
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {data[0]?.children?.map((category, i) => (
              <SwiperSlide key={i + 1}>
                <li className="group relative">
                  {/* Category Item Wrapper */}
                  <div
                    className="w-[96px] md:w-[160px] lg:w-[250px] h-[80px] md:h-[100px] lg:h-[180px] border-[2px] border-cyan-400 shadow-sm bg-white cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg rounded-lg relative"
                    onClick={() =>
                      handleCategoryClick(
                        category._id,
                        showingTranslateValue(category?.name)
                      )
                    }
                  >
                    {/* Category Image */}
                    <Image
                      src={category?.icon || DUMMY_IMAGE}
                      alt="category"
                      fill // ✅ Replaces layout="fill"
                      className="object-cover rounded-lg w-full h-full" // ✅ Tailwind replaces objectFit="cover"
                    />
                    {/* Bottom Bold Border */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[4px]  bg-cyan-400 rounded-t-[40px]"></div>
                    {/* Title below the image */}
                    <div className="p-2 absolute bottom-0">
                      {" "}
                      {/* Reduced padding */}
                      <h3
                        onClick={() =>
                          handleCategoryClick(
                            category._id,
                            showingTranslateValue(category?.name)
                          )
                        }
                        className="text-[8px] md:text-xs lg:text-sm text-center  font-bold leading-tight group-hover:text-cyan-500" // Reduced font size
                        style={{ whiteSpace: "normal", wordWrap: "break-word" }} // Ensure text breaks properly
                      >
                        {showingTranslateValue(category?.name)}
                      </h3>
                    </div>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation buttons */}
          <div
            className="swiper-button-next"
            style={{
              position: "absolute",
              right: "0px",
              top: "70%",
              transform: "translateY(-50%)",
              zIndex: 10,
              color: "#06b6d4",
            }}
          ></div>
          <div
            className="swiper-button-prev"
            style={{
              position: "absolute",
              left: "0px",
              top: "70%",
              transform: "translateY(-50%)",
              zIndex: 10,
              color: "#06b6d4",
            }}
          ></div>
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;
