import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../components/common/DataTable';

// Mock data for development
const MOCK_STUDENTS = [
  {
    id: 'std-001',
    name: 'Emma Thompson',
    roll_number: '2023-A101',
    email: 'emma.t@schooldomain.edu',
    phone: '(555) 123-4567',
    attendance_rate: 98,
    grades_average: 92,
    status: 'active'
  },
  {
    id: 'std-002',
    name: 'James Wilson',
    roll_number: '2023-A102',
    email: 'james.w@schooldomain.edu',
    phone: '(555) 234-5678',
    attendance_rate: 87,
    grades_average: 85,
    status: 'active'
  },
  {
    id: 'std-003',
    name: 'Sophia Martinez',
    roll_number: '2023-A103',
    email: 'sophia.m@schooldomain.edu',
    phone: '(555) 345-6789',
    attendance_rate: 94,
    grades_average: 88,
    status: 'active'
  },
  {
    id: 'std-004',
    name: 'Ethan Johnson',
    roll_number: '2023-A104',
    email: 'ethan.j@schooldomain.edu',
    phone: '(555) 456-7890',
    attendance_rate: 90,
    grades_average: 78,
    status: 'active'
  },
  {
    id: 'std-005',
    name: 'Olivia Brown',
    roll_number: '2023-A105',
    email: 'olivia.b@schooldomain.edu',
    phone: '(555) 567-8901',
    attendance_rate: 99,
    grades_average: 95,
    status: 'active'
  },
  {
    id: 'std-006',
    name: 'Noah Davis',
    roll_number: '2023-A106',
    email: 'noah.d@schooldomain.edu',
    phone: '(555) 678-9012',
    attendance_rate: 79,
    grades_average: 72,
    status: 'inactive'
  },
  {
    id: 'std-007',
    name: 'Ava Miller',
    roll_number: '2023-A107',
    email: 'ava.m@schooldomain.edu',
    phone: '(555) 789-0123',
    attendance_rate: 96,
    grades_average: 91,
    status: 'active'
  }
];

// Generate more mock students for pagination demo
for (let i = 1; i <= 20; i++) {
  MOCK_STUDENTS.push({
    id: `std-extra-${i}`,
    name: `Student ${i + 7}`,
    roll_number: `2023-A${110 + i}`,
    email: `student${i + 7}@schooldomain.edu`,
    phone: `(555) ${100 + i}-${1000 + i}`,
    attendance_rate: Math.floor(Math.random() * 30) + 70, // 70-100%
    grades_average: Math.floor(Math.random() * 40) + 60, // 60-100%
    status: Math.random() > 0.1 ? 'active' : 'inactive' // 90% active
  });
}

const RosterTab = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  
  // Fetch students for this class - in a real app, this would be an API call
  useEffect(() => {
    const fetchStudents = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // In a real app, we would filter by classId on the server
          // For now, just use the mock data
          setStudents(MOCK_STUDENTS);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch students.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchStudents();
  }, [classId]);
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Next and previous page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Generate initials from name
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n.charAt(0)).join('');
  };
  
  // Get status badge classes
  const getStatusBadgeClasses = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };
  
  // Define table columns
  const columns = [
    {
      field: 'name',
      header: 'Student',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {getInitials(row.name)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.roll_number}</div>
          </div>
        </div>
      )
    },
    {
      field: 'email',
      header: 'Contact',
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-sm text-gray-600">{row.email}</div>
          <div className="text-sm text-gray-500">{row.phone}</div>
        </div>
      )
    },
    {
      field: 'attendance_rate',
      header: 'Attendance',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <span className={`
            inline-block w-2 h-2 rounded-full mr-2
            ${row.attendance_rate >= 90 ? 'bg-green-500' : row.attendance_rate >= 80 ? 'bg-yellow-500' : 'bg-red-500'}
          `}></span>
          <span className="text-sm">{row.attendance_rate}%</span>
        </div>
      )
    },
    {
      field: 'grades_average',
      header: 'Average Grade',
      sortable: true,
      render: (row) => (
        <div className="text-sm">{row.grades_average}%</div>
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
      render: () => (
        <div className="flex justify-end space-x-2">
          <button className="text-blue-600 hover:text-blue-800">View</button>
          <button className="text-gray-600 hover:text-gray-800">Message</button>
        </div>
      )
    }
  ];
  
  // Pagination component
  const Pagination = () => {
    // Only show pagination if there's more than one page
    if (totalPages <= 1) return null;
    
    // Create page buttons array
    const getPageNumbers = () => {
      const pages = [];
      // Always show first page
      pages.push(1);
      
      // Logic for middle pages - show current page and neighbors
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i === 2 && currentPage > 3) {
          pages.push('...');
        } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
          pages.push('...');
        } else {
          pages.push(i);
        }
      }
      
      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      return pages;
    };
    
    return (
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              currentPage === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              currentPage === totalPages 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastStudent, filteredStudents.length)}
              </span>{' '}
              of <span className="font-medium">{filteredStudents.length}</span> students
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* Previous page button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Page number buttons */}
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => paginate(page)}
                    className={`relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              {/* Next page button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Class Roster</h2>
          <p className="text-sm text-gray-500 mt-1">{students.length} students enrolled</p>
        </div>
        
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search students..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          
          <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Student
          </button>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={currentStudents}
        loading={loading}
        error={error}
        emptyMessage="No students found matching your search criteria."
      />
      
      {/* Only show pagination if we have students and not loading */}
      {!loading && !error && filteredStudents.length > 0 && <Pagination />}
    </div>
  );
};

RosterTab.propTypes = {
  classId: PropTypes.string.isRequired
};

export default RosterTab; 