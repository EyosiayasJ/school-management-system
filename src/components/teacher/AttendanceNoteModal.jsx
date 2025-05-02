import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';

/**
 * Modal component for adding notes to student attendance
 */
const AttendanceNoteModal = ({ isOpen, onClose, student, currentNote, onSaveNote }) => {
  const [note, setNote] = useState('');
  
  // Initialize note from props
  useEffect(() => {
    if (isOpen && currentNote !== undefined) {
      setNote(currentNote || '');
    }
  }, [isOpen, currentNote]);
  
  // Handle saving the note
  const handleSave = () => {
    onSaveNote(note);
    onClose();
  };
  
  // Handle key press for easy saving with Ctrl+Enter
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSave();
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Attendance Note: ${student?.name || 'Student'}`}
    >
      <div className="p-4">
        <div className="mb-4">
          <label 
            htmlFor="attendance-note" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add a note about this student's attendance:
          </label>
          
          <textarea
            id="attendance-note"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Example: Called in sick with fever"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          
          <p className="mt-1 text-xs text-gray-500">
            Press Ctrl+Enter to save quickly
          </p>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500">
            Notes are visible to other teachers and administrators
          </div>
          
          <div className="flex space-x-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              Cancel
            </button>
            
            <button
              type="button"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AttendanceNoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  currentNote: PropTypes.string,
  onSaveNote: PropTypes.func.isRequired
};

export default AttendanceNoteModal; 