import { useState, useEffect, useCallback } from 'react';
import { uploadMedicalReport, getMedicalReports } from '../api/health.api.js';

export const useReportUpload = () => {
  const [reports, setReports] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMedicalReports();
      setReports(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch medical reports.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadReport = async (file) => {
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('report', file);

      const uploaded = await uploadMedicalReport(formData);
      setReports((prev) => [uploaded, ...prev]);
      return uploaded;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to upload report.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, isUploading, isLoading, error, uploadReport, fetchReports };
};