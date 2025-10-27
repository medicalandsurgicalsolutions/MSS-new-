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
      logo: "https://medicalsurgicalsolutions.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdvqwfpmxo%2Fimage%2Fupload%2Fv1731307505%2Fundefined%2FLOGONEW1copy.png&w=1920&q=75",
      website: "https://medicalsurgicalsolutions.com/",
    },
  ]);

  const sliderRef = useRef(null);

  const fetchBrands = async () => {
    const response = await BrandServices.getAll().catch((e) => e);
    setBrands(response);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();

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
    arrows: false, // hide default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  return (
    <div className="relative bg-gray-100 p-4">
      {/* Custom arrow container */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border rounded-full flex items-center justify-center w-16 h-8">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="flex-1 text-blue-500 hover:text-blue-600 transition"
        >
          <IoIosArrowBack size={18} />
        </button>
        <div className="h-6 w-[1px] bg-gray-200"></div>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="flex-1 text-blue-500 hover:text-blue-600 transition"
        >
          <IoIosArrowForward size={18} />
        </button>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {brands.map((brand) => (
          <div key={brand.id} className="px-0 lg:px-2">
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
  );
};

export default BrandSlider;
