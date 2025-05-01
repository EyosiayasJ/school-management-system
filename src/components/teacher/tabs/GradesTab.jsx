import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Mock data for development
const MOCK_STUDENTS = [
  { id: 'std-001', name: 'Emma Thompson', roll_number: '2023-A101' },
  { id: 'std-002', name: 'James Wilson', roll_number: '2023-A102' },
  { id: 'std-003', name: 'Sophia Martinez', roll_number: '2023-A103' },
  { id: 'std-004', name: 'Ethan Johnson', roll_number: '2023-A104' },
  { id: 'std-005', name: 'Olivia Brown', roll_number: '2023-A105' },
  { id: 'std-006', name: 'Noah Davis', roll_number: '2023-A106' },
  { id: 'std-007', name: 'Ava Miller', roll_number: '2023-A107' }
];

const MOCK_ASSIGNMENTS = [
  { id: 'asgn-001', title: 'Algebra Quiz 1', totalPoints: 20, weight: 10 },
  { id: 'asgn-002', title: 'Functions Homework', totalPoints: 15, weight: 5 },
  { id: 'asgn-003', title: 'Midterm Exam', totalPoints: 100, weight: 30 },
  { id: 'asgn-004', title: 'Word Problems Project', totalPoints: 50, weight: 15 }
];

// Generate random grades for mock data
const generateMockGrades = () => {
  const grades = {};
  
  MOCK_STUDENTS.forEach(student => {
    grades[student.id] = {};
    
    MOCK_ASSIGNMENTS.forEach(assignment => {
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

const GradesTab = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch data for the gradebook
  useEffect(() => {
    const fetchGradeData = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // In a real app, we would fetch from the API
          setStudents(MOCK_STUDENTS);
          setAssignments(MOCK_ASSIGNMENTS);
          
          // Generate mock grades
          setGrades(generateMockGrades());
          
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch gradebook data.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchGradeData();
  }, [classId]);
  
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
    a.setAttribute('download', `class_${classId}_gradebook.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Gradebook</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and track student grades</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="text"
            placeholder="Search students..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
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
                        {student.name.split(' ').map(n => n[0]).join('')}
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
          </tbody>
        </table>
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No students match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

GradesTab.propTypes = {
  classId: PropTypes.string.isRequired
};

export default GradesTab; 