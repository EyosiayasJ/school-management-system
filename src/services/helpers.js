/**
 * Helper functions for the mock API services
 * These utilities provide common functionality like simulating network delay,
 * generating mock data, and handling errors consistently
 */

/**
 * Simulates a network delay
 * @param {number} ms - The delay in milliseconds
 * @returns {Promise} A promise that resolves after the specified delay
 */
export const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random ID string
 * @returns {string} A random ID string
 */
export const generateId = () => Math.random().toString(36).substring(2, 15);

/**
 * Simulates a successful API response
 * @param {any} data - The data to include in the response
 * @param {number} delayMs - The delay in milliseconds
 * @returns {Promise} A promise that resolves with a mock API response
 */
export const mockSuccess = async (data, delayMs = 800) => {
  await delay(delayMs);
  return {
    data,
    status: 200,
    statusText: 'OK',
  };
};

/**
 * Simulates a failed API response
 * @param {string} message - The error message
 * @param {number} status - The HTTP status code
 * @param {number} delayMs - The delay in milliseconds
 * @returns {Promise} A promise that rejects with a mock API error
 */
export const mockError = async (message = 'An error occurred', status = 400, delayMs = 800) => {
  await delay(delayMs);
  const error = new Error(message);
  error.response = {
    data: { message },
    status,
    statusText: status === 400 ? 'Bad Request' : 'Server Error',
  };
  return Promise.reject(error);
};

/**
 * Filter an array based on search term matching multiple fields
 * @param {Array} items - Array of items to filter
 * @param {string} searchTerm - The search term
 * @param {Array} fields - Fields to search in
 * @returns {Array} Filtered array of items
 */
export const filterBySearchTerm = (items, searchTerm, fields) => {
  if (!searchTerm) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(lowerSearchTerm);
    });
  });
};

/**
 * Simulate pagination for arrays
 * @param {Array} items - The original array
 * @param {number} page - The page number (1-based)
 * @param {number} perPage - Items per page
 * @returns {Object} Object with paginated items and metadata
 */
export const paginateItems = (items = [], page = 1, perPage = 10) => {
  // Ensure items is always an array
  const itemsArray = Array.isArray(items) ? items : [];
  
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const paginatedItems = itemsArray.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    meta: {
      currentPage: page,
      perPage,
      totalItems: itemsArray.length,
      totalPages: Math.ceil(itemsArray.length / perPage) || 1,
      hasNextPage: endIndex < itemsArray.length,
      hasPrevPage: page > 1,
    }
  };
};

/**
 * Sort an array of items based on a field and direction
 * @param {Array} items - Array of items to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted array of items
 */
export const sortItems = (items, field, direction = 'asc') => {
  if (!field) return items;
  
  return [...items].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];
    
    // Handle strings
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    // Handle dates
    if (aValue instanceof Date) {
      aValue = aValue.getTime();
      bValue = bValue.getTime();
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export default {
  delay,
  generateId,
  mockSuccess,
  mockError,
  filterBySearchTerm,
  paginateItems,
  sortItems,
}; 