import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '@mui/material/Avatar';

const AddTeacherModal = ({ isOpen, onClose, onSubmit, branchesList }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    subject: '',
    branch: branchesList[0] || '',
    status: 'active',
    avatarFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!formData.avatarFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(formData.avatarFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.avatarFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatarFile: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const newTeacher = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim(),
      subject: formData.subject,
      branch: formData.branch,
      status: formData.status,
      avatar: previewUrl || `https://source.boringavatars.com/beam/120/${formData.firstName}${formData.lastName}`,
      warnings: 0,
      suspensionEnds: null,
    };
    onSubmit(newTeacher);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      subject: '',
      branch: branchesList[0] || '',
      status: 'active',
      avatarFile: null,
    });
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <button
            className="absolute top-3 right-3 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Close"
            onClick={onClose}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Teacher</h2>

          {!showConfirmation ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
              <InputField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
              <SelectField label="Branch" name="branch" value={formData.branch} options={branchesList} onChange={handleChange} />
              <SelectField 
                label="Status" 
                name="status" 
                value={formData.status} 
                options={['active', 'inactive', 'suspended', 'blacklisted']} 
                onChange={handleChange} 
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Avatar (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Confirm New Teacher</h3>
              <div className="flex justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
                ) : (
                  <Avatar sx={{ width: 96, height: 96 }}>
                    {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                  </Avatar>
                )}
              </div>
              <ul className="text-gray-700 space-y-1 text-left">
                <li><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</li>
                <li><strong>Subject:</strong> {formData.subject}</li>
                <li><strong>Branch:</strong> {formData.branch}</li>
                <li><strong>Status:</strong> {formData.status}</li>
              </ul>
              <div className="flex gap-4 justify-end">
                <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                  Cancel
                </button>
                <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Confirm
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
      className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
    />
  </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default AddTeacherModal;