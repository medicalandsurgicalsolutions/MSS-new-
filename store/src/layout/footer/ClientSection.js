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
      setClients([...data, ...data]); // Duplicate for smooth looping
    }
    fetchData();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-6 flex flex-col items-center">
      <h3 className="text-center text-2xl lg:text-4xl font-bold mb-4">
        Our Clients
      </h3>
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`slider flex gap-6`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex-none flex flex-col items-center justify-center w-[150px] lg:w-[200px]"
            >
              <div className="relative h-20 lg:h-28 w-full">
                <Image
                  src={client?.icon}
                  alt={client?.name?.en}
                  fill
                  className="rounded-md object-contain"
                />
              </div>
              <Link href={client?.website} target="_blank">
                <p className="mt-2 text-center text-gray-700 text-sm lg:text-lg">
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
          animation: scroll 20s linear infinite;
          min-width: max-content;
        }

        .slider.paused {
          animation-play-state: paused;
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
            animation: scroll 12s linear infinite; /* Faster scroll for mobile */
          }
        }
      `}</style>
    </div>
  );
}
