import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import Modal from '../common/Modal';
import FormField from '../common/FormField';
import superAdminApi from '../../services/superAdminApi';

const UserModal = ({ isOpen, onClose, user = null, onSubmit, isSubmitting }) => {
  // Fetch schools for dropdown
  const { data: schoolsData = { items: [] } } = useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const response = await superAdminApi.getSchools();
      return response.data;
    },
    enabled: isOpen // Only fetch when modal is open
  });
  
  // Extract the schools array from the response
  const schools = schoolsData.items || [];

  // State for selected school
  const [selectedSchoolId, setSelectedSchoolId] = useState('');

  // Fetch branches for selected school
  const { data: branchesData = { items: [] } } = useQuery({
    queryKey: ['schoolBranches', selectedSchoolId],
    queryFn: async () => {
      const response = await superAdminApi.getBranches({ schoolId: selectedSchoolId });
      return response.data;
    },
    enabled: !!selectedSchoolId // Only fetch when a school is selected
  });
  
  // Extract the branches array from the response
  const branches = branchesData.items || [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'STAFF',
    schoolId: '',
    branchId: '',
    status: 'active',
    permissions: []
  });

  const [errors, setErrors] = useState({});

  // If a user is provided, initialize form with its data (for editing)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'STAFF',
        schoolId: user.schoolId || '',
        branchId: user.branchId || '',
        status: user.status || 'active',
        permissions: user.permissions || []
      });
      
      if (user.schoolId) {
        setSelectedSchoolId(user.schoolId);
      }
    } else {
      // Reset form if adding a new user
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'STAFF',
        schoolId: '',
        branchId: '',
        status: 'active',
        permissions: []
      });
      setSelectedSchoolId('');
    }
    setErrors({});
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle school change to reset branch
    if (name === 'schoolId') {
      setSelectedSchoolId(value);
      setFormData(prev => ({
        ...prev,
        schoolId: value,
        branchId: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const roleOptions = [
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'SUPPORT_ADMIN', label: 'Support Admin' },
    { value: 'SCHOOL_ADMIN', label: 'School Admin' },
    { value: 'BRANCH_DIRECTOR', label: 'Branch Director' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'STAFF', label: 'Staff' }
  ];

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    
    // School is required for school-specific roles
    if (['SCHOOL_ADMIN', 'BRANCH_DIRECTOR', 'TEACHER', 'STAFF'].includes(formData.role) && !formData.schoolId) {
      newErrors.schoolId = 'School is required for this role';
    }
    
    // Branch is required for branch-specific roles
    if (['BRANCH_DIRECTOR', 'TEACHER', 'STAFF'].includes(formData.role) && !formData.branchId && formData.schoolId) {
      newErrors.branchId = 'Branch is required for this role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Add New User'}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormField
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormField
            label="Role"
            id="role"
            name="role"
            type="select"
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
            required
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </FormField>

          {['SCHOOL_ADMIN', 'BRANCH_DIRECTOR', 'TEACHER', 'STAFF'].includes(formData.role) && (
            <FormField
              label="School"
              id="schoolId"
              name="schoolId"
              type="select"
              value={formData.schoolId}
              onChange={handleChange}
              error={errors.schoolId}
              required
            >
              <option value="">Select School</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </FormField>
          )}

          {['BRANCH_DIRECTOR', 'TEACHER', 'STAFF'].includes(formData.role) && formData.schoolId && (
            <FormField
              label="Branch"
              id="branchId"
              name="branchId"
              type="select"
              value={formData.branchId}
              onChange={handleChange}
              error={errors.branchId}
              required
              disabled={!formData.schoolId || branches.length === 0}
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </FormField>
          )}

          {user && (
            <FormField
              label="Status"
              id="status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FormField>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : user ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default UserModal; 