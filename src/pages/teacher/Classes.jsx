import { useState } from 'react';
import { Link } from 'react-router-dom';
import ActionBar from '../../components/common/ActionBar';
import DataTable from '../../components/common/DataTable';

// Mock data for development
const MOCK_CLASSES = [
  {
    id: 'cls-001',
    name: 'Algebra I',
    subject: 'Mathematics',
    grade: '9th Grade',
    section: 'A',
    students: 28,
    room: '202',
    schedule: 'Mon, Wed, Fri 10:00 - 11:30',
    nextMeeting: '2023-06-12T10:00:00Z',
  },
  {
    id: 'cls-002',
    name: 'Physics Fundamentals',
    subject: 'Science',
    grade: '11th Grade',
    section: 'B',
    students: 22,
    room: '105',
    schedule: 'Tue, Thu 13:00 - 14:30',
    nextMeeting: '2023-06-13T13:00:00Z',
  },
  {
    id: 'cls-003',
    name: 'Computer Science',
    subject: 'Technology',
    grade: '10th Grade',
    section: 'C',
    students: 25,
    room: 'Lab 3',
    schedule: 'Mon, Wed 14:00 - 15:30',
    nextMeeting: '2023-06-12T14:00:00Z',
  },
  {
    id: 'cls-004',
    name: 'Geometry',
    subject: 'Mathematics',
    grade: '10th Grade',
    section: 'A',
    students: 30,
    room: '204',
    schedule: 'Tue, Thu 09:00 - 10:30',
    nextMeeting: '2023-06-13T09:00:00Z',
  },
  {
    id: 'cls-005',
    name: 'Advanced Algebra',
    subject: 'Mathematics',
    grade: '12th Grade',
    section: 'B',
    students: 18,
    room: '201',
    schedule: 'Mon, Wed, Fri 08:30 - 10:00',
    nextMeeting: '2023-06-12T08:30:00Z',
  }
];

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  
  // Filter classes based on search term, grade, and section
  const filteredClasses = MOCK_CLASSES.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = gradeFilter === 'all' || cls.grade === gradeFilter;
    const matchesSection = sectionFilter === 'all' || cls.section === sectionFilter;
    
    return matchesSearch && matchesGrade && matchesSection;
  });
  
  // Extract unique grades and sections for filters
  const grades = ['all', ...new Set(MOCK_CLASSES.map(cls => cls.grade))];
  const sections = ['all', ...new Set(MOCK_CLASSES.map(cls => cls.section))];
  
  // Format date for next meeting
  const formatNextMeeting = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if the meeting is today or tomorrow
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };
  
  // Define table columns
  const columns = [
    {
      field: 'name',
      header: 'Class Name',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium text-blue-600">{row.name}</div>
          <div className="text-sm text-gray-500">{row.subject}</div>
        </div>
      )
    },
    {
      field: 'grade',
      header: 'Grade',
      sortable: true,
    },
    {
      field: 'section',
      header: 'Section',
      sortable: true,
    },
    {
      field: 'students',
      header: 'Students',
      sortable: true,
      render: (row) => (
        <div className="text-center">{row.students}</div>
      )
    },
    {
      field: 'room',
      header: 'Room',
      sortable: true,
    },
    {
      field: 'nextMeeting',
      header: 'Next Meeting',
      sortable: true,
      render: (row) => (
        <div className="text-sm">{formatNextMeeting(row.nextMeeting)}</div>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex justify-end space-x-2">
          <Link 
            to={`/teacher/classes/${row.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View
          </Link>
        </div>
      )
    }
  ];
  
  return (
    <div className="space-y-6">
      <ActionBar
        title="My Classes"
        subtitle="View and manage your assigned classes"
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search classes..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>
                {grade === 'all' ? 'All Grades' : grade}
              </option>
            ))}
          </select>
          
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            {sections.map(section => (
              <option key={section} value={section}>
                {section === 'all' ? 'All Sections' : `Section ${section}`}
              </option>
            ))}
          </select>
        </div>
      </ActionBar>
      
      <div className="bg-white rounded-xl shadow-sm">
        <DataTable
          columns={columns}
          data={filteredClasses}
          loading={false}
          error={null}
          emptyMessage="No classes found matching your criteria."
          onRowClick={(row) => window.location.href = `/teacher/classes/${row.id}`}
        />
      </div>
    </div>
  );
};

export default Classes; 