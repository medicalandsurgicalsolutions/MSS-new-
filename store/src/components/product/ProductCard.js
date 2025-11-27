import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useRouter } from "next/router";

import Price from "@components/common/Price";
import { notifyError, notifySuccess } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import DUMMY_IMAGE from "@components/constants";
import { getUserSession } from "@lib/auth";
import { handleLogEvent } from "src/lib/analytics";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hasLocalPrescription, setHasLocalPrescription] = useState(false);

  const { addItem } = useCart();
  const { showingTranslateValue } = useUtilsFunction();
  const { globalSetting } = useGetSetting();
  const router = useRouter();
  const userInfo = getUserSession();
  const isMedicinePage = router.asPath.includes("medicines");

  const currency = globalSetting?.default_currency || "$";

  // Upload Prescription to backend
  const uploadPrescription = async (file) => {
    try {
      const formData = new FormData();
      formData.append("prescription", file);

      const token = localStorage.getItem("userToken") || localStorage.getItem("token");

      const res = await fetch(
        "https://www.medicalsurgicalsolutions.com/api/upload/prescription",
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem(`prescription_${product._id}`, data.url);
        setPreviewUrl(data.url);
        setHasLocalPrescription(true);
        notifySuccess("Prescription uploaded successfully!");
      } else {
        notifyError(data.message || "Upload failed!");
      }
    } catch (error) {
      console.error(error);
      notifyError("Upload error");
    }
  };

  // Handle file input
  const handlePrescriptionUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    await uploadPrescription(file);
  };

  // Load saved prescription on mount
  useEffect(() => {
    const saved = localStorage.getItem(`prescription_${product._id}`);
    if (saved) {
      setPreviewUrl(saved);
      setHasLocalPrescription(true);
    }
  }, [product._id]);

  // Add to cart handler (Buy Now)
  const handleAddItems = async (event, p) => {
    event.stopPropagation();

    if (p?.stock < 1) {
      notifyError("Insufficient stock!");
      return;
    }

    const savedPres = localStorage.getItem(`prescription_${p._id}`);

    if (isMedicinePage && !savedPres) {
      notifyError("Please upload prescription");
      return;
    }

    const newItem = {
      ...product,
      id: p._id,
      title: showingTranslateValue(p.title),
      price: p?.prices?.price,
      originalPrice: p?.prices?.originalPrice,
      quantity: 1,
      prescriptionUrl: isMedicinePage ? savedPres : null,
    };

    if (!userInfo) {
      router.push(`/auth/login?redirectUrl=checkout`);
      return;
    }

    addItem(newItem);
    notifySuccess(`${p.title} added to cart! Redirecting...`);

    setTimeout(() => {
      router.push("/checkout");
    }, 400);
  };

  // Add to cart (without redirect)
  const handleAddToCartWithPrescription = () => {
    const savedPres = localStorage.getItem(`prescription_${product._id}`);

    if (isMedicinePage && !savedPres) {
      notifyError("Please upload prescription");
      return;
    }

    const newItem = {
      ...product,
      id: product._id,
      title: showingTranslateValue(product.title),
      price: product?.prices?.price,
      originalPrice: product?.prices?.originalPrice,
      quantity: 1,
      prescriptionUrl: isMedicinePage ? savedPres : null,
    };

    addItem(newItem);
    notifySuccess("Added to cart!");
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

      <div className="group box-border overflow-hidden flex rounded-md shadow-sm border-2 border-cyan-100 flex-col items-center bg-gray-50 relative">
        {/* Image */}
        <div
          onClick={() => {
            setModalOpen(true);
            handleLogEvent("product", `opened ${showingTranslateValue(product?.title)} modal`);
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
                style={{ objectFit: "contain" }}
                sizes="100%"
                alt="product"
                className="object-contain transition duration-150 ease-linear transform group-hover:scale-105"
              />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="w-full relative px-1 lg:px-4 pb-4">
          <h2 className="text-[13px] lg:text-xs font-medium text-gray-800">
            {showingTranslateValue(product?.title)}
          </h2>

          <Price
            card
            product={product}
            currency={currency}
            price={product?.prices?.price}
            originalPrice={product?.prices?.originalPrice}
          />

          {/* Upload Prescription */}
          {isMedicinePage && (
            <div className="mt-3 w-full flex flex-col items-center gap-3">
              <label
                htmlFor={`upload-prescription-${product._id}`}
                className="flex items-center gap-2 text-blue-600 cursor-pointer border rounded-md px-4 py-2 bg-gray-100 w-full justify-between"
              >
                Upload Prescription
                <span>{selectedFile ? selectedFile.name : "No file chosen"}</span>
                <input
                  type="file"
                  id={`upload-prescription-${product._id}`}
                  className="hidden"
                  accept="image/*"
                  onChange={handlePrescriptionUpload}
                />
              </label>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Prescription Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 w-full flex items-center justify-between gap-3">
            <button
              disabled={isMedicinePage && !hasLocalPrescription}
              className={`w-1/2 px-3 py-1 text-center rounded-md border ${
                isMedicinePage && !hasLocalPrescription
                  ? "border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed"
                  : "border-cyan-600 text-cyan-600 hover:text-white hover:bg-cyan-600"
              }`}
              onClick={handleAddToCartWithPrescription}
            >
              Add to Cart
            </button>

            <button
              disabled={isMedicinePage && !hasLocalPrescription}
              className={`w-1/2 px-3 py-1 text-center rounded-md border ${
                isMedicinePage && !hasLocalPrescription
                  ? "border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed"
                  : "border-green-500 text-green-500 hover:text-white hover:bg-green-500"
              }`}
              onClick={(e) => handleAddItems(e, product)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
