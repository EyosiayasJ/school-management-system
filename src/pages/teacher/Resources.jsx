import { useState, useEffect } from 'react';
import ActionBar from '../../components/common/ActionBar';
import { formatDistanceToNow } from 'date-fns';

// Mock data for development
const MOCK_RESOURCES = [
  {
    id: 'resource-001',
    title: 'Algebra Fundamentals Slide Deck',
    description: 'Comprehensive slides covering basic algebraic concepts for 9th-grade students.',
    type: 'presentation',
    fileUrl: '#',
    fileSize: '2.4 MB',
    uploadedAt: '2023-05-15T10:30:00Z',
    tags: ['algebra', 'mathematics', '9th grade']
  },
  {
    id: 'resource-002',
    title: 'Physics Lab Report Template',
    description: 'Template for students to use when submitting lab reports for physics experiments.',
    type: 'document',
    fileUrl: '#',
    fileSize: '156 KB',
    uploadedAt: '2023-05-18T14:45:00Z',
    tags: ['physics', 'lab report', 'template']
  },
  {
    id: 'resource-003',
    title: 'Calculus Practice Problems',
    description: 'Collection of practice problems for advanced calculus concepts.',
    type: 'document',
    fileUrl: '#',
    fileSize: '890 KB',
    uploadedAt: '2023-05-20T09:15:00Z',
    tags: ['calculus', 'mathematics', 'practice']
  },
  {
    id: 'resource-004',
    title: 'Computer Science Programming Guide',
    description: 'Student handbook for Python programming fundamentals.',
    type: 'pdf',
    fileUrl: '#',
    fileSize: '4.2 MB',
    uploadedAt: '2023-05-22T11:20:00Z',
    tags: ['computer science', 'programming', 'python']
  },
  {
    id: 'resource-005',
    title: 'Geometry Visualization Tools',
    description: 'Interactive web tools for visualizing geometric concepts.',
    type: 'link',
    fileUrl: 'https://www.geogebra.org/',
    uploadedAt: '2023-05-25T13:10:00Z',
    tags: ['geometry', 'mathematics', 'visualization']
  }
];

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    type: 'document',
    file: null,
    tags: ''
  });
  
  // Fetch resources - in a real app, this would be an API call
  useEffect(() => {
    const fetchResources = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          setResources(MOCK_RESOURCES);
          setLoading(false);
        } catch (err) {
          setError('Failed to load resources.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchResources();
  }, []);
  
  // Get unique tags from resources
  const getAllTags = () => {
    const tagSet = new Set();
    resources.forEach(resource => {
      resource.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };
  
  // Filter resources based on search term and active tag
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = activeTag === 'all' || resource.tags.includes(activeTag);
    
    return matchesSearch && matchesTag;
  });
  
  // Handle form changes for upload modal
  const handleUploadFormChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'file' && files) {
      setUploadForm(prev => ({
        ...prev,
        file: files[0]
      }));
    } else {
      setUploadForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle resource upload
  const handleUpload = (e) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to the server and save the resource
    const newResource = {
      id: `resource-${Date.now()}`,
      title: uploadForm.title,
      description: uploadForm.description,
      type: uploadForm.type,
      fileUrl: '#',
      fileSize: uploadForm.file ? `${(uploadForm.file.size / 1024).toFixed(0)} KB` : 'N/A',
      uploadedAt: new Date().toISOString(),
      tags: uploadForm.tags.split(',').map(tag => tag.trim().toLowerCase())
    };
    
    // Add the new resource
    setResources(prev => [newResource, ...prev]);
    
    // Reset form and close modal
    setUploadForm({
      title: '',
      description: '',
      type: 'document',
      file: null,
      tags: ''
    });
    setShowUploadModal(false);
  };
  
  // Get icon for resource type
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'document':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'presentation':
        return (
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        );
      case 'link':
        return (
          <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  return (
    <div className="space-y-6">
      <ActionBar
        title="Teaching Resources"
        subtitle="Manage and share your teaching materials"
      />
      
      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:justify-between md:items-center">
        <div className="flex overflow-x-auto pb-2 space-x-2 md:pb-0">
          <button
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeTag === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTag('all')}
          >
            All Resources
          </button>
          
          {getAllTags().map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeTag === tag 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search resources..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowUploadModal(true)}
          >
            Upload
          </button>
        </div>
      </div>
      
      {/* Resources List */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No resources found matching your criteria.</p>
          </div>
        ) : (
          filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getResourceTypeIcon(resource.type)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                          onClick={() => setActiveTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{resource.fileSize}</span>
                      <span>{formatDate(resource.uploadedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => window.open(resource.fileUrl, '_blank')}
                >
                  {resource.type === 'link' ? 'Visit Link' : 'Download'}
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Upload Resource</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowUploadModal(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={uploadForm.title}
                  onChange={handleUploadFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={uploadForm.description}
                  onChange={handleUploadFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                <select
                  name="type"
                  value={uploadForm.type}
                  onChange={handleUploadFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="document">Document</option>
                  <option value="presentation">Presentation</option>
                  <option value="pdf">PDF</option>
                  <option value="link">External Link</option>
                </select>
              </div>
              
              {uploadForm.type !== 'link' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleUploadFormChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={uploadForm.tags}
                  onChange={handleUploadFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. math, algebra, worksheet"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources; 