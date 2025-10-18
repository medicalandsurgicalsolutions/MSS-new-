import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";

//internal import
import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import Uploader from "@/components/image-uploader/Uploader";
import TextAreaCom from "@/components/form/others/TextAreaCom";
import StoreSubmitButton from "../store-home/StoreSubmitButton";

const SeoSetting = ({
  errors,
  register,
  isSave,
  favicon,
  setFavicon,
  metaImg,
  setMetaImg,
  isSubmitting,
}) => {
  const { t } = useTranslation();
    console.log("Rendering SeoSetting ✅");
  return (
    <>
      <StoreSubmitButton isSubmitting={isSubmitting} isSave={isSave}/>
      <div className="grid grid-cols-12 font-sans">
        <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3 ">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3 relative">
            <FiSettings className="mt-1 mr-2" />
            Seo Settings
          </div>

          <hr className="md:mb-12 mb-2" />
          <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("Favicon")}
              </label>
              <div className="sm:col-span-3">
                <Uploader imageUrl={favicon} setImageUrl={setFavicon} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaTitle")}
              </label>
              <div className="sm:col-span-3">
                <InputAreaTwo
                  register={register}
                  label={t("MetaTitle")}
                  name="meta_title"
                  type="text"
                  placeholder={t("MetaTitle")}
                />
                <Error errorName={errors.meta_title} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaDescription")}
              </label>
              <div className="sm:col-span-3">
                <TextAreaCom
                  required={true}
                  register={register}
                  label={t("MetaDescription")}
                  name="meta_description"
                  type="text"
                  placeholder={t("MetaDescription")}
                />
                <Error errorName={errors.meta_description} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaUrl")}
              </label>
              <div className="sm:col-span-3">
                <InputAreaTwo
                  register={register}
                  label={t("MetaUrl")}
                  name="meta_url"
                  type="text"
                  placeholder={t("MetaUrl")}
                />
                <Error errorName={errors.meta_url} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaKeyword")}
              </label>
              <div className="sm:col-span-3">
                <TextAreaCom
                  register={register}
                  label={t("MetaKeyword")}
                  name="meta_keywords"
                  type="text"
                  placeholder={t("MetaKeyword")}
                />
                <Error errorName={errors.meta_keywords} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaImage")}
              </label>
              <div className="sm:col-span-3">
                <Uploader imageUrl={metaImg} setImageUrl={setMetaImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeoSetting;
