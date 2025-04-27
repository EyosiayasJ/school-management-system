const ActivityItem = ({ user, action, time }) => (
    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
        {user.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{user} <span className="text-gray-500">{action}</span></p>
        <p className="text-sm text-gray-400">{time}</p>
      </div>
    </div>
  );
  
  export default ActivityItem;
  