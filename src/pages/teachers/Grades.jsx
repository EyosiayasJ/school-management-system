import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../../components/common/ActionBar';

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
    { id: 'std-013', name: 'Charlotte Jones', roll_number: '2023-C104' }
  ]
};

const MOCK_ASSIGNMENTS = {
  'cls-001': [
    { id: 'asgn-001', title: 'Algebra Quiz 1', totalPoints: 20, weight: 10 },
    { id: 'asgn-002', title: 'Functions Homework', totalPoints: 15, weight: 5 },
    { id: 'asgn-003', title: 'Midterm Exam', totalPoints: 100, weight: 30 },
    { id: 'asgn-004', title: 'Word Problems Project', totalPoints: 50, weight: 15 }
  ],
  'cls-002': [
    { id: 'asgn-005', title: 'Physics Lab 1', totalPoints: 30, weight: 15 },
    { id: 'asgn-006', title: 'Mechanics Quiz', totalPoints: 25, weight: 10 },
    { id: 'asgn-007', title: 'Energy Homework', totalPoints: 20, weight: 5 }
  ],
  'cls-003': [
    { id: 'asgn-008', title: 'Programming Quiz 1', totalPoints: 20, weight: 10 },
    { id: 'asgn-009', title: 'Python Project', totalPoints: 50, weight: 25 },
    { id: 'asgn-010', title: 'Algorithms Homework', totalPoints: 15, weight: 5 },
    { id: 'asgn-011', title: 'Data Structures Test', totalPoints: 40, weight: 20 }
  ]
};

// Generate random grades for mock data
const generateMockGrades = (classId) => {
  const grades = {};
  const students = MOCK_STUDENTS[classId] || [];
  const assignments = MOCK_ASSIGNMENTS[classId] || [];
  
  students.forEach(student => {
    grades[student.id] = {};
    
    assignments.forEach(assignment => {
      // Generate a random score between 70% and 100% of total points
      const minScore = Math.floor(assignment.totalPoints * 0.7);
      const maxScore = assignment.totalPoints;
      const score = Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
      
      grades[student.id][assignment.id] = {
        score,
        outOf: assignment.totalPoints,
        submitted: true,
        feedback: ''
      };
    });
  });
  
  return grades;
};

// Generate initials from name
const getInitials = (name) => {
  const names = name.split(' ');
  return names.map(n => n.charAt(0)).join('');
};

const Grades = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [classLoading, setClassLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
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
  
  // Fetch students, assignments, and grades when a class is selected
  useEffect(() => {
    if (!selectedClass) return;
    
    const fetchGradebookData = () => {
      setLoading(true);
      
      // Simulate API call with delay
      setTimeout(() => {
        const classStudents = MOCK_STUDENTS[selectedClass] || [];
        const classAssignments = MOCK_ASSIGNMENTS[selectedClass] || [];
        const classGrades = generateMockGrades(selectedClass);
        
        setStudents(classStudents);
        setAssignments(classAssignments);
        setGrades(classGrades);
        setLoading(false);
      }, 800);
    };
    
    fetchGradebookData();
  }, [selectedClass]);
  
  // Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setEditingCell(null);
    setEditValue('');
  };
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate average grade for a student
  const calculateStudentAverage = (studentId) => {
    if (!grades[studentId]) return 'N/A';
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    assignments.forEach(assignment => {
      const grade = grades[studentId][assignment.id];
      if (grade && grade.submitted) {
        const percentage = (grade.score / grade.outOf) * 100;
        totalWeightedScore += percentage * assignment.weight;
        totalWeight += assignment.weight;
      }
    });
    
    if (totalWeight === 0) return 'N/A';
    return (totalWeightedScore / totalWeight).toFixed(1) + '%';
  };
  
  // Calculate class average for an assignment
  const calculateAssignmentAverage = (assignmentId) => {
    let totalScore = 0;
    let count = 0;
    
    Object.keys(grades).forEach(studentId => {
      const grade = grades[studentId][assignmentId];
      if (grade && grade.submitted) {
        totalScore += (grade.score / grade.outOf) * 100;
        count++;
      }
    });
    
    if (count === 0) return 'N/A';
    return (totalScore / count).toFixed(1) + '%';
  };
  
  // Handle clicking on a grade cell to edit
  const handleCellClick = (studentId, assignmentId) => {
    if (grades[studentId] && grades[studentId][assignmentId]) {
      setEditingCell({ studentId, assignmentId });
      setEditValue(grades[studentId][assignmentId].score.toString());
    }
  };
  
  // Handle input change for editing a grade
  const handleGradeChange = (e) => {
    setEditValue(e.target.value);
  };
  
  // Handle saving the edited grade
  const handleGradeSave = () => {
    if (!editingCell) return;
    
    const { studentId, assignmentId } = editingCell;
    const assignment = assignments.find(a => a.id === assignmentId);
    const numericValue = Number(editValue);
    
    // Validate input
    if (isNaN(numericValue) || numericValue < 0 || numericValue > assignment.totalPoints) {
      alert(`Please enter a valid number between 0 and ${assignment.totalPoints}`);
      return;
    }
    
    setIsSaving(true);
    
    // In a real app, we would send this to the API
    // For now, just update the state
    setTimeout(() => {
      setGrades(prevGrades => ({
        ...prevGrades,
        [studentId]: {
          ...prevGrades[studentId],
          [assignmentId]: {
            ...prevGrades[studentId][assignmentId],
            score: numericValue
          }
        }
      }));
      
      setEditingCell(null);
      setEditValue('');
      setIsSaving(false);
    }, 300);
  };
  
  // Handle pressing Enter key in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGradeSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };
  
  // Get cell color based on score percentage
  const getCellColor = (score, totalPoints) => {
    if (!score && score !== 0) return 'bg-gray-100';
    
    const percentage = (score / totalPoints) * 100;
    
    if (percentage >= 90) return 'bg-green-50 text-green-800';
    if (percentage >= 80) return 'bg-blue-50 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-50 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-50 text-orange-800';
    return 'bg-red-50 text-red-800';
  };
  
  // Export gradebook to CSV
  const exportToCSV = () => {
    if (!selectedClass || students.length === 0 || assignments.length === 0) return;
    
    // Create CSV header row with student info and assignment titles
    let csvContent = 'Student Name,Roll Number';
    assignments.forEach(assignment => {
      csvContent += `,${assignment.title}`;
    });
    csvContent += ',Average\n';
    
    // Add data rows
    filteredStudents.forEach(student => {
      csvContent += `${student.name},${student.roll_number}`;
      
      assignments.forEach(assignment => {
        const grade = grades[student.id]?.[assignment.id];
        csvContent += `,${grade?.score || ''}`;
      });
      
      // Add student average
      csvContent += `,${calculateStudentAverage(student.id)}\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `class_${selectedClass}_gradebook.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  // Navigate to class detail
  const handleViewClass = () => {
    if (selectedClass) {
      navigate(`/teacher/classes/${selectedClass}`);
    }
  };
  
  // Get class name from ID
  const getClassName = (classId) => {
    const cls = classes.find(c => c.id === classId);
    return cls ? `${cls.name} - ${cls.grade} - Section ${cls.section}` : '';
  };
  
  return (
    <div className="space-y-6 p-6">
      <ActionBar
        title="Gradebook"
        subtitle="Manage and track student grades"
      />
      
      {selectedClass ? (
        loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : students.length === 0 || assignments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No Grades Available</h3>
            <p className="mt-2 text-sm text-gray-500">
              {students.length === 0 
                ? "This class doesn't have any students enrolled." 
                : "This class doesn't have any assignments yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                  <select
                    value={selectedClass}
                    onChange={handleClassChange}
                    disabled={classLoading}
                    className="p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="">Select a class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} - {cls.grade} - Section {cls.section}
                      </option>
                    ))}
                  </select>
                  
                  {selectedClass && (
                    <h2 className="text-lg font-medium text-gray-900">
                      {getClassName(selectedClass)} <span className="text-sm text-gray-500">({students.length} Students • {assignments.length} Assignments)</span>
                    </h2>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleViewClass}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Class Details
                    </button>
                    
                    <button
                      onClick={exportToCSV}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="sticky left-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Student
                    </th>
                    
                    {assignments.map(assignment => (
                      <th key={assignment.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="whitespace-nowrap">{assignment.title}</div>
                        <div className="text-xs font-normal text-gray-400 mt-1">
                          {assignment.totalPoints} pts • {calculateAssignmentAverage(assignment.id)}
                        </div>
                      </th>
                    ))}
                    
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                      Average
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white border-r px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                              {getInitials(student.name)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.roll_number}</div>
                          </div>
                        </div>
                      </td>
                      
                      {assignments.map(assignment => {
                        const grade = grades[student.id]?.[assignment.id];
                        const isEditing = editingCell?.studentId === student.id && editingCell?.assignmentId === assignment.id;
                        
                        return (
                          <td 
                            key={assignment.id} 
                            className={`px-6 py-4 whitespace-nowrap text-center ${getCellColor(grade?.score, assignment.totalPoints)}`}
                            onClick={() => !isEditing && handleCellClick(student.id, assignment.id)}
                          >
                            {isEditing ? (
                              <div className="flex items-center justify-center">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={handleGradeChange}
                                  onBlur={handleGradeSave}
                                  onKeyDown={handleKeyDown}
                                  className="w-16 text-center border rounded px-2 py-1"
                                  autoFocus
                                />
                                {isSaving && (
                                  <div className="ml-2 animate-spin h-4 w-4 border-t-2 border-blue-500 rounded-full"></div>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm cursor-pointer">
                                {grade?.score !== undefined ? `${grade.score}/${grade.outOf}` : 'N/A'}
                              </div>
                            )}
                          </td>
                        );
                      })}
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-gray-50">
                        {calculateStudentAverage(student.id)}
                      </td>
                    </tr>
                  ))}
                  
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={assignments.length + 2} className="px-6 py-8 text-center text-gray-500">
                        No students match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Select a Class</h3>
          <p className="mt-2 text-sm text-gray-500">
            Choose a class from the dropdown below to view and manage grades.
          </p>
          
          <div className="mt-6 max-w-sm mx-auto">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              disabled={classLoading}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.grade} - Section {cls.section}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grades; 