import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import DrawerButton from "@/components/form/button/DrawerButton";
import useRolePermissionSubmit from "@/hooks/useRolePermissionSubmit";

const RoleAndPermissionDrawer = ({ id }) => {

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
    } = useRolePermissionSubmit(id);

    return (
        <>
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {id ? (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={t("UpdateRole")}
                        description={t("UpdateRoleDescription")}
                    />
                ) : (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={t("AddRoleTitle")}
                        description={t("AddRoleDescription")}
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
                                    label={t("RoleName")}
                                    name="name"
                                    type="text"
                                    placeholder={t("RoleName")}
                                />
                                <Error errorName={errors.name} />
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

                    <DrawerButton id={id} title="Role" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default RoleAndPermissionDrawer;
