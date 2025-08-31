import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import DrawerButton from "@/components/form/button/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useBrandSubmit from "@/hooks/useBrandSubmit";
import {
  Input,
} from "@windmill/react-ui";
// import useBrandSubmit from "@/hooks/useBrandSubmit";

const BrandDrawer = ({ id }) => {

    const { t } = useTranslation();

    const {
        register,
        onSubmit,
        handleSubmit,
        errors,
        handleProductSlug,
        published,
        imageUrl,
        slug,
        setImageUrl,
        setPublished,
        handleSelectLanguage,
        isSubmitting,
    } = useBrandSubmit(id);


    return (
        <>
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {id ? (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={t("UpdateBrand")}
                        description={t("UpdateBrandDescription")}
                    />
                ) : (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={t("AddBrandTitle")}
                        description={t("AddBrandDescription")}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Name")} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Brand title"
                                    name="name"
                                    type="text"
                                    placeholder={"Brand title"}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div> */}

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Name")} />
                            <div className="col-span-8 sm:col-span-4">
                                <Input
                                {...register(`name`, {
                                    required: "Name is required!",
                                })}
                                name="name"
                                type="text"
                                placeholder={"Brand title"}
                                onBlur={(e) => handleProductSlug(e.target.value)}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Description")} />
                            <div className="col-span-8 sm:col-span-4">
                                <TextAreaCom
                                    register={register}
                                    label="Description"
                                    name="description"
                                    type="text"
                                    placeholder="Brand Description"
                                />
                                <Error errorName={errors.description} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("CategoryIcon")} />
                            <div className="col-span-8 sm:col-span-4">
                                <Uploader
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                folder="category"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Website")} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Website"
                                    name="website"
                                    type="text"
                                    placeholder={"Brand Website"}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <LabelArea label={t("ProductSlug")} />
                                        <div className="col-span-8 sm:col-span-4">
                                          <Input
                                            {...register(`slug`, {
                                              required: "slug is required!",
                                            })}
                                            className=" mr-2 p-2"
                                            name="slug"
                                            type="text"
                                            defaultValue={slug}
                                            placeholder={t("ProductSlug")}
                                            // onBlur={(e) => handleProductSlug(e.target.value)}
                                          />
                                          <Error errorName={errors.slug} />
                                        </div>
                                      </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Published")} />
                            <div className="col-span-8 sm:col-span-4">
                                <SwitchToggle
                                    handleProcess={setPublished}
                                    processOption={published}
                                />
                            </div>
                        </div>
                    </div>

                    <DrawerButton id={id} title="Brand" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default BrandDrawer;
