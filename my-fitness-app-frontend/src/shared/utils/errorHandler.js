export const parseBackendError = (error) => {
  const response = error?.response?.data;

  // Default fallback response structure
  const parsedResult = {
    globalMessage: 'An unexpected error occurred. Please try again.',
    fieldErrors: {},
    isPremiumRequired: false,
    statusCode: error?.response?.status || 500,
  };

  if (!response) {
    if (error.message) parsedResult.globalMessage = error.message;
    return parsedResult;
  }

  // Handle Paywall/Premium Required (HTTP 402)
  if (error.response.status === 402 || response.premiumRequired) {
    parsedResult.isPremiumRequired = true;
    parsedResult.globalMessage = response.message || 'Premium subscription required';
    return parsedResult;
  }

  // Handle Zod Field Errors Array from backend
  if (Array.isArray(response.errors)) {
    response.errors.forEach((errObj) => {
      if (errObj.field && errObj.message) {
        // Normalize nested fields: "profile.height" -> "profile_height" or "height"
        const normalizedFieldKey = errObj.field.replace('.', '_');
        parsedResult.fieldErrors[normalizedFieldKey] = errObj.message;
        parsedResult.fieldErrors[errObj.field] = errObj.message; // preserve original key as well
      }
    });
    parsedResult.globalMessage = response.message || 'Please correct the highlighted errors.';
  } else if (response.message) {
    parsedResult.globalMessage = response.message;
  }

  return parsedResult;
};