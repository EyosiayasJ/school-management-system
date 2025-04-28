import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '@mui/material/Avatar';

const EditTeacherModal = ({ isOpen, onClose, onSubmit, teacherData, branchesList }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    subject: '',
    branch: '',
    status: '',
    avatarFile: null,
    avatarUrl: '',
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (teacherData) {
      const names = teacherData.name.split(' ');
      setFormData({
        firstName: names[0] || '',
        middleName: names.length > 2 ? names[1] : '',
        lastName: names.length > 2 ? names[2] : names[1] || '',
        subject: teacherData.subject,
        branch: teacherData.branch,
        status: teacherData.status,
        avatarFile: null,
        avatarUrl: teacherData.avatar,
      });
      setPreviewUrl(teacherData.avatar);
    }
  }, [teacherData]);

  useEffect(() => {
    if (!formData.avatarFile) return;
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

  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatarFile: null, avatarUrl: '' }));
    setPreviewUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTeacher = {
      ...teacherData,
      name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim().replace(/\s+/g, ' '),
      subject: formData.subject,
      branch: formData.branch,
      status: formData.status,
      avatar: previewUrl || `https://source.boringavatars.com/beam/120/${formData.firstName}${formData.lastName}`,
    };

    onSubmit(updatedTeacher);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      subject: '',
      branch: '',
      status: '',
      avatarFile: null,
      avatarUrl: '',
    });
    setPreviewUrl(null);
    onClose();
  };

  if (!isOpen || !teacherData) return null;

  return (
    <AnimatePresence>
      
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-full max-w-md min-h-[600px] max-h-[90vh] p-0 relative overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <button
            className="absolute top-4 right-4 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
            aria-label="Close"
            onClick={onClose}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="indianred">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="bg-blue-600 text-white p-6 flex items-center">
  <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center text-xl font-bold mr-4">
    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
  </div>
  <div>
    <h2 className="text-2xl font-bold">Edit Teacher</h2>
    <p className="text-blue-100">Teacher</p>
  </div>
</div>
<div className="border-b border-gray-200">
  <nav className="flex -mb-px">
    <button className="py-4 px-6 text-sm font-medium border-b-2 border-blue-500 text-blue-600">Information</button>
    <button className="py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700">Other</button>
  </nav>
</div>
<div className="p-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(90vh - 160px)' }}>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover mb-2" />
              ) : (
                <Avatar sx={{ width: 96, height: 96 }}>
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </Avatar>
              )}
              <div className="flex gap-2 mt-2">
                <label className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer">
                  Upload
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {previewUrl && (
                  <button type="button" onClick={handleRemoveAvatar} className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600">
                    Remove
                  </button>
                )}
              </div>
            </div>

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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
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

export default EditTeacherModal;