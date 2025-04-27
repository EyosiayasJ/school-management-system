import { motion, AnimatePresence } from 'framer-motion';

const SuspendModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        >
          <h3 className="text-lg font-semibold mb-4">Suspend Student</h3>
          <label className="block mb-2">Suspend until:</label>
          <input
            type="date"
            id="suspendDate"
            className="w-full border p-2 rounded-md mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(document.getElementById('suspendDate').value)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuspendModal;
