import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SkeletonTableRow from './SkeletonTableRow';

/**
 * DataTable component - A reusable table with sorting, pagination, and loading states
 * Can be used for displaying any tabular data across the application
 */
const DataTable = ({
  columns,
  data,
  loading = false,
  error = null,
  onRetry,
  onRowClick,
  emptyMessage = 'No data found.',
  loadingRowCount = 5,
  rowKeyField = 'id',
  pagination = true,
  initialSort = { field: null, direction: 'asc' },
  rowClassName = '',
  tableClassName = '',
  onSort,
  renderRowActions,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState(initialSort);
  
  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);
  
  // Handle sorting
  const handleSort = (field) => {
    const newDirection = 
      sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      
    const newSortConfig = { field, direction: newDirection };
    setSortConfig(newSortConfig);
    
    // If external sort handler is provided, use it
    if (onSort) {
      onSort(newSortConfig);
    }
  };
  
  // Sort data if no external sort handler
  const sortedData = onSort ? data : [...data].sort((a, b) => {
    if (sortConfig.field === null) return 0;
    
    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Handle pagination
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : sortedData;
    
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Sort indicators
  const getSortIndicator = (field) => {
    if (sortConfig.field !== field) return null;
    
    return (
      <span className="ml-1">
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };
  
  // Handle row per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };
  
  // Render loading skeleton rows
  const renderSkeletons = () => {
    // Get the total number of columns including the actions column
    const totalColumns = columns.length + (renderRowActions ? 1 : 0);
    
    return [...Array(loadingRowCount)].map((_, index) => (
      <SkeletonTableRow key={index} colSpan={totalColumns} />
    ));
  };
  
  // Render error state
  const renderError = () => {
    return (
      <tr>
        <td colSpan={columns.length + (renderRowActions ? 1 : 0)} className="px-6 py-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          )}
        </td>
      </tr>
    );
  };
  
  // Render empty state
  const renderEmpty = () => {
    return (
      <tr>
        <td colSpan={columns.length + (renderRowActions ? 1 : 0)} className="px-6 py-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </td>
      </tr>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${tableClassName}`}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.field}
                  scope="col" 
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={column.sortable ? () => handleSort(column.field) : undefined}
                >
                  {column.header}
                  {column.sortable && getSortIndicator(column.field)}
                </th>
              ))}
              {renderRowActions && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              renderSkeletons()
            ) : error ? (
              renderError()
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr 
                  key={row[rowKeyField]} 
                  className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors ${rowClassName}`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => (
                    <td key={`${row[rowKeyField]}-${column.field}`} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(row) : row[column.field]}
                    </td>
                  ))}
                  {renderRowActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {renderRowActions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              renderEmpty()
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && data.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <div className="flex justify-center sm:justify-end">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">
                Page {currentPage} of {totalPages || 1}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="First page"
                >
                  &laquo;
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  &lsaquo;
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  &rsaquo;
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Last page"
                >
                  &raquo;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
      sortable: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRetry: PropTypes.func,
  onRowClick: PropTypes.func,
  emptyMessage: PropTypes.string,
  loadingRowCount: PropTypes.number,
  rowKeyField: PropTypes.string,
  pagination: PropTypes.bool,
  initialSort: PropTypes.shape({
    field: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  rowClassName: PropTypes.string,
  tableClassName: PropTypes.string,
  onSort: PropTypes.func,
  renderRowActions: PropTypes.func,
};

export default DataTable; 