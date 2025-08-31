import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import RoleAndPermissionServices from "@/services/RoleAndPermissionServices";

const useRolePermissionSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
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
    return obj;
  };



  const onSubmit = async ({ name }) => {
    try {
      setIsSubmitting(true);

      const roleData = {
        name: handleRemoveEmptyKey({
          [language]: name,
        }),
        // permissions: permissions,
        status: published ? "show" : "hide",
        lang: language,
      };

      if (id) {
        const res = await RoleAndPermissionServices.updateRole(id, roleData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await RoleAndPermissionServices.addRole(roleData);
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
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
    //   setValue("permissions");
      setPublished(true);
      clearErrors("name");
    //   clearErrors("permissions");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await RoleAndPermissionServices.getRoleById(id);
          // console.log("res category", res);

          if (res) {
            setResData(res);
            setValue("name", res.name[language ? language : "en"]);
            // setValue( "permissions",res.permissions);
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

export default useRolePermissionSubmit;
