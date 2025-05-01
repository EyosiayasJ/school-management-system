import { mockSuccess, mockError, filterBySearchTerm, paginateItems, sortItems } from './helpers';

/**
 * Mock Super Admin API service
 * Provides simulated backend functionality for development and testing
 */

// ---------- MOCK DATA ----------

// Schools
const mockSchools = [
  {
    id: 's1',
    name: 'Evergreen Academy',
    location: 'Seattle, WA',
    branches: 3,
    students: 1250,
    status: 'active',
    createdAt: '2023-01-15T08:30:00Z',
    contactEmail: 'admin@evergreen.edu',
    contactPhone: '(206) 555-1234',
    planId: 'p2'
  },
  {
    id: 's2',
    name: 'Horizon International School',
    location: 'Los Angeles, CA',
    branches: 2,
    students: 850,
    status: 'active',
    createdAt: '2023-02-10T10:15:00Z',
    contactEmail: 'office@horizon-edu.org',
    contactPhone: '(310) 555-9876',
    planId: 'p3'
  },
  {
    id: 's3',
    name: 'Oakridge Preparatory',
    location: 'Portland, OR',
    branches: 1,
    students: 420,
    status: 'pending',
    createdAt: '2023-05-05T14:45:00Z',
    contactEmail: 'info@oakridgeprep.edu',
    contactPhone: '(503) 555-4321',
    planId: 'p1'
  },
  {
    id: 's4',
    name: 'Sierra Heights Academy',
    location: 'Denver, CO',
    branches: 4,
    students: 1600,
    status: 'active',
    createdAt: '2022-11-20T09:00:00Z',
    contactEmail: 'admin@sierraheights.edu',
    contactPhone: '(720) 555-7890',
    planId: 'p3'
  },
  {
    id: 's5',
    name: 'Westlake Charter',
    location: 'Austin, TX',
    branches: 1,
    students: 310,
    status: 'suspended',
    createdAt: '2023-03-18T11:30:00Z',
    contactEmail: 'office@westlake-charter.org',
    contactPhone: '(512) 555-5678',
    planId: 'p1'
  }
];

// Branches
const mockBranches = [
  {
    id: 'b1',
    name: 'Evergreen Academy - Main Campus',
    schoolId: 's1',
    location: 'Downtown Seattle, WA',
    students: 600,
    status: 'active',
    createdAt: '2023-01-15T08:30:00Z'
  },
  {
    id: 'b2',
    name: 'Evergreen Academy - West Seattle',
    schoolId: 's1',
    location: 'West Seattle, WA',
    students: 350,
    status: 'active',
    createdAt: '2023-02-20T10:15:00Z'
  },
  {
    id: 'b3',
    name: 'Evergreen Academy - Bellevue',
    schoolId: 's1',
    location: 'Bellevue, WA',
    students: 300,
    status: 'active',
    createdAt: '2023-03-10T09:45:00Z'
  },
  {
    id: 'b4',
    name: 'Horizon International - Beverly Hills',
    schoolId: 's2',
    location: 'Beverly Hills, CA',
    students: 450,
    status: 'active',
    createdAt: '2023-02-10T10:15:00Z'
  },
  {
    id: 'b5',
    name: 'Horizon International - Santa Monica',
    schoolId: 's2',
    location: 'Santa Monica, CA',
    students: 400,
    status: 'active',
    createdAt: '2023-04-15T13:20:00Z'
  },
  {
    id: 'b6',
    name: 'Oakridge Preparatory - Main Campus',
    schoolId: 's3',
    location: 'Portland, OR',
    students: 420,
    status: 'pending',
    createdAt: '2023-05-05T14:45:00Z'
  },
  {
    id: 'b7',
    name: 'Sierra Heights - Downtown',
    schoolId: 's4',
    location: 'Downtown Denver, CO',
    students: 500,
    status: 'active',
    createdAt: '2022-11-20T09:00:00Z'
  },
  {
    id: 'b8',
    name: 'Sierra Heights - Aurora',
    schoolId: 's4',
    location: 'Aurora, CO',
    students: 380,
    status: 'active',
    createdAt: '2023-01-10T11:30:00Z'
  },
  {
    id: 'b9',
    name: 'Sierra Heights - Lakewood',
    schoolId: 's4',
    location: 'Lakewood, CO',
    students: 420,
    status: 'active',
    createdAt: '2023-02-15T10:00:00Z'
  },
  {
    id: 'b10',
    name: 'Sierra Heights - Littleton',
    schoolId: 's4',
    location: 'Littleton, CO',
    students: 300,
    status: 'active',
    createdAt: '2023-03-20T14:15:00Z'
  },
  {
    id: 'b11',
    name: 'Westlake Charter - Main Campus',
    schoolId: 's5',
    location: 'Austin, TX',
    students: 310,
    status: 'suspended',
    createdAt: '2023-03-18T11:30:00Z'
  }
];

// Just a few sample roles for now
const ROLES = {
  SUPER_ADMIN: 'super_admin',
  SUPPORT_ADMIN: 'support_admin',
  SCHOOL_ADMIN: 'school_admin',
  TEACHER: 'teacher',
};

// Users
const mockUsers = [
  {
    id: 'u1',
    name: 'John Admin',
    email: 'john@admin.com',
    role: ROLES.SUPER_ADMIN,
    status: 'active',
    createdAt: '2023-01-01T08:00:00Z',
  },
  {
    id: 'u2',
    name: 'Sarah Support',
    email: 'sarah@support.com',
    role: ROLES.SUPPORT_ADMIN,
    status: 'active',
    createdAt: '2023-01-05T09:15:00Z',
  },
  {
    id: 'u3',
    name: 'Michael Manager',
    email: 'michael@evergreen.edu',
    role: ROLES.SCHOOL_ADMIN,
    schoolId: 's1',
    status: 'active',
    createdAt: '2023-01-18T10:30:00Z',
  },
  {
    id: 'u4',
    name: 'Lisa Lee',
    email: 'lisa@horizon-edu.org',
    role: ROLES.SCHOOL_ADMIN,
    schoolId: 's2',
    status: 'active', 
    createdAt: '2023-02-12T11:45:00Z',
  },
  {
    id: 'u5',
    name: 'David Teacher',
    email: 'david@evergreen.edu',
    role: ROLES.TEACHER,
    schoolId: 's1',
    branchId: 'b1',
    status: 'active',
    createdAt: '2023-01-20T13:00:00Z',
  },
  {
    id: 'u6',
    name: 'Patricia Teacher',
    email: 'patricia@evergreen.edu',
    role: ROLES.TEACHER,
    schoolId: 's1',
    branchId: 'b2',
    status: 'active',
    createdAt: '2023-02-25T14:15:00Z',
  },
  {
    id: 'u7',
    name: 'Robert Admin',
    email: 'robert@oakridgeprep.edu',
    role: ROLES.SCHOOL_ADMIN,
    schoolId: 's3',
    status: 'pending',
    createdAt: '2023-05-06T15:30:00Z',
  }
];

// Billing Plans
const mockPlans = [
  {
    id: 'p1',
    name: 'Starter',
    price: 99,
    billingCycle: 'monthly',
    maxStudents: 500,
    maxTeachers: 50,
    features: [
      'Core School Management',
      'Basic Reporting',
      'Email Support',
      '1 Admin User'
    ],
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'p2',
    name: 'Professional',
    price: 199,
    billingCycle: 'monthly',
    maxStudents: 1500,
    maxTeachers: 150, 
    features: [
      'All Starter Features',
      'Advanced Reporting',
      'API Access',
      'Priority Support',
      '3 Admin Users'
    ],
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: 499,
    billingCycle: 'monthly',
    maxStudents: 5000,
    maxTeachers: 500,
    features: [
      'All Professional Features',
      'White Labeling',
      'Custom Integrations',
      'Dedicated Account Manager',
      'Unlimited Admin Users',
      'SLA Guarantee'
    ],
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'p4',
    name: 'Legacy Basic',
    price: 79,
    billingCycle: 'monthly',
    maxStudents: 300,
    maxTeachers: 30,
    features: [
      'Basic School Management',
      'Email Support'
    ],
    isActive: false,
    createdAt: '2022-01-01T00:00:00Z',
  }
];

// Audit Logs
const mockAuditLogs = [
  {
    id: 'al1',
    userId: 'u1',
    userName: 'John Admin',
    action: 'SCHOOL_CREATE',
    resourceType: 'school',
    resourceId: 's3',
    details: 'Created new school: Oakridge Preparatory',
    timestamp: '2023-05-05T14:45:00Z',
    ip: '192.168.1.100',
  },
  {
    id: 'al2',
    userId: 'u1',
    userName: 'John Admin',
    action: 'USER_UPDATE',
    resourceType: 'user',
    resourceId: 'u7',
    details: 'Updated user role to School Admin',
    timestamp: '2023-05-06T15:30:00Z', 
    ip: '192.168.1.100',
  },
  {
    id: 'al3',
    userId: 'u2',
    userName: 'Sarah Support',
    action: 'SCHOOL_UPDATE',
    resourceType: 'school',
    resourceId: 's5',
    details: 'Changed school status to suspended',
    timestamp: '2023-03-18T11:30:00Z',
    ip: '192.168.1.101',
  },
  {
    id: 'al4',
    userId: 'u1',
    userName: 'John Admin',
    action: 'PLAN_CREATE',
    resourceType: 'billing_plan',
    resourceId: 'p3',
    details: 'Created new Enterprise plan',
    timestamp: '2023-01-01T00:00:00Z', 
    ip: '192.168.1.100',
  },
  {
    id: 'al5',
    userId: 'u2',
    userName: 'Sarah Support',
    action: 'BRANCH_CREATE',
    resourceType: 'branch',
    resourceId: 'b5',
    details: 'Created branch: Horizon International - Santa Monica',
    timestamp: '2023-04-15T13:20:00Z',
    ip: '192.168.1.101',
  }
];

// Global Settings
const mockGlobalSettings = {
  allowPublicRegistration: true,
  maintenanceMode: false,
  maxFileUploadSizeMB: 25,
  defaultUserRole: ROLES.TEACHER,
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  emailNotifications: {
    adminNewUserCreated: true,
    userAccountActivated: true,
    passwordResetRequested: true,
  },
  featureFlags: {
    enableBetaFeatures: false,
    enableApiAccess: true,
    enableAdvancedReporting: true,
    enableWhiteLabeling: false,
  }
};

// ---------- API ENDPOINTS ----------

// Dashboard data
const getDashboardStats = async () => {
  try {
    const stats = {
      totalSchools: mockSchools.length,
      activeSchools: mockSchools.filter(s => s.status === 'active').length,
      totalBranches: mockBranches.length,
      totalUsers: mockUsers.length,
      totalStudents: mockSchools.reduce((sum, school) => sum + school.students, 0),
      recentActivities: mockAuditLogs.slice(0, 5).map(log => ({
        id: log.id,
        action: log.action,
        details: log.details,
        user: log.user,
        timestamp: log.timestamp
      })),
      schoolsGrowth: [
        { month: 'Jan', count: 1 },
        { month: 'Feb', count: 2 },
        { month: 'Mar', count: 3 },
        { month: 'Apr', count: 3 },
        { month: 'May', count: 5 },
      ],
      usersChartData: [
        { month: 'Jan', count: 3 },
        { month: 'Feb', count: 5 },
        { month: 'Mar', count: 6 },
        { month: 'Apr', count: 6 },
        { month: 'May', count: 7 },
      ],
      planDistribution: [
        { name: 'Starter', count: mockSchools.filter(s => s.planId === 'p1').length },
        { name: 'Professional', count: mockSchools.filter(s => s.planId === 'p2').length },
        { name: 'Enterprise', count: mockSchools.filter(s => s.planId === 'p3').length },
      ],
      pendingTasks: 3
    };
    
    return mockSuccess(stats);
  } catch (error) {
    return mockError('Failed to fetch dashboard data');
  }
};

// Schools API
const getSchools = async (params = {}) => {
  try {
    let filteredSchools = [...mockSchools];
    
    // Apply filtering
    if (params.searchTerm) {
      filteredSchools = filterBySearchTerm(
        filteredSchools, 
        params.searchTerm, 
        ['name', 'location', 'contactEmail']
      );
    }
    
    if (params.status && params.status !== 'all') {
      filteredSchools = filteredSchools.filter(school => school.status === params.status);
    }
    
    // Apply sorting
    if (params.sortField) {
      filteredSchools = sortItems(filteredSchools, params.sortField, params.sortDirection || 'asc');
    }
    
    // Apply pagination
    const result = paginateItems(
      filteredSchools, 
      params.page || 1, 
      params.limit || 10
    );
    
    // Always ensure the result has items property even if pagination fails
    if (!result.items) {
      result.items = [];
      result.meta = {
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      };
    }
    
    return mockSuccess(result);
  } catch (error) {
    console.error("Error in getSchools:", error);
    return mockError('Failed to fetch schools');
  }
};

const getSchoolById = async (id) => {
  try {
    const school = mockSchools.find(s => s.id === id);
    
    if (!school) {
      return mockError('School not found', 404);
    }
    
    // Enhance school with related data
    const schoolData = {
      ...school,
      branches: mockBranches.filter(b => b.schoolId === id),
      users: mockUsers.filter(u => u.schoolId === id),
      plan: mockPlans.find(p => p.id === school.planId),
    };
    
    return mockSuccess(schoolData);
  } catch (error) {
    return mockError('Failed to fetch school details');
  }
};

const createSchool = async (data) => {
  try {
    // Validate required fields
    if (!data.name || !data.location) {
      return mockError('Name and location are required', 400);
    }
    
    const newSchool = {
      id: `s${mockSchools.length + 1}`,
      name: data.name,
      location: data.location,
      branches: 0,
      students: 0,
      status: data.status || 'pending',
      createdAt: new Date().toISOString(),
      contactEmail: data.email || '',
      contactPhone: data.phone || '',
      contactPerson: data.contactPerson || '',
      website: data.website || '',
      notes: data.notes || '',
      planId: data.planId || 'p1',
    };
    
    mockSchools.push(newSchool);
    
    return mockSuccess(newSchool);
  } catch (error) {
    console.error("Error in createSchool:", error);
    return mockError('Failed to create school');
  }
};

const updateSchool = async (id, data) => {
  try {
    const index = mockSchools.findIndex(s => s.id === id);
    
    if (index === -1) {
      return mockError('School not found', 404);
    }
    
    // Update school data while preserving fields that weren't changed
    const updatedSchool = {
      ...mockSchools[index],
      name: data.name || mockSchools[index].name,
      location: data.location || mockSchools[index].location,
      status: data.status || mockSchools[index].status,
      contactEmail: data.email || mockSchools[index].contactEmail,
      contactPhone: data.phone || mockSchools[index].contactPhone,
      contactPerson: data.contactPerson || mockSchools[index].contactPerson,
      website: data.website || mockSchools[index].website,
      notes: data.notes || mockSchools[index].notes,
    };
    
    mockSchools[index] = updatedSchool;
    
    return mockSuccess(updatedSchool);
  } catch (error) {
    console.error("Error in updateSchool:", error);
    return mockError('Failed to update school');
  }
};

const deleteSchool = async (id) => {
  try {
    const index = mockSchools.findIndex(s => s.id === id);
    
    if (index === -1) {
      return mockError('School not found', 404);
    }
    
    // Check if school has branches
    const hasBranches = mockBranches.some(b => b.schoolId === id);
    
    if (hasBranches) {
      return mockError('Cannot delete school with existing branches', 400);
    }
    
    // Remove school
    mockSchools.splice(index, 1);
    
    return mockSuccess({ success: true });
  } catch (error) {
    return mockError('Failed to delete school');
  }
};

// Branches API
const getBranches = async (params = {}) => {
  try {
    let filteredBranches = [...mockBranches];
    
    // Filter by school ID if provided
    if (params.schoolId) {
      filteredBranches = filteredBranches.filter(branch => branch.schoolId === params.schoolId);
    }
    
    // Apply search filter
    if (params.searchTerm) {
      filteredBranches = filterBySearchTerm(
        filteredBranches, 
        params.searchTerm, 
        ['name', 'location']
      );
    }
    
    // Filter by status
    if (params.status && params.status !== 'all') {
      filteredBranches = filteredBranches.filter(branch => branch.status === params.status);
    }
    
    // Apply sorting
    if (params.sortField) {
      filteredBranches = sortItems(filteredBranches, params.sortField, params.sortDirection || 'asc');
    }
    
    // Enhance branches with school name
    const branchesWithSchool = filteredBranches.map(branch => {
      const school = mockSchools.find(s => s.id === branch.schoolId);
      return {
        ...branch,
        schoolName: school ? school.name : 'Unknown School',
      };
    });
    
    // Apply pagination
    const result = paginateItems(
      branchesWithSchool, 
      params.page || 1, 
      params.limit || 10
    );
    
    return mockSuccess(result);
  } catch (error) {
    return mockError('Failed to fetch branches');
  }
};

const getBranchById = async (id) => {
  try {
    const branch = mockBranches.find(b => b.id === id);
    
    if (!branch) {
      return mockError('Branch not found', 404);
    }
    
    // Enhance branch with school info
    const school = mockSchools.find(s => s.id === branch.schoolId);
    
    const branchData = {
      ...branch,
      schoolName: school ? school.name : 'Unknown School',
      users: mockUsers.filter(u => u.branchId === id),
    };
    
    return mockSuccess(branchData);
  } catch (error) {
    return mockError('Failed to fetch branch details');
  }
};

const createBranch = async (data) => {
  try {
    // Validate required fields
    if (!data.name || !data.schoolId || !data.location) {
      return mockError('Name, school ID, and location are required', 400);
    }
    
    // Verify school exists
    const school = mockSchools.find(s => s.id === data.schoolId);
    if (!school) {
      return mockError('School not found', 404);
    }
    
    const newBranch = {
      id: `b${mockBranches.length + 1}`,
      name: data.name,
      schoolId: data.schoolId,
      location: data.location,
      students: data.students || 0,
      status: data.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    
    mockBranches.push(newBranch);
    
    // Update school branches count
    const schoolIndex = mockSchools.findIndex(s => s.id === data.schoolId);
    mockSchools[schoolIndex].branches += 1;
    
    return mockSuccess(newBranch);
  } catch (error) {
    return mockError('Failed to create branch');
  }
};

// Export all services
export default {
  // Dashboard
  getDashboardStats,
  
  // Schools
  getSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  
  // Branches
  getBranches,
  getBranchById,
  createBranch,
  
  // Mock data for reference and testing
  mockData: {
    schools: mockSchools,
    branches: mockBranches,
    users: mockUsers,
    plans: mockPlans,
    auditLogs: mockAuditLogs,
    globalSettings: mockGlobalSettings,
    ROLES
  }
}; 