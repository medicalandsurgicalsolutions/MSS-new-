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

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const Brands = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const brands = [
    { _id: 1, name: 'Nivea', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 2, name: 'Baidyanath', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 3, name: 'Himalaya', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 4, name: 'Cetaphil', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 5, name: 'Hansaplast', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 6, name: 'Tejasya', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 7, name: 'Abbott', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 8, name: 'Himalaya', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 9, name: 'Cetaphil', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 10, name: 'Hansaplast', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 11, name: 'Tejasya', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 12, name: 'Tata 1mg', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 13, name: 'Tata 1mg', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
    { _id: 14, name: 'Abbott', icon: 'https://images.moneycontrol.com/static-mcnews/2022/06/Abbott-2.png?impolicy=website&width=1600&height=900' },
  ];

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
        <ul className="w-full relative"> {/* Add relative positioning to the wrapper */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={4}
              slidesPerView={3}
              navigation={{
                nextEl: '.swiper-button-next', // Ensure this is the right class for next button
                prevEl: '.swiper-button-prev', // Ensure this is the right class for prev button
              }}
              breakpoints={{
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 7,
                },
              }}
            >
              {brands?.map((category, i) => (
                <SwiperSlide key={i + 1}>
                  <li className="group relative">
                    {/* Category Item Wrapper */}
                    <div
                      className="w-[60px] md:w-[120px] lg:w-[140px] h-[60px] md:h-[120px] border-4 border-cyan-500 lg:h-[140px] bg-white cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg rounded-full"
                      onClick={() =>
                        handleCategoryClick(category._id, showingTranslateValue(category?.name))
                      }
                    >
                      {/* Category Image */}
                      <Image
                        src={category?.icon || DUMMY_IMAGE}
                        alt="category"
                        className="object-cover rounded-full w-full h-full"
                        fill
                        objectFit="cover"
                      />
                    </div>

                    {/* Title below the image */}
                    <div className="w-[90px] md:w-[160px] lg:w-[180px] p-1"> {/* Reduced padding */}
                      <h3
                        onClick={() =>
                          handleCategoryClick(category._id, showingTranslateValue(category?.name))
                        }
                        className="text-[8px] md:text-xs lg:text-xs text-center font-medium leading-tight group-hover:text-emerald-400" // Reduced font size
                        style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} // Ensure text breaks properly
                      >
                        {showingTranslateValue(category?.name)}
                      </h3>
                    </div>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <div className="swiper-button-next" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
             
            </div>
            <div className="swiper-button-prev" style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
              
            </div>
        </ul>
      )}
    </>
  );
};

export default Brands;
