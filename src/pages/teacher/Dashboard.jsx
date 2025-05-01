import { useState } from 'react';
import StatCard from '../../components/common/StatCard';
import ScheduleCalendar from '../../components/teacher/ScheduleCalendar';
import ActionBar from '../../components/common/ActionBar';

// Mock data for development
const MOCK_SCHEDULE = [
  {
    id: 1,
    subject: 'Mathematics',
    grade: '10th Grade',
    room: 'Room 202',
    startTime: '08:30',
    endTime: '09:30',
  },
  {
    id: 2,
    subject: 'Physics',
    grade: '11th Grade',
    room: 'Room 105',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 3,
    subject: 'Computer Science',
    grade: '9th Grade',
    room: 'Computer Lab',
    startTime: '13:00',
    endTime: '14:30',
  }
];

const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: 'Algebra Quiz',
    subject: 'Mathematics',
    dueDate: '2023-06-10',
    grade: '10th Grade',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Lab Report: Forces',
    subject: 'Physics',
    dueDate: '2023-06-12',
    grade: '11th Grade',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Programming Project',
    subject: 'Computer Science',
    dueDate: '2023-06-15',
    grade: '9th Grade',
    status: 'pending',
  }
];

const MOCK_STATS = {
  classesThisWeek: 15,
  assignmentsGraded: 23,
  pendingMessages: 5,
  studentAttendance: 92,
};

const TeacherDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Filter schedule for the selected date
  // In a real application, this would come from an API
  const todaySchedule = MOCK_SCHEDULE;
  
  return (
    <div className="space-y-6">
      <ActionBar
        title="Teacher Dashboard"
        subtitle="Welcome back! Here's an overview of your day"
      />
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Classes This Week"
          value={MOCK_STATS.classesThisWeek}
          icon="calendar"
          trend="up"
          trendValue={2}
        />
        <StatCard
          title="Assignments Graded"
          value={MOCK_STATS.assignmentsGraded}
          icon="clipboard"
          trend="up"
          trendValue={5}
        />
        <StatCard
          title="Pending Messages"
          value={MOCK_STATS.pendingMessages}
          icon="mail"
          trend="down"
          trendValue={2}
        />
        <StatCard
          title="Attendance Rate"
          value={`${MOCK_STATS.studentAttendance}%`}
          icon="users"
          trend="neutral"
          trendValue={0}
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm lg:col-span-2">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          </div>
          <div className="p-6">
            {todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.map((cls) => (
                  <div key={cls.id} className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                    <div className="min-w-[80px] text-center">
                      <div className="text-sm font-semibold text-gray-900">{cls.startTime}</div>
                      <div className="text-xs text-gray-500">to {cls.endTime}</div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-base font-medium text-blue-600">{cls.subject}</div>
                      <div className="text-sm text-gray-600">{cls.grade} • {cls.room}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No classes scheduled for today.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Schedule Calendar Widget */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
          </div>
          <div className="p-4">
            <ScheduleCalendar 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
              events={MOCK_SCHEDULE.map(cls => ({
                date: new Date(),
                title: cls.subject
              }))}
            />
          </div>
        </div>
      </div>
      
      {/* Upcoming Assignments */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="p-6">
          {MOCK_ASSIGNMENTS.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_ASSIGNMENTS.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{assignment.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{assignment.grade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(assignment.dueDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No upcoming assignments.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 