/**
 * Formats a date into a readable string
 * @param {string|Date} date - The date to format
 * @param {string} format - The format type ('full', 'short', 'time', 'datetime', 'relative')
 * @param {object} options - Additional formatting options
 * @returns {string} - The formatted date string
 */
export const formatDate = (date, format = 'full', options = {}) => {
  if (!date) return '';

  // Convert to Date object if string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Return empty string for invalid dates
  if (isNaN(dateObj)) return '';

  // Handle different format types
  switch (format) {
    case 'full':
      // Example: "January 1, 2023"
      return dateObj.toLocaleDateString(options.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      });

    case 'short':
      // Example: "01/01/2023"
      return dateObj.toLocaleDateString(options.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...options
      });

    case 'time':
      // Example: "14:30" or "2:30 PM" depending on locale
      return dateObj.toLocaleTimeString(options.locale, {
        hour: '2-digit',
        minute: '2-digit',
        ...options
      });

    case 'datetime':
      // Example: "Jan 1, 2023, 2:30 PM"
      return dateObj.toLocaleString(options.locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...options
      });

    case 'relative':
      // Return relative time (e.g., "2 hours ago", "yesterday")
      return formatRelativeTime(dateObj);

    case 'month-year':
      // Example: "January 2023"
      return dateObj.toLocaleDateString(options.locale, {
        year: 'numeric',
        month: 'long',
        ...options
      });

    case 'weekday':
      // Example: "Monday"
      return dateObj.toLocaleDateString(options.locale, {
        weekday: 'long',
        ...options
      });

    case 'iso':
      // ISO format: YYYY-MM-DD
      return dateObj.toISOString().split('T')[0];

    default:
      return dateObj.toLocaleString(options.locale, options);
  }
};

/**
 * Formats a date as a relative time (e.g., "2 hours ago", "yesterday")
 * @param {Date} date - The date to format
 * @returns {string} - The relative time string
 */
const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Future dates
  if (diffInSeconds < 0) {
    return formatDate(date, 'datetime');
  }
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  }
  
  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  
  // Less than a year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  
  // More than a year
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

/**
 * Format a date range
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @param {string} format - The format for the individual dates
 * @param {object} options - Additional formatting options
 * @returns {string} - The formatted date range
 */
export const formatDateRange = (startDate, endDate, format = 'short', options = {}) => {
  if (!startDate || !endDate) return '';
  
  const start = formatDate(startDate, format, options);
  const end = formatDate(endDate, format, options);
  
  return `${start} - ${end}`;
};

/**
 * Returns a standardized date object for form inputs
 * @param {string|Date} date - The date to format
 * @param {string} type - The input type ('date', 'datetime-local', 'time')
 * @returns {string} - The formatted date string for the input
 */
export const getInputDateValue = (date, type = 'date') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj)) return '';
  
  // ISO string format: "2023-01-01T14:30:00.000Z"
  const isoString = dateObj.toISOString();
  
  switch (type) {
    case 'date':
      // Returns: "2023-01-01"
      return isoString.split('T')[0];
      
    case 'datetime-local':
      // Returns: "2023-01-01T14:30"
      return isoString.substring(0, 16);
      
    case 'time':
      // Returns: "14:30"
      return isoString.substring(11, 16);
      
    default:
      return isoString;
  }
};

export default {
  formatDate,
  formatDateRange,
  getInputDateValue
}; 