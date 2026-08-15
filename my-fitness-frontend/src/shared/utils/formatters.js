/**
 * Format currency in Indian Rupees (INR) or specified currency.
 * @param {number} amount - Numeric amount to format.
 * @param {string} currency - Currency code (default: 'INR').
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format ISO date string into readable format (e.g., "15 Aug 2026").
 * @param {string|Date} date - Date string or Date object.
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format duration in seconds to "MM:SS" or human-readable format.
 * @param {number} totalSeconds - Duration in seconds.
 */
export const formatDuration = (totalSeconds = 0) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Capitalize first letter of each word.
 * @param {string} str - String to capitalize.
 */
export const capitalizeWords = (str = '') => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};