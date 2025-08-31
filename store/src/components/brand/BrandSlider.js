import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Import arrow icons
import BrandServices from "@services/BrandServices";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import { useRouter } from "next/navigation";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full cursor-pointer shadow-lg"
    onClick={onClick}
  >
    <IoIosArrowForward size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <IoIosArrowBack size={24} />
  </div>
);
// const demoBrands = [
//   {
//     id: 1,
//     name: "Nivea",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272290_hmd_brand_logo.png",
//   },
//   {
//     id: 2,
//     name: "Baidyanath",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272520_ethicon_brand_logo.png",
//   },
//   {
//     id: 3,
//     name: "Himalaya",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272879_romsons_barnd_logo.png",
//   },
//   {
//     id: 4,
//     name: "Cetaphil",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272640_bd_brand_logo.png",
//   },
//   {
//     id: 5,
//     name: "Hansaplast",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272543_3m_brand_logo.png",
//   },
//   {
//     id: 6,
//     name: "Tejasya",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272570_diamond_brand_logo.png",
//   },
//   {
//     id: 7,
//     name: "Baidyanath",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272520_ethicon_brand_logo.png",
//   },
//   {
//     id: 8,
//     name: "Himalaya",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272879_romsons_barnd_logo.png",
//   },
//   {
//     id: 9,
//     name: "Cetaphil",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272640_bd_brand_logo.png",
//   },
//   {
//     id: 10,
//     name: "Hansaplast",
//     logo: "https://www.meddeygo.com/uploads/images/brand_images/1636272543_3m_brand_logo.png",
//   },
//   {
//     id: 11,
//     name: "Tejasya",
//     logo: "https://play-lh.googleusercontent.com/yjbAu08_Ahes38IEMV8slP91zgjh2mdh5xpZefvcbYuZxR8O7FZFderRn2Ivaz0uR2Lw",
//   },
// ];
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
    const response = await BrandServices.getAll().catch((e) => {
      return e;
    });
      setBrands(response);
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom prev arrow
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
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();

  const handleBrandClick = (id) => {
    // const brand_name = brandName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?brand=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <div className="bg-gray-100 p-4">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand.id} className="px-0 lg:px-2">
            <div className="bg-white h-16 w-16 lg:h-24 lg:w-24 rounded-full shadow-md flex items-center justify-center">
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleBrandClick(brand._id);
                  }}
                >
                  <Image
                    src={brand?.icon}
                    alt={brand?.name?.en}
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
