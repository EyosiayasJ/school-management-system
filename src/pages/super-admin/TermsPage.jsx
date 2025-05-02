import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';

import { useTerms } from '../../contexts/TermContext';
import Modal from '../../components/common/Modal';
import FormField from '../../components/common/FormField';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';

/**
 * Terms Management Page
 * Allows administrators to manage academic terms
 */
export default function TermsPage() {
  const {
    terms,
    loading,
    error,
    createTerm,
    updateTerm,
    setActiveTerm
  } = useTerms();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    gradingMode: 'average',
    reportDeadline: ''
  });
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!modalOpen) {
      setForm({
        name: '',
        startDate: '',
        endDate: '',
        gradingMode: 'average',
        reportDeadline: ''
      });
      setEditingId(null);
    }
  }, [modalOpen]);

  // Load term data when editing
  useEffect(() => {
    if (editingId && terms.length > 0) {
      const termToEdit = terms.find(term => term.id === editingId);
      if (termToEdit) {
        setForm({
          name: termToEdit.name,
          startDate: termToEdit.startDate,
          endDate: termToEdit.endDate,
          gradingMode: termToEdit.gradingMode,
          reportDeadline: termToEdit.reportDeadline
        });
      }
    }
  }, [editingId, terms]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for creating a new term
  const handleNewTerm = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  // Open modal for editing an existing term
  const handleEditTerm = (termId) => {
    setEditingId(termId);
    setModalOpen(true);
  };

  // Save term (create or update)
  const handleSave = async () => {
    try {
      // Basic validation
      if (!form.name || !form.startDate || !form.endDate || !form.reportDeadline) {
        setActionError('Please fill in all required fields');
        return;
      }

      if (new Date(form.endDate) <= new Date(form.startDate)) {
        setActionError('End date must be after the start date');
        return;
      }

      if (new Date(form.reportDeadline) < new Date(form.endDate)) {
        setActionError('Report deadline should be after the term end date');
        return;
      }

      // Create or update term
      if (editingId) {
        await updateTerm(editingId, form);
        setActionSuccess(`Term "${form.name}" has been updated`);
      } else {
        await createTerm(form);
        setActionSuccess(`Term "${form.name}" has been created`);
      }

      // Close modal and reset form
      setModalOpen(false);
    } catch (err) {
      setActionError(err.message || 'Failed to save term');
    }
  };

  // Handle setting a term as active
  const handleSetActive = async (termId) => {
    try {
      await setActiveTerm(termId);
      setActionSuccess('Active term has been updated');
    } catch (err) {
      setActionError(err.message || 'Failed to set term as active');
    }
  };

  // Clear status messages
  const clearMessages = () => {
    setActionError(null);
    setActionSuccess(null);
  };

  // Definition of table columns
  const columns = [
    {
      field: 'name',
      header: 'Term Name',
      sortable: true
    },
    {
      field: 'startDate',
      header: 'Start Date',
      sortable: true,
      render: (row) => format(new Date(row.startDate), 'MMM d, yyyy')
    },
    {
      field: 'endDate',
      header: 'End Date',
      sortable: true,
      render: (row) => format(new Date(row.endDate), 'MMM d, yyyy')
    },
    {
      field: 'gradingMode',
      header: 'Grading Mode',
      render: (row) => (
        <span className="capitalize px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          {row.gradingMode}
        </span>
      )
    },
    {
      field: 'reportDeadline',
      header: 'Report Deadline',
      sortable: true,
      render: (row) => format(new Date(row.reportDeadline), 'MMM d, yyyy')
    },
    {
      field: 'isActive',
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs 
          ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  // Table actions renderer
  const renderActions = (row) => (
    <div className="flex gap-2 justify-end">
      <button
        onClick={() => handleEditTerm(row.id)}
        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
        aria-label="Edit term"
      >
        <FaEdit />
      </button>
      {!row.isActive && (
        <button
          onClick={() => handleSetActive(row.id)}
          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-100 rounded"
          aria-label="Set as active term"
        >
          <FaCheck />
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Term Management</h1>
        <button
          onClick={handleNewTerm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> <span>New Term</span>
        </button>
      </div>

      {/* Status messages */}
      {actionError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex justify-between items-center">
          <span>{actionError}</span>
          <button onClick={clearMessages} className="text-red-800 hover:text-red-900">
            <FaTimes />
          </button>
        </div>
      )}

      {actionSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex justify-between items-center">
          <span>{actionSuccess}</span>
          <button onClick={clearMessages} className="text-green-800 hover:text-green-900">
            <FaTimes />
          </button>
        </div>
      )}

      <Card>
        <DataTable
          columns={columns}
          data={terms || []}
          loading={loading}
          error={error}
          renderRowActions={renderActions}
          emptyMessage="No terms have been created yet."
        />
      </Card>

      {/* Term Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Term" : "Create New Term"}
        size="large"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormField
            id="name"
            label="Term Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Fall 2023"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="startDate"
              label="Start Date"
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />

            <FormField
              id="endDate"
              label="End Date"
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <FormField
            id="gradingMode"
            label="Grading Mode"
            type="select"
            name="gradingMode"
            value={form.gradingMode}
            onChange={handleChange}
          >
            <option value="average">Average - Percentage-based</option>
            <option value="gpa">GPA - 4.0 Scale</option>
          </FormField>

          <FormField
            id="reportDeadline"
            label="Report Deadline"
            type="date"
            name="reportDeadline"
            value={form.reportDeadline}
            onChange={handleChange}
            required
            helperText="The date by which all reports must be generated"
          />
        </div>
      </Modal>
    </div>
  );
} 