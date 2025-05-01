import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../components/common/DataTable';
import Modal from '../../../components/common/Modal';
import FormField from '../../../components/common/FormField';

// Mock data for development
const MOCK_ASSIGNMENTS = [
  {
    id: 'asgn-001',
    title: 'Algebra Quiz 1',
    description: 'Quiz covering linear equations and inequalities',
    type: 'quiz',
    dueDate: '2023-06-15',
    totalPoints: 20,
    status: 'published',
    attachments: []
  },
  {
    id: 'asgn-002',
    title: 'Functions Homework',
    description: 'Practice problems on functions and their graphs',
    type: 'homework',
    dueDate: '2023-06-18',
    totalPoints: 15,
    status: 'published',
    attachments: ['functions_worksheet.pdf']
  },
  {
    id: 'asgn-003',
    title: 'Midterm Exam',
    description: 'Comprehensive exam covering all topics from the first half of the semester',
    type: 'exam',
    dueDate: '2023-06-25',
    totalPoints: 100,
    status: 'draft',
    attachments: []
  },
  {
    id: 'asgn-004',
    title: 'Word Problems Project',
    description: 'Group project to create and solve real-world algebraic word problems',
    type: 'project',
    dueDate: '2023-07-05',
    totalPoints: 50,
    status: 'published',
    attachments: ['project_guidelines.pdf', 'rubric.pdf']
  }
];

const AssignmentsTab = ({ classId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch assignments data
  useEffect(() => {
    const fetchAssignments = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // In a real app, we would fetch from the API
          setAssignments(MOCK_ASSIGNMENTS);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch assignments.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchAssignments();
  }, [classId]);
  
  // Filter assignments based on search term, status, and type
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesType = typeFilter === 'all' || assignment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Extract unique types for filters
  const assignmentTypes = ['all', ...new Set(assignments.map(a => a.type))];
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Handle assignment status badge color
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle assignment type badge color
  const getTypeBadgeClasses = (type) => {
    switch (type) {
      case 'quiz':
        return 'bg-purple-100 text-purple-800';
      case 'homework':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-yellow-100 text-yellow-800';
      case 'project':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Add new assignment
  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setShowModal(true);
  };
  
  // Edit assignment
  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setShowModal(true);
  };
  
  // Delete assignment
  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      // In a real app, we would send a delete request to the API
      // For now, just filter it out from the state
      setAssignments(prevAssignments => prevAssignments.filter(a => a.id !== id));
    }
  };
  
  // Define table columns
  const columns = [
    {
      field: 'title',
      header: 'Assignment',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium text-blue-600">{row.title}</div>
          <div className="text-sm text-gray-500 truncate max-w-md">{row.description}</div>
        </div>
      )
    },
    {
      field: 'type',
      header: 'Type',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClasses(row.type)}`}>
          {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
        </span>
      )
    },
    {
      field: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (row) => (
        <div className="text-sm">{formatDate(row.dueDate)}</div>
      )
    },
    {
      field: 'totalPoints',
      header: 'Points',
      sortable: true,
      render: (row) => (
        <div className="text-sm text-center">{row.totalPoints}</div>
      )
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(row.status)}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    {
      field: 'attachments',
      header: 'Attachments',
      render: (row) => (
        <div className="text-sm">
          {row.attachments.length > 0 ? (
            <div className="flex items-center">
              <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span>{row.attachments.length}</span>
            </div>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </div>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex justify-end space-x-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAssignment(row);
            }}
          >
            Edit
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAssignment(row.id);
            }}
          >
            Delete
          </button>
        </div>
      )
    }
  ];
  
  // Assignment form component
  const AssignmentForm = ({ assignment, onSubmit }) => {
    const [formData, setFormData] = useState({
      title: assignment?.title || '',
      description: assignment?.description || '',
      type: assignment?.type || 'homework',
      dueDate: assignment?.dueDate || '',
      totalPoints: assignment?.totalPoints || 10,
      status: assignment?.status || 'draft'
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'totalPoints' ? parseInt(value, 10) : value
      }));
      
      // Clear error when field is edited
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    };
    
    const validate = () => {
      const newErrors = {};
      
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      
      if (!formData.dueDate) {
        newErrors.dueDate = 'Due date is required';
      }
      
      if (!formData.totalPoints || formData.totalPoints <= 0) {
        newErrors.totalPoints = 'Points must be greater than 0';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validate()) {
        onSubmit(formData);
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
          rows={4}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Type"
            id="type"
            name="type"
            type="select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="homework">Homework</option>
            <option value="quiz">Quiz</option>
            <option value="exam">Exam</option>
            <option value="project">Project</option>
          </FormField>
          
          <FormField
            label="Status"
            id="status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </FormField>
          
          <FormField
            label="Due Date"
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            error={errors.dueDate}
            required
          />
          
          <FormField
            label="Total Points"
            id="totalPoints"
            name="totalPoints"
            type="number"
            value={formData.totalPoints}
            onChange={handleChange}
            error={errors.totalPoints}
            required
            min="1"
          />
        </div>
        
        <div className="pt-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : assignment ? 'Update Assignment' : 'Create Assignment'}
          </button>
        </div>
      </form>
    );
  };
  
  // Handle form submission
  const handleSubmitAssignmentForm = (formData) => {
    setIsSubmitting(true);
    
    // In a real app, we would send this to the API
    // For now, just update the state
    if (editingAssignment) {
      // Update existing assignment
      setAssignments(prevAssignments => 
        prevAssignments.map(a => a.id === editingAssignment.id ? { ...a, ...formData } : a)
      );
    } else {
      // Create new assignment
      const newAssignment = {
        id: `asgn-${Date.now()}`,
        ...formData,
        attachments: []
      };
      setAssignments(prevAssignments => [...prevAssignments, newAssignment]);
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(false);
    }, 500);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Assignments</h2>
          <p className="text-sm text-gray-500 mt-1">Manage class assignments and assessments</p>
        </div>
        
        <button
          onClick={handleAddAssignment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Assignment
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search assignments..."
              className="px-4 py-2 flex-grow border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {assignmentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={filteredAssignments}
          loading={loading}
          error={error}
          emptyMessage="No assignments found matching your criteria."
        />
      </div>
      
      {/* Assignment Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingAssignment ? 'Edit Assignment' : 'Add New Assignment'}
        size="medium"
      >
        <AssignmentForm
          assignment={editingAssignment}
          onSubmit={handleSubmitAssignmentForm}
        />
      </Modal>
    </div>
  );
};

AssignmentsTab.propTypes = {
  classId: PropTypes.string.isRequired
};

export default AssignmentsTab; 