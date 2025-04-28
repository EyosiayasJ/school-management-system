/**
 * Dashboard Service
 * 
 * This service abstracts all data fetching logic for the dashboard.
 * Currently returns mock data with simulated API delays.
 * When a real backend is available, just modify these functions to call the actual API.
 */

// Mock data - same as what was previously in Dashboard.jsx
const mockStats = [
  { name: 'Total Students', value: '2,543', change: '+12%', iconColor: 'text-blue-500' },
  { name: 'Total Teachers', value: '157', change: '+4%', iconColor: 'text-emerald-500' },
  { name: 'Total Branches', value: '12', change: '+2', iconColor: 'text-violet-500' },
  { name: 'Upcoming Events', value: '8', change: 'This week', iconColor: 'text-amber-500' },
];

const mockActivities = [
  { id: 1, user: 'John Smith', action: 'added a new student', time: '2 hours ago' },
  { id: 2, user: 'Sarah Johnson', action: 'updated health records', time: '4 hours ago' },
  { id: 3, user: 'Michael Brown', action: 'added 5 new books to E-Library', time: 'Yesterday' },
  { id: 4, user: 'Emily Davis', action: 'scheduled a new event', time: '2 days ago' },
];

const mockQuickLinks = [
  { label: 'Add Student', iconColor: 'text-blue-600', path: '/students/add' },
  { label: 'Add Teacher', iconColor: 'text-green-600', path: '/teachers/add' },
  { label: 'Add Event', iconColor: 'text-amber-600', path: '/events/add' },
  { label: 'Generate Report', iconColor: 'text-violet-600', path: '/reports/generate' },
];

// Simulate API delay
const simulateApiDelay = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Simulate API error (for testing error handling)
const simulateApiError = (errorMessage, errorChance = 0) => {
  if (Math.random() < errorChance) {
    return Promise.reject(new Error(errorMessage));
  }
  return Promise.resolve();
};

/**
 * Get dashboard statistics
 * @returns {Promise<Array>} Statistics data
 */
export const getStats = async () => {
  try {
    // Simulate potential API error (0% chance in this case)
    await simulateApiError('Failed to fetch statistics', 0);
    // Return mock data after delay
    return await simulateApiDelay(mockStats, 800);
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * Get branch overview data
 * @returns {Promise<Object>} Branch performance data
 */
export const getBranchOverview = async () => {
  try {
    // This would return chart data in the future
    // For now just return a placeholder
    return await simulateApiDelay({
      message: 'Branch performance chart will be displayed here',
    }, 1200);
  } catch (error) {
    console.error('Error fetching branch overview:', error);
    throw error;
  }
};

/**
 * Get recent activity data
 * @returns {Promise<Array>} Recent activities
 */
export const getRecentActivity = async () => {
  try {
    return await simulateApiDelay(mockActivities, 1000);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
};

/**
 * Get quick links data
 * @returns {Promise<Array>} Quick links
 */
export const getQuickLinks = async () => {
  try {
    return await simulateApiDelay(mockQuickLinks, 600);
  } catch (error) {
    console.error('Error fetching quick links:', error);
    throw error;
  }
};