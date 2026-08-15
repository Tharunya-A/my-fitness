import apiClient from '../../../config/api.config.js';

export const healthApi = {

  getMedicalReports: async () => {
    const response = await apiClient.get('/health/reports');
    return response.data;
  },

  getHealthMetrics: async () => {
    const response = await apiClient.get('/health/metrics');
    return response.data;
  },
  // POST /health/metrics
  logMetrics: async (metricsData) => {
    const response = await apiClient.post('/health/metrics', metricsData);
    return response.data;
  },

  // GET /health/history
  getHistory: async () => {
    const response = await apiClient.get('/health/history');
    return response.data;
  },

  // POST /health/pdf/upload (Multipart form data)
  uploadPdf: async (formData) => {
    const response = await apiClient.post('/health/pdf/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // GET /health/pdf/history
  getPdfHistory: async () => {
    const response = await apiClient.get('/health/pdf/history');
    return response.data;
  },

  // POST /health/pdf/analyze
  analyzePdf: async (pdfId) => {
    const response = await apiClient.post('/health/pdf/analyze', { pdfId });
    return response.data;
  },
};