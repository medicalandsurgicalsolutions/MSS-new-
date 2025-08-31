import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import BrandServices from "@/services/BrandServices";
// import useTranslationValue from "./useTranslationValue";

const useBrandSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [slug, setSlug] = useState("");

  // const { handlerTextTranslateHandler } = useTranslationValue();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const handleRemoveEmptyKey = (obj) => {
    for (const key in obj) {
      if (obj[key].trim() === "") {
        delete obj[key];
      }
    }
    // console.log("obj", obj);
    return obj;
  };

  // console.log("lang", lang, language);

  // console.log("resData", resData);

  const onSubmit = async ({ name, description, website }) => {
    try {
      setIsSubmitting(true);

      const brandData = {
        name: handleRemoveEmptyKey({
          [language]: name,
        }),
        description: handleRemoveEmptyKey({
          [language]: description || "",
        }),
        slug: slug,
        icon: imageUrl,
        website: website.startsWith('http://') || website.startsWith('https://') ? website : `https://${website}`,
        status: published ? "show" : "hide",
        lang: language,
      };

      if (id) {
        const res = await BrandServices.updateBrand(id, brandData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await BrandServices.addBrand(brandData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("description");
      setValue("website");
      setImageUrl("");
      setPublished(true);
      setSlug("");
      clearErrors("name");
      clearErrors("description");
      clearErrors("website");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await BrandServices.getBrandById(id);
          // console.log("res category", res);

          if (res) {
            setResData(res);
            setSlug(res.slug);
            setValue("name", res.name[language ? language : "en"]);
            setValue(
              "description",
              res.description[language ? language : "en"]
            );
            setValue("language", language);
            setImageUrl(res.icon);
            setValue("website", res.website);
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, lang]);

    //for handle product slug
    const handleProductSlug = (value) => {
      setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
      setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    slug,
    published,
    handleProductSlug,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useBrandSubmit;
