import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Upload, FileText, CheckCircle } from "lucide-react";

const MedicinePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [savedPrescriptions, setSavedPrescriptions] = useState([]);

  // Handle drag/drop events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  // Handle file upload via input
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  // Save prescription files
  const handleSave = (fileName) => {
    setSavedPrescriptions((prev) => [...prev, fileName]);
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  // Continue button action
  const handleContinue = () => {
    alert("Proceeding with saved prescriptions...");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            {/* Upload Prescription Card */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Prescription</h2>
              <p className="text-slate-600 mb-6">Please attach a prescription to proceed</p>

              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 bg-slate-50 hover:border-slate-400"
                }`}
              >
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  accept=".jpeg,.jpg,.png,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="fileInput" className="cursor-pointer block">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Upload className="w-8 h-8 text-blue-600" />
                    <span className="text-lg font-semibold text-slate-900">UPLOAD NEW</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Drag and drop or click to select
                  </p>
                </label>
              </div>

              {/* Saved Prescriptions Button */}
              <div className="border-2 border-slate-300 rounded-lg p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <span className="text-lg font-semibold text-slate-900">
                    SAVED PRESCRIPTIONS
                  </span>
                </div>
              </div>
            </div>

            {/* Attached Prescription Card */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Attached Prescription</h3>

              {uploadedFiles.length === 0 && savedPrescriptions.length === 0 ? (
                <div className="bg-slate-100 rounded-lg p-8 flex items-center gap-4">
                  <FileText className="w-12 h-12 text-slate-400" />
                  <p className="text-slate-600">
                    Uploaded prescriptions will be shown here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-300 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{file.name}</p>
                          <p className="text-xs text-slate-600">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSave(file.name)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  ))}
                  {savedPrescriptions.map((name, idx) => (
                    <div
                      key={idx}
                      className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-center gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{name}</p>
                        <p className="text-xs text-green-600">Saved successfully</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={savedPrescriptions.length === 0}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                savedPrescriptions.length === 0
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              CONTINUE
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Guide for a valid prescription
              </h2>

              <div className="relative bg-slate-100 rounded-lg p-6 mb-8 border-2 border-slate-200">
                <img
                  src="/payment-method/prescription-image.jpg"
                  alt="Prescription"
                  className="rounded w-full"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Requirements:</h3>
                <ul className="space-y-3">
                  {[
                    "Don't crop out any part of the image",
                    "Avoid blurred image",
                    "Include details of doctor and patient + clinic visit date",
                    "Medicines will be dispensed as per prescription",
                    "Supported file types: jpeg, jpg, png, pdf",
                    "Maximum allowed file size: 5MB",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-slate-600 mt-6 pt-6 border-t border-slate-200">
                Government regulations require a valid prescription
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// ✅ export as client-only without "use client"
export default dynamic(() => Promise.resolve(MedicinePage), { ssr: false });
