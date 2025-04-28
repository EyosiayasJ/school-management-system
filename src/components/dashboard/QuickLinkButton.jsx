import { FaUserPlus, FaChalkboardTeacher, FaCalendarPlus, FaFileAlt } from 'react-icons/fa';

const iconMap = {
  'Add Student': FaUserPlus,
  'Add Teacher': FaChalkboardTeacher,
  'Add Event': FaCalendarPlus,
  'Generate Report': FaFileAlt,
};

const QuickLinkButton = ({ label, iconColor = 'text-blue-500', onClick }) => {
  const Icon = iconMap[label];
  return (
    <button
      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
      aria-label={label}
      type="button"
      onClick={onClick}
    >
      {Icon && <Icon className={`mb-2 ${iconColor} text-2xl`} />}
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </button>
  );
};

export default QuickLinkButton;