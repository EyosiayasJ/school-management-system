import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const ViewEventModal = ({ isOpen, onClose, event }) => {
  return (
    <AnimatePresence>
      {isOpen && event && (
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
                <h2 className="text-2xl font-bold">{event?.title || 'Event Details'}</h2>
                <p className="text-blue-100">{event?.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : ''}</p>
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
                  <h4 className="text-sm font-medium text-gray-500">Title</h4>
                  <p className="mt-1 text-sm text-gray-900">{event.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Start Time</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {format(new Date(event.start), 'PPP p')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">End Time</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {format(new Date(event.end), 'PPP p')}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="mt-1 text-sm text-gray-900">{event.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Event Type</h4>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{event.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Branch</h4>
                    <p className="mt-1 text-sm text-gray-900">{typeof event.branch === 'object' ? event.branch?.name : event.branch}</p>
                  </div>
                </div>
                {event.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p className="mt-1 text-sm text-gray-900">{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewEventModal;