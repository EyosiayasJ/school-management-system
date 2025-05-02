/**
 * Assets Configuration
 * 
 * This file contains configuration for asset URLs used throughout the application.
 * Update these values to match your asset storage configuration.
 */

// Base URLs for different asset types
export const ASSETS = {
  // Placeholder images
  PLACEHOLDER: {
    AVATAR: 'https://source.boringavatars.com/beam/120',
    LOGO: 'https://via.placeholder.com/150',
    THUMBNAIL: 'https://via.placeholder.com/300x200'
  },
  
  // External services
  EXTERNAL: {
    GEOGEBRA: 'https://www.geogebra.org/',
    GOOGLE_FONTS: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  },
  
  // Resource URLs
  RESOURCES: {
    MATH_TEXTBOOK: {
      URL: 'https://example.com/resources/math-textbook.pdf',
      THUMBNAIL: 'https://example.com/thumbnails/math-textbook.jpg'
    },
    PHYSICS_INTERACTIVE: {
      URL: 'https://example.com/resources/physics-interactive',
      THUMBNAIL: 'https://example.com/thumbnails/physics-interactive.jpg'
    },
    WORLD_HISTORY: {
      URL: 'https://example.com/resources/world-history.pdf',
      THUMBNAIL: 'https://example.com/thumbnails/world-history.jpg'
    }
  }
};

// Default images for common entities
export const DEFAULT_IMAGES = {
  STUDENT: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  TEACHER: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  ADMIN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

// Helper function to generate an avatar URL
export const generateAvatarUrl = (firstName, lastName) => {
  return `${ASSETS.PLACEHOLDER.AVATAR}/${firstName}${lastName}`;
};

export default {
  ASSETS,
  DEFAULT_IMAGES,
  generateAvatarUrl
}; 