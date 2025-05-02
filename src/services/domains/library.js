/**
 * Library Domain Service
 * 
 * This service handles all operations related to library resources.
 */

import axios from 'axios';
import { API_BASE_URL } from '../../config/api.config';

// Mock resource data for development
const mockResources = [
  {
    id: 1,
    title: 'Mathematics for High School',
    author: 'Dr. Robert Smith',
    category: 'Textbook',
    format: 'EPUB',
    url: 'https://example.com/resources/math-textbook.epub',
    thumbnail: 'https://example.com/thumbnails/math-textbook.jpg',
    description: 'Comprehensive mathematics textbook covering algebra, geometry, and calculus for high school students.',
    rating: 4.5,
    reviewCount: 28,
    dateAdded: '2023-01-15'
  },
  {
    id: 2,
    title: 'Interactive Physics Lab',
    author: 'Professor James Wilson',
    category: 'Interactive',
    format: 'Web App',
    url: 'https://example.com/resources/physics-interactive',
    thumbnail: 'https://example.com/thumbnails/physics-interactive.jpg',
    description: 'Interactive physics lab simulations for experimenting with various physics concepts.',
    rating: 4.8,
    reviewCount: 42,
    dateAdded: '2023-02-20'
  },
  {
    id: 3,
    title: 'World History: Ancient Civilizations',
    author: 'Dr. Emily Thompson',
    category: 'Textbook',
    format: 'EPUB',
    url: 'https://example.com/resources/world-history.epub',
    thumbnail: 'https://example.com/thumbnails/world-history.jpg',
    description: 'Comprehensive guide to ancient civilizations including Egypt, Greece, Rome, and Mesopotamia.',
    rating: 4.2,
    reviewCount: 36,
    dateAdded: '2023-03-05'
  }
];

/**
 * Get all library resources
 * @returns {Promise<Array>} List of resources
 */
export const getResources = async () => {
  try {
    // In a production environment, this would call the API
    // const response = await axios.get(`${API_BASE_URL}/resources`);
    // return response.data;
    
    // For development, return mock data
    return Promise.resolve(mockResources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

/**
 * Get a single resource by ID
 * @param {number} id Resource ID
 * @returns {Promise<Object>} Resource details
 */
export const getResourceById = async (id) => {
  try {
    // In a production environment, this would call the API
    // const response = await axios.get(`${API_BASE_URL}/resources/${id}`);
    // return response.data;
    
    // For development, return mock data
    const resource = mockResources.find(r => r.id === parseInt(id));
    if (!resource) {
      throw new Error('Resource not found');
    }
    return Promise.resolve(resource);
  } catch (error) {
    console.error(`Error fetching resource ${id}:`, error);
    throw error;
  }
};

/**
 * Add a new resource
 * @param {Object} resource Resource details
 * @returns {Promise<Object>} Added resource
 */
export const addResource = async (resource) => {
  try {
    // In a production environment, this would call the API
    // const response = await axios.post(`${API_BASE_URL}/resources`, resource);
    // return response.data;
    
    // For development, simulate adding to mock data
    const newResource = {
      ...resource,
      id: mockResources.length + 1,
      dateAdded: new Date().toISOString().split('T')[0],
      rating: 0,
      reviewCount: 0
    };
    mockResources.push(newResource);
    return Promise.resolve(newResource);
  } catch (error) {
    console.error('Error adding resource:', error);
    throw error;
  }
};

/**
 * Update an existing resource
 * @param {number} id Resource ID
 * @param {Object} updatedData Updated resource details
 * @returns {Promise<Object>} Updated resource
 */
export const updateResource = async (id, updatedData) => {
  try {
    // In a production environment, this would call the API
    // const response = await axios.put(`${API_BASE_URL}/resources/${id}`, updatedData);
    // return response.data;
    
    // For development, simulate updating mock data
    const index = mockResources.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
      throw new Error('Resource not found');
    }
    mockResources[index] = { ...mockResources[index], ...updatedData };
    return Promise.resolve(mockResources[index]);
  } catch (error) {
    console.error(`Error updating resource ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a resource
 * @param {number} id Resource ID
 * @returns {Promise<Object>} Deletion status
 */
export const deleteResource = async (id) => {
  try {
    // In a production environment, this would call the API
    // await axios.delete(`${API_BASE_URL}/resources/${id}`);
    
    // For development, simulate deleting from mock data
    const index = mockResources.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
      throw new Error('Resource not found');
    }
    mockResources.splice(index, 1);
    return Promise.resolve({ success: true });
  } catch (error) {
    console.error(`Error deleting resource ${id}:`, error);
    throw error;
  }
};