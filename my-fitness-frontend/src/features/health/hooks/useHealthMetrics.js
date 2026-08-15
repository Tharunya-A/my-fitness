import { useState, useEffect, useCallback } from 'react';
import { getHealthMetrics, logBiomarker } from '../api/health.api.js';

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHealthMetrics();
      setMetrics(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch health metrics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMetric = async (metricData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newEntry = await logBiomarker(metricData);
      setMetrics((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to record metric.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, isLoading, error, fetchMetrics, addMetric };
};