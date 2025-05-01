import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Components
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';
import DataTable from '../../components/common/DataTable';
import SchoolModal from '../../components/super-admin/SchoolModal';

// Hooks
import { useSchools, useCreateSchool, useUpdateSchool, useDeleteSchool } from '../../hooks/superAdmin/useSchools';

// Utils
import { formatDate } from '../../utils/formatDate';

const Schools = () => {
  const navigate = useNavigate();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  
  // Query and mutation hooks
  const { data, isLoading, error, refetch } = useSchools();
  const createSchool = useCreateSchool();
  const updateSchool = useUpdateSchool();
  const deleteSchool = useDeleteSchool();

  // Extract schools array from the API response
  const schools = data?.items || [];

  // Filter schools based on search term and status
  const filteredSchools = schools.filter(school => {
    const matchesSearch = 
      (school.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (school.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || school.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Table columns configuration
  const columns = [
    {
      field: 'name',
      header: 'School',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {row.name?.charAt(0) || '?'}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name || 'Unnamed School'}</div>
          </div>
        </div>
      )
    },
    {
      field: 'location',
      header: 'Location',
      sortable: true
    },
    {
      field: 'branches',
      header: 'Branches',
      sortable: true
    },
    {
      field: 'students',
      header: 'Students',
      sortable: true,
      render: (row) => (row.students ? row.students.toLocaleString() : '0')
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : row.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status || 'unknown'}
        </span>
      )
    },
    {
      field: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (row) => formatDate(row.createdAt, 'short')
    }
  ];

  // Handler for adding a new school
  const handleAddSchool = () => {
    setEditingSchool(null);
    setShowAddModal(true);
  };

  // Handler for editing a school
  const handleEditSchool = (school) => {
    setEditingSchool(school);
    setShowAddModal(true);
  };

  // Handler for deleting a school
  const handleDeleteSchool = async (id) => {
    if (window.confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
      try {
        await deleteSchool.mutateAsync(id);
        toast.success('School deleted successfully');
      } catch (error) {
        console.error('Error deleting school:', error);
        toast.error('Failed to delete school');
      }
    }
  };

  // Handler for saving a school (create or update)
  const handleSaveSchool = async (formData) => {
    try {
      if (editingSchool) {
        // Update existing school
        await updateSchool.mutateAsync({
          id: editingSchool.id,
          data: formData
        });
        toast.success('School updated successfully');
      } else {
        // Create new school
        await createSchool.mutateAsync(formData);
        toast.success('School added successfully');
      }
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving school:', error);
      toast.error(editingSchool ? 'Failed to update school' : 'Failed to add school');
    }
  };

  // Handler for row click to view school details
  const handleRowClick = (school) => {
    navigate(`/super-admin/schools/${school.id}`);
  };

  // Row actions (view, edit, delete)
  const renderRowActions = (row) => (
    <div className="flex justify-end space-x-2">
      <Link 
        to={`/super-admin/schools/${row.id}`} 
        className="text-blue-600 hover:text-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        View
      </Link>
      <button 
        className="text-gray-600 hover:text-gray-900"
        onClick={(e) => {
          e.stopPropagation();
          handleEditSchool(row);
        }}
      >
        Edit
      </button>
      <button 
        className="text-red-600 hover:text-red-900"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteSchool(row.id);
        }}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header with ActionBar */}
      <ActionBar
        title="Schools Management"
        subtitle="Manage all schools in the system"
        primaryAction={{
          label: "Add School",
          onClick: handleAddSchool,
          icon: (
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )
        }}
      />

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FormField
              id="searchSchools"
              type="text"
              name="search"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputClassName="pl-10"
              containerClassName="mb-0"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </FormField>
          </div>
          <div className="flex items-center space-x-2">
            <FormField
              id="statusFilter"
              name="status"
              type="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              containerClassName="mb-0"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </FormField>
          </div>
        </div>
      </div>

      {/* Schools Table */}
      <DataTable
        columns={columns}
        data={filteredSchools}
        loading={isLoading}
        error={error ? 'Failed to load schools. Please try again.' : null}
        onRetry={refetch}
        onRowClick={handleRowClick}
        emptyMessage="No schools found matching your search criteria."
        renderRowActions={renderRowActions}
      />

      {/* School Modal (Add/Edit) */}
      <SchoolModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        school={editingSchool}
        onSubmit={handleSaveSchool}
        isSubmitting={createSchool.isPending || updateSchool.isPending}
      />
    </div>
  );
};

export default Schools;