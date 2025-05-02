import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { teachers as mockTeachers, branchesList } from '../../mock';

// Components
import AddTeacherModal from '../../components/teacher/AddTeacherModal';
import EditTeacherModal from '../../components/teacher/EditTeacherModal';
import TeacherProfile from '../../components/teacher/TeacherProfile';

const TeachersList = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editTeacher, setEditTeacher] = useState(null);
  
  // Branch list for dropdowns and teacher state
  const [teachers, setTeachers] = useState([...mockTeachers]);

  // Event handlers
  const handleAddTeacher = (newTeacher) => {
    setTeachers(prev => [...prev, newTeacher]);
    toast.success(`${newTeacher.name} added successfully`);
  };

  const handleUpdateTeacher = (updatedTeacher) => {
    setTeachers(prev => prev.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
    toast.success(`${updatedTeacher.name} updated successfully`);
    setEditTeacher(null);
    setSelectedTeacher(null);
  };

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleEditTeacher = (teacher) => {
    setEditTeacher(teacher);
  };

  // Filter teachers based on search term and selected filter
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || teacher.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Teachers Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage teacher profiles, assignments, and performance evaluations</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        {/* Actions Bar */}
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search teachers..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Status:</span>
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Teachers</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                  <option value="blacklisted">Blacklisted</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Teacher
              </button>
            </div>
          </div>
        </div>
        
        {/* Teachers List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher, index) => (
                <motion.li 
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={teacher.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-blue-600">{teacher.name}</div>
                          <div className="text-sm text-gray-500">{teacher.subject}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {teacher.branch}
                          </p>
                        </div>
                        <div className="mr-4 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {teacher.status === 'active' ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex space-x-2">
                          <button 
                            onClick={() => handleViewTeacher(teacher)}
                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="View teacher profile"
                          >
                            <span className="sr-only">View</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleEditTeacher(teacher)}
                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Edit teacher information"
                          >
                            <span className="sr-only">Edit</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="px-4 py-6 sm:px-6 text-center text-gray-500">
                No teachers found matching your search criteria.
              </li>
            )}
          </ul>
          
          {/* Pagination */}
          <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTeachers.length}</span> of{' '}
                <span className="font-medium">{teachers.length}</span> teachers
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Modals and Drawers */}
      {isAddModalOpen && (
        <AddTeacherModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddTeacher}
          branchesList={branchesList}
        />
      )}

      {editTeacher && (
        <EditTeacherModal
          isOpen={!!editTeacher}
          onClose={() => setEditTeacher(null)}
          onSubmit={handleUpdateTeacher}
          teacherData={editTeacher}
          branchesList={branchesList}
        />
      )}

      {selectedTeacher && (
        <TeacherProfile
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          onUpdateTeacher={handleUpdateTeacher}
          branchesList={branchesList}
        />
      )}
    </div>
  );
};


export default TeachersList;