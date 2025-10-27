import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BrandServices from "@services/BrandServices";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import { useRouter } from "next/navigation";

// ✅ Custom Arrows (same style as you used before)
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-28px] transform -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-orange-500 transition-colors duration-300"
    onClick={onClick}
  >
    <IoIosArrowForward size={20} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-28px] transform -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-orange-500 transition-colors duration-300 z-10"
    onClick={onClick}
  >
    <IoIosArrowBack size={20} />
  </div>
);

const BrandSlider = () => {
  const [brands, setBrands] = useState([
    {
      id: 11,
      name: "mss",
      logo: "https://medicalsurgicalsolutions.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdvqwfpmxo%2Fimage%2Fupload%2Fv1731307505%2Fundefined%2FLOGONEW1copy.png&w=1920&q=75",
      website: "https://medicalsurgicalsolutions.com/",
    },
  ]);

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

  // ✅ Slick settings with custom arrows
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-4 relative">
      <Slider {...settings}>
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
