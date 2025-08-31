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
import useClientSubmit from "@/hooks/useClientSubmit";
import Uploader from "../image-uploader/Uploader";
import usePartnerSubmit from "@/hooks/usePartnerSubmit";
// import useBrandSubmit from "@/hooks/useBrandSubmit";

const PartnerDrawer = ({ id }) => {

    const { t } = useTranslation();

    const {
        register,
        onSubmit,
        handleSubmit,
        errors,
        published,
        setPublished,
        handleSelectLanguage,
        isSubmitting,
        imageUrl,
        setImageUrl,
    } = usePartnerSubmit(id);


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
                        title={"Add Partner"}
                        description={t("AddBrandDescription")}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Name")} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Partner title"
                                    name="name"
                                    type="text"
                                    placeholder={"Partner Name"}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
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
                        </div> */}

<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Image"} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="Partner"
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
                                    placeholder={"Partner Website"}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Published")} />
                            <div className="col-span-8 sm:col-span-4">
                                <SwitchToggle
                                    handleProcess={setPublished}
                                    processOption={published}
                                />
                            </div>
                        </div> */}
                    </div>

                    <DrawerButton id={id} title="Partner" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default PartnerDrawer;
