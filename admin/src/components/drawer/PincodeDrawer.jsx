import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
// import * as XLSX from "xlsx";

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
import usePincodeSubmit from "@/hooks/usePincodeSubmit";

// import useBrandSubmit from "@/hooks/useBrandSubmit";

const PincodeDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    register,
    onSubmit,
    handleSubmit,
    errors,
    published,
    setPublished,
    isSubmitting,
  } = usePincodeSubmit(id);

  const [jsonData, setJsonData] = useState(null);

  // useEffect(() => {
  //   console.log(jsonData);
  // }, [jsonData]);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const input = document.querySelector(".bulk input");
      if (input) {
        input.setAttribute("accept", ".json");
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            title={t("Update Pincode")}
            description={t(" ")}
          />
        ) : (
          <Title
            register={register}
            title={"Add pincode"}
            description={t(" ")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Pincode")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={false}
                  register={register}
                  label="Pincode title"
                  name="name"
                  type="text"
                  placeholder={"Enter Pincode here"}
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
              <LabelArea label={t("Branch name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={false}
                  register={register}
                  label="Branch"
                  name="branch"
                  type="text"
                  placeholder={"Branch name"}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 bulk">
              <LabelArea label={"Bulk Upload"} />
              <div className="col-span-8 sm:col-span-4">
                <div className="relative flex items-center justify-center w-full px-4 py-6 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                  <InputArea
                    required={false}
                    register={register}
                    label="bulk"
                    type="file"
                    accept=".json"
                    name="bulk"
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Pincode" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default PincodeDrawer;
