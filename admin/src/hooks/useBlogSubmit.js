import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import BlogServices from "@/services/BlogServices";
// import useTranslationValue from "./useTranslationValue";

const useBlogSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

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

  const onSubmit = async (data) => {
    // console.log("Name ", data);
    try {
      setIsSubmitting(true);

      const clientData = {
        name: handleRemoveEmptyKey({
          [language]: data?.name,
        }),
        description: description,
        metatitle: data?.metatitle,
        metadescription: data?.metadescription,
        icon: imageUrl,
        slug: slug,
        // website: website.startsWith('http://') || website.startsWith('https://') ? website : `https://${website}`,
        status: published ? "show" : "hide",
        lang: language,
      };

    //   console.log("Client Log ", clientData);

      if (id) {
        const res = await BlogServices.updateBlog(id, clientData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await BlogServices.addBlog(clientData);
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
      setValue("description", resData.description);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("slug");
      setDescription("");
      setValue("metatitle");
      setValue("metadescription");
      setImageUrl("");
    //   setValue("website");
      setPublished(true);
      clearErrors("name");
    //   clearErrors("description");
    //   clearErrors("website");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await BlogServices.getBlogByIds(id);
          // console.log("res Blog", res);

          if (res) {
            setResData(res);
            setSlug(res?.slug);
            setValue("metatitle", res?.metatitle);
            setValue("metadescription", res?.metadescription);
            setValue("name", res.name[language ? language : "en"]);
            setImageUrl(res.icon);
            setValue("language", language);
            setDescription(res.description);
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, lang]);

  const handleProductSlug = (value) => {
    setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    imageUrl,
    setImageUrl,
    errors,
    setDescription,
    slug,
    description,
    published,
    handleProductSlug,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useBlogSubmit;
