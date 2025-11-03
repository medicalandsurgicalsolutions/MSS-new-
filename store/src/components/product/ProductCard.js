import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";
import { useCart } from "react-use-cart";

//internal import
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import { notifyError, notifySuccess } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import useGetSetting from "@hooks/useGetSetting";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { handleLogEvent } from "src/lib/analytics";
import DUMMY_IMAGE from "@components/constants";
import { useRouter } from "next/router";
import { getUserSession } from "@lib/auth";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity, handleAddItem } = useAddToCart();
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const router = useRouter();
  const userInfo = getUserSession();

  const [sliceLimit, setSliceLimit] = useState(window.innerWidth <= 768 ? 34 : 44);

  useEffect(() => {
    const handleResize = () => {
      setSliceLimit(window.innerWidth <= 768 ? 30 : 50);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currency = globalSetting?.default_currency || "$";

  // ✅ Updated Buy Now Logic (adds item to react-use-cart + navigates)
  const handleAddItems = async (event, p) => {
    event.stopPropagation();

    if (p?.stock < 1) {
      notifyError("Insufficient stock!");
      return;
    }

    const { slug, variants, categories, description, ...updatedProduct } = product;

    const newItem = {
      ...updatedProduct,
      id: p?._id,
      title: showingTranslateValue(p?.title),
      slug: p?.slug,
      variant: p?.prices,
      gst: p?.gst,
      hsn: p?.hsn,
      price: p?.prices?.price,
      originalPrice: product?.prices?.originalPrice,
      quantity: 1,
    };

    // 🟢 If user not logged in → redirect to login with redirectUrl
    if (!userInfo) {
      router.push(`/auth/login?redirectUrl=checkout`);
      return;
    }

    try {
      // Add to cart first
      addItem(newItem);
      notifySuccess(`${p?.title} added to cart! Redirecting...`);

      // wait for react-use-cart localStorage update
      setTimeout(() => {
        router.push("/checkout");
      }, 400);
    } catch (error) {
      console.error("Buy Now Error:", error);
      notifyError("Something went wrong while adding to cart.");
    }
  };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };

  return (
    <>
      {modalOpen && (
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          currency={currency}
          attributes={attributes}
        />
      )}

      <div className="group box-border overflow-hidden flex rounded-md shadow-sm border-2 border-cyan-100 pe-0 flex-col items-center bg-gray-50 relative">
        <div
          onClick={() => {
            handleModalOpen(!modalOpen, product._id);
            handleLogEvent(
              "product",
              `opened ${showingTranslateValue(product?.title)} product modal`
            );
          }}
          className="relative flex justify-center cursor-pointer w-full h-44"
        >
          <div className="relative w-full h-full">
            {product.image[0] ? (
              <ImageWithFallback src={product.image[0]} alt="product" />
            ) : (
              <Image
                src={DUMMY_IMAGE}
                fill
                style={{
                  objectFit: "contain",
                }}
                sizes="100%"
                alt="product"
                className="object-contain transition duration-150 ease-linear transform group-hover:scale-105"
              />
            )}
          </div>
        </div>

        <div className="w-full h-44 lg:h-28 relative px-1 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.unit}
            </span>
            <h2 className="mb-0 font-poppins block text-[13px] lg:text-xs font-medium text-gray-800">
              {showingTranslateValue(product?.title)?.length >= sliceLimit
                ? showingTranslateValue(product?.title).slice(0, sliceLimit) + "..."
                : showingTranslateValue(product?.title)}{" "}
              {product?.sku ? ` (${product?.sku})` : ""}
            </h2>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price
              card
              product={product}
              currency={currency}
              price={
                product?.isCombination
                  ? product?.variants[0]?.price
                  : product?.prices?.price
              }
              originalPrice={
                product?.isCombination
                  ? product?.variants[0]?.originalPrice
                  : product?.prices?.originalPrice
              }
            />
          </div>

          {/* 🟢 Add to Cart & Buy Now Buttons */}
          <div className="absolute bottom-2 w-full lg:w-auto flex flex-col items-center lg:flex-row gap-2 mt-2 lg:mt-4 lg:justify-between">
            <div
              className="text-cyan-600 border cursor-pointer border-cyan-600 w-full lg:w-auto hover:text-white hover:bg-cyan-600 mb-1 me-2 lg:me-0 lg:mb-0 px-3 py-1 text-center"
              onClick={() => {
                handleModalOpen(!modalOpen, product._id);
                handleLogEvent(
                  "product",
                  `opened ${showingTranslateValue(product?.title)} product modal`
                );
              }}
            >
              Add to cart
            </div>

            <div
              className="text-green-500 border cursor-pointer border-green-500 w-full lg:w-auto text-center hover:text-white hover:bg-green-500 me-2 lg:me-0 px-3 py-1"
              onClick={(event) => handleAddItems(event, product)}
            >
              Buy now
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
