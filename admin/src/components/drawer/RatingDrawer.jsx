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
import useRatingSubmit from "@/hooks/useRatingSubmit";
import Rating from "../rating/Rating";
import CustomSelect from "../form/selectOption/CustomSelect";
import CustomerServices from "@/services/CustomerServices";
import ProductServices from "@/services/ProductServices";
import useAsync from "@/hooks/useAsync";

const RatingDrawer = ({ id }) => {

    const { t } = useTranslation();

    const {
        register,
        onSubmit,
        handleSubmit,
        errors,
        published,
        setPublished,
        rating,
        setRating,
        handleSelectLanguage,
        isSubmitting,
    } = useRatingSubmit(id);

    const { data: customers } = useAsync(CustomerServices.getAllCustomers);
    const { data: products } = useAsync(ProductServices.getShowingProducts);


    // console.log(rating);
    
    return (
        <>
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {id ? (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={t("UpdateRating")}
                        description={t("UpdateRatingDescription")}
                    />
                ) : (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={t("AddRatingTitle")}
                        description={t("AddRatingDescription")}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Customer")} />
                            <div className="col-span-8 sm:col-span-4">
                                <CustomSelect register={register} label="Select Customer" name="customer" objectList={customers} />
                                <Error errorName={errors.customer} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Product")} />
                            <div className="col-span-8 sm:col-span-4">
                                <CustomSelect register={register} label="Select Product" name="product" objectList={products} />
                                <Error errorName={errors.product} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Rating")} />
                            <div className="col-span-8 sm:col-span-4">
                                <Rating 
                                    className="flex space-x-1"
                                    onRatingChange={setRating}
                                    initialRating={rating}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Comment")} />
                            <div className="col-span-8 sm:col-span-4">
                                <TextAreaCom
                                    required={true}
                                    register={register}
                                    label="Comment"
                                    name="comment"
                                    type="text"
                                    placeholder="Comment"
                                />
                                <Error errorName={errors.comment} />
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

                    <DrawerButton id={id} title="Rating" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default RatingDrawer;
