import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

// internal imports
import Price from "@components/common/Price";
import Tags from "@components/common/Tags";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import MainModal from "@components/modal/MainModal";
import Discount from "@components/common/Discount";
import VariantList from "@components/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { handleLogEvent } from "src/lib/analytics";
import DUMMY_IMAGE from "@components/constants";
import useGetSetting from "@hooks/useGetSetting";
import logo from "../../../public/logo/logo-color.png";


const ProductModal = ({ modalOpen, setModalOpen, product, attributes, currency }) => {
  const router = useRouter();
  const { setIsLoading, isLoading } = useContext(SidebarContext);
  const { t } = useTranslation("ns1");
  const { handleAddItem, setItem, item } = useAddToCart();
  const { lang, showingTranslateValue, getNumber } = useUtilsFunction();
  const { globalSetting } = useGetSetting();

  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectVariant, setSelectVariant] = useState({});
  const [selectVa, setSelectVa] = useState({});
  const [variantTitle, setVariantTitle] = useState([]);

  // Lock background scroll
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [modalOpen]);

  // Initialize product data
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const first = product.variants[0];
      setStock(first?.quantity);
      setSelectVariant(first);
      setSelectVa(first);
      setImg(first?.image || product.image[0]);
      const price = getNumber(first?.price);
      const originalPrice = getNumber(first?.originalPrice);
      setDiscount(getNumber(((originalPrice - price) / originalPrice) * 100));
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else {
      setStock(product?.stock);
      setImg(product?.image[0]);
      const price = getNumber(product?.prices?.price);
      const originalPrice = getNumber(product?.prices?.originalPrice);
      setDiscount(getNumber(((originalPrice - price) / originalPrice) * 100));
      setPrice(price);
      setOriginalPrice(originalPrice);
    }
  }, [product]);

  useEffect(() => {
    const res = Object.keys(Object.assign({}, ...product?.variants));
    const varTitle = attributes?.filter((att) => res.includes(att?._id));
    setVariantTitle(varTitle?.sort());
  }, [product, attributes]);

  const handleAddToCart = (p) => {
    if (item < p?.moq) return notifyError(`Minimum order quantity is ${p?.moq}`);
    if (stock <= 0) return notifyError("Insufficient stock");

    const { variants, description, ...updatedProduct } = product;
    const newItem = {
      ...updatedProduct,
      id:
        p?.variants.length <= 0
          ? p._id
          : p._id + "-" + variantTitle?.map((att) => selectVariant[att._id]).join("-"),
      title: showingTranslateValue(p.title),
      image: img,
      variant: selectVariant || {},
      price: getNumber(price),
      originalPrice: getNumber(originalPrice),
    };
    handleAddItem(newItem);
  };

  const handleMoreInfo = (slug) => {
    setModalOpen(false);
    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
    handleLogEvent("product", `opened ${slug} product details`);
  };

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        id="product-modal-container"
        className="bg-white rounded-2xl shadow-xl max-w-6xl w-full mx-auto transition-all overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* LEFT COLUMN */}
          <div className="bg-gray-50 p-6 flex flex-col justify-start items-start border-r border-gray-100">
            <div className="relative flex justify-center mb-4 sticky top-0">
              
               
               <div style={{top: "18rem"}} className="absolute z-10 w-full">
                {discount > 0 && (
                  <Discount product={product} discount={discount} modal />
                )}
              </div>

              {/* <div className="absolute top-2 left-2 z-10 w-full"> 
                     {discount > 0 && ( <Discount product={product} discount={discount} modal /> )} 
                  </div> */}

                {/* Logo Right */}
                <div className="absolute top-1 left-1 z-10 w-full">
                  <img
                    src={logo.src ? logo.src : logo}
                    alt="Brand Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              
                {/* Product Image */}
                <Image
                  src={img || product.image[0] || DUMMY_IMAGE}
                  width={320}
                  height={320}
                  alt="product"
                  className="rounded-lg object-contain"
                />
              </div>




            <h2 className="text-xl font-semibold text-gray-800 text-left">
              {showingTranslateValue(product?.title)}
            </h2>

            <p className={`text-sm mt-1 font-medium ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div className="mt-2 mb-4 w-full flex justify-start">
              <Price
                product={product}
                price={price}
                currency={currency}
                originalPrice={originalPrice}
              />
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setItem(item - 1)}
                  disabled={item === 1}
                  className="px-3 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-2 font-semibold">{item}</span>
                <button
                  onClick={() => setItem(item + 1)}
                  className="px-3 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={stock <= 0}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-5 rounded-md text-sm"
              >
                {t("common:addToCart")}
              </button>
            </div>

            {/* Variant Options */}
            {variantTitle?.length > 0 && (
              <div className="w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm text-sm text-gray-700">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-left">
                  Available Options
                </h3>
                {variantTitle.map((a) => (
                  <div key={a._id} className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1 text-left">
                      {showingTranslateValue(a?.name)}:
                    </p>
                    <VariantList
                      att={a._id}
                      lang={lang}
                      option={a.option}
                      setValue={setValue}
                      varTitle={variantTitle}
                      variants={product?.variants}
                      setSelectVa={setSelectVa}
                      selectVariant={selectVariant}
                      setSelectVariant={setSelectVariant}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white p-6 flex flex-col justify-start overflow-y-auto max-h-[80vh] items-start text-left">
            {/* Product Description */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-2 text-left">
                Product Details
              </h3>
              <div
                className="text-sm text-gray-600 leading-relaxed text-left"
                dangerouslySetInnerHTML={{
                  __html:
                    showingTranslateValue(product?.description) ||
                    product?.description ||
                    "",
                }}
              />
            </div>

            {/* Info Box */}
            <div className="w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm text-sm text-gray-700 mb-4 mt-4 text-left">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                <Link
                  href={`/search?category=${showingTranslateValue(
                    product?.category?.name
                  )
                    ?.toLowerCase()
                    ?.replace(/[^A-Z0-9]+/gi, "-")}&_id=${product?.category?._id}`}
                  className="text-cyan-600 hover:underline"
                >
                  {showingTranslateValue(product?.category?.name)}
                </Link>
              </p>
              <p className="mt-1">
                <span className="font-semibold">Reference No:</span>{" "}
                <span className="text-cyan-700">{product?.productRefrenceNo}</span>
              </p>
              <p className="mt-1">
                <span className="font-semibold">Brand:</span>{" "}
                <span className="text-cyan-700">{showingTranslateValue(product?.brand?.name)}</span>
              </p>
              <p className="mt-1">
                <span className="font-semibold">Call to order:</span>{" "}
                <span className="text-cyan-700 font-semibold">{globalSetting.contact}</span>
              </p>
              <button
                onClick={() => handleMoreInfo(product?.slug)}
                className="mt-3 w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-medium py-2 rounded-md transition text-left"
              >
                {t("common:moreInfo")}
              </button>
            </div>

            {/* Tags */}
            <div className="mt-4 w-full text-left">
              <Tags product={product} />
            </div>
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default ProductModal;
