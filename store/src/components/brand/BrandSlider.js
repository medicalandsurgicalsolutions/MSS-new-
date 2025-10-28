import React, { useContext, useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
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
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 6, slidesToScroll: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="relative">
      {/* Hidden buttons for external arrow control */}
      <button
        type="button"
        className="brand-slider-prev hidden"
        onClick={() => sliderRef.current?.slickPrev()}
      />
      <button
        type="button"
        className="brand-slider-next hidden"
        onClick={() => sliderRef.current?.slickNext()}
      />

      {/* Slider Section */}
      <Slider ref={sliderRef} {...settings} className="brand-slider">
        {brands?.map((brand) => (
          <div key={brand._id || brand.id} className="px-1 lg:px-2">
            <div
              className="bg-white h-20 w-20 lg:h-24 lg:w-24 rounded-full shadow-md flex items-center justify-center mx-auto cursor-pointer hover:shadow-lg transition"
              onClick={() => handleBrandClick(brand._id)}
            >
              <div className="relative h-full w-full rounded-full overflow-hidden p-2">
                <Image
                  src={brand?.icon || brand?.logo}
                  alt={brand?.name?.en || brand?.name}
                  fill
                  sizes="124px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandSlider;
