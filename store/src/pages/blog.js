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
      const { id } = router.query;

      // console.log("Blog Details ", blogs);
    
      useEffect(() => {
        async function fetchData() {
          const data = await BlogServices.getBlogById(id);
          setBlogs(data);
        }
        fetchData();
      }, []);

  return (
    <Layout title="Blog Page" description="This is blog page">
<div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <img
            src={blogs?.icon}
            alt={"image"}
            className="w-full h-72 object-cover sm:h-96"
          />
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">{blogs?.name?.en}</h1>
            <p className="text-gray-700 text-lg leading-relaxed">{blogs?.description}</p>
          </div>
        </div>
      </div>
    </div>
</Layout>
  );
}
