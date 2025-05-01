import { mockSuccess, mockError, filterBySearchTerm, paginateItems, sortItems } from './helpers';
import superAdminApi from './superAdminApi';

/**
 * Mock Support Admin API service
 * Provides simulated backend functionality for development and testing
 * Note: This service shares some data with superAdminApi but has its own endpoints
 * focused on support admin functionality
 */

// ---------- REUSE DATA FROM SUPER ADMIN API ----------
const { mockData } = superAdminApi;

// Schools with pending status that need support attention
const pendingSchools = mockData.schools.filter(s => s.status === 'pending');

// Support tickets
const mockSupportTickets = [
  {
    id: 't1',
    schoolId: 's1',
    schoolName: 'Evergreen Academy',
    subject: 'Need help with student enrollment',
    description: 'We are trying to bulk import student records but getting errors.',
    status: 'open',
    priority: 'medium',
    assignedTo: 'u2',
    createdBy: 'u3',
    createdAt: '2023-05-10T09:15:00Z',
    updatedAt: '2023-05-10T09:15:00Z',
    category: 'technical',
  },
  {
    id: 't2',
    schoolId: 's3',
    schoolName: 'Oakridge Preparatory',
    subject: 'Onboarding assistance needed',
    description: 'We need help setting up our initial configuration and branches.',
    status: 'open',
    priority: 'high',
    assignedTo: 'u2',
    createdBy: 'u7',
    createdAt: '2023-05-06T16:30:00Z',
    updatedAt: '2023-05-07T10:20:00Z',
    category: 'onboarding',
  },
  {
    id: 't3',
    schoolId: 's2',
    schoolName: 'Horizon International School',
    subject: 'Billing discrepancy on recent invoice',
    description: 'Our recent invoice shows charges for features we are not using.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'u2',
    createdBy: 'u4',
    createdAt: '2023-05-03T14:45:00Z',
    updatedAt: '2023-05-05T11:10:00Z',
    category: 'billing',
  },
  {
    id: 't4',
    schoolId: 's4',
    schoolName: 'Sierra Heights Academy',
    subject: 'Request for API documentation',
    description: 'We are planning to build integrations with your platform. Please provide API documentation.',
    status: 'resolved',
    priority: 'low',
    assignedTo: 'u2',
    createdBy: 'u3',
    createdAt: '2023-04-28T10:00:00Z',
    updatedAt: '2023-05-01T15:30:00Z',
    category: 'technical',
    resolution: 'Provided API documentation and developer sandbox access.',
  },
  {
    id: 't5',
    schoolId: 's5',
    schoolName: 'Westlake Charter',
    subject: 'Account restoration request',
    description: 'Our account was suspended. We have addressed the issues and request restoration.',
    status: 'open',
    priority: 'urgent',
    assignedTo: 'u2',
    createdBy: 'u4',
    createdAt: '2023-03-19T09:30:00Z',
    updatedAt: '2023-03-19T09:30:00Z',
    category: 'account',
  }
];

// Onboarding tasks template for new schools
const onboardingTasksTemplate = [
  {
    title: 'Basic School Setup',
    tasks: [
      { id: 'task1', title: 'Complete school profile', description: 'Add school logo, contact details, and description' },
      { id: 'task2', title: 'Set up branches', description: 'Add all physical locations of your school' },
      { id: 'task3', title: 'Configure school calendar', description: 'Set academic year, terms, and holidays' }
    ]
  },
  {
    title: 'User Management',
    tasks: [
      { id: 'task4', title: 'Create admin accounts', description: 'Set up accounts for school administrators' },
      { id: 'task5', title: 'Import teacher data', description: 'Bulk import or manually add teacher records' },
      { id: 'task6', title: 'Set up roles and permissions', description: 'Configure access controls for different user types' }
    ]
  },
  {
    title: 'Academic Setup',
    tasks: [
      { id: 'task7', title: 'Create classes/courses', description: 'Set up your academic structure' },
      { id: 'task8', title: 'Configure grading system', description: 'Define grading scales and assessment types' },
      { id: 'task9', title: 'Import student data', description: 'Bulk import or manually add student records' }
    ]
  },
  {
    title: 'System Integration',
    tasks: [
      { id: 'task10', title: 'Email configuration', description: 'Set up email notifications and templates' },
      { id: 'task11', title: 'API integration (if applicable)', description: 'Connect with other systems your school uses' },
      { id: 'task12', title: 'Complete training', description: 'Ensure key staff complete basic training' }
    ]
  }
];

// School onboarding progress
const mockOnboardingProgress = [
  {
    schoolId: 's1',
    progress: 100, // percentage complete
    completedTasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10', 'task11', 'task12'],
    currentStep: 'completed',
    startedAt: '2023-01-15T08:30:00Z',
    completedAt: '2023-01-25T16:45:00Z'
  },
  {
    schoolId: 's2',
    progress: 100,
    completedTasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10', 'task11', 'task12'],
    currentStep: 'completed',
    startedAt: '2023-02-10T10:15:00Z',
    completedAt: '2023-02-20T14:30:00Z'
  },
  {
    schoolId: 's3',
    progress: 25,
    completedTasks: ['task1', 'task2', 'task4'],
    currentStep: 'task5',
    startedAt: '2023-05-05T14:45:00Z',
    completedAt: null
  },
  {
    schoolId: 's4',
    progress: 100,
    completedTasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10', 'task11', 'task12'],
    currentStep: 'completed',
    startedAt: '2022-11-20T09:00:00Z',
    completedAt: '2022-12-05T17:15:00Z'
  },
  {
    schoolId: 's5',
    progress: 75,
    completedTasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9'],
    currentStep: 'task10',
    startedAt: '2023-03-18T11:30:00Z',
    completedAt: null
  }
];

// ---------- API ENDPOINTS ----------

// Support Dashboard data
const getSupportDashboardStats = async () => {
  try {
    const stats = {
      pendingSchools: pendingSchools.length,
      openTickets: mockSupportTickets.filter(t => t.status === 'open').length,
      inProgressTickets: mockSupportTickets.filter(t => t.status === 'in-progress').length,
      resolvedTicketsThisWeek: 1, // Simplified for mock data
      
      // Breakdown by category
      ticketsByCategory: [
        { category: 'technical', count: mockSupportTickets.filter(t => t.category === 'technical').length },
        { category: 'billing', count: mockSupportTickets.filter(t => t.category === 'billing').length },
        { category: 'onboarding', count: mockSupportTickets.filter(t => t.category === 'onboarding').length },
        { category: 'account', count: mockSupportTickets.filter(t => t.category === 'account').length },
      ],
      
      // Recent tickets
      recentTickets: mockSupportTickets
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5),
        
      // Schools needing attention (pending or with urgent tickets)
      schoolsNeedingAttention: [
        ...pendingSchools,
        ...mockData.schools.filter(s => 
          mockSupportTickets.some(t => 
            t.schoolId === s.id && t.status === 'open' && t.priority === 'urgent'
          )
        )
      ].slice(0, 5),
      
      // Onboarding progress
      onboardingProgress: mockOnboardingProgress
        .filter(p => p.progress < 100)
        .map(p => {
          const school = mockData.schools.find(s => s.id === p.schoolId);
          return {
            ...p,
            schoolName: school ? school.name : 'Unknown School'
          };
        })
    };
    
    return mockSuccess(stats);
  } catch (error) {
    return mockError('Failed to fetch support dashboard data');
  }
};

// Support Tickets API
const getSupportTickets = async (params = {}) => {
  try {
    let filteredTickets = [...mockSupportTickets];
    
    // Apply filters
    if (params.status && params.status !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === params.status);
    }
    
    if (params.priority && params.priority !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.priority === params.priority);
    }
    
    if (params.category && params.category !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.category === params.category);
    }
    
    if (params.schoolId) {
      filteredTickets = filteredTickets.filter(ticket => ticket.schoolId === params.schoolId);
    }
    
    // Apply search
    if (params.searchTerm) {
      filteredTickets = filterBySearchTerm(
        filteredTickets,
        params.searchTerm,
        ['subject', 'description', 'schoolName']
      );
    }
    
    // Apply sorting
    if (params.sortField) {
      filteredTickets = sortItems(filteredTickets, params.sortField, params.sortDirection || 'desc');
    } else {
      // Default sort by updatedAt descending
      filteredTickets = sortItems(filteredTickets, 'updatedAt', 'desc');
    }
    
    // Apply pagination
    const result = paginateItems(
      filteredTickets,
      params.page || 1,
      params.limit || 10
    );
    
    return mockSuccess(result);
  } catch (error) {
    return mockError('Failed to fetch support tickets');
  }
};

const getTicketById = async (id) => {
  try {
    const ticket = mockSupportTickets.find(t => t.id === id);
    
    if (!ticket) {
      return mockError('Ticket not found', 404);
    }
    
    // Get associated school data
    const school = mockData.schools.find(s => s.id === ticket.schoolId);
    
    // Get support agent data
    const agent = mockData.users.find(u => u.id === ticket.assignedTo);
    
    // Combine data
    const ticketData = {
      ...ticket,
      school,
      agent: agent ? {
        id: agent.id,
        name: agent.name,
        email: agent.email,
      } : null,
    };
    
    return mockSuccess(ticketData);
  } catch (error) {
    return mockError('Failed to fetch ticket details');
  }
};

const createTicket = async (data) => {
  try {
    // Validate required fields
    if (!data.schoolId || !data.subject || !data.description || !data.category) {
      return mockError('School ID, subject, description, and category are required', 400);
    }
    
    // Verify school exists
    const school = mockData.schools.find(s => s.id === data.schoolId);
    if (!school) {
      return mockError('School not found', 404);
    }
    
    const newTicket = {
      id: `t${mockSupportTickets.length + 1}`,
      schoolId: data.schoolId,
      schoolName: school.name,
      subject: data.subject,
      description: data.description,
      status: 'open',
      priority: data.priority || 'medium',
      assignedTo: data.assignedTo || 'u2', // Default to Sarah Support
      createdBy: data.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: data.category,
    };
    
    mockSupportTickets.push(newTicket);
    
    return mockSuccess(newTicket);
  } catch (error) {
    return mockError('Failed to create support ticket');
  }
};

const updateTicket = async (id, data) => {
  try {
    const index = mockSupportTickets.findIndex(t => t.id === id);
    
    if (index === -1) {
      return mockError('Ticket not found', 404);
    }
    
    // Update ticket
    const updatedTicket = {
      ...mockSupportTickets[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    mockSupportTickets[index] = updatedTicket;
    
    return mockSuccess(updatedTicket);
  } catch (error) {
    return mockError('Failed to update support ticket');
  }
};

// School Onboarding API
const getOnboardingStatus = async (schoolId) => {
  try {
    const onboarding = mockOnboardingProgress.find(o => o.schoolId === schoolId);
    
    if (!onboarding) {
      return mockError('Onboarding data not found', 404);
    }
    
    const school = mockData.schools.find(s => s.id === schoolId);
    
    // Combine task template with progress data
    const tasksWithProgress = onboardingTasksTemplate.map(section => {
      return {
        ...section,
        tasks: section.tasks.map(task => {
          return {
            ...task,
            completed: onboarding.completedTasks.includes(task.id),
            isCurrent: onboarding.currentStep === task.id,
          };
        })
      };
    });
    
    const result = {
      schoolId,
      schoolName: school ? school.name : 'Unknown School',
      progress: onboarding.progress,
      startedAt: onboarding.startedAt,
      completedAt: onboarding.completedAt,
      currentStep: onboarding.currentStep,
      tasks: tasksWithProgress,
    };
    
    return mockSuccess(result);
  } catch (error) {
    return mockError('Failed to fetch onboarding status');
  }
};

const updateOnboardingTask = async (schoolId, taskId, completed) => {
  try {
    const index = mockOnboardingProgress.findIndex(o => o.schoolId === schoolId);
    
    if (index === -1) {
      return mockError('Onboarding data not found', 404);
    }
    
    const onboarding = { ...mockOnboardingProgress[index] };
    
    // Find next task if completing current task
    if (completed && onboarding.currentStep === taskId) {
      // Flatten all tasks from all sections
      const allTasks = onboardingTasksTemplate
        .flatMap(section => section.tasks)
        .map(task => task.id);
      
      // Find index of current task and get next task
      const currentIndex = allTasks.indexOf(taskId);
      const nextTask = currentIndex < allTasks.length - 1 ? allTasks[currentIndex + 1] : 'completed';
      
      onboarding.currentStep = nextTask;
    }
    
    // Update completed tasks
    if (completed && !onboarding.completedTasks.includes(taskId)) {
      onboarding.completedTasks.push(taskId);
    } else if (!completed && onboarding.completedTasks.includes(taskId)) {
      onboarding.completedTasks = onboarding.completedTasks.filter(id => id !== taskId);
    }
    
    // Recalculate progress
    const totalTasks = onboardingTasksTemplate.flatMap(section => section.tasks).length;
    onboarding.progress = Math.round((onboarding.completedTasks.length / totalTasks) * 100);
    
    // Update completion date if all tasks are done
    if (onboarding.progress === 100 && !onboarding.completedAt) {
      onboarding.completedAt = new Date().toISOString();
    } else if (onboarding.progress < 100) {
      onboarding.completedAt = null;
    }
    
    mockOnboardingProgress[index] = onboarding;
    
    return mockSuccess(onboarding);
  } catch (error) {
    return mockError('Failed to update onboarding task');
  }
};

// School-Specific Settings API
const getSchoolSettings = async (schoolId) => {
  try {
    const school = mockData.schools.find(s => s.id === schoolId);
    
    if (!school) {
      return mockError('School not found', 404);
    }
    
    // Mock school-specific settings
    const settings = {
      schoolId,
      schoolName: school.name,
      generalSettings: {
        schoolYear: '2023-2024',
        defaultLanguage: 'en',
        timeZone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        weekStartsOn: 'monday',
      },
      emailSettings: {
        sendWelcomeEmail: true,
        emailFooter: `© ${new Date().getFullYear()} ${school.name}. All Rights Reserved.`,
        notificationEmailAddress: school.contactEmail,
      },
      accessControls: {
        allowParentAccess: true,
        allowStudentAccess: true,
        allowTeacherRegistration: false,
        requireEmailVerification: true,
      },
      gradingSystem: {
        passingGrade: 60,
        enableGPA: true,
        maxGradeValue: 100,
        gradeScale: [
          { name: 'A', min: 90, max: 100 },
          { name: 'B', min: 80, max: 89 },
          { name: 'C', min: 70, max: 79 },
          { name: 'D', min: 60, max: 69 },
          { name: 'F', min: 0, max: 59 }
        ]
      },
      appearance: {
        primaryColor: '#3B82F6',
        logoUrl: '',
        enableCustomTheme: false,
      }
    };
    
    return mockSuccess(settings);
  } catch (error) {
    return mockError('Failed to fetch school settings');
  }
};

const updateSchoolSettings = async (schoolId, data) => {
  try {
    const school = mockData.schools.find(s => s.id === schoolId);
    
    if (!school) {
      return mockError('School not found', 404);
    }
    
    // In a real implementation, we would save the settings to a database
    // For mock purposes, we'll just return the data that was sent
    const updatedSettings = {
      schoolId,
      schoolName: school.name,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return mockSuccess(updatedSettings);
  } catch (error) {
    return mockError('Failed to update school settings');
  }
};

// Export all services
export default {
  // Dashboard
  getSupportDashboardStats,
  
  // Support Tickets
  getSupportTickets,
  getTicketById,
  createTicket,
  updateTicket,
  
  // School Onboarding
  getOnboardingStatus,
  updateOnboardingTask,
  getOnboardingTasksTemplate: () => mockSuccess(onboardingTasksTemplate),
  
  // School Settings
  getSchoolSettings,
  updateSchoolSettings,
  
  // School data - reusing methods from superAdminApi
  getSchools: superAdminApi.getSchools,
  getSchoolById: superAdminApi.getSchoolById,
  
  // Mock data for reference and testing
  mockData: {
    supportTickets: mockSupportTickets,
    onboardingProgress: mockOnboardingProgress,
    onboardingTasksTemplate,
    pendingSchools,
  }
}; 