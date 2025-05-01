import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';

// Mock data for development
const MOCK_CLASSES = [
  { id: 'cls-001', name: 'Algebra I', section: 'A', grade: '9th Grade' },
  { id: 'cls-002', name: 'Physics Fundamentals', section: 'B', grade: '11th Grade' },
  { id: 'cls-003', name: 'Computer Science', section: 'C', grade: '10th Grade' },
  { id: 'cls-004', name: 'Geometry', section: 'A', grade: '10th Grade' },
  { id: 'cls-005', name: 'Advanced Algebra', section: 'B', grade: '12th Grade' }
];

const MOCK_STUDENTS = {
  'cls-001': [
    { id: 'std-001', name: 'Emma Thompson', roll_number: '2023-A101' },
    { id: 'std-002', name: 'James Wilson', roll_number: '2023-A102' },
    { id: 'std-003', name: 'Sophia Martinez', roll_number: '2023-A103' },
    { id: 'std-004', name: 'Ethan Johnson', roll_number: '2023-A104' },
    { id: 'std-005', name: 'Olivia Brown', roll_number: '2023-A105' }
  ],
  'cls-002': [
    { id: 'std-006', name: 'Noah Davis', roll_number: '2023-B101' },
    { id: 'std-007', name: 'Ava Miller', roll_number: '2023-B102' },
    { id: 'std-008', name: 'Liam Garcia', roll_number: '2023-B103' },
    { id: 'std-009', name: 'Isabella Rodriguez', roll_number: '2023-B104' }
  ],
  'cls-003': [
    { id: 'std-010', name: 'Lucas Smith', roll_number: '2023-C101' },
    { id: 'std-011', name: 'Mia Johnson', roll_number: '2023-C102' },
    { id: 'std-012', name: 'Mason Brown', roll_number: '2023-C103' },
    { id: 'std-013', name: 'Charlotte Jones', roll_number: '2023-C104' },
    { id: 'std-014', name: 'Elijah Taylor', roll_number: '2023-C105' },
    { id: 'std-015', name: 'Amelia Thomas', roll_number: '2023-C106' }
  ]
};

// Helper to get date string for today
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generate initials from name
const getInitials = (name) => {
  const names = name.split(' ');
  return names.map(n => n.charAt(0)).join('');
};

const Attendance = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [classLoading, setClassLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch teacher's classes
  useEffect(() => {
    const fetchClasses = () => {
      setClassLoading(true);
      
      // Simulate API call with delay
      setTimeout(() => {
        setClasses(MOCK_CLASSES);
        setClassLoading(false);
      }, 800);
    };
    
    fetchClasses();
  }, []);
  
  // Fetch students when a class is selected
  useEffect(() => {
    if (!selectedClass) return;
    
    const fetchStudents = () => {
      setStudentsLoading(true);
      
      // Simulate API call with delay
      setTimeout(() => {
        const classStudents = MOCK_STUDENTS[selectedClass] || [];
        setStudents(classStudents);
        
        // Initialize attendance state with all present
        const initialAttendance = {};
        classStudents.forEach(student => {
          initialAttendance[student.id] = 'present';
        });
        
        setAttendance(initialAttendance);
        setStudentsLoading(false);
      }, 800);
    };
    
    fetchStudents();
  }, [selectedClass]);
  
  // Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };
  
  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
  // Handle attendance status change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle save attendance
  const handleSaveAttendance = () => {
    setIsSaving(true);
    
    // In a real app, we would send this to the server
    console.log(`Saving attendance for class ${selectedClass} on ${selectedDate}:`, attendance);
    
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
  
  // Get class name from ID
  const getClassName = (classId) => {
    const cls = classes.find(c => c.id === classId);
    return cls ? `${cls.name} - ${cls.grade} - Section ${cls.section}` : '';
  };
  
  // Navigate to class detail
  const handleViewClass = () => {
    if (selectedClass) {
      navigate(`/teacher/classes/${selectedClass}`);
    }
  };
  
  return (
    <div className="space-y-6 p-6">
      <ActionBar
        title="Attendance"
        subtitle="Mark and track student attendance"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: Class selection */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Class & Date</h2>
            
            <div className="space-y-4">
              <FormField
                label="Class"
                name="class"
                type="select"
                value={selectedClass}
                onChange={handleClassChange}
                disabled={classLoading}
              >
                <option value="">Select a class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - {cls.grade} - Section {cls.section}
                  </option>
                ))}
              </FormField>
              
              <FormField
                label="Date"
                name="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                disabled={!selectedClass}
              />
              
              {selectedClass && (
                <div className="pt-4">
                  <button
                    onClick={handleViewClass}
                    className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View Class Details
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {selectedClass && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleMarkAll('present')}
                  className="w-full px-4 py-2 text-sm font-medium text-green-800 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Mark All Present
                </button>
                
                <button
                  onClick={() => handleMarkAll('absent')}
                  className="w-full px-4 py-2 text-sm font-medium text-red-800 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Mark All Absent
                </button>
                
                <button
                  onClick={() => handleMarkAll('late')}
                  className="w-full px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Mark All Late
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column: Attendance list */}
        <div className="md:col-span-2">
          {!selectedClass ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Class Selected</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please select a class from the left to mark attendance.
              </p>
            </div>
          ) : studentsLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : students.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Students Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no students enrolled in this class.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h2 className="font-medium text-blue-800">
                  {getClassName(selectedClass)} • {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-blue-600">
                    {students.length} Students • {Object.values(attendance).filter(s => s === 'present').length} Present
                  </p>
                  
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-3 py-1.5 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredStudents.map(student => (
                  <div key={student.id} className="p-4 flex items-center hover:bg-gray-50">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {getInitials(student.name)}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.roll_number}</div>
                    </div>
                    
                    <div>
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
                    </div>
                  </div>
                ))}
                
                {filteredStudents.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No students match your search criteria.
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={handleSaveAttendance}
                  disabled={isSaving || students.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Attendance'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance; 