import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import FormField from '../common/FormField';
import { useSchools } from '../../hooks/superAdmin/useSchools';

const BranchModal = ({ isOpen, onClose, branch = null, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    schoolId: '',
    address: '',
    director: '',
    phone: '',
    email: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  
  // Fetch schools for dropdown
  const { data: schoolsData = { items: [] } } = useSchools();
  
  // Extract the schools array from the response
  const schools = schoolsData.items || [];

  // If a branch is provided, initialize form with its data (for editing)
  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name || '',
        schoolId: branch.schoolId || '',
        address: branch.address || '',
        director: branch.director || '',
        phone: branch.phone || '',
        email: branch.email || '',
        status: branch.status || 'active'
      });
    } else {
      // Reset form if adding a new branch
      setFormData({
        name: '',
        schoolId: '',
        address: '',
        director: '',
        phone: '',
        email: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [branch, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Branch name is required';
    }
    
    if (!formData.schoolId) {
      newErrors.schoolId = 'School is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
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
      title={branch ? 'Edit Branch' : 'Add New Branch'}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Branch Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

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

          <FormField
            label="Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />

          <FormField
            label="Director"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />

          <FormField
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

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
            {isSubmitting ? 'Saving...' : branch ? 'Update Branch' : 'Add Branch'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

BranchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  branch: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default BranchModal; 