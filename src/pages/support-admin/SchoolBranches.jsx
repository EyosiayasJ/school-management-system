import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Mock branches data
const MOCK_BRANCHES = [
  {
    id: 'br1',
    name: 'Main Campus',
    address: '123 Academic Blvd, Springfield, IL',
    phone: '(555) 123-4569',
    email: 'main@westfieldacademy.edu',
    directorName: 'Dr. Lisa Chen',
    studentCount: 500,
    teacherCount: 28,
    established: '2005-09-01',
    status: 'active'
  },
  {
    id: 'br2',
    name: 'North Campus',
    address: '456 Learning Ave, Springfield, IL',
    phone: '(555) 123-7890',
    email: 'north@westfieldacademy.edu',
    directorName: 'Prof. Michael Johnson',
    studentCount: 350,
    teacherCount: 17,
    established: '2012-08-15',
    status: 'active'
  }
];

// Mock school data
const MOCK_SCHOOL = {
  id: '1',
  name: 'Westfield Academy'
};

const SchoolBranches = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    directorName: '',
    established: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  // Simulate fetching data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSchool(MOCK_SCHOOL);
      setBranches(MOCK_BRANCHES);
      setLoading(false);
    }, 800);
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal to add new branch
  const handleAddNew = () => {
    setCurrentBranch(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      directorName: '',
      established: new Date().toISOString().split('T')[0],
      status: 'active'
    });
    setModalOpen(true);
  };

  // Open modal to edit branch
  const handleEdit = (branch) => {
    setCurrentBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      directorName: branch.directorName,
      established: branch.established,
      status: branch.status
    });
    setModalOpen(true);
  };

  // Save branch (create or update)
  const handleSave = (e) => {
    e.preventDefault();
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      if (currentBranch) {
        // Update existing branch
        setBranches(prev => 
          prev.map(b => b.id === currentBranch.id ? 
            { ...currentBranch, ...formData } : b
          )
        );
        toast.success('Branch updated successfully');
      } else {
        // Add new branch
        const newBranch = {
          id: `br${Date.now()}`,
          ...formData,
          studentCount: 0,
          teacherCount: 0
        };
        setBranches(prev => [...prev, newBranch]);
        toast.success('Branch created successfully');
      }
      
      setModalOpen(false);
      setLoading(false);
    }, 800);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading && !branches.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">School Branches</h1>
          {school && (
            <p className="text-gray-500">
              Managing branches for {school.name}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/support-admin/schools/${id}`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Back to School
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Branch
          </button>
        </div>
      </div>

      {/* Branches List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {branches.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Director
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {branches.map(branch => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                    <div className="text-sm text-gray-500">{branch.address}</div>
                    <div className="text-xs text-gray-500">
                      Established: {formatDate(branch.established)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{branch.directorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{branch.phone}</div>
                    <div className="text-sm text-gray-500">{branch.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{branch.studentCount}</span> Students
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{branch.teacherCount}</span> Teachers
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      branch.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : branch.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No branches found for this school. Click "Add New Branch" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Branch Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {currentBranch ? 'Edit Branch' : 'Add New Branch'}
            </h2>
            
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch Director
                  </label>
                  <input
                    type="text"
                    name="directorName"
                    value={formData.directorName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Established Date
                  </label>
                  <input
                    type="date"
                    name="established"
                    value={formData.established}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentBranch ? 'Save Changes' : 'Create Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolBranches; 