// pages/awards.js
import Layout from '@layout/Layout';
import BlogServices from '@services/BlogServices';
import { notifySuccess } from '@utils/toast';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function blogs() {

      const [blogs, setBlogs] = useState([]);
      const router = useRouter();

      // console.log("Blogs ", blogs);
    
      useEffect(() => {
        async function fetchData() {
          const data = await BlogServices.getAllBlogs();
          setBlogs(data);
        }
        fetchData();
      }, []);

      const handleBlog = (slug) => {
        router.push(`/blog/${slug}`);
      };

  return (
    <Layout title="About Us" description="This is about us page">
      <div className="relative z-10 bg-gray-100 w-full pt-8 text-center flex flex-col items-center">
  {/* Title Section */}
  <div className="max-w-2xl">
    <h1 className="text-xl lg:text-4xl font-bold leading-tight">
      Blogs
    </h1>
    {/* <p className="text-lg md:text-xl mt-4 text-gray-600">
      Celebrating our dedication to quality, innovation, and customer satisfaction.
    </p> */}
  </div>
</div>

<div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((image, index) => (
            <div key={index} className="flex flex-col items-left cursor-pointer" onClick={() => handleBlog(image?.slug)}>
              <div className="relative w-[240px] h-[140px] md:w-[320px] md:h-[200px] lg:w-[330px] lg:h-[220px] overflow-hidden rounded-lg">
                <Image
                  src={image?.icon}
                  alt={image?.name?.en}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="mt-4 px-2 w-[240px] md:w-[320px] lg:w-[330px] text-sm lg:text-lg font-medium text-black">{image?.name?.en}</h2>
              <h2 className="px-2 w-[240px] md:w-[320px] lg:w-[330px] text-sm lg:text-md font-medium text-gray-700"><div className="leading-5 your-component" dangerouslySetInnerHTML={{ __html: image?.description.slice(0, 120) || '',}}/></h2>
              <button className="mt-2 mx-2 text-left px-2 border-2 border-cyan-700 w-28 bg-cyan-600 text-white font-medium rounded-sm hover:bg-cyan-700 transition-all duration-300">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

</Layout>
  );
}
