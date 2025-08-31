import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "@layout/Layout";
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth";
import DUMMY_IMAGE from "@components/constants";
import useGetSetting from "@hooks/useGetSetting";
import BlogServices from "@services/BlogServices";

const BlogScreen = ({ product }) => {
  const router = useRouter();
  const userInfo = getUserSession();
  const { loading, storeCustomizationSetting } = useGetSetting();
  const { lang, showingTranslateValue, getNumber, currency } =
    useUtilsFunction();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { t } = useTranslation();
  //   console.log("Product Blog ", product);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={product?.metatitle}
          description={product?.metadescription}
        >
          <div className="min-h-screen bg-gray-50 blog_wrapper">
            <div className="max-w-5xl mx-auto px-6 py-12">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img
                  src={product?.icon}
                  alt={"image"}
                  className="w-full h-72 object-cover sm:h-96"
                />
                <div className="p-8">
                  <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
                    {product?.name?.en}
                  </h1>
                  {/* <p className="text-gray-700 text-lg leading-relaxed">{product?.description}</p> */}
                  <div
                    className="leading-5 your-component"
                    dangerouslySetInnerHTML={{
                      __html: product?.description || "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  let product = null; // Use `null` instead of `undefined`

  try {
    const [data] = await Promise.all([
      // Uncomment and replace with actual API call
      await BlogServices.getBlogById(slug),
    ]);

    if (data?.brand && typeof data.brand === "object") {
      const brandArray = Object.values(data);
      product = brandArray.find((p) => p.slug === slug) || null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return {
    props: {
      product, // Always return `null` if no data is found
    },
  };
};

export default BlogScreen;
