import React from "react";
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
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import ReactQuill from "react-quill";

// internal imports
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
  const { currency, showingTranslateValue } = useUtilsFunction();

  // ✅ SAFE async data
  const { data: brands } = useAsync(BrandServices.getAllBrands);

  // ✅ FIXED cod list (_id must NOT be boolean)
  const codList = [
    { _id: "true", name: "Yes" },
    { _id: "false", name: "No" },
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
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    onCloseModal,
    description,
    isBulkUpdate,
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

  return (
    <>
      {/* IMAGE MODAL */}
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <UploaderThree
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleSelectImage={handleSelectImage}
        />
      </Modal>

      {/* HEADER */}
      <div className="p-6 border-b bg-gray-50">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t("UpdateProduct") : t("DrawerAddProduct")}
          description={
            id
              ? t("UpdateProductDescription")
              : t("AddProductDescription")
          }
        />
      </div>

      {/* TABS */}
      <div className="border-b bg-gray-700 text-gray-300">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex">
          <ActiveButton
            tapValue={tapValue}
            activeValue="Basic Info"
            handleProductTap={handleProductTap}
          />

          {isCombination && (
            <ActiveButton
              tapValue={tapValue}
              activeValue="Combination"
              handleProductTap={handleProductTap}
            />
          )}
        </ul>
      </div>

      {/* BODY */}
      <Scrollbars className="w-full md:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* BASIC INFO */}
          {tapValue === "Basic Info" && (
            <div className="p-6 pb-40">

              {/* TITLE */}
              <LabelArea label={t("ProductTitleName")} />
              <Input
                {...register("title", { required: true })}
                onBlur={(e) => handleProductSlug(e.target.value)}
              />
              <Error errorName={errors.title} />

              {/* BRAND */}
              <LabelArea label={t("ProductBrandName")} />
              {/* Safe fallback for async brands */}
                <CustomSelect
                  register={register}
                  label="Select Brand"
                  name="brand"
                  objectList={brands || []}
                />

              <Error errorName={errors.brand} />

              {/* DESCRIPTION */}
              <LabelArea label={t("ProductDescription")} />
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />

              {/* IMAGE */}
              <LabelArea label={t("ProductImage")} />
              <Uploader
                product
                folder="product"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />

              {/* CATEGORY */}
              <LabelArea label={t("Category")} />
              <ParentCategory
                lang={language}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setDefaultCategory={setDefaultCategory}
              />

              {/* DEFAULT CATEGORY */}
              <LabelArea label={t("DefaultCategory")} />
              <Multiselect
                displayValue="name"
                singleSelect
                selectedValues={defaultCategory}
                options={selectedCategory || []}
                onSelect={(v) => setDefaultCategory(v)}
              />

              {/* COD */}
              <LabelArea label="COD Available" />
              <CustomSelect
                register={register}
                label="COD Available"
                name="isCodAvaialble"
                objectList={codList}
              />

              {/* TAGS */}
              <LabelArea label={t("ProductTag")} />
              <ReactTagInput tags={tag} onChange={setTag} />
            </div>
          )}

          {/* COMBINATION */}
          {tapValue === "Combination" && isCombination && (
            <div className="p-6">
              <MultiSelect
                options={attTitle || []}
                value={attributes}
                onChange={handleAddAtt}
              />

              {attributes?.map((attribute, i) => (
                <div key={attribute?._id || i}>
                  <AttributeOptionTwo
                    id={i + 1}
                    values={values}
                    attributes={attribute}
                    setValues={setValues}
                  />
                </div>
              ))}
            </div>
          )}

          <DrawerButton
            id={id}
            title="Product"
            save
            isSubmitting={isSubmitting}
          />
        </form>

        {/* VARIANTS TABLE */}
        {isCombination && variantTitle.length > 0 && (
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>{t("Image")}</TableCell>
                  <TableCell>{t("Combination")}</TableCell>
                  <TableCell>{t("Sku")}</TableCell>
                  <TableCell>{t("Price")}</TableCell>
                  <TableCell>{t("QuantityTbl")}</TableCell>
                  <TableCell>{t("Action")}</TableCell>
                </tr>
              </TableHeader>

              <AttributeListTable
                variants={variants}
                variantTitle={variantTitle}
                handleSkuBarcode={handleSkuBarcode}
                handleEditVariant={handleEditVariant}
                handleRemoveVariant={handleRemoveVariant}
                handleQuantityPrice={handleQuantityPrice}
                handleSelectInlineImage={handleSelectInlineImage}
              />
            </Table>
          </TableContainer>
        )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
