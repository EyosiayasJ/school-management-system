import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../../components/common/ActionBar';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import FormField from '../../components/common/FormField';

// Mock data for development
const MOCK_CLASSES = [
  { id: 'cls-001', name: 'Algebra I', section: 'A', grade: '9th Grade' },
  { id: 'cls-002', name: 'Physics Fundamentals', section: 'B', grade: '11th Grade' },
  { id: 'cls-003', name: 'Computer Science', section: 'C', grade: '10th Grade' }
];

const MOCK_ASSIGNMENTS = [
  {
    id: 'asgn-001',
    title: 'Algebra Quiz 1',
    description: 'Quiz covering linear equations and inequalities',
    type: 'quiz',
    dueDate: '2023-06-15',
    classId: 'cls-001',
    className: 'Algebra I',
    gradeLevel: '9th Grade',
    section: 'A',
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
    classId: 'cls-001',
    className: 'Algebra I',
    gradeLevel: '9th Grade',
    section: 'A',
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
    classId: 'cls-001',
    className: 'Algebra I',
    gradeLevel: '9th Grade',
    section: 'A',
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
    classId: 'cls-001',
    className: 'Algebra I',
    gradeLevel: '9th Grade',
    section: 'A',
    totalPoints: 50,
    status: 'published',
    attachments: ['project_guidelines.pdf', 'rubric.pdf']
  },
  {
    id: 'asgn-005',
    title: 'Physics Lab 1',
    description: 'Laboratory exercise on measuring velocity and acceleration',
    type: 'lab',
    dueDate: '2023-06-20',
    classId: 'cls-002',
    className: 'Physics Fundamentals',
    gradeLevel: '11th Grade',
    section: 'B',
    totalPoints: 30,
    status: 'published',
    attachments: ['lab_instructions.pdf']
  },
  {
    id: 'asgn-006',
    title: 'Mechanics Quiz',
    description: 'Quiz on Newton\'s laws of motion',
    type: 'quiz',
    dueDate: '2023-06-22',
    classId: 'cls-002',
    className: 'Physics Fundamentals',
    gradeLevel: '11th Grade',
    section: 'B',
    totalPoints: 25,
    status: 'published',
    attachments: []
  },
  {
    id: 'asgn-007',
    title: 'Programming Assignment 1',
    description: 'Create a simple calculator program using Python',
    type: 'homework',
    dueDate: '2023-06-17',
    classId: 'cls-003',
    className: 'Computer Science',
    gradeLevel: '10th Grade',
    section: 'C',
    totalPoints: 20,
    status: 'published',
    attachments: ['assignment_instructions.pdf']
  },
  {
    id: 'asgn-008',
    title: 'Python Project',
    description: 'Build a text-based game using object-oriented programming principles',
    type: 'project',
    dueDate: '2023-07-10',
    classId: 'cls-003',
    className: 'Computer Science',
    gradeLevel: '10th Grade',
    section: 'C',
    totalPoints: 50,
    status: 'draft',
    attachments: []
  }
];

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [typeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch assignments and classes data
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // In a real app, we would fetch from the API
          setAssignments(MOCK_ASSIGNMENTS);
          setClasses(MOCK_CLASSES);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch assignments.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchData();
  }, []);
  
  // Filter assignments based on search term and filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesClass = classFilter === 'all' || assignment.classId === classFilter;
    const matchesType = typeFilter === 'all' || assignment.type === typeFilter;
    
    let matchesDate = true;
    if (dateFilter === 'upcoming') {
      matchesDate = new Date(assignment.dueDate) > new Date();
    } else if (dateFilter === 'past') {
      matchesDate = new Date(assignment.dueDate) < new Date();
    } else if (dateFilter === 'today') {
      const today = new Date();
      const dueDate = new Date(assignment.dueDate);
      matchesDate = 
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear();
    } else if (dateFilter === 'week') {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const dueDate = new Date(assignment.dueDate);
      matchesDate = dueDate >= today && dueDate <= nextWeek;
    }
    
    return matchesSearch && matchesStatus && matchesClass && matchesType && matchesDate;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Calculate days until due
  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
    } else if (diffDays === 0) {
      return 'Today';
    } else {
      return `In ${diffDays} day${diffDays === 1 ? '' : 's'}`;
    }
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
      case 'lab':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Due date badge color
  const getDueDateBadgeClasses = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'bg-red-100 text-red-800'; // Past due
    } else if (diffDays === 0) {
      return 'bg-yellow-100 text-yellow-800'; // Due today
    } else if (diffDays <= 3) {
      return 'bg-orange-100 text-orange-800'; // Due soon
    } else {
      return 'bg-green-100 text-green-800'; // Due in the future
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
  
  // View assignment details (navigate to class detail page with assignments tab)
  const handleViewAssignment = (assignment) => {
    navigate(`/teacher/classes/${assignment.classId}?tab=assignments`);
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
      field: 'className',
      header: 'Class',
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-sm font-medium">{row.className}</div>
          <div className="text-xs text-gray-500">{row.gradeLevel} - Section {row.section}</div>
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
        <div>
          <div className="text-sm">{formatDate(row.dueDate)}</div>
          <div className={`text-xs mt-1 px-2 py-0.5 inline-flex leading-4 rounded-full ${getDueDateBadgeClasses(row.dueDate)}`}>
            {calculateDaysUntilDue(row.dueDate)}
          </div>
        </div>
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
      field: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex justify-end space-x-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              handleViewAssignment(row);
            }}
          >
            View
          </button>
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
      classId: assignment?.classId || '',
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
      
      if (!formData.classId) {
        newErrors.classId = 'Class is required';
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
        // Find the class details
        const selectedClass = classes.find(c => c.id === formData.classId);
        
        // Add class details to the form data
        const enrichedFormData = {
          ...formData,
          className: selectedClass?.name || '',
          gradeLevel: selectedClass?.grade || '',
          section: selectedClass?.section || '',
          attachments: assignment?.attachments || []
        };
        
        onSubmit(enrichedFormData);
      }
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FormField
              label="Title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <FormField
              label="Description"
              id="description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <FormField
            label="Class"
            id="classId"
            name="classId"
            type="select"
            value={formData.classId}
            onChange={handleChange}
            error={errors.classId}
            required
          >
            <option value="">Select a class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.grade} - Section {cls.section}
              </option>
            ))}
          </FormField>
          
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
            <option value="lab">Lab</option>
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
        ...formData
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
    <div className="space-y-6 p-6">
      <ActionBar
        title="Assignments"
        subtitle="Manage assignments across all your classes"
      >
        <button
          onClick={handleAddAssignment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Assignment
        </button>
      </ActionBar>
      
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Search assignments..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Due Today</option>
              <option value="week">Due This Week</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Due</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredAssignments}
          loading={loading}
          error={error}
          emptyMessage="No assignments found matching your criteria."
          onRowClick={(row) => handleViewAssignment(row)}
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

export default Assignments; 