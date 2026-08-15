import { useState } from 'react';

export const useFormErrors = () => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  const handleError = (error) => {
    const responseData = error.response?.data;

    if (responseData?.errors && Array.isArray(responseData.errors)) {
        const mappedErrors = {};
        responseData.errors.forEach((err) => {
        if (err.field) {
            // Convert field names (e.g., "WeekStartDate" -> "weekStartDate")
            const camelField = err.field.charAt(0).toLowerCase() + err.field.slice(1);
            mappedErrors[camelField] = err.message;
        }
        });

        setFieldErrors(mappedErrors);
        setGlobalError(responseData.message || 'Validation failed');
    } else {
        setGlobalError(responseData?.message || error.message || 'An unexpected error occurred');
    }
  };

  const clearAllErrors = () => {
    setFieldErrors({});
    setGlobalError('');
  };

  return { fieldErrors, globalError, handleError, clearAllErrors };
};