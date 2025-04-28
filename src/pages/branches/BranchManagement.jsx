import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Skeleton loaders
import SkeletonStatCard from '../../components/common/SkeletonStatCard';
import SkeletonActionBar from '../../components/common/SkeletonActionBar';
import SkeletonTableRow from '../../components/common/SkeletonTableRow';

// Modal
import AddBranchModal from '../../components/branches/AddBranchModal';

const BranchManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBranch = (newBranch) => {
    branches.push(newBranch);
    setIsModalOpen(false);
  };
  const [loading, setLoading] = useState(true);

  const branches = [
    { id: 1, name: 'Downtown Branch', location: 'New York', status: 'active', establishedYear: 2010, students: 500, teachers: 30 },
    { id: 2, name: 'Uptown Branch',   location: 'Los Angeles', status: 'active', establishedYear: 2015, students: 400, teachers: 25 },
    { id: 3, name: 'Midtown Branch',  location: 'Chicago',     status: 'inactive', establishedYear: 2018, students: 250, teachers: 15 },
    { id: 4, name: 'Suburb Branch',   location: 'Houston',     status: 'active', establishedYear: 2020, students: 300, teachers: 20 },
  ];

  // simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // filtering
  const filteredBranches = branches.filter(branch => {
    const matchSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = selectedFilter === 'all' || branch.status === selectedFilter;
    return matchSearch && matchFilter;
  });

  // stats
  const totalStats = branches.reduce(
    (acc, b) => {
      if (b.status === 'active') {
        acc.branches++;
        acc.students += b.students;
        acc.teachers += b.teachers;
      }
      return acc;
    },
    { branches: 0, students: 0, teachers: 0 }
  );

  return (
    <div className="py-6">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Branch Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your school’s branches, view stats, and perform CRUD operations.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {loading ? (
          <>
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow rounded-lg p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Active Branches</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{totalStats.branches}</dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white shadow rounded-lg p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{totalStats.students}</dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white shadow rounded-lg p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Total Teachers</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{totalStats.teachers}</dd>
            </motion.div>
          </>
        )}
      </div>

      {/* Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
        {loading ? (
          <SkeletonActionBar />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
          >
            {/* Search */}
            <div className="w-full sm:w-1/3">
              <input
                type="search"
                placeholder="Search branches..."
                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-500">Status:</label>
              <select
                className="border border-gray-300 rounded-md p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Add Branch */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Add Branch
            </button>
          </motion.div>
        )}
      </div>

      {/* Table (desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 overflow-x-auto mb-6 hidden sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Established</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teachers</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7">
                  <SkeletonTableRow />
                </td>
              </tr>
            ) : filteredBranches.length > 0 ? (
              filteredBranches.map((b) => (
                <tr key={b.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{b.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{b.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.establishedYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.teachers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button className="text-blue-600 hover:underline">View</button>
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No branches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view (mobile) */}
      <div className="sm:hidden max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
        {loading
          ? [...Array(2)].map((_, i) => <SkeletonTableRow key={i} />)
          : filteredBranches.length > 0
          ? filteredBranches.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow rounded-lg p-4 mb-4"
              >
                <h2 className="font-semibold">{b.name}</h2>
                <p className="text-sm text-gray-600">{b.location}</p>
                <p className="text-sm text-gray-600 capitalize">{b.status}</p>
                <p className="text-sm text-gray-600">Established: {b.establishedYear}</p>
                <div className="mt-2 space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-blue-600 hover:underline">Edit</button>
                </div>
              </motion.div>
            ))
          : (
            <div className="text-center text-gray-500">No branches found.</div>
          )}
      </div>

      {/* Pagination */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between p-4 bg-white shadow rounded-lg">
        <div className="text-sm text-gray-700">
          Showing {filteredBranches.length > 0 ? `1–${filteredBranches.length}` : '0'} of {branches.length}
        </div>
        <div className="space-x-2">
          <button disabled className="px-4 py-2 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed">
            Previous
          </button>
          <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
            Next
          </button>
        </div>
      </nav>

      {/* Add Branch Modal */}
      <AddBranchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddBranch} />
    </div>
  );
};

export default BranchManagement;
