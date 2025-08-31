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
import Uploader from "../image-uploader/Uploader";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    Button,
    Input,
    TableCell,
    TableContainer,
    TableHeader,
    Textarea,
    Table,
  } from "@windmill/react-ui";
// import useBrandSubmit from "@/hooks/useBrandSubmit";

const BlogDrawer = ({ id }) => {

    const { t } = useTranslation();

    const {
        register,
        onSubmit,
        handleSubmit,
        errors,
        slug,
        published,
        description,
        setDescription,
        handleProductSlug,
        setPublished,
        handleSelectLanguage,
        isSubmitting,
        imageUrl,
        setImageUrl,
    } = useBlogSubmit(id);    

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
                        title={"Add Blog"}
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
                                {/* <InputArea
                                    required={true}
                                    register={register}
                                    label="Blog title"
                                    name="name"
                                    type="text"
                                    placeholder={"Blog Name"}
                                    onBlur={(e) => handleProductSlug(e.target.value)}
                                /> */}
                                <Input
                                    {...register(`name`, {
                                    required: "Title is required!",
                                    })}
                                    name="name"
                                    type="text"
                                    placeholder={"Blog Name"}
                                    onBlur={(e) => handleProductSlug(e.target.value)}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={"Blog Description"} />
                            <div className="col-span-8 sm:col-span-4">
                            {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}
                            <ReactQuill
                                theme="snow"
                                className="bg-gray-100 border border-gray-200 text-sm"
                                value={description} // Bind the editor's value to state
                                onChange={(value) => setDescription(value)} // Update the state on change
                                placeholder={"Blog Description"}
                            />
                            {errors.description && <Error errorName={errors.description} />}
                            </div>
                        </div>


                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={"Meta Title"} />
                            <div className="col-span-8 sm:col-span-4">
                                <Input
                                    {...register(`metatitle`, {
                                    required: "Title is required!",
                                    })}
                                    name="metatitle"
                                    type="text"
                                    placeholder={"Meta Title"}
                                />
                                <Error errorName={errors.metatitle} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={"Meta Description"} />
                            <div className="col-span-8 sm:col-span-4">
                                <Input
                                    {...register(`metadescription`, {
                                    required: "Title is required!",
                                    })}
                                    name="metadescription"
                                    type="text"
                                    placeholder={"Meta Description"}
                                />
                                <Error errorName={errors.metadescription} />
                            </div>
                        </div>

<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Image"} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="blog"
                />
              </div>
            </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={"Blog Slug"} />
                    <div className="col-span-8 sm:col-span-4">
                        <Input
                            {...register(`slug`, {
                            required: "slug is required!",
                            })}
                            className=" mr-2 p-2"
                            name="slug"
                            type="text"
                            value={slug}
                            defaultValue={slug}
                            placeholder={"Blog Slug"}
                            // onBlur={(e) => handleProductSlug(e.target.value)}
                        />
                        <Error errorName={errors.slug} />
                    </div>
                </div>

                        {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Website")} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    required={true}
                                    register={register}
                                    label="Website"
                                    name="website"
                                    type="text"
                                    placeholder={"Client Website"}
                                />
                                <Error errorName={errors.name} />
                            </div>
                        </div> */}

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

                    <DrawerButton id={id} title="Blog" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default BlogDrawer;
