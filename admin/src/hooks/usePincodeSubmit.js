import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import ClientServices from "@/services/ClientServices";
import PincodeService from "@/services/PincodeService";
// import useTranslationValue from "./useTranslationValue";

const usePincodeSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { handlerTextTranslateHandler } = useTranslationValue();

  const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      if (!file || file.type !== "application/json") {
        alert("Please upload a valid JSON file.");
        reject("Invalid file type");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          resolve(parsedData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          reject(error);
        }
      };

      reader.readAsText(file);
    });
  };

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

  const onSubmit = async ({ name, branch, bulk }) => {
    try {
      setIsSubmitting(true);
      let res;
      if (bulk.length === 0) {
        if (!name || !branch) {
          throw Error("Both fields are required");
        }
        if (isNaN(Number(name))) {
          throw Error("Pincode must be a number");
        }
        const data = { pincode: name, branch };
        res = await PincodeService.add(data);
      } else {
        const parsedJson = await handleFileUpload(bulk[0]).catch((e) => {
          return undefined;
        });
        if (parsedJson) {
          res = await PincodeService.addBulk(parsedJson);
        } else {
          throw Error("Failed to read file");
        }
      }
      setIsUpdate(true);
      setIsSubmitting(false);
      notifySuccess(res.message);
      closeDrawer();
      reset();
    } catch (err) {
      setIsSubmitting(false);
      if (err && err?.response?.status === 409) {
        notifyError(err.response.data.error_message);
      } else {
        notifyError(err.message);
      }
    }
  };

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
  };
};

export default usePincodeSubmit;
