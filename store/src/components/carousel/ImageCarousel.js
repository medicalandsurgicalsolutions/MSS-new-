import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5"; // requires a loader
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageCarousel = ({ images, handleChangeImage }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      {/* <Carousel showArrows={false} showThumbs={true}>
        {images?.map((img, i) => (
          <button key={i + 1} onClick={() => handleChangeImage(img)}>
            <Image
              className="border inline-flex items-center justify-center px-3 py-1 mt-2"
              src={img}
              alt="product"
              width={85}
              height={85}
            />
          </button>
        ))}
      </Carousel> */}

     <Swiper
  spaceBetween={1}
  navigation={{
    nextEl: ".next",
    prevEl: ".prev",
  }}
  loop={true}
  slidesPerView={4}
  modules={[Navigation]}
  className="mySwiper image-carousel relative"
>
  {images?.map((img, i) => (
    <SwiperSlide key={i + 1} className="group">
      <button onClick={() => handleChangeImage(img)}>
        <Image
          className="border h-16 lg:h-24 inline-flex items-center justify-center px-3 py-1 mt-2"
          src={img}
          alt="product"
          width={100}
          height={100}
        />
      </button>
    </SwiperSlide>
  ))}

  {/* Backward (Prev) Button */}
  <button
    ref={prevRef}
    className="prev absolute top-1/2 left-2 z-10 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 bg-white shadow-sm hover:bg-[#b52228] hover:text-white transition-all duration-200"
  >
    <IoChevronBackOutline size={16} />
  </button>

  {/* Forward (Next) Button */}
  <button
    ref={nextRef}
    className="next absolute top-1/2 right-2 z-10 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 bg-white shadow-sm hover:bg-[#0891b2] hover:text-white transition-all duration-200"
  >
    <IoChevronForward size={16} />
  </button>
</Swiper>

    </>
  );
};

export default dynamic(() => Promise.resolve(ImageCarousel), { ssr: false });
