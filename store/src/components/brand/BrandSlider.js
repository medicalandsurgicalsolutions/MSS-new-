import React, { useContext, useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BrandServices from "@services/BrandServices";
import { SidebarContext } from "@context/SidebarContext";
import { useRouter } from "next/navigation";

const BrandSlider = () => {
  const [brands, setBrands] = useState([
    {
      id: 11,
      name: "mss",
      logo:
        "https://medicalsurgicalsolutions.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdvqwfpmxo%2Fimage%2Fupload%2Fv1731307505%2Fundefined%2FLOGONEW1copy.png&w=1920&q=75",
      website: "https://medicalsurgicalsolutions.com/",
    },
  ]);

  const sliderRef = useRef(null);
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();

  const fetchBrands = async () => {
    const response = await BrandServices.getAll().catch((e) => e);
    setBrands(response);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleBrandClick = (id) => {
    const url = `/search?brand=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false, // We'll use custom buttons
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="relative bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Brands</h2>
      </div>

      <div className="relative">
        {/* Custom Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 flex items-center">
          <div className="flex bg-white border border-gray-200 rounded-full shadow-md overflow-hidden w-[90px] h-[42px] items-center justify-center">
            {/* Prev Button */}
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="flex-1 h-full flex items-center justify-center text-gray-700 hover:text-[#0891B2] transition-colors duration-300 border-r border-gray-200"
            >
              <IoIosArrowBack className="text-[20px]" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="flex-1 h-full flex items-center justify-center text-gray-700 hover:text-[#0891B2] transition-colors duration-300"
            >
              <IoIosArrowForward className="text-[20px]" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {brands.map((brand) => (
            <div key={brand.id} className="px-1 lg:px-2">
              <div className="bg-white h-16 w-16 lg:h-24 lg:w-24 rounded-full shadow-md flex items-center justify-center mx-auto">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleBrandClick(brand._id)}
                  >
                    <Image
                      src={brand?.icon || brand?.logo}
                      alt={brand?.name?.en || brand?.name}
                      fill
                      sizes="124px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandSlider;
