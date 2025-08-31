import PageTitle from '@/components/Typography/PageTitle'
import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react'
import { Select, Button } from '@windmill/react-ui';
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { FiUploadCloud } from "react-icons/fi";
import { notifyError, notifySuccess } from '@/utils/toast';
import CSVUploadService from '@/services/CSVUploadService';
import { SidebarContext } from '@/context/SidebarContext';
import LanguageServices from '@/services/LanguageServices';
import useAsync from '@/hooks/useAsync';

const BulkImports = () => {

    const { t } = useTranslation();

    const { data, error, loading: langLoading } = useAsync(LanguageServices.getShowingLanguage);
    const { lang } = useContext(SidebarContext);


    const [formData, setFormdata] = useState({
        file: null,
    });
    const [loading, setLoading] = useState(false); // Initialize loading state
    const [template, setTemplate] = useState("");
    const [language, setLanguage] = useState("");
    const [fileName, setFileName] = useState('');
    const [dragActive, setDragActive] = useState(false);

    // Submit handler
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formData.file) {
            notifyError("Please select a file to upload.");
            return;
        }
        if (language === "") {
            notifyError("Please select a Language.");
            return;
        }
        if (template === "") {
            notifyError("Please select a Template.");
            return;
        }
        setLoading(true);
        try {
            const data = new FormData();
            data.append("file", formData.file);
            data.append("template", template);
            data.append("language", language);
            await CSVUploadService.uploadCSV(data);

            notifySuccess("File uploaded and data saved successfully.");

            setLanguage("");
            setFormdata({
                file: null
            })
            setTemplate("")
            setFileName("")
        } catch (error) {
            // console.log(error);
            
            notifyError("Failed to upload the file.");
        } finally {
            setLoading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            setFileName(files[0].name);
            setFormdata({ ...formData, file: files[0] });
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFileName(files[0].name);
            setFormdata({ ...formData, file: files[0] });
        }
    };

    // Function to download sample CSV
    const handleDownloadSample = () => {

        if (template === "") {
            notifyError("Please select a Template.");
            return;
        }
        let sampleCSVContent = "";

        if (template === "department") {
            sampleCSVContent = "data:text/csv;charset=utf-8,name,description";
        } else if (template === "brand") {
            sampleCSVContent = "data:text/csv;charset=utf-8,name,description,website";
        } 
        // else if (template === "category") {
        //     sampleCSVContent = "data:text/csv;charset=utf-8,name,description,department,parentCategory,metaKeyword";
        // }
         else if (template === "product") {
            sampleCSVContent = "data:text/csv;charset=utf-8,title,variant,value,isCodAvaialble,description,sku,hsm,barcode,brand,categories,stock,tag,originalPrice,salePrice,moq,packing,metatitle,metadescription,deliveryCharge,productRefrenceNo";
        }

        const encodedUri = encodeURI(sampleCSVContent);
        const link = document.createElement("a");

        // Name the file dynamically based on the selected template
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${template}-sample.csv`);

        // Append and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up after download
        document.body.removeChild(link);
    };


    return (
        <div>
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between w-full">
                <PageTitle>{t("BulkImport")}</PageTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 my-4 gap-4">
                    <Select onChange={(e) => { setLanguage(e.target.value) }}>
                        <option value="" defaultValue>Select Language</option>
                        {!error && !langLoading && data?.map((lang) => (
                            <option key={lang._id} value={lang.iso_code}>
                                {lang.iso_code}{" "}
                            </option>
                        ))}
                    </Select>
                    <Select onChange={(e) => { setTemplate(e.target.value) }}>
                        <option value="" defaultValue>Select Template</option>
                        {/* <option value="department">Department</option> */}
                        <option value="brand">Brand</option>
                        <option value="category">Category</option>
                        <option value="product">Product</option>
                    </Select>
                    <Button
                        disabled={template === ""}
                        type="button"
                        className="w-full h-12 col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"
                        onClick={handleDownloadSample} // Download sample on click
                    >
                        <span className="font-serif ml-2 font-light">Download Sample</span>
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <form onSubmit={onSubmit}>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer mb-4 h-[360px] 
                        flex flex-col justify-center items-center 
                        ${!dragActive ? 'border-gray-300 bg-transparent' : 'border-gray-300 bg-transparent'}`}
                        onClick={() => document.getElementById('file-upload').click()} // Trigger file input on click
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        disabled={loading}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".csv"
                        />
                        <FiUploadCloud className="h-[108px] w-[108px] text-gray-500" />
                        <label
                            htmlFor="file-upload"
                            className="text-gray-500 text-sm text-center"
                        >Drag & Drop your CSV file here or click to upload</label>
                        {fileName && <p className="mt-2 text-lg text-emerald-600">Selected file: {fileName}</p>}
                    </div>

                    {loading ? (
                        <Button disabled={true} type="button" className="w-full h-12">
                            <img
                                src={spinnerLoadingImage}
                                alt="Loading"
                                width={20}
                                height={10}
                            />{" "}
                            <span className="font-serif ml-2 font-light">Processing</span>
                        </Button>
                    ) : (
                        <Button disabled={formData.file == null} type="submit" className="w-full h-12">
                            <span className="font-serif ml-2 font-light">Upload</span>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default BulkImports;
