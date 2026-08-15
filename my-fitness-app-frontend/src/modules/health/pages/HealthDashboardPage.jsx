import React, { useState } from 'react';
import { axiosClient } from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../config/api.config';
import { useFormErrors } from '../../../shared/hooks/useFormErrors';
import { BiomarkerChart } from '../components/BiomarkerChart';
import { Upload } from 'lucide-react';

// Sample biomarker telemetry data
const HEART_RATE_DATA = [
  { date: 'Mon', bpm: 68 },
  { date: 'Tue', bpm: 72 },
  { date: 'Wed', bpm: 70 },
  { date: 'Thu', bpm: 65 },
  { date: 'Fri', bpm: 74 },
  { date: 'Sat', bpm: 69 },
  { date: 'Sun', bpm: 67 },
];

export const HealthDashboardPage = () => {
  const { globalError, handleError, clearAllErrors } = useFormErrors();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    clearAllErrors();
    setUploading(true);

    const formData = new FormData();
    formData.append('report', selectedFile);

    try {
      await axiosClient.post(API_ENDPOINTS.HEALTH.UPLOAD_REPORT, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Medical report analyzed successfully!');
    } catch (err) {
      handleError(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Upload Lab / Medical Report</h3>
        <p className="text-xs text-gray-500 mb-4">Upload PDF or image files to extract biomarker trends automatically.</p>

        {globalError && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{globalError}</div>}

        <form onSubmit={handleFileUpload} className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="file"
            accept=".pdf,.png,.jpg"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 border rounded-xl p-2 bg-gray-50"
          />
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl disabled:opacity-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Processing...' : 'Upload'}
          </button>
        </form>
      </div>

      <BiomarkerChart
        title="Resting Heart Rate (BPM)"
        data={HEART_RATE_DATA}
        dataKey="bpm"
        unit=" bpm"
        color="#4F46E5"
      />
    </div>
  );
};