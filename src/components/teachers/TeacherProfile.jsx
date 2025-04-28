import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-hot-toast';

const TeacherProfile = ({ teacher, onClose, onUpdateTeacher, branchesList }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [actionModal, setActionModal] = useState(null);
  
  if (!teacher) return null;

  const handleWarn = () => {
    const updatedTeacher = {
      ...teacher,
      warnings: (teacher.warnings || 0) + 1
    };
    onUpdateTeacher(updatedTeacher);
    toast.success(`Warning issued to ${teacher.name}`);
    setActionModal(null);
  };

  const handleSuspend = (days) => {
    const suspensionDate = new Date();
    suspensionDate.setDate(suspensionDate.getDate() + parseInt(days));
    
    const updatedTeacher = {
      ...teacher,
      status: 'suspended',
      suspensionEnds: suspensionDate.toISOString()
    };
    onUpdateTeacher(updatedTeacher);
    toast.success(`${teacher.name} suspended for ${days} days`);
    setActionModal(null);
  };

  const handleBlacklist = () => {
    const updatedTeacher = {
      ...teacher,
      status: 'blacklisted'
    };
    onUpdateTeacher(updatedTeacher);
    toast.success(`${teacher.name} has been blacklisted`);
    setActionModal(null);
  };

  const handleExpel = () => {
    const updatedTeacher = {
      ...teacher,
      status: 'expelled'
    };
    onUpdateTeacher(updatedTeacher);
    toast.success(`${teacher.name} has been expelled`);
    setActionModal(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[80vh] overflow-hidden relative"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
            aria-label="Close profile"
            onClick={onClose}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="bg-blue-600 text-white p-6 flex items-center">
            {teacher.avatar ? (
              <img src={teacher.avatar} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-white" />
            ) : (
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: 'blue' }}>
                {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Avatar>
            )}
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-blue-100">{teacher.subject}</p>
              <div className="flex mt-2 space-x-2">
                <span className="px-2 py-1 bg-blue-700 rounded-full text-xs">{teacher.branch}</span>
                <StatusBadge status={teacher.status} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-4 px-6 text-sm font-medium ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Information
              </button>
              <button
                onClick={() => setActiveTab('disciplinary')}
                className={`py-4 px-6 text-sm font-medium ${activeTab === 'disciplinary' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Disciplinary Actions
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
            {activeTab === 'info' ? (
              <div className="space-y-4">
                <InfoItem label="Full Name" value={teacher.name} />
                <InfoItem label="Subject" value={teacher.subject} />
                <InfoItem label="Branch" value={teacher.branch} />
                <InfoItem label="Status" value={teacher.status} />
                {teacher.status === 'suspended' && teacher.suspensionEnds && (
                  <InfoItem 
                    label="Suspension Ends" 
                    value={new Date(teacher.suspensionEnds).toLocaleDateString()} 
                  />
                )}
                <InfoItem 
                  label="Warnings" 
                  value={teacher.warnings || 0} 
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h3 className="font-medium text-yellow-800">Disciplinary Record</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Current warnings: <span className="font-bold">{teacher.warnings || 0}</span>
                  </p>
                  {teacher.status === 'suspended' && teacher.suspensionEnds && (
                    <p className="mt-1 text-sm text-yellow-700">
                      Suspended until: <span className="font-bold">{new Date(teacher.suspensionEnds).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ActionButton 
                    label="Issue Warning" 
                    color="yellow" 
                    onClick={() => setActionModal('warn')} 
                    disabled={teacher.status === 'blacklisted' || teacher.status === 'expelled'}
                  />
                  <ActionButton 
                    label="Suspend" 
                    color="orange" 
                    onClick={() => setActionModal('suspend')} 
                    disabled={teacher.status === 'blacklisted' || teacher.status === 'expelled'}
                  />
                  <ActionButton 
                    label="Blacklist" 
                    color="red" 
                    onClick={() => setActionModal('blacklist')} 
                    disabled={teacher.status === 'blacklisted' || teacher.status === 'expelled'}
                  />
                  <ActionButton 
                    label="Expel" 
                    color="red" 
                    onClick={() => setActionModal('expel')} 
                    disabled={teacher.status === 'expelled'}
                  />
                </div>
              </div>
            )}
          </div>



          {/* Action Modals */}
          {actionModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                {actionModal === 'warn' && (
                  <WarningModal onConfirm={handleWarn} onCancel={() => setActionModal(null)} />
                )}
                {actionModal === 'suspend' && (
                  <SuspendModal onConfirm={handleSuspend} onCancel={() => setActionModal(null)} />
                )}
                {actionModal === 'blacklist' && (
                  <BlacklistModal onConfirm={handleBlacklist} onCancel={() => setActionModal(null)} />
                )}
                {actionModal === 'expel' && (
                  <ExpelModal onConfirm={handleExpel} onCancel={() => setActionModal(null)} />
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
  </div>
);

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-green-100';
  let textColor = 'text-green-800';
  
  if (status === 'inactive') {
    bgColor = 'bg-gray-100';
    textColor = 'text-gray-800';
  } else if (status === 'suspended') {
    bgColor = 'bg-orange-100';
    textColor = 'text-orange-800';
  } else if (status === 'blacklisted' || status === 'expelled') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor} capitalize`}>
      {status}
    </span>
  );
};

const ActionButton = ({ label, color, onClick, disabled }) => {
  const colors = {
    yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    red: 'bg-red-100 text-red-800 hover:bg-red-200',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-md font-medium ${colors[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
};

const WarningModal = ({ onConfirm, onCancel }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-900">Issue Warning</h3>
    <p className="mt-2 text-sm text-gray-500">
      Are you sure you want to issue a warning to this teacher? This will be recorded in their disciplinary record.
    </p>
    <div className="mt-4 flex justify-end space-x-3">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Issue Warning
      </button>
    </div>
  </div>
);

const SuspendModal = ({ onConfirm, onCancel }) => {
  const [days, setDays] = useState(7);
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900">Suspend Teacher</h3>
      <p className="mt-2 text-sm text-gray-500">
        For how many days would you like to suspend this teacher?
      </p>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Suspension Period (days)</label>
        <input
          type="number"
          min="1"
          max="90"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(days)}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Suspend
        </button>
      </div>
    </div>
  );
};

const BlacklistModal = ({ onConfirm, onCancel }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-900">Blacklist Teacher</h3>
    <p className="mt-2 text-sm text-gray-500">
      Are you sure you want to blacklist this teacher? This will prevent them from being hired at any branch in the future.
    </p>
    <div className="mt-4 flex justify-end space-x-3">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Blacklist
      </button>
    </div>
  </div>
);

const ExpelModal = ({ onConfirm, onCancel }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-900">Expel Teacher</h3>
    <p className="mt-2 text-sm text-gray-500">
      Are you sure you want to expel this teacher? This action cannot be undone.
    </p>
    <div className="mt-4 flex justify-end space-x-3">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Expel
      </button>
    </div>
  </div>
);

export default TeacherProfile;