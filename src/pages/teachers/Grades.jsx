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

// Student photo mock data
const STUDENT_PHOTOS = {
  'std-001': 'https://randomuser.me/api/portraits/women/44.jpg',
  'std-002': 'https://randomuser.me/api/portraits/men/32.jpg',
  'std-003': 'https://randomuser.me/api/portraits/women/68.jpg',
  'std-004': 'https://randomuser.me/api/portraits/men/75.jpg',
  'std-005': 'https://randomuser.me/api/portraits/women/89.jpg',
  'std-006': 'https://randomuser.me/api/portraits/men/55.jpg',
  'std-007': 'https://randomuser.me/api/portraits/women/33.jpg',
  'std-008': 'https://randomuser.me/api/portraits/men/26.jpg',
  'std-009': 'https://randomuser.me/api/portraits/women/74.jpg',
  'std-010': 'https://randomuser.me/api/portraits/men/41.jpg',
  'std-011': 'https://randomuser.me/api/portraits/women/52.jpg',
  'std-012': 'https://randomuser.me/api/portraits/men/63.jpg',
  'std-013': 'https://randomuser.me/api/portraits/women/27.jpg'
};

const MOCK_STUDENTS = {
  'cls-001': [
    { id: 'std-001', name: 'Emma Thompson', roll_number: '2023-A101', comment: 'Excellent student. Participated actively in class discussions.' },
    { id: 'std-002', name: 'James Wilson', roll_number: '2023-A102' },
    { id: 'std-003', name: 'Sophia Martinez', roll_number: '2023-A103' },
    { id: 'std-004', name: 'Ethan Johnson', roll_number: '2023-A104' },
    { id: 'std-005', name: 'Olivia Brown', roll_number: '2023-A105', comment: 'Needs additional support in problem-solving.' }
  ],
  'cls-002': [
    { id: 'std-006', name: 'Noah Davis', roll_number: '2023-B101' },
    { id: 'std-007', name: 'Ava Miller', roll_number: '2023-B102', comment: 'Very creative thinker. Consider for advanced projects.' },
    { id: 'std-008', name: 'Liam Garcia', roll_number: '2023-B103' },
    { id: 'std-009', name: 'Isabella Rodriguez', roll_number: '2023-B104' }
  ],
  'cls-003': [
    { id: 'std-010', name: 'Lucas Smith', roll_number: '2023-C101' },
    { id: 'std-011', name: 'Mia Johnson', roll_number: '2023-C102' },
    { id: 'std-012', name: 'Mason Brown', roll_number: '2023-C103', comment: 'Excellent programming skills. Consider for computer science competition.' },
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
        feedback: '',
        comment: ''
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
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [studentCommentModalOpen, setStudentCommentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentCommentText, setStudentCommentText] = useState('');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    totalPoints: 20,
    weight: 10
  });
  const [showCopyAssignmentsModal, setShowCopyAssignmentsModal] = useState(false);
  const [targetClasses, setTargetClasses] = useState([]);
  const [assignmentsToCopy, setAssignmentsToCopy] = useState([]);
  
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
  const handleCellClick = (studentId, assignmentId, e) => {
    // If already editing a different cell, save the current edit first
    if (editingCell && (editingCell.studentId !== studentId || editingCell.assignmentId !== assignmentId)) {
      handleGradeSave();
    }
    
    // If right-click, show comment modal instead of grade editing
    if (e && e.type === 'contextmenu') {
      e.preventDefault();
      const grade = grades[studentId][assignmentId];
      setSelectedGrade({ studentId, assignmentId });
      setCommentText(grade.comment || '');
      setCommentModalOpen(true);
      return;
    }
    
    // Regular click - edit grade
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
      // Cancel editing and reset to original value
      setEditingCell(null);
      setEditValue('');
    }
  };
  
  // Get cell color based on score percentage
  const getCellColor = (score, totalPoints) => {
    if (!score && score !== 0) return 'bg-gray-100';
    
    const percentage = (score / totalPoints) * 100;
    
    if (percentage >= 90) return 'bg-green-50 text-green-800';
    if (percentage >= 80) return 'bg-green-100 text-green-700';
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
  
  // Save comment to grade
  const handleCommentSave = () => {
    if (!selectedGrade) return;
    
    const { studentId, assignmentId } = selectedGrade;
    
    setIsSaving(true);
    
    // In a real app, we would send this to the API
    setTimeout(() => {
      setGrades(prevGrades => ({
        ...prevGrades,
        [studentId]: {
          ...prevGrades[studentId],
          [assignmentId]: {
            ...prevGrades[studentId][assignmentId],
            comment: commentText
          }
        }
      }));
      
      setCommentModalOpen(false);
      setSelectedGrade(null);
      setCommentText('');
      setIsSaving(false);
    }, 300);
  };
  
  // Handle comment modal close
  const handleCommentModalClose = () => {
    setCommentModalOpen(false);
    setSelectedGrade(null);
    setCommentText('');
  };
  
  // Handle opening the student comment modal
  const handleStudentCommentClick = (student) => {
    setSelectedStudent(student);
    // Initialize with existing comment if any
    setStudentCommentText(student.comment || '');
    setStudentCommentModalOpen(true);
  };
  
  // Handle saving the student comment
  const handleStudentCommentSave = () => {
    if (!selectedStudent) return;
    
    setIsSaving(true);
    
    // In a real app, we would send this to the API
    setTimeout(() => {
      // Update student comment in the local state
      const updatedStudents = students.map(s => 
        s.id === selectedStudent.id ? { ...s, comment: studentCommentText } : s
      );
      
      setStudents(updatedStudents);
      setStudentCommentModalOpen(false);
      setSelectedStudent(null);
      setStudentCommentText('');
      setIsSaving(false);
    }, 300);
  };
  
  // Handle student comment modal close
  const handleStudentCommentModalClose = () => {
    setStudentCommentModalOpen(false);
    setSelectedStudent(null);
    setStudentCommentText('');
  };
  
  // Handle clicking the Add Assignment button on empty state page
  const handleEmptyStateAddAssignment = () => {
    setEditingAssignment(null);
    setAssignmentForm({
      title: '',
      totalPoints: 20,
      weight: 10
    });
    setShowAssignmentModal(true);
  };

  // Handle adding a new assignment
  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setAssignmentForm({
      title: '',
      totalPoints: 20,
      weight: 10
    });
    setShowAssignmentModal(true);
  };

  // Handle editing an existing assignment
  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      title: assignment.title,
      totalPoints: assignment.totalPoints,
      weight: assignment.weight
    });
    setShowAssignmentModal(true);
  };

  // Save a new assignment or update an existing one
  const handleSaveAssignment = () => {
    // Validate the form
    if (!assignmentForm.title.trim()) {
      alert('Please enter an assignment title');
      return;
    }
    
    if (isNaN(assignmentForm.totalPoints) || assignmentForm.totalPoints <= 0) {
      alert('Total points must be a positive number');
      return;
    }
    
    if (isNaN(assignmentForm.weight) || assignmentForm.weight <= 0) {
      alert('Weight must be a positive number');
      return;
    }
    
    setIsSaving(true);
    
    // In a real app, we would save to the API
    setTimeout(() => {
      const newAssignment = {
        id: editingAssignment ? editingAssignment.id : `asgn-${Date.now()}`,
        ...assignmentForm
      };
      
      if (editingAssignment) {
        // Update existing assignment
        setAssignments(prevAssignments => 
          prevAssignments.map(a => a.id === newAssignment.id ? newAssignment : a)
        );
        
        // Update grades with new point values
        if (newAssignment.totalPoints !== editingAssignment.totalPoints) {
          const updatedGrades = { ...grades };
          
          students.forEach(student => {
            if (updatedGrades[student.id] && updatedGrades[student.id][newAssignment.id]) {
              // Adjust score proportionally to new total points
              const oldScore = updatedGrades[student.id][newAssignment.id].score;
              const oldTotal = editingAssignment.totalPoints;
              const newTotal = newAssignment.totalPoints;
              const newScore = Math.round((oldScore / oldTotal) * newTotal);
              
              updatedGrades[student.id][newAssignment.id] = {
                ...updatedGrades[student.id][newAssignment.id],
                score: newScore,
                outOf: newTotal
              };
            }
          });
          
          setGrades(updatedGrades);
        }
      } else {
        // Add new assignment
        setAssignments(prevAssignments => [...prevAssignments, newAssignment]);
        
        // Initialize grades for this assignment
        const updatedGrades = { ...grades };
        
        students.forEach(student => {
          if (!updatedGrades[student.id]) {
            updatedGrades[student.id] = {};
          }
          
          updatedGrades[student.id][newAssignment.id] = {
            score: 0,
            outOf: newAssignment.totalPoints,
            submitted: false,
            feedback: '',
            comment: ''
          };
        });
        
        setGrades(updatedGrades);
      }
      
      setShowAssignmentModal(false);
      setEditingAssignment(null);
      setIsSaving(false);
    }, 500);
  };

  // Delete an assignment
  const handleDeleteAssignment = (assignmentId) => {
    if (!confirm('Are you sure you want to delete this assignment? All associated grades will be removed.')) {
      return;
    }
    
    setIsSaving(true);
    
    // In a real app, we would call the API
    setTimeout(() => {
      // Remove the assignment
      setAssignments(prevAssignments => 
        prevAssignments.filter(a => a.id !== assignmentId)
      );
      
      // Remove grades for this assignment
      const updatedGrades = { ...grades };
      
      students.forEach(student => {
        if (updatedGrades[student.id] && updatedGrades[student.id][assignmentId]) {
          delete updatedGrades[student.id][assignmentId];
        }
      });
      
      setGrades(updatedGrades);
      setIsSaving(false);
    }, 500);
  };

  // Handle opening the copy assignments modal
  const handleOpenCopyAssignmentsModal = () => {
    setTargetClasses([]);
    // Get assignments for current class
    const currentClassAssignments = assignments.map(a => ({
      ...a,
      selected: true
    }));
    setAssignmentsToCopy(currentClassAssignments);
    setShowCopyAssignmentsModal(true);
  };

  // Toggle assignment selection for copy
  const toggleAssignmentSelection = (assignmentId) => {
    setAssignmentsToCopy(prev => 
      prev.map(a => a.id === assignmentId ? { ...a, selected: !a.selected } : a)
    );
  };

  // Toggle target class selection for copy
  const toggleTargetClassSelection = (classId) => {
    if (targetClasses.includes(classId)) {
      setTargetClasses(prev => prev.filter(id => id !== classId));
    } else {
      setTargetClasses(prev => [...prev, classId]);
    }
  };

  // Copy selected assignments to target classes
  const handleCopyAssignments = () => {
    if (targetClasses.length === 0) {
      alert('Please select at least one target class');
      return;
    }

    const selectedAssignments = assignmentsToCopy.filter(a => a.selected);
    
    if (selectedAssignments.length === 0) {
      alert('Please select at least one assignment');
      return;
    }

    setIsSaving(true);

    // In a real app, we would call the API
    // For now, just simulate a delay
    setTimeout(() => {
      // Successfully copied assignments
      setShowCopyAssignmentsModal(false);
      setIsSaving(false);
      alert(`Successfully copied ${selectedAssignments.length} assignment(s) to ${targetClasses.length} class(es)`);
    }, 800);
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
                      {getClassName(selectedClass)}
                    </h2>
                  )}
                </div>
              </div>
            </div>
            
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
              
              <div className="mt-6">
                <button
                  onClick={handleEmptyStateAddAssignment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Assignment
                </button>
              </div>
            </div>
          </>
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
                      onClick={handleOpenCopyAssignmentsModal}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Assignments
                    </button>
                    
                    <button
                      onClick={handleAddAssignment}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Assignment
                    </button>
                    
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
                      <th key={assignment.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group relative">
                        <div className="whitespace-nowrap flex items-center">
                          <div>{assignment.title}</div>
                          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEditAssignment(assignment)}
                              className="text-gray-400 hover:text-blue-500 focus:outline-none p-1"
                              title="Edit assignment"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleDeleteAssignment(assignment.id)}
                              className="text-gray-400 hover:text-red-500 focus:outline-none p-1"
                              title="Delete assignment"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-xs font-normal text-gray-400 mt-1">
                          {assignment.totalPoints} pts • {assignment.weight}% weight • {calculateAssignmentAverage(assignment.id)}
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
                            {STUDENT_PHOTOS[student.id] ? (
                              <img 
                                src={STUDENT_PHOTOS[student.id]} 
                                alt={student.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                {getInitials(student.name)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.roll_number}</div>
                          </div>
                          <button
                            onClick={() => handleStudentCommentClick(student)}
                            className="ml-2 p-1 text-gray-400 hover:text-blue-500 focus:outline-none relative"
                            title="Add comment about this student"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            {student.comment && (
                              <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
                            )}
                          </button>
                        </div>
                      </td>
                      
                      {assignments.map(assignment => {
                        const grade = grades[student.id]?.[assignment.id];
                        const isEditing = editingCell?.studentId === student.id && editingCell?.assignmentId === assignment.id;
                        const hasComment = grade?.comment && grade.comment.trim().length > 0;
                        
                        return (
                          <td 
                            key={assignment.id} 
                            className={`px-6 py-4 whitespace-nowrap text-center ${getCellColor(grade?.score, assignment.totalPoints)}`}
                            onClick={(e) => !isEditing && handleCellClick(student.id, assignment.id, e)}
                            onContextMenu={(e) => handleCellClick(student.id, assignment.id, e)}
                            title={hasComment ? "Right-click to edit comment" : "Right-click to add comment"}
                          >
                            {isEditing ? (
                              <div className="flex items-center justify-center">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={handleGradeChange}
                                  onKeyDown={handleKeyDown}
                                  className="w-16 text-center border rounded px-2 py-1"
                                  autoFocus
                                />
                                {isSaving ? (
                                  <div className="ml-2 animate-spin h-4 w-4 border-t-2 border-blue-500 rounded-full"></div>
                                ) : (
                                  <div className="flex">
                                    <button
                                      onClick={handleGradeSave}
                                      className="ml-1 p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
                                      title="Save grade"
                                    >
                                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingCell(null);
                                        setEditValue('');
                                      }}
                                      className="ml-1 p-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none transition-colors"
                                      title="Cancel editing"
                                    >
                                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm cursor-pointer relative">
                                {grade?.score !== undefined ? `${grade.score}/${grade.outOf}` : 'N/A'}
                                {hasComment && (
                                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" title={grade.comment}></span>
                                )}
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

      {/* Grade comment modal */}
      {commentModalOpen && selectedGrade && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Add Comment
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500" 
                onClick={handleCommentModalClose}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comment for {students.find(s => s.id === selectedGrade.studentId)?.name || 'Student'}
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add your feedback here..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCommentModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCommentSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Comment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student comment modal */}
      {studentCommentModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Student Notes
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500" 
                onClick={handleStudentCommentModalClose}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="studentComment" className="block text-sm font-medium text-gray-700 mb-1">
                Notes for {selectedStudent.name}
              </label>
              <textarea
                id="studentComment"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add your notes about this student here..."
                value={studentCommentText}
                onChange={(e) => setStudentCommentText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleStudentCommentModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleStudentCommentSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingAssignment ? 'Edit Assignment' : 'Add Assignment'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500" 
                onClick={() => setShowAssignmentModal(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Midterm Exam"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Points
                </label>
                <input
                  id="totalPoints"
                  name="totalPoints"
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={assignmentForm.totalPoints}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, totalPoints: Number(e.target.value) }))}
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (%)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={assignmentForm.weight}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, weight: Number(e.target.value) }))}
                />
                <p className="mt-1 text-xs text-gray-500">
                  The weight determines how much this assignment contributes to the final grade.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowAssignmentModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSaveAssignment}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : editingAssignment ? 'Update Assignment' : 'Add Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Assignments Modal */}
      {showCopyAssignmentsModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Copy Assignments to Other Classes
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500" 
                onClick={() => setShowCopyAssignmentsModal(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Select Assignments to Copy</h4>
                <div className="border rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {assignmentsToCopy.map(assignment => (
                      <li key={assignment.id} className="p-3 hover:bg-gray-50">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={assignment.selected}
                            onChange={() => toggleAssignmentSelection(assignment.id)}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{assignment.title}</p>
                            <p className="text-xs text-gray-500">{assignment.totalPoints} pts • {assignment.weight}% weight</p>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Select Target Classes</h4>
                <div className="border rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {classes
                      .filter(cls => cls.id !== selectedClass)
                      .map(cls => (
                        <li key={cls.id} className="p-3 hover:bg-gray-50">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={targetClasses.includes(cls.id)}
                              onChange={() => toggleTargetClassSelection(cls.id)}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-800">{cls.name}</p>
                              <p className="text-xs text-gray-500">{cls.grade} - Section {cls.section}</p>
                            </div>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-4">
                <strong>Note:</strong> Copying assignments will add them to the selected classes, preserving total points and weights. Existing grades will not be affected.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowCopyAssignmentsModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleCopyAssignments}
                  disabled={isSaving || targetClasses.length === 0 || !assignmentsToCopy.some(a => a.selected)}
                >
                  {isSaving ? 'Copying...' : 'Copy Assignments'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grades; 