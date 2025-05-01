import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormField from '../../../components/common/FormField';

// Mock data for development
const MOCK_STUDENTS = [
  {
    id: 'std-001',
    name: 'Emma Thompson',
    roll_number: '2023-A101',
    email: 'emma.t@schooldomain.edu'
  },
  {
    id: 'std-002',
    name: 'James Wilson',
    roll_number: '2023-A102',
    email: 'james.w@schooldomain.edu'
  },
  {
    id: 'std-003',
    name: 'Sophia Martinez',
    roll_number: '2023-A103',
    email: 'sophia.m@schooldomain.edu'
  },
  {
    id: 'std-004',
    name: 'Ethan Johnson',
    roll_number: '2023-A104',
    email: 'ethan.j@schooldomain.edu'
  },
  {
    id: 'std-005',
    name: 'Olivia Brown',
    roll_number: '2023-A105',
    email: 'olivia.b@schooldomain.edu'
  },
  {
    id: 'std-006',
    name: 'Noah Davis',
    roll_number: '2023-A106',
    email: 'noah.d@schooldomain.edu'
  },
  {
    id: 'std-007',
    name: 'Ava Miller',
    roll_number: '2023-A107',
    email: 'ava.m@schooldomain.edu'
  }
];

// Mock attendance sessions
const MOCK_SESSIONS = [
  { id: 'sess-001', date: '2023-06-12', time: '10:00 - 11:30' },
  { id: 'sess-002', date: '2023-06-14', time: '10:00 - 11:30' },
  { id: 'sess-003', date: '2023-06-16', time: '10:00 - 11:30' },
  { id: 'sess-004', date: '2023-06-19', time: '10:00 - 11:30' },
  { id: 'sess-005', date: '2023-06-21', time: '10:00 - 11:30' },
  { id: 'sess-006', date: '2023-06-23', time: '10:00 - 11:30' }
];

// Generate initials from name
const getInitials = (name) => {
  const names = name.split(' ');
  return names.map(n => n.charAt(0)).join('');
};

const AttendanceTab = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch students and sessions data
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // In a real app, we would fetch from the API
          setStudents(MOCK_STUDENTS);
          setSessions(MOCK_SESSIONS);
          
          // Set the most recent session as selected by default
          if (MOCK_SESSIONS.length > 0) {
            setSelectedSession(MOCK_SESSIONS[0].id);
            
            // Initialize attendance data
            const initialAttendance = {};
            MOCK_STUDENTS.forEach(student => {
              initialAttendance[student.id] = 'present'; // Set default status
            });
            setAttendance(initialAttendance);
          }
          
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch attendance data.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchData();
  }, [classId]);
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle attendance status change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  // Handle session change
  const handleSessionChange = (sessionId) => {
    setSelectedSession(sessionId);
    
    // In a real app, we would fetch attendance data for this session
    // For now, just reset to all present
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = 'present';
    });
    setAttendance(newAttendance);
  };
  
  // Handle save attendance
  const handleSaveAttendance = () => {
    setIsSaving(true);
    
    // In a real app, we would send this to the server
    console.log(`Saving attendance for session ${selectedSession}:`, attendance);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Attendance saved successfully!');
    }, 1000);
  };
  
  // Handle mark all function
  const handleMarkAll = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
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
  
  // If no sessions available
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No sessions available for this class.</p>
      </div>
    );
  }
  
  // Find the currently selected session
  const currentSession = sessions.find(s => s.id === selectedSession);
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Attendance</h2>
          <p className="text-sm text-gray-500 mt-1">Mark attendance for each student</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <FormField
            label="Select Session"
            name="session"
            type="select"
            value={selectedSession || ''}
            onChange={(e) => handleSessionChange(e.target.value)}
            className="w-60"
          >
            {sessions.map(session => (
              <option key={session.id} value={session.id}>
                {session.date} ({session.time})
              </option>
            ))}
          </FormField>
          
          <input
            type="text"
            placeholder="Search students..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {currentSession && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="font-medium text-blue-800">
                Session: {currentSession.date} ({currentSession.time})
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                {filteredStudents.length} students • {Object.values(attendance).filter(s => s === 'present').length} present
              </p>
            </div>
            
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <button
                onClick={() => handleMarkAll('present')}
                className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm"
              >
                Mark All Present
              </button>
              <button
                onClick={() => handleMarkAll('absent')}
                className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
              >
                Mark All Absent
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll Number
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {getInitials(student.name)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.roll_number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <select
                    value={attendance[student.id] || 'present'}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                    className={`
                      rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                      ${attendance[student.id] === 'present' ? 'bg-green-50 text-green-800' : 
                        attendance[student.id] === 'absent' ? 'bg-red-50 text-red-800' : 
                        attendance[student.id] === 'late' ? 'bg-yellow-50 text-yellow-800' : 
                        'bg-gray-50 text-gray-800'}
                    `}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveAttendance}
          disabled={isSaving}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>
    </div>
  );
};

AttendanceTab.propTypes = {
  classId: PropTypes.string.isRequired
};

export default AttendanceTab; 