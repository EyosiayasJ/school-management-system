import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/common/Modal';
import FormField from '../../../components/common/FormField';

// Mock data for development
const MOCK_RESOURCES = [
  {
    id: 'res-001',
    title: 'Algebra Foundations',
    description: 'Introduction to algebraic concepts and notation',
    type: 'pdf',
    url: '#',
    size: '2.4 MB',
    createdAt: '2023-05-10T10:30:00Z',
    tags: ['algebra', 'introduction']
  },
  {
    id: 'res-002',
    title: 'Functions and Graphs',
    description: 'Comprehensive guide to understanding functions and their graphical representations',
    type: 'pdf',
    url: '#',
    size: '4.1 MB',
    createdAt: '2023-05-15T14:45:00Z',
    tags: ['functions', 'graphs']
  },
  {
    id: 'res-003',
    title: 'Linear Equations Worksheet',
    description: 'Practice problems for solving linear equations',
    type: 'docx',
    url: '#',
    size: '1.2 MB',
    createdAt: '2023-05-20T09:15:00Z',
    tags: ['linear equations', 'practice', 'worksheet']
  },
  {
    id: 'res-004',
    title: 'Algebra Unit Test',
    description: 'Sample test covering all algebra topics',
    type: 'pdf',
    url: '#',
    size: '3.7 MB',
    createdAt: '2023-05-25T13:00:00Z', 
    tags: ['test', 'assessment']
  },
  {
    id: 'res-005',
    title: 'Introduction to Quadratics',
    description: 'Video lecture on quadratic equations and functions',
    type: 'mp4',
    url: '#',
    size: '45.2 MB',
    createdAt: '2023-05-30T11:20:00Z',
    tags: ['quadratics', 'video', 'lecture']
  }
];

const ResourcesTab = ({ classId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // For upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch resources data
  useEffect(() => {
    const fetchResources = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // In a real app, we would fetch from the API
          setResources(MOCK_RESOURCES);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch resources.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchResources();
  }, [classId]);
  
  // Extract all unique tags
  const allTags = ['all', ...new Set(resources.flatMap(resource => resource.tags))];
  
  // Extract all unique resource types
  const allTypes = ['all', ...new Set(resources.map(resource => resource.type))];
  
  // Filter resources based on search term, tag, and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || resource.tags.includes(selectedTag);
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesTag && matchesType;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Get icon for resource type
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'docx':
      case 'doc':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'xlsx':
      case 'xls':
        return (
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm6 9a1 1 0 100-2H7a1 1 0 100 2h4z" clipRule="evenodd" />
          </svg>
        );
      case 'pptx':
      case 'ppt':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2H7v-2h8zm0-4v2H7v-2h8z" clipRule="evenodd" />
          </svg>
        );
      case 'mp4':
      case 'mov':
      case 'avi':
        return (
          <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  // Handle resource upload
  const handleUpload = () => {
    setShowUploadModal(true);
  };
  
  // Handle resource deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      // In a real app, we would send a delete request to the API
      // For now, just filter it out from the state
      setResources(prevResources => prevResources.filter(r => r.id !== id));
    }
  };
  
  // Upload form component
  const UploadForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      tags: '',
      file: null
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when field is edited
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    };
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          file
        }));
        
        // Clear file error if exists
        if (errors.file) {
          setErrors(prev => ({
            ...prev,
            file: null
          }));
        }
      }
    };
    
    const validate = () => {
      const newErrors = {};
      
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      
      if (!formData.file) {
        newErrors.file = 'File is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validate()) {
        setIsUploading(true);
        
        // Simulate file upload with progress
        const simulateUpload = () => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            
            if (progress >= 100) {
              clearInterval(interval);
              
              // Create a new resource object
              const fileType = formData.file.name.split('.').pop().toLowerCase();
              const newResource = {
                id: `res-${Date.now()}`,
                title: formData.title,
                description: formData.description,
                type: fileType,
                url: '#',
                size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
                createdAt: new Date().toISOString(),
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
              };
              
              // Add the new resource to the state
              setResources(prevResources => [...prevResources, newResource]);
              
              // Reset form
              setTimeout(() => {
                setIsUploading(false);
                setShowUploadModal(false);
                setUploadProgress(0);
              }, 500);
            }
          }, 300);
        };
        
        simulateUpload();
      }
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
        
        <FormField
          label="Description"
          id="description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
        
        <FormField
          label="Tags (comma separated)"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. algebra, worksheet, practice"
        />
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="file"
              className="sr-only"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-300"
            >
              Choose File
            </label>
            <span className="text-sm text-gray-500">
              {formData.file ? formData.file.name : 'No file chosen'}
            </span>
          </div>
          {errors.file && (
            <p className="mt-1 text-sm text-red-600">{errors.file}</p>
          )}
        </div>
        
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
        
        <div className="pt-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowUploadModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>
      </form>
    );
  };
  
  // If loading, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Resources</h2>
          <p className="text-sm text-gray-500 mt-1">Upload and manage teaching materials</p>
        </div>
        
        <div>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
            Upload Resource
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'All Tags' : tag}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {allTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 flex items-start">
                <div className="flex-shrink-0">
                  {getResourceTypeIcon(resource.type)}
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
                  
                  <div className="flex flex-wrap mt-2">
                    {resource.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-1.5 mb-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                <div>
                  <span>{resource.type.toUpperCase()}</span>
                  <span className="mx-2">•</span>
                  <span>{resource.size}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(resource.createdAt)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                  
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(resource.id)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-base font-medium text-gray-900">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedTag !== 'all' || selectedType !== 'all'
              ? 'Try adjusting your search filters'
              : 'Get started by uploading your first resource'}
          </p>
          <div className="mt-6">
            <button
              onClick={handleUpload}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Upload Resource
            </button>
          </div>
        </div>
      )}
      
      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => !isUploading && setShowUploadModal(false)}
        title="Upload Resource"
        size="medium"
      >
        <UploadForm />
      </Modal>
    </div>
  );
};

ResourcesTab.propTypes = {
  classId: PropTypes.string.isRequired
};

export default ResourcesTab; 