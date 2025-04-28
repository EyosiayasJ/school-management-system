// src/mock/db.js

export const stats = [
  { name: 'Total Students', value: '2,543', change: '+12%', iconColor: 'text-blue-500' },
  { name: 'Total Teachers', value: '157', change: '+4%', iconColor: 'text-emerald-500' },
  { name: 'Total Branches', value: '12', change: '+2', iconColor: 'text-violet-500' },
  { name: 'Upcoming Events', value: '8', change: 'This week', iconColor: 'text-amber-500' },
];

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
  { id: 12, user: 'Emily Davis', action: 'scheduled a new event', time: '2 days ago' },
];

export const quickLinks = [
  { label: 'Add Student', iconColor: 'text-blue-600' },
  { label: 'Add Teacher', iconColor: 'text-green-600' },
  { label: 'Add Event', iconColor: 'text-amber-600' },
  { label: 'Generate Report', iconColor: 'text-violet-600' },
];

export const branches = [
  { id: 1, name: 'Downtown Branch', location: 'New York', status: 'active', established: 2010, students: 500, teachers: 30 },
  { id: 2, name: 'Uptown Branch', location: 'Los Angeles', status: 'active', established: 2015, students: 400, teachers: 25 },
  { id: 3, name: 'Midtown Branch', location: 'Chicago', status: 'inactive', established: 2018, students: 250, teachers: 15 },
  { id: 4, name: 'Suburb Branch', location: 'Houston', status: 'active', established: 2020, students: 300, teachers: 20 },
  { id: 5, name: 'Midtown Branch', location: 'Chicago', status: 'inactive', established: 2018, students: 250, teachers: 15 },
  { id: 6, name: 'Suburb Branch', location: 'Houston', status: 'active', established: 2020, students: 300, teachers: 20 },
  { id: 7, name: 'Midtown Branch', location: 'Chicago', status: 'inactive', established: 2018, students: 250, teachers: 15 },
  { id: 8, name: 'Suburb Branch', location: 'Houston', status: 'active', established: 2020, students: 300, teachers: 20 },
  { id: 9, name: 'Midtown Branch', location: 'Chicago', status: 'inactive', established: 2018, students: 250, teachers: 15 },
  { id: 10, name: 'Suburb Branch', location: 'Houston', status: 'active', established: 2020, students: 300, teachers: 20 },
  { id: 11, name: 'Midtown Branch', location: 'Chicago', status: 'inactive', established: 2018, students: 250, teachers: 15 },
  { id: 12, name: 'Suburb Branch', location: 'Houston', status: 'active', established: 2020, students: 300, teachers: 20 },
];

export const branchesList = branches.map(b => b.name);

export const students = [
  { id: 1, name: 'John Smith chala', grade: '10th', branch: 'Main Campus', status: 'active', gpa: 3.75, warnings: 0, avatar: '' },
  { id: 2, name: 'Sarah Johnson', grade: '8th', branch: 'East Branch', status: 'active', gpa: 3.60, warnings: 1, avatar: '' },
  { id: 3, name: 'Michael Brown', grade: '12th', branch: 'South Branch', status: 'inactive', gpa: 2.95, warnings: 2, avatar: '' },
  { id: 4, name: 'Emily Davis', grade: '9th', branch: 'Main Campus', status: 'active', gpa: 3.80, warnings: 0, avatar: '' },
  { id: 5, name: 'William Wilson', grade: '7th', branch: 'East Branch', status: 'active', gpa: 3.55, warnings: 1, avatar: '' },
  { id: 6, name: 'Olivia Martinez', grade: '11th', branch: 'South Branch', status: 'inactive', gpa: 2.80, warnings: 2, avatar: '' },
  { id: 7, name: 'James Davis', grade: '9th', branch: 'Main Campus', status: 'active', gpa: 3.80, warnings: 0, avatar: '' },
  { id: 8, name: 'Sophia Johnson', grade: '7th', branch: 'East Branch', status: 'active', gpa: 3.55, warnings: 1, avatar: '' },
  { id: 9, name: 'William Wilson', grade: '11th', branch: 'South Branch', status: 'inactive', gpa: 2.80, warnings: 2, avatar: '' },
  { id: 10, name: 'Emily Davis', grade: '9th', branch: 'Main Campus', status: 'active', gpa: 3.80, warnings: 0, avatar: '' },
  { id: 11, name: 'William Wilson', grade: '7th', branch: 'East Branch', status: 'active', gpa: 3.55, warnings: 1, avatar: '' },
  { id: 12, name: 'Olivia Martinez', grade: '11th', branch: 'South Branch', status: 'inactive', gpa: 2.80, warnings: 2, avatar: '' },
  // …add more as needed
];

export const teachers = [
  { id: 1, name: 'Dr. Robert Anderson mola', subject: 'Mathematics', branch: 'Main Campus', status: 'active', avatar: '' },
  { id: 2, name: 'Prof. Elizabeth Taylor', subject: 'Science', branch: 'North Branch', status: 'active', avatar: '' },
  { id: 3, name: 'Mr. James Wilson', subject: 'History', branch: 'Main Campus', status: 'inactive', avatar: '' },
  { id: 4, name: 'Dr. Robert Anderson mola', subject: 'Mathematics', branch: 'Main Campus', status: 'active', avatar: '' },
  { id: 5, name: 'Prof. Elizabeth Taylor', subject: 'Science', branch: 'North Branch', status: 'active', avatar: '' },
  { id: 6, name: 'Mr. James Wilson', subject: 'History', branch: 'Main Campus', status: 'inactive', avatar: '' },
  // …add more as needed
];

export const events = [
  { id: 1, title: 'End of Year Ceremony', start: '2025-06-15T10:00', end: '2025-06-15T12:00', location: 'Main Auditorium', type: 'ceremony', branch: 'Main Campus' },
  { id: 2, title: 'Parent-Teacher Meeting', start: '2025-06-20T14:00', end: '2025-06-20T16:00', location: 'Conference Room', type: 'meeting', branch: 'Downtown Branch' },
  { id: 3, title: 'Science Fair', start: '2025-06-25T09:00', end: '2025-06-25T15:00', location: 'Science Lab', type: 'fair', branch: 'Uptown Branch' },
  { id: 4, title: 'Sports Day', start: '2025-07-01T08:00', end: '2025-07-01T17:00', location: 'Sports Ground', type: 'sports', branch: 'Main Campus' },
  { id: 5, title: 'Music Competition', start: '2025-07-05T10:00', end: '2025-07-05T14:00', location: 'Music Hall', type: 'competition', branch: 'Suburb Branch' },
  { id: 6, title: 'Staff Training', start: '2025-07-10T09:00', end: '2025-07-10T16:00', location: 'Training Room', type: 'training', branch: 'Midtown Branch' },
  { id: 7, title: 'School Picnic', start: '2025-07-15T08:00', end: '2025-07-15T18:00', location: 'Central Park', type: 'picnic', branch: 'All Branches' },
  { id: 8, title: 'Graduation Day', start: '2025-07-20T10:00', end: '2025-07-20T14:00', location: 'Main Auditorium', type: 'ceremony', branch: 'Main Campus' },
  { id: 9, title: 'MOAC Orientation', start: '2023-07-01T09:00', end: '2023-07-01T12:00', location: 'Main Auditorium', type: 'orientation', branch: 'Main Campus' },
  { id: 10, title: 'MOAC Workshop', start: '2023-07-03T10:00', end: '2023-07-03T15:00', location: 'Computer Lab', type: 'workshop', branch: 'Main Campus' },
  { id: 11, title: 'MOAC Training Session', start: '2023-07-08T09:00', end: '2023-07-08T17:00', location: 'Training Room', type: 'training', branch: 'Main Campus' },
  { id: 12, title: 'MOAC Certification', start: '2023-07-12T10:00', end: '2023-07-12T16:00', location: 'Exam Hall', type: 'certification', branch: 'Main Campus' },
  { id: 13, title: 'MOAC Graduation', start: '2023-07-15T14:00', end: '2023-07-15T18:00', location: 'Main Auditorium', type: 'graduation', branch: 'Main Campus' },
  { id: 14, title: 'MOAC Alumni Meet', start: '2023-07-20T11:00', end: '2023-07-20T15:00', location: 'Conference Hall', type: 'meeting', branch: 'Main Campus' },
  { id: 15, title: 'MOAC Career Fair', start: '2023-07-25T09:00', end: '2023-07-25T17:00', location: 'Exhibition Hall', type: 'fair', branch: 'Main Campus' },
  { id: 16, title: 'MOAC Hackathon', start: '2023-07-28T08:00', end: '2023-07-29T20:00', location: 'Computer Lab', type: 'competition', branch: 'Main Campus' }
];
