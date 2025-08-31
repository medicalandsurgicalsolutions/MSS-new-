import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import ClientServices from "@/services/ClientServices";
// import useTranslationValue from "./useTranslationValue";

const useClientSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const clientData = {
        name: handleRemoveEmptyKey({
          [language]: name,
        }),
        icon: imageUrl,
        website: website.startsWith('http://') || website.startsWith('https://') ? website : `https://${website}`,
        status: published ? "show" : "hide",
        lang: language,
      };

      // console.log("Client Log ", clientData);

      if (id) {
        const res = await ClientServices.updateClient(id, clientData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await ClientServices.addClient(clientData);
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
      setImageUrl("");
      setValue("website");
      setPublished(true);
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
          const res = await ClientServices.getBrandById(id);
          // console.log("res category", res);

          if (res) {
            setResData(res);
            setValue("name", res.name[language ? language : "en"]);
            setImageUrl(res.icon);
            setValue("language", language);
            setValue("website", res.website);
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, lang]);

  return {
    register,
    handleSubmit,
    onSubmit,
    imageUrl,
    setImageUrl,
    errors,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useClientSubmit;
