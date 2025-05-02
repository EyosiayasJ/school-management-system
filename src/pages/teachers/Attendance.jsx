import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiCheckCircle, FiXCircle, FiClock, FiMessageSquare, FiInfo } from 'react-icons/fi';
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { useAttendance } from '../../hooks/useAttendance';
import { ATTENDANCE_STATUS } from '../../services/domains/attendance';
import AttendanceNoteModal from '../../components/teacher/AttendanceNoteModal';
import SkeletonAttendanceRow from '../../components/common/SkeletonAttendanceRow';
import teacherScheduleService from '../../services/domains/teacherSchedule';

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
  return names.map(n => n.charAt(0)).join('').toUpperCase();
};

// Format date for display
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time for display
const formatTime = (timeString) => {
  if (!timeString) return '';
  
  // Convert 24-hour time to 12-hour time with AM/PM
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12}:${minutes} ${period}`;
};

// Get current time
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Status color mapping
const STATUS_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    hoverBg: 'hover:bg-green-200',
    iconColor: 'text-green-600',
    icon: <FiCheckCircle className="w-5 h-5" />
  },
  [ATTENDANCE_STATUS.ABSENT]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    hoverBg: 'hover:bg-red-200',
    iconColor: 'text-red-600',
    icon: <FiXCircle className="w-5 h-5" />
  },
  [ATTENDANCE_STATUS.LATE]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    hoverBg: 'hover:bg-yellow-200',
    iconColor: 'text-yellow-600',
    icon: <FiClock className="w-5 h-5" />
  },
  [ATTENDANCE_STATUS.EXCUSED]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800', 
    hoverBg: 'hover:bg-blue-200',
    iconColor: 'text-blue-600',
    icon: <FiFileText className="w-5 h-5" />
  }
};

const Attendance = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [classLoading, setClassLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  
  // Update time every minute
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    
    return () => clearInterval(timeInterval);
  }, []);
  
  // Use our custom attendance hook
  const {
    loading: attendanceLoading,
    error: attendanceError,
    attendanceMap,
    saving,
    saveError,
    saveSuccess,
    initializeAttendance,
    updateAttendanceStatus,
    updateAttendanceNotes,
    markAllStatus,
    saveAttendance,
    getAttendanceStats
  } = useAttendance(selectedClass, selectedDate);
  
  // Attendance stats
  const stats = getAttendanceStats();
  
  // Fetch teacher's schedule
  useEffect(() => {
    const fetchTeacherSchedule = async () => {
      setScheduleLoading(true);
      try {
        // In a real app, you'd get the teacher ID from auth context
        const teacherId = 'teacher-001';
        const response = await teacherScheduleService.getCurrentClass(teacherId);
        
        if (response.status === 200) {
          setCurrentSchedule(response.data);
          
          // If a class is currently in session, select it
          if (response.data.currentClass) {
            setSelectedClass(response.data.currentClass.id);
          }
          // Otherwise, if there's a next class today, select it
          else if (response.data.nextClass) {
            setSelectedClass(response.data.nextClass.id);
          }
          // If no classes today or all classes are over, select the first class in schedule
          else if (response.data.allClasses && response.data.allClasses.length > 0) {
            setSelectedClass(response.data.allClasses[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching teacher schedule:', error);
      } finally {
        setScheduleLoading(false);
      }
    };
    
    fetchTeacherSchedule();
  }, []);
  
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
        setStudentsLoading(false);
      }, 800);
    };
    
    fetchStudents();
  }, [selectedClass]);
  
  // Initialize attendance when students are loaded
  useEffect(() => {
    if (students.length > 0) {
      initializeAttendance(students);
    }
  }, [students, initializeAttendance]);
  
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
    updateAttendanceStatus(studentId, status);
  };
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle save attendance
  const handleSaveAttendance = () => {
    saveAttendance();
  };
  
  // Handle mark all function
  const handleMarkAll = (status) => {
    markAllStatus(status);
  };
  
  // Get current class info
  const getCurrentClassInfo = () => {
    if (!currentSchedule) return null;
    
    if (currentSchedule.currentClass && currentSchedule.currentClass.id === selectedClass) {
      return {
        type: 'current',
        message: `Class in session (${formatTime(currentSchedule.currentClass.startTime)} - ${formatTime(currentSchedule.currentClass.endTime)})`
      };
    } else if (currentSchedule.nextClass && currentSchedule.nextClass.id === selectedClass) {
      return {
        type: 'next',
        message: `Upcoming class (${formatTime(currentSchedule.nextClass.startTime)} - ${formatTime(currentSchedule.nextClass.endTime)})`
      };
    } else if (currentSchedule.allClasses) {
      const classInfo = currentSchedule.allClasses.find(c => c.id === selectedClass);
      if (classInfo) {
        return {
          type: 'scheduled',
          message: `Scheduled for ${formatTime(classInfo.startTime)} - ${formatTime(classInfo.endTime)}`
        };
      }
    }
    return null;
  };
  
  // Navigate to class detail
  const handleViewClass = () => {
    if (selectedClass) {
      navigate(`/teacher/classes/${selectedClass}`);
    }
  };
  
  // Handle opening the note modal
  const handleAddNote = (student) => {
    setSelectedStudent(student);
    setNoteModalOpen(true);
  };
  
  // Handle saving a note
  const handleSaveNote = (note) => {
    if (selectedStudent) {
      updateAttendanceNotes(selectedStudent.id, note);
    }
  };
  
  // Function to render attendance status button with proper styling
  const renderStatusButton = (status, studentId, currentStatus) => {
    const isActive = currentStatus === status;
    const statusInfo = STATUS_COLORS[status];
    
    return (
      <button
        type="button"
        onClick={() => handleAttendanceChange(studentId, status)}
        className={`
          flex items-center justify-center px-3 py-1.5 rounded-md border
          ${isActive ? `${statusInfo.bg} ${statusInfo.text} border-transparent` : 'bg-white text-gray-700 border-gray-300'}
          ${isActive ? statusInfo.hoverBg : 'hover:bg-gray-50'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
      >
        <span className={`mr-1 ${isActive ? statusInfo.iconColor : 'text-gray-400'}`}>
          {statusInfo.icon}
        </span>
        <span className="text-sm font-medium capitalize">{status}</span>
      </button>
    );
  };

  // Current class info
  const classInfo = getCurrentClassInfo();
  
  return (
    <div className="space-y-6 p-6">
      <ActionBar
        title="Attendance"
        subtitle={`${formatDate(selectedDate)} • ${currentTime}`}
      />
      
      <div className="grid grid-cols-1 gap-6">
        {!selectedClass ? (
          <Card>
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Loading Your Classes</h3>
              <p className="mt-2 text-sm text-gray-500">
                Based on your schedule, the system will automatically load your current or upcoming class.
              </p>
            </div>
          </Card>
        ) : studentsLoading || attendanceLoading ? (
          <Card>
            <div className="divide-y divide-gray-200">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <div className="h-6 bg-blue-200 rounded w-1/3 animate-pulse"></div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="h-4 bg-blue-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-8 bg-blue-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <SkeletonAttendanceRow key={index} />
                ))}
              </div>
            </div>
          </Card>
        ) : students.length === 0 ? (
          <Card>
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Students Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no students enrolled in this class.
              </p>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="divide-y divide-gray-200">
              {/* Header with class selection and controls */}
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                    <select
                      value={selectedClass}
                      onChange={handleClassChange}
                      disabled={classLoading || scheduleLoading}
                      className="p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select a class</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} - {cls.grade} - Section {cls.section}
                        </option>
                      ))}
                    </select>
                    
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      disabled={!selectedClass}
                      className="p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    
                    {classInfo && (
                      <div className={`text-sm p-2 rounded-md flex items-center ${
                        classInfo.type === 'current' ? 'bg-green-50 text-green-700' : 
                        classInfo.type === 'next' ? 'bg-blue-50 text-blue-700' : 
                        'bg-gray-50 text-gray-700'
                      }`}>
                        <FiInfo className="mr-2" />
                        {classInfo.message}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="px-3 py-1.5 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <button
                      onClick={handleViewClass}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Class Details
                    </button>
                  </div>
                </div>
                
                {/* Quick Actions & Stats */}
                <div className="flex flex-col md:flex-row justify-between mt-3">
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                      {stats.present} Present ({stats.presentPercentage}%)
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                      {stats.absent} Absent
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                      {stats.late} Late
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                      {stats.excused} Excused
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleMarkAll(ATTENDANCE_STATUS.PRESENT)}
                      className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded hover:bg-green-200 transition-colors"
                    >
                      All Present
                    </button>
                    <button
                      onClick={() => handleMarkAll(ATTENDANCE_STATUS.ABSENT)}
                      className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded hover:bg-red-200 transition-colors"
                    >
                      All Absent
                    </button>
                    <button
                      onClick={() => handleMarkAll(ATTENDANCE_STATUS.LATE)}
                      className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded hover:bg-yellow-200 transition-colors"
                    >
                      All Late
                    </button>
                    <button
                      onClick={() => handleMarkAll(ATTENDANCE_STATUS.EXCUSED)}
                      className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                    >
                      All Excused
                    </button>
                  </div>
                </div>
                
                {/* Notifications */}
                {saveSuccess && (
                  <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-md text-sm">
                    Attendance saved successfully!
                  </div>
                )}
                
                {saveError && (
                  <div className="mt-2 p-2 bg-red-100 text-red-800 rounded-md text-sm">
                    Error: {saveError}
                  </div>
                )}
                
                {attendanceError && (
                  <div className="mt-2 p-2 bg-red-100 text-red-800 rounded-md text-sm">
                    Error: {attendanceError}
                  </div>
                )}
              </div>
              
              {/* Student List */}
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => {
                    const attendanceRecord = attendanceMap[student.id] || { status: ATTENDANCE_STATUS.PRESENT, notes: '' };
                    const hasNotes = attendanceRecord.notes && attendanceRecord.notes.trim().length > 0;
                    
                    return (
                      <div key={student.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {getInitials(student.name)}
                          </div>
                          
                          <div className="ml-4 flex-1">
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {student.name}
                              {hasNotes && (
                                <span className="ml-2 text-blue-500" title={attendanceRecord.notes}>
                                  <FiMessageSquare className="w-4 h-4" />
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{student.roll_number}</div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {Object.values(ATTENDANCE_STATUS).map(status => (
                              renderStatusButton(status, student.id, attendanceRecord.status)
                            ))}
                            
                            <button
                              onClick={() => handleAddNote(student)}
                              className="ml-2 p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                              title={hasNotes ? 'Edit note' : 'Add note'}
                            >
                              <FiMessageSquare className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No students match your search criteria.
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={handleSaveAttendance}
                  disabled={saving || students.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Attendance'}
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Note Modal */}
      {selectedStudent && (
        <AttendanceNoteModal
          isOpen={noteModalOpen}
          onClose={() => setNoteModalOpen(false)}
          student={selectedStudent}
          currentNote={selectedStudent ? (attendanceMap[selectedStudent.id]?.notes || '') : ''}
          onSaveNote={handleSaveNote}
        />
      )}
    </div>
  );
};

export default Attendance; 