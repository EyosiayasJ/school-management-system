import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaFileAlt, FaComment, FaInfo, FaUserFriends } from 'react-icons/fa';
import Card from '../common/Card';
import StatCard from '../common/StatCard';
import FormField from '../common/FormField';
import AttendanceNoteModal from './AttendanceNoteModal';
import SkeletonAttendanceRow from '../common/SkeletonAttendanceRow';
import { ATTENDANCE_STATUS } from '../../services/domains/attendance';

// Helper to get date string for today
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date for display
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper to get initials from name object or string
const getInitials = (nameData) => {
  if (typeof nameData === 'string') {
    const names = nameData.split(' ');
    return names.map(n => n.charAt(0)).join('').toUpperCase();
  } else if (nameData && typeof nameData === 'object') {
    const { first, last } = nameData;
    return `${first.charAt(0)}${last.charAt(0)}`;
  }
  return '?';
};

// Status color mapping
const STATUS_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    hoverBg: 'hover:bg-green-200',
    iconColor: 'text-green-600',
    icon: <FaCheckCircle className="w-5 h-5" />
  },
  [ATTENDANCE_STATUS.ABSENT]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    hoverBg: 'hover:bg-red-200',
    iconColor: 'text-red-600',
    icon: <FaTimesCircle className="w-5 h-5" />
  },
  [ATTENDANCE_STATUS.LATE]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    hoverBg: 'hover:bg-yellow-200',
    iconColor: 'text-yellow-600',
    icon: <FaClock className="w-5 h-5" />
  },
  [ATTENDANCE_STATUS.EXCUSED]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800', 
    hoverBg: 'hover:bg-blue-200',
    iconColor: 'text-blue-600',
    icon: <FaFileAlt className="w-5 h-5" />
  }
};

/**
 * StudentAttendance Component
 * 
 * A reusable component for managing student attendance
 * 
 * @param {Object} props
 * @param {Array} props.students - List of students
 * @param {Object} props.attendanceMap - Map of student attendance
 * @param {Object} props.attendanceStats - Attendance statistics
 * @param {Function} props.updateAttendanceStatus - Function to update student status
 * @param {Function} props.updateAttendanceNotes - Function to update student notes
 * @param {Function} props.markAllStatus - Function to mark all students with a status
 * @param {Function} props.saveAttendance - Function to save attendance
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.saving - Saving state
 * @param {boolean} props.saveSuccess - Save success state
 * @param {string} props.saveError - Save error message
 * @param {string} props.selectedDate - Selected date
 * @param {Function} props.setSelectedDate - Function to update selected date
 * @param {Object} props.studentNames - Map of student names (optional)
 * @param {Object} props.studentPhotos - Map of student photos (optional)
 * @param {Function} props.formatFullName - Function to format full name (optional)
 * @param {string} props.title - Title for the attendance section (optional)
 * @param {string} props.subtitle - Subtitle for the attendance section (optional)
 * @param {string} props.infoTitle - Title for the info box (optional)
 * @param {string} props.infoText - Text for the info box (optional)
 */
const StudentAttendance = ({
  students,
  attendanceMap,
  attendanceStats,
  updateAttendanceStatus,
  updateAttendanceNotes,
  markAllStatus,
  saveAttendance,
  loading,
  saving,
  saveSuccess,
  saveError,
  selectedDate = getTodayDateString(),
  setSelectedDate,
  studentNames,
  studentPhotos,
  formatFullName,
  title = "Attendance Management",
  subtitle = "Record student attendance for your class",
  infoTitle = "Attendance Information",
  infoText = "Daily attendance records are required and must be submitted by the end of each class period."
}) => {
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle date change
  const handleDateChange = (e) => {
    if (setSelectedDate) {
      setSelectedDate(e.target.value);
    }
  };

  // Handle adding a note
  const handleAddNote = (student) => {
    setSelectedStudent(student);
    setNoteModalOpen(true);
  };

  // Handle saving note
  const handleSaveNote = (note) => {
    if (selectedStudent) {
      updateAttendanceNotes(selectedStudent.id, note);
    }
    setNoteModalOpen(false);
    setSelectedStudent(null);
  };

  // Get display name for student
  const getStudentDisplayName = (studentId) => {
    if (studentNames && formatFullName) {
      return studentNames[studentId] ? formatFullName(studentNames[studentId]) : studentId;
    }
    
    const student = students.find(s => s.id === studentId || s.studentId === studentId);
    return student ? student.name : studentId;
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const studentId = student.id || student.studentId;
    const displayName = getStudentDisplayName(studentId);
    const studentRoll = student.roll_number || '';
    
    return displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentRoll.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Render status button
  const renderStatusButton = (status, studentId, currentStatus) => {
    const isActive = currentStatus === status;
    const statusInfo = STATUS_COLORS[status];
    
    return (
      <button
        onClick={() => updateAttendanceStatus(studentId, status)}
        className={`
          py-1 px-3 rounded-md flex items-center justify-center transition-colors
          ${isActive ? `${statusInfo.bg} ${statusInfo.text}` : 'bg-gray-100 text-gray-600'}
          ${!isActive && statusInfo.hoverBg}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        disabled={saving}
        aria-label={`Mark as ${status}`}
      >
        <span className={`mr-1 ${isActive ? statusInfo.iconColor : ''}`}>
          {statusInfo.icon}
        </span>
        <span className="hidden sm:inline">{status}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <FormField
          id="attendance-date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          wrapperClassName="w-40"
          disabled={saving}
        />
      </div>
      
      {/* Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          title="Total Students"
          value={attendanceStats.total}
          icon={<FaUserFriends className="w-6 h-6 text-blue-500" />}
          className="bg-blue-50 border-blue-200"
        />
        <StatCard
          title="Present"
          value={`${attendanceStats.present} (${attendanceStats.presentPercentage}%)`}
          icon={<FaCheckCircle className="w-6 h-6 text-green-500" />}
          className="bg-green-50 border-green-200"
        />
        <StatCard
          title="Absent"
          value={attendanceStats.absent}
          icon={<FaTimesCircle className="w-6 h-6 text-red-500" />}
          className="bg-red-50 border-red-200"
        />
        <StatCard
          title="Total Incidents"
          value={attendanceStats.late + attendanceStats.excused}
          icon={<FaInfo className="w-6 h-6 text-yellow-500" />}
          className="bg-yellow-50 border-yellow-200"
          details={`${attendanceStats.late} Late, ${attendanceStats.excused} Excused`}
        />
      </div>
      
      <Card>
        {/* Today's Date */}
        <div className="mb-4 pb-4 border-b border-gray-100 px-6 pt-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {formatDate(selectedDate)}
          </h2>
          <p className="text-sm text-gray-500">
            Attendance records for your class.
          </p>
        </div>
        
        {/* Attendance Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-6 px-6">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => markAllStatus(ATTENDANCE_STATUS.PRESENT)}
              className="px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
              disabled={saving || students.length === 0}
            >
              Mark All Present
            </button>
            <button 
              onClick={() => markAllStatus(ATTENDANCE_STATUS.ABSENT)}
              className="px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
              disabled={saving || students.length === 0}
            >
              Mark All Absent
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
            <FormField
              id="search-students"
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              wrapperClassName="w-full sm:w-64"
              disabled={saving}
            />
            
            <button 
              onClick={saveAttendance}
              className={`
                px-4 py-2 rounded transition-colors 
                ${saving ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} 
                text-white flex items-center justify-center
              `}
              disabled={saving || students.length === 0}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Attendance'}
            </button>
          </div>
        </div>
        
        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-4 mx-6 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
            <FaCheckCircle className="w-5 h-5 mr-2" />
            Attendance successfully saved!
          </div>
        )}
        
        {/* Error Message */}
        {saveError && (
          <div className="mb-4 mx-6 p-3 bg-red-100 text-red-800 rounded-md flex items-center">
            <FaInfo className="w-5 h-5 mr-2" />
            {saveError}
          </div>
        )}
        
        {/* Loading States */}
        {loading && (
          <div className="px-6 pb-6">
            {[...Array(5)].map((_, index) => (
              <SkeletonAttendanceRow key={index} />
            ))}
          </div>
        )}
        
        {/* Main Attendance List */}
        {!loading && (
          <div className="overflow-x-auto px-6 pb-6">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {students.length === 0 ? 'No students in this class.' : 'No students match your search criteria.'}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredStudents.map(student => {
                  const studentId = student.id || student.studentId;
                  const attendanceRecord = attendanceMap[studentId] || { status: ATTENDANCE_STATUS.PRESENT, notes: '' };
                  const hasNotes = attendanceRecord.notes && attendanceRecord.notes.trim().length > 0;
                  
                  return (
                    <div key={studentId} className="p-4 hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-center mb-4 sm:mb-0">
                          {/* Student Photo/Avatar */}
                          <div className="flex-shrink-0">
                            {studentPhotos && studentPhotos[studentId] ? (
                              <img 
                                src={studentPhotos[studentId]} 
                                alt={getStudentDisplayName(studentId)}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                {getInitials(studentNames ? studentNames[studentId] : student.name)}
                              </div>
                            )}
                          </div>
                          
                          {/* Student Info */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getStudentDisplayName(studentId)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.roll_number || `Student ID: ${studentId}`}
                            </div>
                          </div>
                        </div>
                        
                        {/* Attendance Controls */}
                        <div className="flex flex-wrap gap-2 items-center">
                          {renderStatusButton(ATTENDANCE_STATUS.PRESENT, studentId, attendanceRecord.status)}
                          {renderStatusButton(ATTENDANCE_STATUS.ABSENT, studentId, attendanceRecord.status)}
                          {renderStatusButton(ATTENDANCE_STATUS.LATE, studentId, attendanceRecord.status)}
                          {renderStatusButton(ATTENDANCE_STATUS.EXCUSED, studentId, attendanceRecord.status)}
                          
                          {/* Notes Button */}
                          <button
                            onClick={() => handleAddNote({ id: studentId })}
                            className={`
                              p-2 rounded-md transition-colors
                              ${hasNotes ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                            `}
                            disabled={saving}
                            title={hasNotes ? attendanceRecord.notes : 'Add a note'}
                          >
                            <FaComment className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Display Notes if any */}
                      {hasNotes && (
                        <div className="mt-2 ml-14 p-2 bg-purple-50 rounded-md text-sm text-purple-800 relative">
                          <p>{attendanceRecord.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Card>
      
      {/* Important Information for Teachers */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start">
          <FaInfo className="w-6 h-6 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800">{infoTitle}</h3>
            <p className="text-blue-700 mt-1">{infoText}</p>
          </div>
        </div>
      </div>
      
      {/* Note Modal */}
      {noteModalOpen && selectedStudent && (
        <AttendanceNoteModal
          isOpen={noteModalOpen}
          onClose={() => setNoteModalOpen(false)}
          studentName={getStudentDisplayName(selectedStudent.id)}
          initialNote={attendanceMap[selectedStudent.id]?.notes || ''}
          onSave={handleSaveNote}
          saving={saving}
        />
      )}
    </div>
  );
};

export default StudentAttendance; 