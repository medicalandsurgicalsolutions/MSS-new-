import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import ReactQuill from "react-quill";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import InputValue from "@/components/form/input/InputValue";
import useProductSubmit from "@/hooks/useProductSubmit";
import ActiveButton from "@/components/form/button/ActiveButton";
import InputValueFive from "@/components/form/input/InputValueFive";
import Uploader from "@/components/image-uploader/Uploader";
import ParentCategory from "@/components/category/ParentCategory";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import AttributeOptionTwo from "@/components/attribute/AttributeOptionTwo";
import AttributeListTable from "@/components/attribute/AttributeListTable";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";
import useAsync from "@/hooks/useAsync";
import BrandServices from "@/services/BrandServices";
import CustomSelect from "../form/selectOption/CustomSelect";

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  const { data: brands } = useAsync(BrandServices.getAllBrands);

  const codList = [
    {
      _id: true,
      name: "Yes",
    },
    {
      _id: false,
      name: "No",
    },
  ];

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
    attribue,
    setValues,
    variants,
    imageUrl, // might be string or array from hook
    setImageUrl, // hook setter (we'll keep it in sync)
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    onCloseModal,
    description,
    isBulkUpdate,
    globalSetting,
    setDescription,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
  } = useProductSubmit(id);

  const { currency, showingTranslateValue } = useUtilsFunction();

  const [productImage, setProductImage] = useState(
  Array.isArray(imageUrl) ? imageUrl : imageUrl ? [imageUrl] : []
);

// Sync when hook loads existing product (UPDATE)
useEffect(() => {
  setProductImage(Array.isArray(imageUrl) ? imageUrl : imageUrl ? [imageUrl] : []);
}, [imageUrl]);

// Sync back to hook (so update API receives correct image format)
useEffect(() => {
  if (setImageUrl) {
    if (productImage.length === 0) {
      setImageUrl("");
    } else if (productImage.length === 1) {
      setImageUrl(productImage[0]);
    } else {
      setImageUrl(productImage);
    }
  }
}, [productImage]);

    
  // Helper to detect multiple
  const hasMultiple = Array.isArray(productImage) && productImage.length > 1;

  // Remove single image or an image from array
  const handleRemoveImageLocal = (img) => {
    if (Array.isArray(productImage)) {
      setProductImage((prev = []) => prev.filter((i) => i !== img));
    } else {
      setProductImage([]);
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500  active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={productImage}
            setImageUrl={setProductImage}
            handleSelectImage={handleSelectImage}
            product // pass boolean to enable multiple in UploaderThree as well
          />
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Basic Info"
              handleProductTap={handleProductTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              {/* ... other fields unchanged ... */}

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  {/* pass product prop so dropzone allows multiple */}
                <Uploader
                    product        // allow multiple
                    folder="product"
                    imageUrl={productImage}
                    setImageUrl={setProductImage}
                  />

                  {/* Preview area: supports both array and single string */}
                <div className="flex flex-wrap mt-3 gap-2">
                    {Array.isArray(productImage) &&
                        productImage.map((img, index) => (
                          <div key={index} className="relative inline-block">
                            <img
                              src={img}
                              alt="product"
                              className="h-24 w-24 object-cover border rounded"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                              onClick={() => setProductImage(prev => prev.filter(i => i !== img))}
                            >
                              <FiXCircle />
                            </button>
                          </div>
                        ))}
                    </div>


              {/* Rest of your fields (SKU, HSN, price etc.) unchanged */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>

              {/* ... keep the rest exactly as in your original file ... */}

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaseholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Combination tab unchanged - keep your original content */}
          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4" role="alert">
                <div className="flex">
                  <div className="py-1">
                    <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}{" "}
                      <Link to="/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                  <MultiSelect options={attTitle} value={attributes} onChange={(v) => handleAddAtt(v)} labelledBy="Select" />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200">
                        {"Select"}
                        {showingTranslateValue(attribute?.title)}
                      </div>

                      <AttributeOptionTwo id={i + 1} values={values} lang={language} attributes={attribute} setValues={setValues} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes?.length > 0 && (
                    <Button onClick={handleGenerateCombination} type="button" className="mx-2">
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}

                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton id={id} save title="Product" isSubmitting={isSubmitting} handleProductTap={handleProductTap} />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Combination" && <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />}
        </form>

        {tapValue === "Combination" && isCombination && variantTitle.length > 0 && (
          <div className="px-6 overflow-x-auto">
            {isCombination && (
              <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>{t("Image")}</TableCell>
                      <TableCell>{t("Combination")}</TableCell>
                      <TableCell>{t("Sku")}</TableCell>
                      <TableCell>{t("Barcode")}</TableCell>
                      <TableCell>{t("Price")}</TableCell>
                      <TableCell>{t("SalePrice")}</TableCell>
                      <TableCell>{t("QuantityTbl")}</TableCell>
                      <TableCell className="text-right">{t("Action")}</TableCell>
                    </tr>
                  </TableHeader>

                  <AttributeListTable
                    lang={language}
                    variants={variants}
                    setTapValue={setTapValue}
                    variantTitle={variantTitle}
                    isBulkUpdate={isBulkUpdate}
                    handleSkuBarcode={handleSkuBarcode}
                    handleEditVariant={handleEditVariant}
                    handleRemoveVariant={handleRemoveVariant}
                    handleQuantityPrice={handleQuantityPrice}
                    handleSelectInlineImage={handleSelectInlineImage}
                  />
                </Table>
              </TableContainer>
            )}
          </div>
        )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
