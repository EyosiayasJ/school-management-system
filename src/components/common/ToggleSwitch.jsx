import PropTypes from 'prop-types';

/**
 * ToggleSwitch component - A toggle switch for boolean inputs
 * Built with proper accessibility support
 */
const ToggleSwitch = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  onColor = 'blue',
  labelPosition = 'right',
  helpText,
  className = '',
}) => {
  // Handle toggle click
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };
  
  // Determine switch size
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-8 h-4',
          circle: 'h-3 w-3',
          translate: 'translate-x-4',
          labelText: 'text-sm',
        };
      case 'large':
        return {
          container: 'w-14 h-7',
          circle: 'h-6 w-6',
          translate: 'translate-x-7',
          labelText: 'text-base',
        };
      default: // medium
        return {
          container: 'w-11 h-6',
          circle: 'h-5 w-5',
          translate: 'translate-x-5',
          labelText: 'text-sm',
        };
    }
  };
  
  // Determine switch color when on
  const getOnColorClasses = () => {
    switch (onColor) {
      case 'green':
        return 'peer-checked:bg-green-600';
      case 'red':
        return 'peer-checked:bg-red-600';
      case 'purple':
        return 'peer-checked:bg-purple-600';
      case 'indigo':
        return 'peer-checked:bg-indigo-600';
      default: // blue
        return 'peer-checked:bg-blue-600';
    }
  };
  
  const sizeClasses = getSizeClasses();
  const colorClass = getOnColorClasses();
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Show label on left if specified */}
      {label && labelPosition === 'left' && (
        <label 
          htmlFor={id} 
          className={`mr-3 ${sizeClasses.labelText} text-gray-700 ${disabled ? 'text-gray-400' : ''}`}
        >
          {label}
        </label>
      )}
      
      {/* Toggle switch */}
      <div className="relative inline-block">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          aria-checked={checked}
        />
        <div className={`
          ${sizeClasses.container}
          bg-gray-200
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
          rounded-full peer
          ${colorClass}
          peer-disabled:bg-gray-300
          peer-disabled:cursor-not-allowed
          transition-colors
        `}></div>
        <div className={`
          absolute top-[2px] left-[2px]
          ${sizeClasses.circle}
          bg-white
          rounded-full
          transition-all
          peer-checked:${sizeClasses.translate}
          peer-disabled:bg-gray-100
        `}></div>
      </div>
      
      {/* Show label on right (default) if specified */}
      {label && labelPosition === 'right' && (
        <label 
          htmlFor={id} 
          className={`ml-3 ${sizeClasses.labelText} text-gray-700 ${disabled ? 'text-gray-400' : ''}`}
        >
          {label}
        </label>
      )}
      
      {/* Help text */}
      {helpText && (
        <span className="ml-2 text-xs text-gray-500">{helpText}</span>
      )}
    </div>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onColor: PropTypes.oneOf(['blue', 'green', 'red', 'purple', 'indigo']),
  labelPosition: PropTypes.oneOf(['left', 'right']),
  helpText: PropTypes.string,
  className: PropTypes.string,
};

export default ToggleSwitch; 