import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '@mui/material/Avatar';

const StudentProfile = ({ student, onClose, onUpdateStudent, onTerminateStudent, branchesList }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    grade: '',
    gpa: '',
    branch: '',
    status: '',
    avatarFile: null,
    avatarUrl: '',
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // Initialize form data from student
  useState(() => {
    if (student) {
      const names = student.name.split(' ');
      setFormData({
        firstName: names[0] || '',
        middleName: names[1] || '',
        lastName: names[2] || '',
        grade: student.grade,
        gpa: student.gpa || '',
        branch: student.branch,
        status: student.status,
        avatarFile: null,
        avatarUrl: student.avatar,
      });
      setPreviewUrl(student.avatar);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatarFile: file }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatarFile: null, avatarUrl: '' }));
    setPreviewUrl(null);
  };

  const handleSave = () => {
    const updatedStudent = {
      ...student,
      name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
      grade: formData.grade,
      gpa: formData.gpa,
      branch: formData.branch,
      status: formData.status,
      avatar: previewUrl || `https://source.boringavatars.com/beam/120/${formData.firstName}${formData.lastName}`,
    };

    onUpdateStudent(updatedStudent);
    setEditMode(false);
  };

  const handleTerminate = () => {
    onTerminateStudent(student.id);
    setEditMode(false);
    onClose();
  };

  if (!student) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">
            ✖
          </button>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            {previewUrl ? (
              <img src={previewUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover mb-2" />
            ) : (
              <Avatar sx={{ width: 96, height: 96 }}>
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </Avatar>
            )}

            {editMode && (
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
            )}
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileField label="First Name" value={formData.firstName} name="firstName" onChange={handleChange} editMode={editMode} />
            <ProfileField label="Middle Name" value={formData.middleName} name="middleName" onChange={handleChange} editMode={editMode} />
            <ProfileField label="Last Name" value={formData.lastName} name="lastName" onChange={handleChange} editMode={editMode} />
            <ProfileField label="Grade" value={formData.grade} name="grade" onChange={handleChange} editMode={editMode} />
            <ProfileField label="GPA" value={formData.gpa} name="gpa" onChange={handleChange} editMode={editMode} />
            <ProfileSelect label="Branch" value={formData.branch} name="branch" onChange={handleChange} editMode={editMode} options={branchesList} />
            <ProfileSelect label="Status" value={formData.status} name="status" onChange={handleChange} editMode={editMode} options={['active', 'inactive']} />
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-4">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                {formData.status === 'active' && (
                  <button
                    onClick={handleTerminate}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Terminate
                  </button>
                )}
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProfileField = ({ label, value, name, onChange, editMode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {editMode ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    ) : (
      <div className="p-2 bg-gray-100 rounded-md text-sm">{value || 'N/A'}</div>
    )}
  </div>
);

const ProfileSelect = ({ label, value, name, onChange, editMode, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {editMode ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <div className="p-2 bg-gray-100 rounded-md text-sm">{value || 'N/A'}</div>
    )}
  </div>
);

export default StudentProfile;
