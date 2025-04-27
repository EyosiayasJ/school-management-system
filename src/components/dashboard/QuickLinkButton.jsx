const QuickLinkButton = ({ label, iconColor }) => (
    <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200">
      <span className={`material-icons ${iconColor} mb-2`}>add_circle_outline</span>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </button>
  );
  
  export default QuickLinkButton;
  