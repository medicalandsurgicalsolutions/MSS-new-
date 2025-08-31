import React, { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

//internal import
import useAsync from "@/hooks/useAsync";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import Container from "@/components/image-uploader/Container";

const Uploader = ({ setImageUrl, imageUrl, product, folder }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: product,
    maxSize: 500000,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ errors }) => {
        errors.forEach((e) => notifyError(e.message));
      });
    }
  }, [fileRejections]);

  useEffect(() => {
    if (files.length > 0) {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => formData.append(product ? "images" : "image", file));

      const data = axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/upload/${product ? "multiple" : "single"}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          // console.log("Upload Response Image :", res.data);
          notifySuccess("Image Uploaded successfully!");
          setLoading(false);
          setImageUrl(product ? res.data.imageUrls : res.data.imageUrl);
        })
        .catch((err) => {
          notifyError(err.response?.data?.message || "Upload failed!");
          setLoading(false);
        });
    }
  }, [files]);

  const handleRemoveImage = (img) => {
    setImageUrl((prev) => (product ? prev.filter((i) => i !== img) : ""));
    notifyError("Image deleted successfully!");
  };

  return (
    <div className="w-full text-center">
      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-emerald-500" />
        </span>
        <p className="text-sm mt-2">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>
      <div className="text-emerald-500">{loading && "Uploading..."}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container setImageUrl={setImageUrl} imageUrl={imageUrl} handleRemoveImage={handleRemoveImage} />
          </DndProvider>
        ) : imageUrl ? (
          <div className="relative">
            <img className="border rounded-md w-24 max-h-24 p-2" src={imageUrl} alt="product" />
            <button type="button" className="absolute top-0 right-0 text-red-500" onClick={() => handleRemoveImage(imageUrl)}>
              <FiXCircle />
            </button>
          </div>
        ) : (
          files.map((file) => (
            <div key={file.name}>
              <img className="border-2 border-gray-100 w-24 max-h-24" src={file.preview} alt={file.name} />
            </div>
          ))
        )}
      </aside>
    </div>
  );
};

export default Uploader;
