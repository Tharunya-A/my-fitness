import { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

export const ReportDropzone = ({ onFileUpload, isUploading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF document.');
      return;
    }
    setSelectedFile(file);
    if (onFileUpload) onFileUpload(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
        dragActive
          ? 'border-brand-red bg-red-50/50'
          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center">
          {selectedFile ? <FileText className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
        </div>

        <div>
          <p className="text-xs font-bold uppercase text-gray-800">
            {selectedFile ? selectedFile.name : 'Click to upload or drag & drop PDF'}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {isUploading ? 'Parsing report with AI...' : 'Blood reports, Lab results (PDF up to 10MB)'}
          </p>
        </div>

        {selectedFile && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> File Attached
          </span>
        )}
      </div>
    </div>
  );
};