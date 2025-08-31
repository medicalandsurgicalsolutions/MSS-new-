import requests from "./httpService";

const CSVUploadService = {
    
    uploadCSV: async (formData) => {
      // console.log("FORM DATA ", formData);
      
        return requests.post("/uploads/upload-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    },
};

export default CSVUploadService;
