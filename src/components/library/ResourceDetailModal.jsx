// src/components/library/ResourceDetailModal.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ResourceDetailModal = ({ isOpen, onClose, resource }) => {
  if (!isOpen || !resource) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-hidden"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex md:flex-row flex-col">
          {/* Resource Image */}
          <div className="md:w-1/3 h-64 md:h-auto overflow-hidden bg-gray-100">
            <img 
              src={resource.thumbnail} 
              alt={resource.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Resource Details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900" id="modal-title">{resource.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Author</h3>
                <p className="text-base text-gray-900">{resource.author}</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {resource.category}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Format</h3>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {resource.format}
                  </span>
                </div>
                
                {resource.pages && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                    <p className="text-sm text-gray-700">{resource.pages}</p>
                  </div>
                )}
                
                {resource.isbn && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                    <p className="text-sm text-gray-700">{resource.isbn}</p>
                  </div>
                )}
              </div>
              
              {resource.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-sm text-gray-700 mt-1">{resource.description}</p>
                </div>
              )}
              
              {resource.publishedDate && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Published Date</h3>
                  <p className="text-sm text-gray-700">
                    {new Date(resource.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Download resource"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Add to favorites"
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

ResourceDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string,
    publishedDate: PropTypes.string,
    pages: PropTypes.number,
    isbn: PropTypes.string
  })
};

export default ResourceDetailModal;