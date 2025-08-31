import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import RatingServices from "@/services/RatingServices";
// import useTranslationValue from "./useTranslationValue";

const useRatingSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);


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

  const onSubmit = async ({ customer, product, comment }) => {
    try {
      setIsSubmitting(true);

      const ratingData = {
        customer: customer,
        product: product,
        rating: Number(rating),
        comment: comment,
        status: published ? "show" : "hide",
        lang: language,
      };

      // console.log(ratingData);
      

      if (id) {
        const res = await RatingServices.updateRating(id, ratingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await RatingServices.addRating(ratingData);
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
      setValue("product", resData.product);
      setValue("customer", resData.customer);
      setValue("comment", resData.comment);
      setRating(resData.rating);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("product");
      setValue("customer");
      setRating(0)
      setValue("comment");
      setPublished(true);
      clearErrors("product");
      clearErrors("customer");
      clearErrors("comment");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await RatingServices.getRatingById(id);

          if (res) {
            setResData(res);
            setValue("product", res.product);
            setValue("customer", res.customer);
            setValue("language", language);
            setRating(res.rating);
            
            setValue("comment", res.comment);
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, lang]);

  return {
    rating,
    setRating,
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

export default useRatingSubmit;
