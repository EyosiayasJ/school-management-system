// src/api/library.js
// API wrapper for E-Library resources

import { resources as mockResources } from '../mock/db';
import { getStoredData, setStoredData, addStoredItem, updateStoredItem, removeStoredItem } from '../utils/storage';

const STORAGE_KEY = 'library_resources';

/**
 * Get all library resources
 * @returns {Promise<Array>} - Promise resolving to array of resources
 */
export const getResources = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get from localStorage or use mock data as fallback
    const resources = getStoredData(STORAGE_KEY, mockResources);
    
    // If no data in localStorage yet, save the mock data
    if (!localStorage.getItem(STORAGE_KEY)) {
      setStoredData(STORAGE_KEY, mockResources);
    }
    
    return resources;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw new Error('Failed to fetch library resources');
  }
};

/**
 * Get a single resource by ID
 * @param {number} id - Resource ID
 * @returns {Promise<Object>} - Promise resolving to resource object
 */
export const getResourceById = async (id) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const resources = getStoredData(STORAGE_KEY, mockResources);
    const resource = resources.find(r => r.id === id);
    
    if (!resource) {
      throw new Error(`Resource with ID ${id} not found`);
    }
    
    return resource;
  } catch (error) {
    console.error(`Error fetching resource ${id}:`, error);
    throw error;
  }
};

/**
 * Add a new resource
 * @param {Object} resource - Resource object without ID
 * @returns {Promise<Object>} - Promise resolving to new resource with ID
 */
export const addResource = async (resource) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const resources = getStoredData(STORAGE_KEY, mockResources);
    
    // Generate new ID (in a real API, the server would do this)
    const newId = Math.max(0, ...resources.map(r => r.id)) + 1;
    const newResource = { ...resource, id: newId };
    
    // Add to localStorage
    const updatedResources = addStoredItem(STORAGE_KEY, newResource);
    
    return newResource;
  } catch (error) {
    console.error('Error adding resource:', error);
    throw new Error('Failed to add library resource');
  }
};

/**
 * Update an existing resource
 * @param {number} id - Resource ID
 * @param {Object} updates - Object with fields to update
 * @returns {Promise<Object>} - Promise resolving to updated resource
 */
export const updateResource = async (id, updates) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const resources = getStoredData(STORAGE_KEY, mockResources);
    const existingResource = resources.find(r => r.id === id);
    
    if (!existingResource) {
      throw new Error(`Resource with ID ${id} not found`);
    }
    
    const updatedResource = { ...existingResource, ...updates };
    updateStoredItem(STORAGE_KEY, id, updatedResource);
    
    return updatedResource;
  } catch (error) {
    console.error(`Error updating resource ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a resource
 * @param {number} id - Resource ID
 * @returns {Promise<void>}
 */
export const deleteResource = async (id) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const resources = getStoredData(STORAGE_KEY, mockResources);
    const existingResource = resources.find(r => r.id === id);
    
    if (!existingResource) {
      throw new Error(`Resource with ID ${id} not found`);
    }
    
    removeStoredItem(STORAGE_KEY, id);
  } catch (error) {
    console.error(`Error deleting resource ${id}:`, error);
    throw error;
  }
};