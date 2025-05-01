import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Components
import ActionBar from '../../components/common/ActionBar';
import DataTable from '../../components/common/DataTable';
import Card from '../../components/common/Card';
import FormField from '../../components/common/FormField';

// Mock data for audit logs
const INITIAL_AUDIT_LOGS = [
  { 
    id: 1, 
    timestamp: '2023-12-15T14:32:45Z', 
    user: 'John Smith', 
    action: 'CREATE', 
    resource: 'School', 
    resourceId: 'SCH001', 
    resourceName: 'Westfield Academy', 
    details: 'Created new school with 2 branches'
  },
  { 
    id: 2, 
    timestamp: '2023-12-15T13:47:21Z', 
    user: 'Sarah Johnson', 
    action: 'UPDATE', 
    resource: 'Branch', 
    resourceId: 'BR003', 
    resourceName: 'Downtown Campus', 
    details: 'Updated branch address and contact information'
  },
  { 
    id: 3, 
    timestamp: '2023-12-15T11:25:18Z', 
    user: 'Admin System', 
    action: 'SYSTEM', 
    resource: 'Billing', 
    resourceId: 'BIL047', 
    resourceName: 'Monthly Invoice', 
    details: 'Generated monthly invoices for all schools'
  },
  { 
    id: 4, 
    timestamp: '2023-12-14T16:52:37Z', 
    user: 'Michael Brown', 
    action: 'DELETE', 
    resource: 'User', 
    resourceId: 'USR089', 
    resourceName: 'James Wilson', 
    details: 'Deleted inactive teacher account'
  },
  { 
    id: 5, 
    timestamp: '2023-12-14T14:18:05Z', 
    user: 'John Smith', 
    action: 'UPDATE', 
    resource: 'Plan', 
    resourceId: 'PLN002', 
    resourceName: 'Professional Plan', 
    details: 'Updated plan features and pricing'
  },
  { 
    id: 6, 
    timestamp: '2023-12-14T09:45:52Z', 
    user: 'Jennifer Lee', 
    action: 'CREATE', 
    resource: 'Branch', 
    resourceId: 'BR012', 
    resourceName: 'North Campus', 
    details: 'Added new branch to Oakridge Preparatory'
  },
  { 
    id: 7, 
    timestamp: '2023-12-13T15:33:27Z', 
    user: 'Admin System', 
    action: 'SYSTEM', 
    resource: 'Backup', 
    resourceId: 'BCK001', 
    resourceName: 'Daily Backup', 
    details: 'Completed daily database backup'
  },
  { 
    id: 8, 
    timestamp: '2023-12-13T13:21:09Z', 
    user: 'Michael Brown', 
    action: 'LOGIN', 
    resource: 'Auth', 
    resourceId: 'USR032', 
    resourceName: 'Michael Brown', 
    details: 'Successful login from 192.168.1.45'
  },
  { 
    id: 9, 
    timestamp: '2023-12-13T11:48:36Z', 
    user: 'Sarah Johnson', 
    action: 'UPDATE', 
    resource: 'School', 
    resourceId: 'SCH003', 
    resourceName: 'Springfield Elementary', 
    details: 'Updated school license information'
  },
  { 
    id: 10, 
    timestamp: '2023-12-13T10:15:42Z', 
    user: 'Admin System', 
    action: 'SYSTEM', 
    resource: 'Maintenance', 
    resourceId: 'MNT001', 
    resourceName: 'System Update', 
    details: 'Applied system updates and maintenance'
  },
  { 
    id: 11, 
    timestamp: '2023-12-12T16:40:19Z', 
    user: 'Jennifer Lee', 
    action: 'CREATE', 
    resource: 'User', 
    resourceId: 'USR102', 
    resourceName: 'David Thompson', 
    details: 'Created new teacher account'
  },
  { 
    id: 12, 
    timestamp: '2023-12-12T14:27:53Z', 
    user: 'John Smith', 
    action: 'UPDATE', 
    resource: 'Feature', 
    resourceId: 'FEA005', 
    resourceName: 'Health Module', 
    details: 'Enabled health module for all schools'
  },
];

// Constants for filter options
const ACTION_TYPES = ['ALL', 'CREATE', 'UPDATE', 'DELETE', 'SYSTEM', 'LOGIN'];
const RESOURCE_TYPES = ['ALL', 'School', 'Branch', 'User', 'Plan', 'Billing', 'Feature', 'Auth', 'Backup', 'Maintenance'];

const AuditLogs = () => {
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [filteredLogs, setFilteredLogs] = useState(INITIAL_AUDIT_LOGS);
  const [filters, setFilters] = useState({
    search: '',
    action: 'ALL',
    resource: 'ALL',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, auditLogs]);

  // Apply all active filters to the logs
  const applyFilters = () => {
    let filtered = [...auditLogs];
    
    // Filter by search term (user, resource name, or details)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(searchLower) ||
        log.resourceName.toLowerCase().includes(searchLower) ||
        log.details.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by action type
    if (filters.action !== 'ALL') {
      filtered = filtered.filter(log => log.action === filters.action);
    }
    
    // Filter by resource type
    if (filters.resource !== 'ALL') {
      filtered = filtered.filter(log => log.resource === filters.resource);
    }
    
    // Filter by date range
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(log => new Date(log.timestamp) >= startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      // Set to end of day
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => new Date(log.timestamp) <= endDate);
    }
    
    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Update filter values
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      action: 'ALL',
      resource: 'ALL',
      startDate: '',
      endDate: '',
    });
  };

  // Refresh logs (would fetch from API in real implementation)
  const handleRefreshLogs = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would fetch fresh data from the backend
      setLoading(false);
    }, 800);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return format(date, 'MMM dd, yyyy HH:mm:ss');
  };

  // Get appropriate badge color based on action type
  const getActionBadgeColor = (action) => {
    switch(action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      case 'SYSTEM':
        return 'bg-purple-100 text-purple-800';
      case 'LOGIN':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // DataTable columns configuration
  const columns = [
    {
      field: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (row) => formatTimestamp(row.timestamp)
    },
    {
      field: 'user',
      header: 'User',
      sortable: true
    },
    {
      field: 'action',
      header: 'Action',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(row.action)}`}>
          {row.action}
        </span>
      )
    },
    {
      field: 'resource',
      header: 'Resource',
      sortable: true
    },
    {
      field: 'resourceName',
      header: 'Resource Name',
      sortable: true
    },
    {
      field: 'details',
      header: 'Details',
      sortable: true
    }
  ];

  // Calculate pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination configuration
  const pagination = {
    currentPage,
    totalItems: filteredLogs.length,
    itemsPerPage: logsPerPage,
    onPageChange: handlePageChange
  };

  return (
    <div className="space-y-6">
      <ActionBar
        title="Audit Logs"
        subtitle="Track all system activities and changes"
        primaryAction={{
          label: "Refresh",
          onClick: handleRefreshLogs,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
          disabled: loading
        }}
      />
      
      {/* Filter Panel */}
      <Card title="Filters">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <FormField
            id="searchTerm"
            name="searchTerm"
            placeholder="Search logs..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            inputClassName="pl-10"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </FormField>
          
          {/* Action Type */}
          <FormField
            id="actionType"
            name="actionType"
            type="select"
            label="Action"
            value={filters.action}
            onChange={(e) => handleFilterChange('action', e.target.value)}
          >
            {ACTION_TYPES.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </FormField>
          
          {/* Resource Type */}
          <FormField
            id="resourceType"
            name="resourceType"
            type="select"
            label="Resource"
            value={filters.resource}
            onChange={(e) => handleFilterChange('resource', e.target.value)}
          >
            {RESOURCE_TYPES.map(resource => (
              <option key={resource} value={resource}>{resource}</option>
            ))}
          </FormField>
          
          {/* Start Date */}
          <FormField
            id="startDate"
            name="startDate"
            type="date"
            label="Start Date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
          
          {/* End Date */}
          <FormField
            id="endDate"
            name="endDate"
            type="date"
            label="End Date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </Card>
      
      {/* Audit Logs Table */}
      <DataTable
        columns={columns}
        data={currentLogs}
        loading={loading}
        error={null}
        emptyMessage="No audit logs found matching your criteria."
        pagination={true}
      />
    </div>
  );
};

export default AuditLogs; 