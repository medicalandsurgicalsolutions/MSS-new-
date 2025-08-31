import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from  "../../../public/logo/logo-color.png";

//internal import

import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { useRouter } from "next/router";
import { SidebarContext } from "@context/SidebarContext";

const MainCarousel = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue, showingUrl, showingImage } =
    useUtilsFunction();
    const { setIsLoading, isLoading } =
    useContext(SidebarContext);
    const router = useRouter();

    const imageClick = (url)=>{
      setIsLoading(!isLoading);
      router.push(url);
    }

  const sliderData = [
    {
      id: 1,

      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.first_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.first_img) ||
        "",
    },
    {
      id: 2,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.second_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.second_img) ||
        "",
    },
    {
      id: 3,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.third_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.third_img) ||
        "",
    },
    {
      id: 4,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.four_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.four_img) ||
        "",
    },
    {
      id: 5,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.five_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.five_img) ||
        "",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={
          (storeCustomizationSetting?.slider?.bottom_dots ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        navigation={
          (storeCustomizationSetting?.slider?.left_right_arrow ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((item, i) => (
            <SwiperSlide
              className="h-full relative rounded-lg overflow-hidden"
              key={i + 1}
            >
              <div className="text-sm cursor-pointer text-gray-600 hover:text-emerald-dark" onClick={()=> imageClick(item.url)}>
                <Image
                  width={950}
                  height={400}
                  src={item.image}
                  alt={item.title}
                  className="object-fit:fill w-full h-36 lg:h-full" // Adjusted to ensure full display on mobile
                  priority
                />
              </div>
              {/* <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
                <div className="px-4 sm:pl-10 sm:pr-16 w-full md:w-10/12 lg:w-8/12 xl:w-7/12">
                  <div className="relative w-16 h-16 md:w-24 md:h-24">
                    <Image
                      src={storeCustomizationSetting?.navbar?.logo || logo}
                      alt="Company Logo"
                      fill// Automatically adjusts the image size
                      objectFit="contain" // Ensures the image fits within the div without distortion
                      priority
                    />
                  </div>
                  <h1 className="mb-2 w-40 md:w-60 lg:w-full sm:inline-block lg:inline-block  text-sm sm:text-md md:text-md lg:text-3xl font-bold text-white">
                    {item.title}
                  </h1>
                  <p className="text-sm sm:text-base hidden leading-5 sm:leading-6 text-white font-sans line-clamp-2 sm:line-clamp-1">
                    {item.info}
                  </p>
                  <Link
                    href={item.url}
                    className="hidden sm:inline-block lg:inline-block text-sm leading-6  font-medium mt-6 px-6 py-2 bg-cyan-600 text-center rounded-md text-white hover:bg-cyan-600"
                  >
                    {item.buttonName}
                  </Link>
                </div>
              </div> */}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default MainCarousel;
