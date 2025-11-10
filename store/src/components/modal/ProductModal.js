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

const ProductModal = ({ modalOpen, setModalOpen, product, attributes, currency }) => {
  const router = useRouter();
  const { setIsLoading, isLoading } = useContext(SidebarContext);
  const { t } = useTranslation("ns1");
  const { handleAddItem, setItem, item } = useAddToCart();
  const { lang, showingTranslateValue, getNumber } = useUtilsFunction();
  const { globalSetting } = useGetSetting();

  // states
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectVariant, setSelectVariant] = useState({});
  const [selectVa, setSelectVa] = useState({});
  const [variantTitle, setVariantTitle] = useState([]);
  const [variants, setVariants] = useState([]);

  // Price & Variant logic
  useEffect(() => {
    if (value) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );
      const result2 = result?.find((v) =>
        Object.keys(selectVa).every((k) => selectVa[k] === v[k])
      );
      if (result.length <= 0 || result2 === undefined) return setStock(0);
      setVariants(result);
      setSelectVariant(result2);
      setSelectVa(result2);
      setImg(result2?.image);
      setStock(result2?.quantity);

      const price = getNumber(result2?.price);
      const originalPrice = getNumber(result2?.originalPrice);
      const discountPercentage = getNumber(((originalPrice - price) / originalPrice) * 100);
      setDiscount(discountPercentage);
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else if (product?.variants?.length > 0) {
      const firstVariant = product.variants[0];
      setStock(firstVariant?.quantity);
      setSelectVariant(firstVariant);
      setSelectVa(firstVariant);
      setImg(firstVariant?.image);
      const price = getNumber(firstVariant?.price);
      const originalPrice = getNumber(firstVariant?.originalPrice);
      const discountPercentage = getNumber(((originalPrice - price) / originalPrice) * 100);
      setDiscount(discountPercentage);
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else {
      setStock(product?.stock);
      setImg(product?.image[0]);
      const price = getNumber(product?.prices?.price);
      const originalPrice = getNumber(product?.prices?.originalPrice);
      const discountPercentage = getNumber(((originalPrice - price) / originalPrice) * 100);
      setDiscount(discountPercentage);
      setPrice(price);
      setOriginalPrice(originalPrice);
    }
  }, [product, selectVa, selectVariant, value]);

  // Variant titles
  useEffect(() => {
    const res = Object.keys(Object.assign({}, ...product?.variants));
    const varTitle = attributes?.filter((att) => res.includes(att?._id));
    setVariantTitle(varTitle?.sort());
  }, [variants, attributes]);

  // Add to Cart logic
  const handleAddToCart = (p) => {
    if (item < p?.moq) return notifyError(`Minimum order quantity is ${p?.moq}`);
    if (stock <= 0) return notifyError("Insufficient stock");

    const { variants, categories, description, ...updatedProduct } = product;
    const newItem = {
      ...updatedProduct,
      id:
        p?.variants.length <= 0
          ? p._id
          : p._id + "-" + variantTitle?.map((att) => selectVariant[att._id]).join("-"),
      title:
        p?.variants.length <= 0
          ? showingTranslateValue(p.title)
          : showingTranslateValue(p.title) +
            "-" +
            variantTitle
              ?.map((att) =>
                att.variants?.find((v) => v._id === selectVariant[att._id])
              )
              .map((el) => showingTranslateValue(el?.name)),
      image: img,
      variant: selectVariant || {},
      gst: product?.gst,
      hsn: product?.hsn,
      price: p.variants.length === 0 ? getNumber(p.prices.price) : getNumber(price),
      originalPrice:
        p.variants.length === 0
          ? getNumber(p.prices.originalPrice)
          : getNumber(originalPrice),
    };
    handleAddItem(newItem);
  };

  const handleMoreInfo = (slug) => {
    setModalOpen(false);
    const scrollData = {
      position: window.scrollY,
      expiry: new Date().getTime() + 10 * 60 * 1000,
    };
    localStorage.setItem("mssscrollPosition", JSON.stringify(scrollData));
    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
    handleLogEvent("product", `opened ${slug} product details`);
  };

  const category_name = showingTranslateValue(product?.category?.name)
    ?.toLowerCase()
    ?.replace(/[^A-Z0-9]+/gi, "-");

 return (
  <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
    <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden mx-auto transition-all">
      {/* Wrapper */}
      <div className="flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="md:w-1/2 w-full bg-gray-50 p-4 flex flex-col items-center justify-start border-r border-gray-100">
          <div className="relative w-full flex justify-center">
            <Discount product={product} discount={discount} modal />
            <Image
              src={img || product.image[0] || DUMMY_IMAGE}
              width={350}
              height={350}
              alt="product"
              className="rounded-xl object-contain"
            />
          </div>

          {/* Product Title */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mt-3 text-center px-2 leading-snug">
            {showingTranslateValue(product?.title)}
          </h2>

          {/* Stock Status */}
          <p
            className={`text-sm font-medium mt-1 ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Sold Out"}
          </p>

          {/* Price */}
          <div className="mt-2 mb-3">
            <Price
              product={product}
              price={price}
              currency={currency}
              originalPrice={originalPrice}
            />
          </div>

          {/* MOQ Buttons */}
          {product?.moq > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {Array.from({ length: 4 }, (_, i) => {
                const moq = product?.moq * (i + 1);
                return (
                  <button
                    key={i}
                    onClick={() => setItem(moq)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      item === moq
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-cyan-600 hover:text-white"
                    }`}
                  >
                    {moq}
                  </button>
                );
              })}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 w-full justify-center">
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
                disabled={product.quantity <= item}
                className="px-3 py-2 hover:bg-gray-100 text-gray-700"
              >
                <FiPlus />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={stock <= 0}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-md text-sm flex items-center justify-center max-w-[160px]"
            >
              {t("common:addToCart")}
              <span className="ml-2 bg-white text-cyan-700 rounded px-2 py-0.5 text-xs font-semibold">
                {`${currency}${(item * price).toFixed(2)}`}
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 w-full p-5 flex flex-col justify-between">
          <div>
            {/* Variants */}
            {variantTitle?.length > 0 && (
              <div className="mb-4">
                {variantTitle?.map((a) => (
                  <div key={a._id} className="mb-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">
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

            {/* Description */}
            <div className="border-t border-gray-200 pt-3 mt-2 text-sm text-gray-600 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    showingTranslateValue(product?.description) ||
                    product?.description ||
                    "",
                }}
              />
            </div>

            {/* Category / Brand / Reference */}
            <div className="border-t border-gray-200 pt-3 mt-4 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                <Link
                  href={`/search?category=${showingTranslateValue(
                    product?.category?.name
                  )
                    ?.toLowerCase()
                    ?.replace(/[^A-Z0-9]+/gi, "-")}&_id=${
                    product?.category?._id
                  }`}
                  className="text-cyan-600 hover:underline"
                >
                  {showingTranslateValue(product?.category?.name)}
                </Link>
              </p>
              <p>
                <span className="font-semibold">Reference No:</span>{" "}
                <span className="text-cyan-700">
                  {product?.productRefrenceNo}
                </span>
              </p>
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                <span className="text-cyan-700">
                  {showingTranslateValue(product?.brand?.name)}
                </span>
              </p>
              <Tags product={product} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center border-t border-gray-200 pt-3 text-xs text-gray-600">
            <p>
              Call to order:{" "}
              <span className="text-cyan-600 font-semibold">
                {globalSetting.contact}
              </span>
            </p>
            <button
              onClick={() => handleMoreInfo(product?.slug)}
              className="text-orange-500 hover:text-orange-600 font-semibold text-sm"
            >
              {t("common:moreInfo")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainModal>
);

};

export default ProductModal;
