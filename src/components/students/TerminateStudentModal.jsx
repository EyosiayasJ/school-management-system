import { motion, AnimatePresence } from 'framer-motion';
<Toaster position="top-center" reverseOrder={false} />

const TerminateStudentModal = ({ isOpen, onClose, onConfirm, studentName }) => {
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
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Terminate Student
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to terminate <strong>{studentName}</strong>?<br />
            They will be marked as <span className="font-semibold text-red-500">inactive</span> but their record will be kept.
          </p>

          <div className="flex gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Terminate
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminateStudentModal;
