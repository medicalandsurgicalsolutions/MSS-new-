import { useEffect, useState } from "react";
import Image from "next/image";
import PartnerServices from "@services/PartnerServices";

export default function OurPartner() {
  // List of client images and names

  const [isPaused, setIsPaused] = useState(false);

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await PartnerServices.getAllPartners();
      setPartners(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const sliders = document.querySelector(".sliders");
    if (isPaused) {
      sliders.style.animationPlayState = "paused";
    } else {
      sliders.style.animationPlayState = "running";
    }
  }, [isPaused]);

  return (
    <div className="w-full h-[260px] lg:h-[360px] overflow-hidden bg-gray-100 flex flex-col items-center">
      <h3 className="text-center p-4 text-2xl lg:text-4xl font-bold">
        We Authorized
      </h3>
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="sliders absolute w-[1000px] lg:w-[2100px] gap-4 flex animate-scroll"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {partners?.map((client, index) => (
            <div
              key={index}
              className="flex-none flex flex-col items-center justify-center"
              style={{
                width: `${100 / 6}%`, // 6 images per row on large screens
              }}
            >
              <div className="relative h-32 lg:h-56 w-full">
                <Image
                  src={client?.icon}
                  alt={client?.name?.en}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <p className="mt-2 text-center text-gray-700 font-medium">
                {client?.name?.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
