import { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-hot-toast';
import { students as mockStudents, branchesList } from '../../../mock-db';

// Modals & Profile
import AddStudentModal from '../../components/students/AddStudentModal';
import EditStudentModal from '../../components/students/EditStudentModal';
import StudentProfile from '../../components/students/StudentProfile';

const StudentsList = () => {
  // — States —
  const [students, setStudents] = useState([...mockStudents]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // — Handlers —
  const handleAddStudent = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
    toast.success(`${newStudent.name} added successfully`);
    setIsAddModalOpen(false);
  };
  const handleUpdateStudent = (updated) => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    toast.success(`${updated.name} updated successfully`);
    setEditStudent(null);
    setSelectedStudent(null);
  };
  const handleView = student => setSelectedStudent(student);
  const handleEdit = student => setEditStudent(student);

  // — Filtering —
  const filtered = students.filter(s => {
    const mName = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const mGrade = s.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const mBranch = s.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const mStatus = selectedFilter === 'all' || s.status === selectedFilter;
    return (mName||mGrade||mBranch) && mStatus;
  });

  return (
    <div className="py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Students Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage student records, enrollments, and academic progress
        </p>
      </div>

      {/* Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            {/* Search */}
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  type="search"
                  placeholder="Search students..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Status:</span>
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Students</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                  <option value="blacklisted">Blacklisted</option>
                  <option value="expelled">Expelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Add Student */}
            <div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Student
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <Avatar
                        src={s.avatar || undefined}
                        onClick={() => handleView(s)}
                        className="h-10 w-10 cursor-pointer"
                      >
                        {s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </Avatar>
                      {/* Name & Grade */}
                      <div onClick={() => handleView(s)} className="cursor-pointer">
                        <div className="text-sm font-medium text-blue-600">{s.name}</div>
                        <div className="text-sm text-gray-500">{s.grade} Grade</div>
                      </div>
                    </div>

                    {/* Branch, Status */}
                    <div className="flex items-center space-x-4">
                      <span className="px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {s.branch}
                      </span>
                      <span className={`px-2 text-xs font-semibold rounded-full capitalize ${
                        s.status === 'active' ? 'bg-green-100 text-green-800' :
                        s.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        s.status === 'suspended' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {s.status}
                      </span>

                      {/* View Button */}
                      <button
                        onClick={() => handleView(s)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                        title="View"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(s)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-gray-500">
                No students found.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddStudent}
          branchesList={branchesList}
        />
      )}

      {/* Edit Student Modal */}
      {editStudent && (
        <EditStudentModal
          isOpen={!!editStudent}
          onClose={() => setEditStudent(null)}
          studentData={editStudent}
          onSubmit={handleUpdateStudent}
          branchesList={branchesList}
        />
      )}

      {/* Profile View */}
      {selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onUpdateStudent={handleUpdateStudent}
          branchesList={branchesList}
        />
      )}
    </div>
  );
};

export default StudentsList;
