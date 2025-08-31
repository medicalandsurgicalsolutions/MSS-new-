import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import DepartmentService from "@/services/DepartmentService";
// import useTranslationValue from "./useTranslationValue";

const useDepartmentSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
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

  const onSubmit = async ({ name, description }) => {
    try {
      setIsSubmitting(true);

      const departmentData = {
        name: handleRemoveEmptyKey({
          [language]: name,
        }),
        description: handleRemoveEmptyKey({
          [language]: description || "",
        }),
        status: published ? "show" : "hide",
        lang: language,
      };

      if (id) {
        const res = await DepartmentService.updateDepartment(id, departmentData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await DepartmentService.addDepartment(departmentData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
        // console.log(err);
        
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
      setPublished(true);
      clearErrors("name");
      clearErrors("description");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await DepartmentService.getDepartmentById(id);
          // console.log("res category", res);

          if (res) {
            setResData(res);
            setValue("name", res.name[language ? language : "en"]);
            setValue(
              "description",
              res.description[language ? language : "en"]
            );
            setValue("language", language);
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
    errors,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useDepartmentSubmit;
