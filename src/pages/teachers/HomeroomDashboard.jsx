import { useState } from 'react';
import { FaChartLine, FaSpinner, FaPaperPlane, FaStar, FaEdit, FaEye, FaHome, FaUserFriends, FaUser } from 'react-icons/fa';

import { useTerms } from '../../contexts/TermContext';
import { useAuth } from '../../contexts/AuthContext';
import { useHomeroomDashboard, useTermReports } from '../../hooks/useTermData';
import { gpaToLetterGrade, isPassing } from '../../utils/gradeUtils';

import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import BehaviorRatingForm from '../../components/teacher/BehaviorRatingForm';

// Mock student names with first, second (optional), and last name format
const STUDENT_NAMES = {
  st1: { first: 'Emma', middle: 'Grace', last: 'Johnson' },
  st2: { first: 'Michael', middle: '', last: 'Chen' },
  st3: { first: 'Sophia', middle: 'Isabella', last: 'Rodriguez' },
  st4: { first: 'Jayden', middle: 'Alexander', last: 'Williams' },
  st5: { first: 'Olivia', middle: 'Rose', last: 'Garcia' }
};

// Mock teacher names with first, middle, and last name format
const TEACHER_NAMES = {
  t1: { first: 'Sarah', middle: 'Elizabeth', last: 'Williams', title: 'Dr.' },
  t2: { first: 'James', middle: '', last: 'Anderson', title: 'Prof.' },
  t3: { first: 'Emily', middle: 'Jane', last: 'Parker', title: 'Ms.' }
};

// Mock student profile pictures - in a real app, these would come from the API
const STUDENT_PHOTOS = {
  st1: 'https://randomuser.me/api/portraits/women/44.jpg',
  st2: 'https://randomuser.me/api/portraits/men/32.jpg',
  st3: 'https://randomuser.me/api/portraits/women/68.jpg',
  st4: 'https://randomuser.me/api/portraits/men/81.jpg',
  st5: 'https://randomuser.me/api/portraits/women/10.jpg'
};

// Helper function to format full name from name parts
const formatFullName = (nameObj) => {
  if (!nameObj) return 'Unknown';
  const { first, middle, last } = nameObj;
  return [first, middle, last].filter(Boolean).join(' ');
};

// Helper function to format name with title
const formatNameWithTitle = (nameObj) => {
  if (!nameObj) return 'Unknown';
  const { title, first, last } = nameObj;
  return title ? `${title} ${first} ${last}` : `${first} ${last}`;
};

/**
 * HomeroomDashboard Component
 * Shows homeroom teachers a dashboard with student grades, ranks, and behavior data
 */
export default function HomeroomDashboard() {
  const { currentTerm } = useTerms();
  const { user } = useAuth();
  const classId = user?.classId || 'c1'; // Default to c1 for demo
  const teacherId = user?.id || 't1'; // Default to t1 for demo
  
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [selectedGradeStudent, setSelectedGradeStudent] = useState(null);
  
  // Get data from hooks
  const { loading, error, students } = useHomeroomDashboard(
    classId, 
    currentTerm?.id, 
    currentTerm?.gradingMode
  );
  
  const { 
    generating, 
    error: reportError, 
    success: reportSuccess, 
    generateReports 
  } = useTermReports(currentTerm?.id);
  
  // Handle opening the behavior rating modal
  const handleRateStudent = (student) => {
    setSelectedStudent(student);
    setRatingModalOpen(true);
  };
  
  // Handle behavior rating saved
  const handleRatingSaved = () => {
    setRatingModalOpen(false);
    setSelectedStudent(null);
    // In a real app, you would refresh the data here
  };
  
  // Handle opening the grade view modal
  const handleViewGrade = (student) => {
    setSelectedGradeStudent(student);
    setGradeModalOpen(true);
  };
  
  // Handle grade modal close
  const handleGradeModalClose = () => {
    setGradeModalOpen(false);
    setSelectedGradeStudent(null);
  };
  
  // Calculate class statistics
  const calculateStats = () => {
    if (!students.length) return { avg: 0, passing: 0, failing: 0 };
    
    const totalGrade = students.reduce((sum, student) => sum + student.termGrade, 0);
    const avg = +(totalGrade / students.length).toFixed(2);
    
    const passing = students.filter(s => isPassing(s.termGrade)).length;
    const failing = students.length - passing;
    
    return { avg, passing, failing };
  };
  
  const stats = calculateStats();
  
  // Prepare data table columns
  const columns = [
    {
      field: 'studentId',
      header: 'Student',
      render: (row) => (
        <div className="flex items-center">
          {STUDENT_PHOTOS[row.studentId] ? (
            <img 
              src={STUDENT_PHOTOS[row.studentId]} 
              alt={STUDENT_NAMES[row.studentId] ? formatFullName(STUDENT_NAMES[row.studentId]) : 'Student'} 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <FaUser className="text-gray-500" />
            </div>
          )}
          <span>{STUDENT_NAMES[row.studentId] ? formatFullName(STUDENT_NAMES[row.studentId]) : row.studentId}</span>
        </div>
      )
    },
    {
      field: 'termGrade',
      header: currentTerm?.gradingMode === 'gpa' ? 'GPA' : 'Average Grade',
      sortable: true,
      render: (row) => (
        <span className={`font-semibold ${isPassing(row.termGrade) ? 'text-green-600' : 'text-red-600'}`}>
          {row.termGrade.toFixed(2)}
          {currentTerm?.gradingMode === 'gpa' && ` (${gpaToLetterGrade(row.termGrade)})`}
        </span>
      )
    },
    {
      field: 'rank',
      header: 'Rank',
      sortable: true,
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.rank}
        </span>
      )
    },
    {
      field: 'avgRating',
      header: 'Behavior',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <span className={`mr-2 font-medium ${
            !row.avgRating ? 'text-gray-400' : 
            row.avgRating < 5 ? 'text-red-600' : 
            row.avgRating < 7 ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            {row.avgRating ? row.avgRating.toFixed(1) : 'N/A'}
          </span>
          {row.avgRating && <FaStar className="text-yellow-500" />}
        </div>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      className: 'text-center',
      render: (row) => (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => handleRateStudent(row)}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
            aria-label={`Rate ${STUDENT_NAMES[row.studentId] ? formatFullName(STUDENT_NAMES[row.studentId]) : 'student'}'s behavior`}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleViewGrade(row)}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
            aria-label={`View ${STUDENT_NAMES[row.studentId] ? formatFullName(STUDENT_NAMES[row.studentId]) : 'student'}'s detailed grades`}
          >
            <FaEye />
          </button>
        </div>
      )
    }
  ];
  
  // Content for the different tabs
  const tabContent = [
    {
      label: 'Rankings',
      content: (
        <div className="mt-4">
          <DataTable
            columns={columns}
            data={students}
            loading={loading}
            error={error}
            emptyMessage="No student data available for this term"
          />
        </div>
      )
    },
    {
      label: 'Reports',
      content: (
        <div className="mt-4 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Generate Term Reports</h3>
            <p className="mb-4 text-gray-700">
              Generate and send term reports for all students in your class. 
              This will compile grades and behavior ratings into comprehensive reports.
            </p>
            
            {reportSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                Reports have been successfully generated and sent!
              </div>
            )}
            
            {reportError && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                {reportError}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={generateReports}
                disabled={generating || !currentTerm}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="-ml-1 mr-2 h-4 w-4" />
                    Generate & Send Reports
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium mb-2">Important Notes</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Reports will be generated for all students in your class.</li>
              <li>• All subject grades and behavior ratings will be included.</li>
              <li>• Reports will be sent to the school administration for review.</li>
              <li>• Report deadline: {currentTerm?.reportDeadline ? new Date(currentTerm.reportDeadline).toLocaleDateString() : 'Not set'}</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <FaUserFriends className="mr-2 text-blue-600" />
          Homeroom Dashboard
        </h1>
        <div className="text-gray-600">
          Teacher: {TEACHER_NAMES[teacherId] ? formatNameWithTitle(TEACHER_NAMES[teacherId]) : 'Unknown'} | 
          Term: {currentTerm?.name || 'No active term'} | 
          Grading Mode: <span className="capitalize">{currentTerm?.gradingMode || 'N/A'}</span>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Class Average"
          value={`${stats.avg}${currentTerm?.gradingMode === 'gpa' ? ` (${gpaToLetterGrade(stats.avg)})` : '%'}`}
          icon={<FaChartLine className="h-6 w-6 text-blue-500" />}
          change={null}
          loading={loading}
        />
        <StatCard
          title="Passing"
          value={stats.passing}
          subtitle={`${students.length ? Math.round((stats.passing / students.length) * 100) : 0}% of students`}
          color="green"
          loading={loading}
        />
        <StatCard
          title="At Risk"
          value={stats.failing}
          subtitle={`${students.length ? Math.round((stats.failing / students.length) * 100) : 0}% of students`}
          color="red"
          loading={loading}
        />
      </div>
      
      {/* Main Content */}
      <Card>
        <Tabs tabs={tabContent} />
      </Card>
      
      {/* Behavior Rating Modal */}
      <Modal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        title={`Rate Student Behavior: ${selectedStudent ? (STUDENT_NAMES[selectedStudent.studentId] ? formatFullName(STUDENT_NAMES[selectedStudent.studentId]) : selectedStudent.studentId) : ''}`}
      >
        <div className="py-2">
          {selectedStudent && (
            <BehaviorRatingForm
              termId={currentTerm?.id}
              studentId={selectedStudent.studentId}
              classId={classId}
              teacherId={teacherId}
              teacherName={TEACHER_NAMES[teacherId] ? formatFullName(TEACHER_NAMES[teacherId]) : 'Unknown Teacher'}
              onSaved={handleRatingSaved}
              onCancel={() => setRatingModalOpen(false)}
            />
          )}
        </div>
      </Modal>
      
      {/* Grade Details Modal */}
      <Modal
        isOpen={gradeModalOpen}
        onClose={handleGradeModalClose}
        title={`Grade Details: ${selectedGradeStudent ? (STUDENT_NAMES[selectedGradeStudent.studentId] ? formatFullName(STUDENT_NAMES[selectedGradeStudent.studentId]) : selectedGradeStudent.studentId) : ''}`}
      >
        <div className="p-4">
          {selectedGradeStudent && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                {STUDENT_PHOTOS[selectedGradeStudent.studentId] ? (
                  <img 
                    src={STUDENT_PHOTOS[selectedGradeStudent.studentId]} 
                    alt={STUDENT_NAMES[selectedGradeStudent.studentId] ? formatFullName(STUDENT_NAMES[selectedGradeStudent.studentId]) : 'Student'} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-100">
                    <FaUser className="text-gray-500 text-2xl" />
                  </div>
                )}
              </div>
              
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {STUDENT_NAMES[selectedGradeStudent.studentId] 
                    ? formatFullName(STUDENT_NAMES[selectedGradeStudent.studentId]) 
                    : selectedGradeStudent.studentId}
                </h2>
                <p className="text-sm text-gray-500">Student ID: {selectedGradeStudent.studentId}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-100 pb-2">Term Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Term Grade:</span>
                  <span className={`font-semibold ${isPassing(selectedGradeStudent.termGrade) ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedGradeStudent.termGrade.toFixed(2)}
                    {currentTerm?.gradingMode === 'gpa' && ` (${gpaToLetterGrade(selectedGradeStudent.termGrade)})`}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium text-gray-700">Class Ranking:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedGradeStudent.rank} of {students.length}
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-100 pb-2">Subject Grades</h3>
                {selectedGradeStudent.subjectGrades && Object.keys(selectedGradeStudent.subjectGrades).length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {Object.entries(selectedGradeStudent.subjectGrades).map(([subject, grade]) => (
                      <div key={subject} className="flex justify-between py-2">
                        <span className="capitalize text-gray-700">{subject.replace('sub', 'Subject ')}</span>
                        <span className={`font-medium ${isPassing(grade) ? 'text-green-600' : 'text-red-600'}`}>
                          {grade.toFixed(2)}
                          {currentTerm?.gradingMode === 'gpa' && ` (${gpaToLetterGrade(grade)})`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No subject grades available</p>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-100 pb-2">Behavior Assessment</h3>
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700 mr-2">Overall Rating:</span>
                  <span className={`flex items-center ${
                    !selectedGradeStudent.avgRating ? 'text-gray-400' : 
                    selectedGradeStudent.avgRating < 5 ? 'text-red-600' : 
                    selectedGradeStudent.avgRating < 7 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {selectedGradeStudent.avgRating ? selectedGradeStudent.avgRating.toFixed(1) : 'Not rated'}
                    {selectedGradeStudent.avgRating && <FaStar className="ml-1 text-yellow-500" />}
                  </span>
                </div>
                
                {selectedGradeStudent.behaviorNotes && selectedGradeStudent.behaviorNotes.length > 0 ? (
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-700 mb-2">Teacher Notes:</h4>
                    <div className="space-y-2">
                      {selectedGradeStudent.behaviorNotes.map((note, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-600">
                              Teacher: {TEACHER_NAMES[note.teacherId] 
                                ? formatNameWithTitle(TEACHER_NAMES[note.teacherId]) 
                                : `ID: ${note.teacherId}`}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              note.score < 5 ? 'bg-red-100 text-red-800' : 
                              note.score < 7 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              Rating: {note.score}
                            </span>
                          </div>
                          <p className="text-gray-700">{note.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No behavior notes available</p>
                )}
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleGradeModalClose}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
} 