// src/components/events/AddEventModal.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AddEventModal = ({ isOpen, onClose, onSubmit, branches = [], initialEvent = {} }) => {
  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const [formData, setFormData] = useState({
    title: initialEvent?.title || '',
    startDate: initialEvent?.start ? (typeof initialEvent.start === 'string' ? initialEvent.start.slice(0,10) : new Date(initialEvent.start).toISOString().slice(0,10)) : new Date().toISOString().slice(0,10),
    startTime: initialEvent?.start ? (typeof initialEvent.start === 'string' ? initialEvent.start.slice(11,16) : new Date(initialEvent.start).toTimeString().slice(0,5)) : '08:00',
    endDate: initialEvent?.end ? (typeof initialEvent.end === 'string' ? initialEvent.end.slice(0,10) : new Date(initialEvent.end).toISOString().slice(0,10)) : new Date().toISOString().slice(0,10),
    endTime: initialEvent?.end ? (typeof initialEvent.end === 'string' ? initialEvent.end.slice(11,16) : new Date(initialEvent.end).toTimeString().slice(0,5)) : '09:00',
    location: initialEvent?.location || '',
    type: initialEvent?.type || 'meeting',
    branch: initialEvent?.branch || (branches.length > 0 ? branches[0] : ''),
    description: initialEvent?.description || '',
  });
  // Sync formData with initialEvent when it changes
  useEffect(() => {
    setFormData({
      title: initialEvent?.title || '',
      startDate: initialEvent?.start ? (typeof initialEvent.start === 'string' ? initialEvent.start.slice(0,10) : new Date(initialEvent.start).toISOString().slice(0,10)) : new Date().toISOString().slice(0,10),
      startTime: initialEvent?.start ? (typeof initialEvent.start === 'string' ? initialEvent.start.slice(11,16) : new Date(initialEvent.start).toTimeString().slice(0,5)) : '08:00',
      endDate: initialEvent?.end ? (typeof initialEvent.end === 'string' ? initialEvent.end.slice(0,10) : new Date(initialEvent.end).toISOString().slice(0,10)) : new Date().toISOString().slice(0,10),
      endTime: initialEvent?.end ? (typeof initialEvent.end === 'string' ? initialEvent.end.slice(11,16) : new Date(initialEvent.end).toTimeString().slice(0,5)) : '09:00',
      location: initialEvent?.location || '',
      type: initialEvent?.type || 'meeting',
      branch: initialEvent?.branch || (branches.length > 0 ? branches[0] : ''),
      description: initialEvent?.description || '',
    });
  }, [initialEvent, branches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    // Combine date and time for start and end
    const start = new Date(`${formData.startDate}T${formData.startTime}`);
    const end = new Date(`${formData.endDate}T${formData.endTime}`);
    if (start >= end) {
      toast.error('End time must be after start time');
      return;
    }
    onSubmit({
      ...formData,
      type: formData.type === 'custom' ? formData.customType : formData.type,
      branch: formData.branch === 'custom' ? formData.customBranch : formData.branch,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
  className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
          <motion.div
  className="bg-white rounded-lg shadow-lg w-full max-w-md relative overflow-hidden"
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  exit={{ scale: 0.9 }}
>
  <button
    onClick={onClose}
    className="absolute top-4 right-4 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
    aria-label="Close"
  >
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  <div className="bg-blue-600 text-white p-6 flex items-center">
    <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center text-xl font-bold mr-4">
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    </div>
    <div>
      <h2 className="text-2xl font-bold">{formData.title || 'Add New Event'}</h2>
      <p className="text-blue-100">{formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : ''}</p>
    </div>
  </div>
  <div className="border-b border-gray-200">
    <nav className="flex -mb-px">
      <button className="py-4 px-6 text-sm font-medium border-b-2 border-blue-500 text-blue-600">Information</button>
      <button className="py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700">Attendees</button>
    </nav>
  </div>
  <div className="p-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(90vh - 160px)' }}>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Start Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      required
                      value={formData.startTime}
                      onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* End Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      required
                      value={formData.endDate}
                      onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      required
                      value={formData.endTime}
                      onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    id="location"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      id="type"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value, customType: '' })}
                    >
                      <option value="orientation">Orientation</option>
                      <option value="workshop">Workshop</option>
                      <option value="training">Training</option>
                      <option value="certification">Certification</option>
                      <option value="graduation">Graduation</option>
                      <option value="meeting">Meeting</option>
                      <option value="fair">Fair</option>
                      <option value="competition">Competition</option>
                      <option value="custom">Custom...</option>
                    </select>
                    {formData.type === 'custom' && (
                      <input
                        type="text"
                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter custom event type"
                        value={formData.customType || ''}
                        onChange={e => setFormData({ ...formData, customType: e.target.value })}
                        required
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
                    <select
                      id="branch"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.branch === 'custom' ? 'custom' : (typeof formData.branch === 'object' ? formData.branch?.id : formData.branch || '')}
                      onChange={(e) => {
                        if (e.target.value === 'custom') {
                          setFormData({ ...formData, branch: 'custom', customBranch: '' });
                        } else {
                          const selectedBranch = branches.find(b => b.id === e.target.value) || e.target.value;
                          setFormData({ ...formData, branch: selectedBranch, customBranch: '' });
                        }
                      }}
                    >
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                      ))}
                      <option value="custom">Custom...</option>
                    </select>
                    {formData.branch === 'custom' && (
                      <input
                        type="text"
                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter custom venue/branch"
                        value={formData.customBranch || ''}
                        onChange={e => setFormData({ ...formData, customBranch: e.target.value })}
                        required
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* ...all your input fields remain here... */}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </form>

          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEventModal;
