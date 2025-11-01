import { useEffect, useState } from "react";
import Image from "next/image";
import ClientServices from "@services/ClientServices";
import Link from "next/link";

export default function ClientSection() {
  const [clients, setClients] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await ClientServices.getAllClients();
      setClients([...data, ...data]); // Duplicate for smooth loop
    }
    fetchData();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-grey-100 py-10 flex flex-col items-center">
      <h3 className="text-center text-2xl lg:text-4xl font-bold mb-8 text-[#000000]">
        Our Clients
      </h3>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="slider flex gap-6"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex-none bg-white border shadow-md rounded-xl flex flex-col items-center justify-center w-[180px] lg:w-[220px] py-8 hover:shadow-lg transition-all duration-300 hover:border-[#0891b2]"
              style={{
                borderColor: "cornflowerblue",
                backgroundColor: "ghostwhite",
              }}
                >
              {/* Image slightly larger */}
              <div className="relative h-24 w-24 mb-3">
                <Image
                  src={client?.icon}
                  alt={client?.name?.en || 'Client'}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Text slightly smaller */}
              <Link href={client?.website || "#"} target="_blank">
                <p className="text-center font-medium text-xs lg:text-sm text-[#0891b2]">
                  {client?.name?.en}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider {
          display: flex;
          align-items: center;
          animation: scroll 25s linear infinite;
          min-width: max-content;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .slider {
            animation: scroll 15s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
