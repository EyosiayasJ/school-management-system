import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabs from '../../components/common/Tabs';
import ActionBar from '../../components/common/ActionBar';
import RosterTab from '../../components/teacher/tabs/RosterTab';
import AttendanceTab from '../../components/teacher/tabs/AttendanceTab';
import AssignmentsTab from '../../components/teacher/tabs/AssignmentsTab';
import GradesTab from '../../components/teacher/tabs/GradesTab';
import ResourcesTab from '../../components/teacher/tabs/ResourcesTab';

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
    description: 'This course covers the foundations of algebra including variables, equations, functions, inequalities, and their applications.'
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
    description: 'An introduction to the principles of mechanics, waves, and thermodynamics with an emphasis on problem-solving techniques.'
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
    description: 'Introduction to programming concepts, algorithms, and data structures using Python.'
  }
];

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [activeTab, setActiveTab] = useState('roster');
  const [loading, setLoading] = useState(true);
  
  // Fetch class data - in a real app, this would be an API call
  useEffect(() => {
    // Simulate API call
    const fetchClassData = () => {
      setLoading(true);
      
      // Find the class with the matching ID
      const foundClass = MOCK_CLASSES.find(cls => cls.id === id);
      
      setTimeout(() => {
        if (foundClass) {
          setClassData(foundClass);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchClassData();
  }, [id]);
  
  // Handle going back to classes list
  const handleBack = () => {
    navigate('/teacher/classes');
  };
  
  // If loading, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If class not found, show an error message
  if (!classData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Class Not Found</h2>
        <p className="text-gray-600 mb-6">The class you're looking for doesn't exist or you don't have access to it.</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to My Classes
        </button>
      </div>
    );
  }
  
  // Define the tabs
  const tabs = [
    { id: 'roster', label: 'Roster' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'grades', label: 'Grades' },
    { id: 'resources', label: 'Resources' }
  ];
  
  return (
    <div className="space-y-6">
      <ActionBar
        title={classData.name}
        subtitle={`${classData.subject} • ${classData.grade} • Section ${classData.section} • Room ${classData.room}`}
        showBackButton
        onBackClick={handleBack}
      />
      
      {/* Class Info Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{classData.description}</p>
          </div>
          
          <div className="border-l border-gray-200 pl-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule</h3>
            <p className="text-gray-600">{classData.schedule}</p>
            
            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Students</h3>
            <p className="text-gray-600">{classData.students} enrolled</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {activeTab === 'roster' && <RosterTab classId={id} />}
          {activeTab === 'attendance' && <AttendanceTab classId={id} />}
          {activeTab === 'assignments' && <AssignmentsTab classId={id} />}
          {activeTab === 'grades' && <GradesTab classId={id} />}
          {activeTab === 'resources' && <ResourcesTab classId={id} />}
        </Tabs>
      </div>
    </div>
  );
};

export default ClassDetail; 