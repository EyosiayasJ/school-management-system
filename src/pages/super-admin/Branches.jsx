import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Components
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';
import DataTable from '../../components/common/DataTable';
import BranchModal from '../../components/super-admin/BranchModal';

// Hooks
import { useBranches } from '../../hooks/superAdmin/useBranches';
import { useCreateBranch, useUpdateBranch } from '../../hooks/superAdmin/useBranches';
import { useSchools } from '../../hooks/superAdmin/useSchools';

const Branches = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  // Fetch data
  const { data: branchesData = { items: [] }, isLoading, error, refetch } = useBranches();
  const { data: schoolsData = { items: [] } } = useSchools();
  
  // Extract the branches array from the response
  const branches = branchesData.items || [];
  
  // Extract the schools array from the response
  const schools = schoolsData.items || [];
  
  // Mutations
  const createBranch = useCreateBranch();
  const updateBranch = useUpdateBranch();

  // Filter branches based on search term and filters
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.director.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSchool = schoolFilter === 'all' || branch.schoolId.toString() === schoolFilter;
    const matchesStatus = statusFilter === 'all' || branch.status === statusFilter;
    
    return matchesSearch && matchesSchool && matchesStatus;
  });

  // DataTable columns
  const columns = [
    {
      field: 'name',
      header: 'Branch Name',
      sortable: true
    },
    {
      field: 'school',
      header: 'School',
      sortable: true
    },
    {
      field: 'address',
      header: 'Address',
      sortable: true
    },
    {
      field: 'director',
      header: 'Director',
      sortable: true
    },
    {
      field: 'students',
      header: 'Students',
      sortable: true
    },
    {
      field: 'teachers',
      header: 'Teachers',
      sortable: true
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  // Handler for adding a new branch
  const handleAddBranch = () => {
    setEditingBranch(null);
    setShowModal(true);
  };

  // Handler for editing a branch
  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setShowModal(true);
  };

  // Handler for toggling branch status (activate/deactivate)
  const handleToggleStatus = async (branch) => {
    const newStatus = branch.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${action} this branch?`)) {
      try {
        await updateBranch.mutateAsync({
          id: branch.id, 
          data: { ...branch, status: newStatus }
        });
        toast.success(`Branch ${action}d successfully`);
      } catch (error) {
        console.error(`Error ${action}ing branch:`, error);
        toast.error(`Failed to ${action} branch`);
      }
    }
  };

  // Handler for saving a branch (create or update)
  const handleSaveBranch = async (formData) => {
    try {
      if (editingBranch) {
        // Update existing branch
        await updateBranch.mutateAsync({
          id: editingBranch.id,
          data: formData
        });
        toast.success('Branch updated successfully');
      } else {
        // Create new branch
        await createBranch.mutateAsync(formData);
        toast.success('Branch added successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving branch:', error);
      toast.error(editingBranch ? 'Failed to update branch' : 'Failed to add branch');
    }
  };

  // Render row actions
  const renderRowActions = (row) => (
    <div className="flex justify-end space-x-2">
      <button 
        className="text-blue-600 hover:text-blue-900"
        onClick={(e) => {
          e.stopPropagation();
          handleEditBranch(row);
        }}
      >
        Edit
      </button>
      <button 
        className={`${row.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleStatus(row);
        }}
      >
        {row.status === 'active' ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header with ActionBar */}
      <ActionBar
        title="Branch Management"
        subtitle="Manage all branches across schools"
        primaryAction={{
          label: "Add Branch",
          onClick: handleAddBranch,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )
        }}
      />

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FormField
              id="searchBranches"
              type="text"
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputClassName="pl-10"
              containerClassName="mb-0"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </FormField>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            {/* School Filter */}
            <FormField
              id="schoolFilter"
              type="select"
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
              containerClassName="mb-0"
            >
              <option value="all">All Schools</option>
              {schools.map(school => (
                <option key={school.id} value={school.id.toString()}>{school.name}</option>
              ))}
            </FormField>

            {/* Status Filter */}
            <FormField
              id="statusFilter"
              type="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              containerClassName="mb-0"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FormField>
          </div>
        </div>
      </div>

      {/* Branches Table */}
      <DataTable
        columns={columns}
        data={filteredBranches}
        loading={isLoading}
        error={error ? 'Failed to load branches. Please try again.' : null}
        onRetry={refetch}
        emptyMessage="No branches found matching your search criteria."
        renderRowActions={renderRowActions}
      />

      {/* Branch Modal (Add/Edit) */}
      <BranchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        branch={editingBranch}
        onSubmit={handleSaveBranch}
        isSubmitting={createBranch.isPending || updateBranch.isPending}
      />
    </div>
  );
};

export default Branches;