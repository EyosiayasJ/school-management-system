import PropTypes from 'prop-types';

/**
 * ActionBar component for page headers with title and actions
 * Used across different sections for consistent UI
 */
const ActionBar = ({
  title,
  subtitle,
  primaryAction,
  secondaryActions = [],
  backAction,
}) => {
  return (
    <div className="bg-white py-4 px-4 md:px-6 shadow-sm rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Left side: Title and subtitle */}
      <div className="flex-1">
        <div className="flex items-center">
          {backAction && (
            <button
              onClick={backAction.onClick}
              className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500"
              title={backAction.label || 'Back'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {/* Right side: Action buttons */}
      <div className="flex space-x-2 w-full sm:w-auto">
        {secondaryActions.map((action, index) => (
          <button
            key={`secondary-action-${index}`}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`px-4 py-2 rounded-md border text-sm font-medium 
              ${
                action.variant === 'danger'
                  ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {action.icon && (
              <span className="mr-2">{action.icon}</span>
            )}
            {action.label}
          </button>
        ))}

        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 
              disabled:bg-blue-300 disabled:cursor-not-allowed text-sm font-medium inline-flex items-center"
          >
            {primaryAction.icon && (
              <span className="mr-2">{primaryAction.icon}</span>
            )}
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

ActionBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  primaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
  }),
  secondaryActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      variant: PropTypes.oneOf(['default', 'danger']),
      icon: PropTypes.node,
    })
  ),
  backAction: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
  }),
};

export default ActionBar;