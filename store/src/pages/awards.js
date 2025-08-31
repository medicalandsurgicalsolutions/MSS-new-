// pages/awards.js
import Layout from '@layout/Layout';
import AwardServices from '@services/AwardServices';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function awards() {

      const [awards, setAwards] = useState([]);
    
      useEffect(() => {
        async function fetchData() {
          const data = await AwardServices.getAllAwards();
          setAwards(data);
        }
        fetchData();
      }, []);

  return (
    <Layout title="About Us" description="This is about us page">
      <div className="relative z-10 bg-gray-100 w-full pt-8 text-center flex flex-col items-center">
  {/* Title Section */}
  <div className="max-w-2xl">
    <h1 className="text-xl lg:text-4xl font-bold leading-tight">
      Our Achievements & Awards
    </h1>
    <p className="text-lg md:text-xl mt-4 text-gray-600">
      Celebrating our dedication to quality, innovation, and customer satisfaction.
    </p>
  </div>
</div>

<div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-[300px] h-[380px] md:w-[360px] md:h-[500px] lg:w-[400px] lg:h-[500px] overflow-hidden rounded-lg">
                <Image
                  src={image?.icon}
                  alt={image?.name?.en}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="mt-4 px-2 w-[300px] md:w-[360px] lg:w-[400px] text-sm lg:text-lg font-medium text-gray-700">{image?.name?.en}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>

</Layout>
  );
}
