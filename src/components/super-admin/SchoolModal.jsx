import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import FormField from '../common/FormField';

const SchoolModal = ({ isOpen, onClose, school = null, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    status: 'active',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // If a school is provided, initialize form with its data (for editing)
  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name || '',
        location: school.location || '',
        contactPerson: school.contactPerson || '',
        email: school.email || '',
        phone: school.phone || '',
        website: school.website || '',
        status: school.status || 'active',
        notes: school.notes || ''
      });
    } else {
      // Reset form if adding a new school
      setFormData({
        name: '',
        location: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        status: 'active',
        notes: ''
      });
    }
    setErrors({});
  }, [school, isOpen]);

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
      newErrors.name = 'School name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
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
      title={school ? 'Edit School' : 'Add New School'}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="School Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormField
            label="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            required
          />

          <FormField
            label="Contact Person"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
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
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormField
            label="Website"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
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
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </FormField>
        </div>

        <FormField
          label="Notes"
          id="notes"
          name="notes"
          type="textarea"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
        />

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
            {isSubmitting ? 'Saving...' : school ? 'Update School' : 'Add School'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

SchoolModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  school: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default SchoolModal; 