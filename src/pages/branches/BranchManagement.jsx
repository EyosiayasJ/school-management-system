// src/pages/branches/BranchManagement.jsx

import React, { useState, useEffect, Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import { branches as mockBranches } from '../../mock';

// Skeleton loaders
import SkeletonStatCard from '../../components/common/SkeletonStatCard';
import SkeletonActionBar from '../../components/common/SkeletonActionBar';
import SkeletonTableRow from '../../components/common/SkeletonTableRow';

// Modals
import AddBranchModal from '../../components/branches/AddBranchModal';
import EditBranchModal from '../../components/branches/EditBranchModal';
import ViewBranchModal from '../../components/branches/ViewBranchModal';

const BranchManagement = () => {
  // State
  const [branches, setBranches]           = useState([...mockBranches]);
  const [loading, setLoading]             = useState(true);
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddOpen, setIsAddOpen]         = useState(false);
  const [isEditOpen, setIsEditOpen]       = useState(false);
  const [isViewOpen, setIsViewOpen]       = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // CRUD handlers
  const handleAddBranch = (newBranch) => {
    setBranches(prev => [...prev, newBranch]);
    setIsAddOpen(false);
  };
  const handleViewBranch = (b) => {
    setSelectedBranch(b);
    setIsViewOpen(true);
  };
  const handleEditBranch = (b) => {
    setSelectedBranch(b);
    setIsEditOpen(true);
  };
  const handleUpdateBranch = (updated) => {
    setBranches(prev => prev.map(b => b.id === updated.id ? updated : b));
    setIsEditOpen(false);
    setSelectedBranch(null);
  };

  // Filtering
  const filtered = branches.filter(b => {
    const matchSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = selectedFilter === 'all' || b.status === selectedFilter;
    return matchSearch && matchFilter;
  });

  // Stats
  const totalStats = branches.reduce((acc, b) => {
    if (b.status === 'active') {
      acc.branches++;
      acc.students += b.students;
      acc.teachers += b.teachers;
    }
    return acc;
  }, { branches: 0, students: 0, teachers: 0 });

  return (
    <>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Branch Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your school's branches, view stats, and perform CRUD operations.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {loading
            ? [0,1,2].map(i => <SkeletonStatCard key={i} />)
            : [
                ['Active Branches', totalStats.branches],
                ['Total Students', totalStats.students],
                ['Total Teachers', totalStats.teachers],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className="bg-white shadow-md rounded-lg p-6 min-h-[8rem] flex flex-col justify-center animate-fadeIn"
                  style={{
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '300ms'
                  }}
                  role="region"
                  aria-label={label}
                >
                  <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{value}</dd>
                </div>
              ))
          }
        </div>
      </div>

      {/* Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          {loading
            ? <SkeletonActionBar />
            : (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                {/* Search */}
                <div className="w-full md:w-1/3">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0..." clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="search"
                      placeholder="Search branches..."
                      className="block w-full pl-10 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <div className="relative inline-flex">
                    <select
                      className="appearance-none bg-white border rounded-md pl-3 pr-8 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      value={selectedFilter}
                      onChange={e => setSelectedFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293..." clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="w-full md:w-auto inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Branch
                </button>
              </div>
            )
          }
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 overflow-x-auto">
        <table className="hidden sm:table min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              {['Name','Location','Status','Established','Students','Teachers',''].map((h, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky top-0 bg-white z-10"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading
              ? <SkeletonTableRow colSpan={7} />
              : filtered.length > 0
                ? filtered.map((b, idx) => (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50 animate-fadeIn"
                      style={{
                        animationDelay: `${idx * 40}ms`,
                        animationDuration: '200ms'
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{b.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{b.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          b.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>{b.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{b.established}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{b.students}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{b.teachers}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => handleViewBranch(b)}
                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                            aria-label="View"
                          >
                            {/* eye icon */}
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEditBranch(b)}
                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                            aria-label="Edit"
                          >
                            {/* pencil icon */}
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No branches found.
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
        {loading
          ? [0,1].map(i => (
              <div key={i} className="p-4 mb-4 bg-white shadow-md rounded-lg animate-pulse">
                <div className="flex justify-between items-center">
                  <span className="h-4 bg-gray-200 rounded-md w-1/3"></span>
                  <div className="flex space-x-2">
                    <span className="h-5 w-5 bg-gray-200 rounded-full"></span>
                    <span className="h-5 w-5 bg-gray-200 rounded-full"></span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="h-4 bg-gray-200 rounded-md w-1/4"></span>
                  <span className="h-4 bg-gray-200 rounded-md w-1/4"></span>
                  <span className="h-4 bg-gray-200 rounded-md w-1/4"></span>
                </div>
              </div>
            ))
          : filtered.length > 0
            ? filtered.map((b, idx) => (
                <div
                  key={b.id}
                  className="p-4 mb-4 bg-white shadow-md rounded-lg animate-fadeIn"
                  style={{
                    animationDelay: `${idx * 40}ms`,
                    animationDuration: '300ms'
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{b.name}</span>
                    <div className="flex space-x-2">
                      <button onClick={() => handleViewBranch(b)} className="p-1 text-blue-600 hover:bg-blue-100 rounded-full focus:ring-2 focus:ring-blue-500" aria-label="View">
                        {/* eye icon */}
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button onClick={() => handleEditBranch(b)} className="p-1 text-blue-600 hover:bg-blue-100 rounded-full focus:ring-2 focus:ring-blue-500" aria-label="Edit">
                        {/* pencil icon */}
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                    <span>Loc: {b.location}</span>
                    <span>Status: {b.status}</span>
                    <span>Est: {b.established}</span>
                    <span>Stu: {b.students}</span>
                    <span>Tch: {b.teachers}</span>
                  </div>
                </div>
              ))
            : <div className="text-center text-gray-500">No branches found.</div>
        }
      </div>

      {/* Pagination (static) */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
        <div className="text-sm text-gray-700">
          Showing {filtered.length > 0 ? `1–${filtered.length}` : '0'} of {branches.length}
        </div>
        <div className="space-x-2">
          <button disabled className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Next</button>
        </div>
      </nav>

      {/* Modals */}
      <AddBranchModal   isOpen={isAddOpen}   onClose={() => setIsAddOpen(false)}   onSubmit={handleAddBranch} />
      <EditBranchModal isOpen={isEditOpen}  onClose={() => setIsEditOpen(false)}  branch={selectedBranch} onSubmit={handleUpdateBranch} />
      <ViewBranchModal isOpen={isViewOpen}  onClose={() => setIsViewOpen(false)}  branch={selectedBranch} />
    </>
  );
};

export default BranchManagement;
