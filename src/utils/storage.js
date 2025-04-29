// src/utils/storage.js
// Utility functions for local storage persistence

/**
 * Get data from localStorage, or use fallback data if not found
 * @param {string} key - The localStorage key to retrieve
 * @param {any} fallbackData - Default data to use if nothing in localStorage
 * @returns {any} - The parsed data from localStorage or the fallback
 */
export const getStoredData = (key, fallbackData) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallbackData;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return fallbackData;
  }
};

/**
 * Save data to localStorage
 * @param {string} key - The localStorage key to save under
 * @param {any} data - The data to save (will be JSON stringified)
 */
export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Update a specific item in a collection stored in localStorage
 * @param {string} key - The localStorage key for the collection
 * @param {string|number} itemId - The ID of the item to update
 * @param {object} updatedItem - The updated item data
 * @returns {array} - The updated collection
 */
export const updateStoredItem = (key, itemId, updatedItem) => {
  try {
    const collection = getStoredData(key, []);
    const updatedCollection = collection.map(item => 
      item.id === itemId ? { ...item, ...updatedItem } : item
    );
    setStoredData(key, updatedCollection);
    return updatedCollection;
  } catch (error) {
    console.error(`Error updating item in ${key}:`, error);
    return null;
  }
};

/**
 * Add a new item to a collection stored in localStorage
 * @param {string} key - The localStorage key for the collection
 * @param {object} newItem - The new item to add
 * @returns {array} - The updated collection
 */
export const addStoredItem = (key, newItem) => {
  try {
    const collection = getStoredData(key, []);
    const updatedCollection = [...collection, newItem];
    setStoredData(key, updatedCollection);
    return updatedCollection;
  } catch (error) {
    console.error(`Error adding item to ${key}:`, error);
    return null;
  }
};

/**
 * Remove an item from a collection stored in localStorage
 * @param {string} key - The localStorage key for the collection
 * @param {string|number} itemId - The ID of the item to remove
 * @returns {array} - The updated collection
 */
export const removeStoredItem = (key, itemId) => {
  try {
    const collection = getStoredData(key, []);
    const updatedCollection = collection.filter(item => item.id !== itemId);
    setStoredData(key, updatedCollection);
    return updatedCollection;
  } catch (error) {
    console.error(`Error removing item from ${key}:`, error);
    return null;
  }
};