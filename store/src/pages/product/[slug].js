import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  FiChevronRight,
  FiCreditCard,
  FiDatabase,
  FiHome,
  FiMinus,
  FiPlus,
  FiSmartphone,
  FiTruck,
} from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { FaX, FaInstagram, FaYoutube, FaTag, FaTags } from "react-icons/fa";
//internal import

// import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import Tags from "@components/common/Tags";
import Layout from "@layout/Layout";
import { notifyError } from "@utils/toast";
import Card from "@components/slug-card/Card";
import useAddToCart from "@hooks/useAddToCart";
import Loading from "@components/preloader/Loading";
import ProductCard from "@components/product/ProductCard";
import VariantList from "@components/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import AttributeServices from "@services/AttributeServices";
import ProductServices from "@services/ProductServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Discount from "@components/common/Discount";
import ImageCarousel from "@components/carousel/ImageCarousel";
import Review from "@components/product/Review";
import ReviewList from "@components/product/ReviewList";
import { getUserSession } from "@lib/auth";
import RatingServices from "@services/RatingServices";
import DUMMY_IMAGE from "@components/constants";
import useGetSetting from "@hooks/useGetSetting";
import WatermarkedImage from "@components/WatermarkedImage";
import OrderServices from "@services/OrderServices";

const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 8h4"
      />
      <path
        strokeWidth="1.5"
        d="M20.833 9h-2.602C16.446 9 15 10.343 15 12s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933C20.959 9 20.918 9 20.834 9Z"
      />
      <path
        strokeWidth="1.5"
        d="M20.965 9c-.078-1.872-.328-3.02-1.137-3.828C18.657 4 16.771 4 13 4h-3C6.229 4 4.343 4 3.172 5.172S2 8.229 2 12s0 5.657 1.172 6.828S6.229 20 10 20h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.991 12h.01"
      />
    </g>
  </svg>
);

const Price = ({ product, price, card, currency, originalPrice }) => {
  // console.log("price", price, "originalPrice", originalPrice, "card", card);
  // const { getNumberTwo } = useUtilsFunction();
  const getNumberTwo = (value) => {
    const num = Number(parseFloat(value || 0).toFixed(2));
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  function calculateDiscount(originalPrice, discountedPrice) {
    let discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discount.toFixed(2);
  }
  return (
    <div className=" product-price font-bold">
      {product?.isCombination ? (
        <>
          <span
            className={
              card
                ? "inline-block text-sm font-semibold text-gray-800"
                : "inline-block md:text-xl text-lg"
            }
          >
            {currency}
            {getNumberTwo(price)}
          </span>
          {originalPrice > price ? (
            <>
              <del
                className={
                  card
                    ? "sm:text-sm font-normal text-base text-gray-400 ml-1"
                    : "text-xs md:text-sm font-normal text-gray-400 ml-1"
                }
              >
                {currency}
                {getNumberTwo(originalPrice)}
              </del>
            </>
          ) : null}
        </>
      ) : (
        <>
          <span
            className={
              card
                ? "inline-block text-sm font-semibold text-gray-800"
                : "inline-block md:text-xl text-lg"
            }
          >
            {currency}
            {getNumberTwo(product?.prices?.price)}
          </span>
          {originalPrice > price ? (
            <>
              <del
                className={
                  card
                    ? "sm:text-sm font-normal text-base text-gray-400 ml-1"
                    : "text-xs md:text-sm font-normal text-gray-400 ml-1"
                }
              >
                {currency}
                {originalPrice}
              </del>
            </>
          ) : null}
        </>
      )}
      <div className="inline font-light text-green-500 ml-2 text-xs">
        <span className="text-sm">
          {calculateDiscount(originalPrice, price)}
        </span>
        % off
      </div>
    </div>
  );
};

const ProductScreen = ({ product, ratings, attributes, relatedProducts }) => {
  const router = useRouter();
  const userInfo = getUserSession();

  const [order, setOrder] = useState();

  const showPrescriptionBtn = (() => {
  if (!product?.category) return false;

  const categories = Array.isArray(product.category)
    ? product.category
    : [product.category];

  return categories.some((cat) => {
    const slug = cat?.slug?.toLowerCase() || "";
    const name = cat?.name?.toLowerCase() || "";
    return slug.includes("medicine") || name.includes("medicine");
  });
})();

  console.log("CATEGORY => ", product.category);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#reviews") {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300); // thoda delay taki page elements load ho jaye
      }
    }
  }, []);

  useEffect(()=>{
    if(userInfo){
      getCustomerOrder();
    }
  },[userInfo]);

  const getCustomerOrder = async()=>{
    const res = await OrderServices.getOrderCustomer({
      page: 1,
      limit: 10,
    });
    setOrder(res);
  }

  const { loading, storeCustomizationSetting } = useGetSetting();

  const { lang, showingTranslateValue, getNumber, currency } =
    useUtilsFunction();

  const showProduct = relatedProducts.filter(
    (product) => product?.status === "show"
  );

  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { handleAddItem, item, setItem } = useAddToCart();

  // react hook

  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectVariant, setSelectVariant] = useState({});
  const [isReadMore, setIsReadMore] = useState(true);
  const [selectVa, setSelectVa] = useState({});
  const [variantTitle, setVariantTitle] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (value) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      //just check bellow code and make sure your code also same
      const res = result?.map(
        ({
          originalPrice,
          price,
          discount,
          quantity,
          barcode,
          sku,
          productId,
          image,
          ...rest
        }) => ({ ...rest })
      );
      // console.log("res", res);

      const filterKey = Object.keys(Object.assign({}, ...res));
      const selectVar = filterKey?.reduce(
        (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
        {}
      );
      const newObj = Object.entries(selectVar).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );

      const result2 = result?.find((v) =>
        Object.keys(newObj).every((k) => newObj[k] === v[k])
      );

      // console.log("result2", result2);
      if (result.length <= 0 || result2 === undefined) return setStock(0);

      setVariants(result);
      setSelectVariant(result2);
      setSelectVa(result2);
      setImg(result2?.image);
      setStock(result2?.quantity);
      const price = getNumber(result2?.price);
      const originalPrice = getNumber(result2?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else if (product?.variants?.length > 0) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      setVariants(result);
      setStock(product.variants[0]?.quantity);
      setSelectVariant(product.variants[0]);
      setSelectVa(product.variants[0]);
      setImg(product.variants[0]?.image);
      const price = getNumber(product.variants[0]?.price);
      const originalPrice = getNumber(product.variants[0]?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else {
      setStock(product?.stock);
      setImg(product?.image[0]);
      const price = getNumber(product?.prices?.price);
      const originalPrice = getNumber(product?.prices?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    }
  }, [
    product?.prices?.discount,
    product?.prices?.originalPrice,
    product?.prices?.price,
    product?.stock,
    product.variants,
    selectVa,
    selectVariant,
    value,
  ]);

  useEffect(() => {
    const res = Object.keys(Object.assign({}, ...product?.variants));
    const varTitle = attributes?.filter((att) => res.includes(att?._id));

    setVariantTitle(varTitle?.sort());
  }, [variants, attributes]);

  useEffect(() => {
    setIsLoading(false);
  }, [product]);

  const handleAddToCart = (p) => {
    if (item < p?.moq) {
      return notifyError(`Minimum order quantity is ${p?.moq}`);
    }
    if (p.variants.length === 1 && p.variants[0].quantity < 1)
      return notifyError("Insufficient stock");
    // if (notAvailable) return notifyError('This Variation Not Available Now!');
    if (stock <= 0) return notifyError("Insufficient stock");
    // console.log('selectVariant', selectVariant);

    if (
      product?.variants.map(
        (variant) =>
          Object.entries(variant).sort().toString() ===
          Object.entries(selectVariant).sort().toString()
      )
    ) {
      const { variants, categories, description, ...updatedProduct } = product;
      const newItem = {
        ...updatedProduct,
        id: `${
          p.variants.length <= 1
            ? p._id
            : p._id +
              variantTitle
                ?.map(
                  // (att) => selectVariant[att.title.replace(/[^a-zA-Z0-9]/g, '')]
                  (att) => selectVariant[att._id]
                )
                .join("-")
        }`,

        title: `${
          p.variants.length <= 1
            ? showingTranslateValue(product?.title)
            : showingTranslateValue(product?.title) +
              "-" +
              variantTitle
                ?.map(
                  // (att) => selectVariant[att.title.replace(/[^a-zA-Z0-9]/g, '')]
                  (att) =>
                    att.variants?.find((v) => v._id === selectVariant[att._id])
                )
                .map((el) => showingTranslateValue(el?.name))
        }`,
        image: img,
        variant: selectVariant,
        price: price,
        gst: product?.gst,
        hsn: product?.hsn,
        originalPrice: originalPrice,
      };
      handleAddItem(newItem);
    } else {
      return notifyError("Please select all variant first!");
    }
  };

  const handleChangeImage = (img) => {
    setImg(img);
  };

  const { globalSetting } = useGetSetting();

  const { t } = useTranslation();

  // category name slug
  const category_name = showingTranslateValue(product?.category?.name)
    .toLowerCase()
    .replace(/[^A-Z0-9]+/gi, "-");

  // console.log("discount", product);

  const lowercaser = (string) => {
    return string.toLowerCase();
  };
  const paymentOptions = [
    { name: "Cards", icon: <FiCreditCard /> },
    { name: "UPI", icon: <FiSmartphone /> },
    { name: "Net Banking", icon: <FiDatabase /> },
    { name: "Wallet", icon: <WalletIcon /> },
  ];
  const freeHighliter = (string) => {
    // Handle case where text might be undefined or empty
    if (!string) return "null";

    // Split text at occurrences of "free" (case-insensitive)
    const parts = string.split(/(free)/i);

    const resullt = parts.map((part, index) =>
      part.toLowerCase() === "free" ? (
        <span key={index} className="text-green-600 font-bold capitalize">
          {part}
        </span>
      ) : (
        part
      )
    );
    return resullt;
  };
  const offers = [
    // freeHighliter("Get free delivery on your first order"),
    freeHighliter("Get a free mask on every order"),
  ];
  if (product?.isCodAvaialble) {
    paymentOptions.unshift({ name: "Cash On Delivery", icon: <FiTruck /> });
  }

  const handleAddItems = (event, product) => {
      event.stopPropagation();
      if (product?.stock < 1) return notifyError("Insufficient stock!");
  
      // if (p?.variants?.length > 0) {
      //   setModalOpen(!modalOpen);
      //   return;
      // }
      const { slug, variants, categories, description, ...updatedProduct } =
        product;
      const newItem = {
        ...updatedProduct,
        title: showingTranslateValue(product?.title),
        id: product?._id,
        slug: product?.slug,
        variant: product?.prices,
        gst: product?.gst,
        hsn: product?.hsn,
        price: product?.prices?.price,
        originalPrice: product?.prices?.originalPrice,
      };
      if (!userInfo) {
        // Redirect to login page with returnUrl query parameter
        router.push(`/auth/login?redirectUrl=checkout`);
      } else {
        handleAddItem(newItem);
        router.push("/checkout");
      }
    };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={showingTranslateValue(product?.metatitle)}
          description={showingTranslateValue(product?.metadescription)}
        >
          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
            {/* top section strt  */}
              <div className="flex items-center pb-4">
                <ol className="flex flex-wrap items-center w-full text-sm sm:text-base gap-x-1 gap-y-1">
                  {/* Home */}
                  <li className="transition duration-200 ease-in cursor-pointer hover:text-cyan-600 font-semibold">
                    <Link href="/">Home</Link>
                  </li>
                
                  {/* Chevron */}
                  <li className="flex items-center text-gray-500 text-xs sm:text-sm">
                    <FiChevronRight />
                  </li>
                
                  {/* Category */}
                  <li className="transition duration-200 ease-in cursor-pointer hover:text-cyan-600 font-semibold">
                    <Link
                      href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                    >
                      <button
                        className="capitalize"
                        type="button"
                        onClick={() => setIsLoading(!isLoading)}
                      >
                        {category_name}
                      </button>
                    </Link>
                  </li>
                
                  {/* Chevron */}
                  <li className="flex items-center text-gray-500 text-xs sm:text-sm hidden sm:flex">
                    <FiChevronRight />
                  </li>
                
                  {/* Product Title — hidden on mobile */}
                  <li className="capitalize px-1 text-gray-700 hidden sm:inline">
                    {showingTranslateValue(product?.title)}
                  </li>
                </ol>
              </div>
                   {/* top section end  */}
                  
              <div className="w-full rounded-lg p-2 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-3/12">
                    {/* <div className="flex justify-between">
                      <Discount slug product={product} discount={discount} />
                    </div> */}

                    {product.image[0] ? (
                      <Image
                        src={img || product.image[0]}
                        alt="product"
                        width={650}
                        height={650}
                        priority
                      />
                    ) : (
                      <Image
                        src={DUMMY_IMAGE}
                        width={650}
                        height={650}
                        alt="product Image"
                      />
                    )}

                    {product?.image?.length > 1 && (
                      <div className="flex flex-row flex-wrap mt-4 border-t">
                        <ImageCarousel
                          images={product.image}
                          handleChangeImage={handleChangeImage}
                        />
                      </div>
                    )}
                  </div>

                  {/* <WatermarkedImage
                      productImage={product.image[0]} // Replace with your image path
                      watermarkImage={storeCustomizationSetting?.navbar?.logo} // Replace with your logo path
                  /> */}
                    
                  <div className="w-full">
                    <div className=" md:flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row">
                     <div className="xl:pr-6 md:pr-6 w-full md:w-2/3 mob-w-full">
                     <div className="border-b my-4 pb-2 md:hidden overflow-hidden heading">
                          <h1 className=" leading-7 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight  text-gray-800 capitalize">
                            {lowercaser(showingTranslateValue(product?.title))}
                          </h1>

                          {product?.sku && (
                            <p className="uppercase  font-medium text-gray-500 text-sm"> 
                              SKU :{" "}
                              <span className="font-bold text-gray-600">
                                {product?.sku}
                              </span>
                            </p>
                          )}
                        </div>
                      <div className="hidden md:block border-b py-2 heading">
                        <h1 className="leading-7 text-base sm:text-lg md:text-xl lg:text-3xl my-3 font-semibold tracking-tight text-gray-800 capitalize break-words whitespace-normal">
                          {product?.title
                            ? lowercaser(showingTranslateValue(product?.title))
                            : "Loading..."}
                        </h1>
                      
                        {product?.sku && (
                          <p className="uppercase font-medium text-gray-500 text-sm">
                            SKU :{" "}
                            <span className="font-bold text-gray-600">{product?.sku}</span>
                          </p>
                        )}
                      </div>


                        <div className="flex items-center space-x-4">
                          {/* <div className="text-green-500 font-bold leading-5">
                            <span>12</span>% off
                          </div> */}
                        </div>

                        {/* <p className="pb-0 mb-0 text-cyan-700 font-bold text-sm">{`HSN ${product?.hsn}`}</p> */}
                        <div className="px-2">
                          <div className="discount my-4">
                            <div className="p-y">
                              <h2 className="font-semibold text-base mb-2">
                                Additional Offers
                              </h2>
                              <div className="border-dashed border-2 bg-gray-50 border-green-400 p-4 rounded-md ">
                                <ul className="space-y-2">
                                  {storeCustomizationSetting?.home?.discount_coupon_code.length > 0 &&
                                    storeCustomizationSetting?.home?.discount_coupon_code.map((offer, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center space-x-2"
                                      >
                                        <FaTags
                                          className="text-red-600 mt-1"
                                          size={20}
                                        />
                                        <p className="text-green-600 font-medium text-sm">
                                            {freeHighliter(offer)}
                                        </p>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="payment_methods my-4">
                            <div className="space-y-4 my-4 ">
                              <div>
                                <span className="font-semibold">
                                  Payment Options:
                                </span>
                              </div>
                              <div className="flex text-sm text-gray-800 gap-3 flex-wrap">
                                {paymentOptions.map((option, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2 border px-4 py-2 rounded-lg shadow-sm transition"
                                  >
                                    {option.icon}
                                    <span className="text-gray-500 font-light">
                                      {option.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* <div className="description text-xs md:text-base font-light  leading-4 text-gray-500 md:leading-6 my-4">
                            <div className="title text-base md:text-lg text-gray-800 mb-2 font-semibold">
                              <span>Description:</span>
                            </div>
                            <div>
                              <div className="p-2">
                                {showingTranslateValue(product?.description)}
                              </div>
                            </div>
                          </div> */}

                          <div className="text-md leading-6 text-gray-700 md:leading-7">
                            <p className="mt-2 mb-2 text-2xl font-bold tracking-wider text-black font-serif">Description</p>
                                {/* <div className="leading-5" dangerouslySetInnerHTML={{ __html: showingTranslateValue(product?.description) ? showingTranslateValue(product?.description) : (product?.description) }} /> */}
                                <div
                                    className="leading-5 your-component"
                                    dangerouslySetInnerHTML={{
                                        __html: showingTranslateValue(product?.description) || product?.description || '',
                                    }}
                                />
                            <br />
                          </div>

                          <div className=" my-4 product_details">
                            <div className="capitalize font-semibold text-base">
                              product details:{" "}
                            </div>
                            <ul className="flex flex-col px-4 list-disc  font-semibold space-y-2 m-2 text-sm">
                              <li className="">
                                <span className="text-gray-800">
                                  {t("common:category")}:
                                </span>
                                <Link
                                  className="text-cyan-600"
                                  href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                                >
                                  <button
                                    type="button"
                                    className="text-gray-600  font-medium underline ml-2 hover:text-teal-600"
                                    onClick={() => setIsLoading(!isLoading)}
                                  >
                                    {category_name}
                                  </button>
                                </Link>
                              </li>
                              <li className="">
                                <span className="text-gray-700">
                                  Product Reference No:
                                </span>
                                <span className="text-cyan-600  font-medium ml-2">
                                  {product?.productRefrenceNo || "N/A"}
                                </span>
                              </li>
                              <li className="">
                                <span className="text-gray-700">Brand:</span>
                                <span className="text-cyan-600  font-medium ml-2">
                                  {showingTranslateValue(
                                    product?.brand?.name
                                  ) || "N/A"}
                                </span>
                              </li>
                            </ul>
                            {/* <li><Tags product={product} /></li> */}
                          </div>
                        </div>
                        {/* <div className="mt-8">
                            <p className="text-xs sm:text-sm text-gray-700 font-medium">
                              Call Us To Order By Mobile Number :{" "}
                              <span className="text-emerald-700 font-semibold">
                                +0044235234
                              </span>{" "}
                            </p>
                          </div> */}

                        {/* social share */}
                        {/* <div className="mt-2">
                            <h3 className="text-base font-semibold mb-1 ">
                              {t("common:shareYourSocial")}
                            </h3>
                            <p className="font-sans text-sm text-gray-500">
                              {t("common:shareYourSocialText")}
                            </p>
                            <ul className="flex mt-4">
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-cyan-600  mr-2 transition ease-in-out duration-500">
                                  <Link
                                      href={`${storeCustomizationSetting?.footer?.social_facebook}`}
                                      aria-label="Social Link"
                                      rel="noreferrer"
                                      target="_blank"
                                      className="block text-center mx-auto text-gray-500 hover:text-white"
                                    >
                                      <FacebookIcon size={34} round />
                                  </Link>
                              </li>
                              <li className="flex items-center text-center text-red-500 rounded-full mr-2 transition ease-in-out duration-500">
                                  <Link
                                      href={`${storeCustomizationSetting?.footer?.social_twitter}`}
                                      aria-label="Social Link"
                                      rel="noreferrer"
                                      target="_blank"
                                      className="block text-center mx-auto text-red-500 hover:text-red"
                                    >
                                      <FaYoutube size={34} round />
                                  </Link>
                              </li>
                              <li className="flex items-center text-center text-red-500 rounded-full cursor-pointer  mr-2 transition ease-in-out duration-500">
                                  <Link
                                      href={`${storeCustomizationSetting?.footer?.social_pinterest}`}
                                      aria-label="Social Link"
                                      rel="noreferrer"
                                      target="_blank"
                                      className="block text-center mx-auto text-red-500 hover:text-red"
                                    >
                                      <FaInstagram size={34} round/>
                                  </Link>
                              </li>
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-cyan-600  mr-2 transition ease-in-out duration-500">
                                  <Link
                                      href={`${storeCustomizationSetting?.footer?.social_linkedin}`}
                                      aria-label="Social Link"
                                      rel="noreferrer"
                                      target="_blank"
                                      className="block text-center mx-auto text-gray-500 hover:text-white"
                                    >
                                      <LinkedinIcon size={34} round />
                                  </Link>
                              </li>
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-cyan-600  mr-2 transition ease-in-out duration-500">
                                  <Link
                                      href={`${storeCustomizationSetting?.footer?.social_whatsapp}`}
                                      aria-label="Social Link"
                                      rel="noreferrer"
                                      target="_blank"
                                      className="block text-center mx-auto text-gray-500 hover:text-white"
                                    >
                                      <WhatsappIcon size={34} round />
                                  </Link>
                              </li>
                            </ul>
                          </div> */}
                      </div>

                      {/* shipping description card */}
                      <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12  overflow-hidden h-max md:sticky md:top-28">
                       
                        <div className="md:rounded-xl border-dashed border-cyan-300 md:border-2">
                          <div className="flex flex-col-reverse md:flex-col">
                            <div className="mt-1 price_wagera text-gray-600 text-base space-y-3 pb-2 rounded-xl">
                              <div className="border-b md:px-4 px-2">
                                {/* <Card cod={product?.isCodAvaialble} /> */}
                                {showingTranslateValue(
                                  storeCustomizationSetting?.slug
                                    ?.card_description_one
                                ) && (
                                  <div className="flex items-center md:py-2 py-1 text-green-600 font-semibold">
                                    <span className="text-base items-start mr-4">
                                      <FiTruck />
                                    </span>
                                    <p className="font-sans leading-5 text-xs">
                                      {showingTranslateValue(
                                        storeCustomizationSetting?.slug
                                          ?.card_description_one
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="hidden md:block space-y-2 md:px-4 px-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-base md:font-semibold text-gray-800">
                                    Price:
                                  </span>
                                  <div className="text-gray-900">
                                    <Price
                                      price={price}
                                      product={product}
                                      currency={currency}
                                      originalPrice={originalPrice}
                                    />
                                  </div>
                                </div>
                                <div className="text-xs text-red-500">
                                  {product?.gst && (
                                    <p className="pb-0 mb-2 text-cyan-700 font-semibold text-xs">{`Inclusive of ${product?.gst}% GST`}</p>
                                  )}
                                  <span>
                                    *Delivery charges if applicable will be
                                    applied at checkout
                                  </span>
                                </div>
                              </div>
                              <div className="flex md:px-4 px-1">
                                <span className="md:font-semibold">
                                  Availability:&nbsp;{" "}
                                </span>
                                <span>
                                  <div className="capitalize">
                                    {stock > 0 ? (
                                      <p className="text-green-500 font-bold">
                                        In Stock
                                      </p>
                                    ) : (
                                      <p className="text-red-500 font-bold">
                                        Sold Out
                                      </p>
                                    )}
                                    {/* <Stock stock={stock} /> */}
                                  </div>
                                </span>
                              </div>
                            </div>
                            <div className="md:px-4 px-1 quantity_and_addToCart space-y-3">
                              <div className="md:hidden space-y-2 md:px-4 px-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-base md:font-semibold text-gray-800">
                                    Price:
                                  </span>
                                  <div className="text-gray-900">
                                    <Price
                                      price={price}
                                      product={product}
                                      currency={currency}
                                      originalPrice={originalPrice}
                                    />
                                  </div>
                                </div>
                                {product?.gst && (
                                  <p className="pb-0 mb-0 text-cyan-700 font-semibold text-sm">{`Inclusive of ${product?.gst}% GST`}</p>
                                )}
                              </div>
                              <div className="">
                                {variantTitle?.map((a, i) => (
                                  <span key={i + 1}>
                                    {/* <h4 className="text-sm py-1">
                                    {showingTranslateValue(a?.name)}:
                                  </h4> */}
                                    <div className="flex flex-row mb-3">
                                      <VariantList
                                        att={a._id}
                                        lang={lang}
                                        option={a.option}
                                        setValue={setValue}
                                        varTitle={variantTitle}
                                        setSelectVa={setSelectVa}
                                        variants={product.variants}
                                        selectVariant={selectVariant}
                                        setSelectVariant={setSelectVariant}
                                      />
                                    </div>
                                  </span>
                                ))}
                              </div>
                              <div>
                                {product?.moq > 1 && (
                                  <div className="w-full">
                                    {Array.from({ length: 5 }, (_, i) => {
                                      const moq = product?.moq * (i + 1);
                                      return (
                                        <button
                                          key={i}
                                          onClick={(e) => {
                                            setItem(moq);
                                          }}
                                          className={`${
                                            item == moq
                                              ? "bg-cyan-600 text-white"
                                              : "bg-gray-100 text-gray-600"
                                          } mr-2 border-0  hover:bg-cyan-600 hover:text-white rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold  mt-2`}
                                        >
                                          {moq}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}

                                <div className="flex items-center my-4">
                                  <div className="flex flex-col w-full space-y-3">
                                    <div className="group flex items-center md:w-max w-1/2  justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                                      <button
                                        onClick={() => setItem(item - 1)}
                                        disabled={item === 1}
                                        className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                      >
                                        <span className="text-dark text-base">
                                          <FiMinus />
                                        </span>
                                      </button>
                                      <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                                        {item}
                                      </p>
                                      <button
                                        onClick={() => setItem(item + 1)}
                                        disabled={
                                          selectVariant?.quantity <= item
                                        }
                                        className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                                      >
                                        <span className="text-dark text-base">
                                          <FiPlus />
                                        </span>
                                      </button>
                                    </div>
                                    <div className="flex gap-3 md:flex-col">
                                           
                                      <button
                                        onClick={() => handleAddToCart(product)}
                                        className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold  text-center justify-center rounded-md focus-visible:outline-none focus:outline-none px-2 border border-cyan-600 bg-cyan-600 hover:bg-white hover:text-black text-white py-4 md:py-3.5 lg:py-4 w-full md:h-12 h-10"
                                      >
                                        {t("common:addToCart")}
                                        {/* <span className="rounded-lg font-bold py-2 px-3">
                                      {`${currency}${(item * price).toFixed(
                                        2
                                      )}`}
                                    </span> */}
                                      </button>
                                     <button
                                        // onClick={() => handleAddToCart(product)}
                                        className="
                                          text-sm leading-4 inline-flex items-center cursor-pointer
                                          transition ease-in-out duration-300 font-semibold font-serif
                                          text-center justify-center rounded-md focus-visible:outline-none
                                          focus:outline-none px-2 border border-cyan-600 bg-white
                                          hover:bg-cyan-600 hover:text-white text-cyan-600
                                          py-4 md:py-3.5 lg:py-4 w-full md:h-12 h-10
                                        "
                                        onClick={(event) => handleAddItems(event, product)}
                                      >
                                        {t("Buy Now")}
                                      </button>

                                        {showPrescriptionBtn && (
                                            <button
                                              className="text-sm leading-4 inline-flex items-center cursor-pointer transition
                                                ease-in-out duration-300 font-semibold text-center justify-center rounded-md
                                                focus-visible:outline-none focus:outline-none px-2 bg-red-600 border border-red-600
                                                hover:bg-white hover:text-red-600 text-white py-4 md:py-3.5 lg:py-4 w-full md:h-12 h-10"
                                              onClick={() => console.log("Upload prescription modal open")}
                                            >
                                              Upload Prescription
                                            </button>
                                          )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             
              {/* related products */}
        {showProduct?.length >= 2 && (
  <div className="pt-10 lg:pt-20 lg:pb-10">
    <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold hover:text-gray-600">
      {t("common:relatedProducts")}
    </h3>

    <div className="w-full">
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-5
          2xl:grid-cols-5
          gap-3
        "
      >
        {showProduct?.slice(1, 13).map((product, i) => (
          <ProductCard
            key={product._id}
            product={product}
            attributes={attributes}
          />
        ))}
      </div>
    </div>
  </div>
)}

{/* Reviews Section */}
<>
  <section id="reviews" className="mt-8 sm:mt-10 lg:mt-12">
    <Review
      product={product}
      customer={userInfo}
      order={order}
      ratings={ratings}
    />
    <ReviewList reviews={ratings} />
  </section>
</>

             </div>
          </div>
        </Layout>
      )}
    </>
  );
};

// you can use getServerSideProps alternative for getStaticProps and getStaticPaths

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: "",
      slug: slug,
    }),

    AttributeServices.getShowingAttributes({}),
  ]);
  let product = {};

  let ratings = [];

  if (slug) {
    product = data?.products?.find((p) => p.slug === slug);
    const [d] = await Promise.all([RatingServices.getAllRatings(product._id)]);
    ratings = d;
  }

  return {
    props: {
      product,
      ratings,
      relatedProducts: data?.relatedProducts,
      attributes,
    },
  };
};

export default ProductScreen;
