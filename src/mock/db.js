/**
 * Mock Database for Development
 * 
 * This module provides centralized mock data for various entities in the school management system
 * to facilitate development and testing without requiring a backend connection.
 * 
 * The data is structured to mimic the real database schemas and includes realistic
 * sample data for students, teachers, branches, health records, events, and other entities
 * needed throughout the application.
 * 
 * @module mock/db
 */

// Health Record Types
export const recordTypes = [
  { id: 1, value: 'vaccination', label: 'Vaccination', description: 'Immunization and vaccination records' },
  { id: 2, value: 'allergy', label: 'Allergy', description: 'Allergy screening and test results' },
  { id: 3, value: 'physical', label: 'Physical Exam', description: 'Yearly physical examination' },
  { id: 4, value: 'medication', label: 'Medication', description: 'Prescribed medications' },
  { id: 5, value: 'incident', label: 'Incident', description: 'Health incidents and accidents' },
  { id: 6, value: 'vision', label: 'Vision Test', description: 'Eye examination and vision assessment' },
  { id: 7, value: 'dental', label: 'Dental Checkup', description: 'Dental examination and procedures' },
  { id: 8, value: 'hearing', label: 'Hearing Test', description: 'Hearing screening and assessment' }
];

// Students data
export const students = [
  { id: 1, name: 'John Smith', grade: '10th', branch: 'Main Campus', status: 'active', gpa: 3.75, warnings: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Sarah Johnson', grade: '8th', branch: 'East Branch', status: 'active', gpa: 3.60, warnings: 1, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Michael Brown', grade: '12th', branch: 'South Branch', status: 'inactive', gpa: 2.95, warnings: 2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Emily Davis', grade: '12th', branch: 'Main Campus', status: 'active', gpa: 3.90, warnings: 0, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'William Taylor', grade: '9th', branch: 'West Branch', status: 'active', gpa: 3.45, warnings: 1, avatar: '' },
  { id: 6, name: 'Emma Wilson', grade: '10th', branch: 'North Branch', status: 'active', gpa: 3.70, warnings: 0, avatar: '' },
  { id: 7, name: 'James Davis', grade: '9th', branch: 'Main Campus', status: 'active', gpa: 3.80, warnings: 0, avatar: '' },
  { id: 8, name: 'Sophia Johnson', grade: '7th', branch: 'East Branch', status: 'active', gpa: 3.55, warnings: 1, avatar: '' },
  { id: 9, name: 'Benjamin Miller', grade: '11th', branch: 'West Branch', status: 'active', gpa: 3.65, warnings: 0, avatar: '' },
  { id: 10, name: 'Isabella Garcia', grade: '8th', branch: 'North Branch', status: 'active', gpa: 3.50, warnings: 0, avatar: '' },
  { id: 11, name: 'Ethan Anderson', grade: '10th', branch: 'Main Campus', status: 'active', gpa: 3.25, warnings: 1, avatar: '' },
  { id: 12, name: 'Olivia Martinez', grade: '11th', branch: 'South Branch', status: 'inactive', gpa: 2.80, warnings: 2, avatar: '' }
];

// Teachers data
export const teachers = [
  { id: 1, name: 'Dr. Robert Anderson', subject: 'Mathematics', branch: 'Main Campus', status: 'active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', warnings: 0, suspensionEnds: null },
  { id: 2, name: 'Prof. Elizabeth Taylor', subject: 'Biology', branch: 'North Branch', status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', warnings: 0, suspensionEnds: null },
  { id: 3, name: 'James Wilson', subject: 'History', branch: 'South Branch', status: 'inactive', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', warnings: 1, suspensionEnds: null },
  { id: 4, name: 'Patricia Moore', subject: 'English Literature', branch: 'Main Campus', status: 'active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', warnings: 0, suspensionEnds: null },
  { id: 5, name: 'Dr. Michael Johnson', subject: 'Physics', branch: 'East Branch', status: 'active', avatar: '', warnings: 0, suspensionEnds: null },
  { id: 6, name: 'Mr. James Wilson', subject: 'History', branch: 'Main Campus', status: 'inactive', avatar: '', warnings: 2, suspensionEnds: null }
];

// Branches data
export const branches = [
  { id: 1, name: 'Main Campus', location: 'New York', status: 'active', established: 2010, students: 500, teachers: 30, address: '123 Education St, City' },
  { id: 2, name: 'North Branch', location: 'Los Angeles', status: 'active', established: 2015, students: 400, teachers: 25, address: '456 Learning Ave, North City' },
  { id: 3, name: 'South Branch', location: 'Chicago', status: 'inactive', established: 2018, students: 250, teachers: 15, address: '789 Knowledge Blvd, South City' },
  { id: 4, name: 'East Branch', location: 'Houston', status: 'active', established: 2020, students: 300, teachers: 20, address: '101 Wisdom Lane, East City' },
  { id: 5, name: 'West Branch', location: 'Phoenix', status: 'active', established: 2019, students: 275, teachers: 18, address: '202 Learning Blvd, West City' }
];

// Branch names list for dropdowns
export const branchesList = branches.map(b => b.name);

// Events data
export const events = [
  { id: 1, title: 'Annual Sports Day', start: new Date(2023, 5, 15), end: new Date(2023, 5, 15), branch: 'Main Campus', location: 'School Stadium', allDay: true, type: 'competition' },
  { id: 2, title: 'Parent-Teacher Meeting', start: new Date(2023, 5, 20), end: new Date(2023, 5, 20), branch: 'All Branches', location: 'School Auditorium', allDay: true, type: 'meeting' },
  { id: 3, title: 'Science Exhibition', start: new Date(2023, 6, 5), end: new Date(2023, 6, 7), branch: 'North Branch', location: 'Science Building', allDay: true, type: 'fair' },
  { id: 4, title: 'Cultural Festival', start: new Date(2023, 7, 10), end: new Date(2023, 7, 12), branch: 'Main Campus', location: 'School Grounds', allDay: true, type: 'fair' }
];

// Health records data
export const healthRecords = [
  {
    id: 1,
    studentId: 1,
    studentName: 'John Smith',
    type: 'vaccination',
    date: '2023-05-15',
    notes: 'MMR vaccine, no adverse reaction',
    status: 'complete',
    branch: 'Main Campus',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Sarah Johnson',
    type: 'allergy',
    date: '2023-06-22',
    notes: 'Peanut allergy, carries epipen',
    status: 'pending',
    branch: 'North Branch',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Michael Brown',
    type: 'physical',
    date: '2023-04-10',
    notes: 'Annual physical completed, all normal',
    status: 'complete',
    branch: 'Main Campus',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    studentId: 4,
    studentName: 'Emily Davis',
    type: 'vision',
    date: '2023-07-05',
    notes: 'Vision test, prescribed glasses',
    status: 'pending',
    branch: 'East Branch',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// Dashboard stats
export const stats = [
  { name: 'Total Students', value: '2,543', change: '+12%', iconColor: 'text-blue-500' },
  { name: 'Total Teachers', value: '157', change: '+4%', iconColor: 'text-emerald-500' },
  { name: 'Total Branches', value: '12', change: '+2', iconColor: 'text-violet-500' },
  { name: 'Upcoming Events', value: '8', change: 'This week', iconColor: 'text-amber-500' }
];

// Dashboard activities
export const activities = [
  { id: 1, user: 'John Smith', action: 'added a new student', time: '2 hours ago' },
  { id: 2, user: 'Sarah Johnson', action: 'updated health records', time: '4 hours ago' },
  { id: 3, user: 'Michael Brown', action: 'added 5 new books', time: 'Yesterday' },
  { id: 4, user: 'Emily Davis', action: 'scheduled a new event', time: '2 days ago' },
  { id: 5, user: 'John Smith', action: 'added a new student', time: '2 hours ago' },
  { id: 6, user: 'Sarah Johnson', action: 'updated health records', time: '4 hours ago' },
  { id: 7, user: 'Michael Brown', action: 'added 5 new books', time: 'Yesterday' },
  { id: 8, user: 'Emily Davis', action: 'scheduled a new event', time: '2 days ago' },
  { id: 9, user: 'John Smith', action: 'added a new student', time: '2 hours ago' },
  { id: 10, user: 'Sarah Johnson', action: 'updated health records', time: '4 hours ago' },
  { id: 11, user: 'Michael Brown', action: 'added 5 new books', time: 'Yesterday' },
  { id: 12, user: 'Emily Davis', action: 'scheduled a new event', time: '2 days ago' }
];

// Dashboard quick links
export const quickLinks = [
  { label: 'Add Student', iconColor: 'text-blue-600' },
  { label: 'Add Teacher', iconColor: 'text-green-600' },
  { label: 'Add Event', iconColor: 'text-amber-600' },
  { label: 'Generate Report', iconColor: 'text-violet-600' }
];

// Library Books
export const books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', available: true, branch: 'Main Campus' },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', available: false, branch: 'North Branch' },
  { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', available: true, branch: 'Main Campus' },
  { id: 4, title: 'The Elements of Style', author: 'William Strunk Jr.', category: 'Reference', available: true, branch: 'South Branch' }
];

// E-Library resources data
export const resources = [
  { 
    id: 1, 
    title: 'Advanced Mathematics', 
    author: 'Dr. Robert Anderson', 
    category: 'Textbook', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A comprehensive guide to advanced mathematical concepts including calculus, linear algebra, and differential equations. Suitable for high school seniors and college freshmen.',
    publishedDate: '2022-03-15',
    pages: 412,
    isbn: '978-3-16-148410-0'
  },
  { 
    id: 2, 
    title: 'Introduction to Biology', 
    author: 'Prof. Elizabeth Taylor', 
    category: 'Textbook', 
    format: 'EPUB', 
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'An introductory textbook covering the fundamentals of biology, cell structure, genetics, and ecosystems. Includes interactive diagrams and study questions.',
    publishedDate: '2021-08-22',
    pages: 356,
    isbn: '978-1-4028-9462-6'
  },
  { 
    id: 3, 
    title: 'World History: Modern Era', 
    author: 'James Wilson', 
    category: 'Reference', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1562673005-7693bd6d6e54?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A detailed examination of world history from the Renaissance to the present day, with special focus on cultural developments and international relations.',
    publishedDate: '2020-11-05',
    pages: 528,
    isbn: '978-0-7432-9905-9'
  },
  { 
    id: 4, 
    title: 'English Literature Classics', 
    author: 'Patricia Moore', 
    category: 'Fiction', 
    format: 'EPUB', 
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A curated collection of classic English literature works from Shakespeare to Austen, with critical analysis and historical context for each piece.',
    publishedDate: '2021-04-18',
    pages: 624,
    isbn: '978-0-1404-3958-1'
  },
  { 
    id: 5, 
    title: 'Computer Science Fundamentals', 
    author: 'Dr. Michael Brown', 
    category: 'Textbook', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'An essential guide to computer science principles, covering algorithms, data structures, programming paradigms, and software engineering practices.',
    publishedDate: '2022-01-30',
    pages: 480,
    isbn: '978-0-2016-1622-1'
  },
  { 
    id: 6, 
    title: 'Art Through the Ages', 
    author: 'Jennifer Garcia', 
    category: 'Reference', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A visual journey through art history, from prehistoric cave paintings to contemporary digital art, with analysis of major movements and influential artists.',
    publishedDate: '2020-06-12',
    pages: 512,
    isbn: '978-0-5008-4134-1'
  },
  { 
    id: 7, 
    title: 'Chemistry Lab Manual', 
    author: 'Thomas Wilson', 
    category: 'Textbook', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A practical laboratory manual with detailed instructions for conducting chemistry experiments safely and effectively. Includes data analysis techniques.',
    publishedDate: '2021-12-03',
    pages: 248,
    isbn: '978-1-2920-1709-2'
  },
  { 
    id: 8, 
    title: 'Physics for Beginners', 
    author: 'Sarah Johnson', 
    category: 'Textbook', 
    format: 'EPUB', 
    thumbnail: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'An accessible introduction to physics concepts for high school students, covering mechanics, thermodynamics, waves, and basic electricity with practical examples.',
    publishedDate: '2022-05-18',
    pages: 320,
    isbn: '978-0-3064-5241-7'
  },
  { 
    id: 9, 
    title: 'Environmental Science Today', 
    author: 'Dr. Maria Rodriguez', 
    category: 'Textbook', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A contemporary look at environmental challenges and solutions, with case studies on climate change, biodiversity, and sustainable development practices.',
    publishedDate: '2021-10-05',
    pages: 384,
    isbn: '978-1-9821-3025-6'
  },
  { 
    id: 10, 
    title: 'Digital Marketing Essentials', 
    author: 'Jason Lee', 
    category: 'Reference', 
    format: 'PDF', 
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    description: 'A practical guide to modern digital marketing strategies, covering social media, SEO, content marketing, and analytics for business students.',
    publishedDate: '2022-02-14',
    pages: 296,
    isbn: '978-0-4709-7823-2'
  }
];

// Export everything as a default object as well for convenience
export default {
  stats,
  activities,
  quickLinks,
  branches,
  branchesList,
  students,
  teachers,
  recordTypes,
  healthRecords,
  events,
  books,
  resources
};
