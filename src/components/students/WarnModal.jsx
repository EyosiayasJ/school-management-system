import { motion, AnimatePresence } from 'framer-motion';

const WarnModal = ({ isOpen, onCancel, onConfirm }) => {
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
          <h3 className="text-lg font-semibold mb-4">Add Warning</h3>
          <textarea
            id="warningNote"
            className="w-full border p-2 rounded-md mb-4"
            placeholder="Enter warning note..."
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2.5 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(document.getElementById('warningNote').value)}
              className="px-4 py-2.5 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WarnModal;
