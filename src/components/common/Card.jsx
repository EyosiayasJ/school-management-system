import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * A versatile Card component that can be used for stats, school cards, quick actions, etc.
 */
const Card = ({
  title,
  subtitle,
  value,
  icon,
  children,
  to,
  onClick,
  variant = 'default',
  className = '',
  footer,
  loading = false
}) => {
  // Determine card background based on variant
  const getCardClasses = () => {
    const baseClasses = "rounded-xl shadow-sm overflow-hidden transition-all";
    
    switch(variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white ${className}`;
      case 'success':
        return `${baseClasses} bg-green-600 text-white ${className}`;
      case 'warning':
        return `${baseClasses} bg-yellow-500 text-white ${className}`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white ${className}`;
      case 'info':
        return `${baseClasses} bg-indigo-600 text-white ${className}`;
      case 'outline':
        return `${baseClasses} bg-white border border-gray-200 hover:border-blue-300 ${className}`;
      default:
        return `${baseClasses} bg-white ${className}`;
    }
  };

  // Determine if the card is interactive
  const isInteractive = to || onClick;
  const interactiveClasses = isInteractive ? 'cursor-pointer hover:shadow-md' : '';
  
  // Card content
  const cardContent = (
    <>
      <div className="p-5">
        {/* Header with icon and title */}
        {(title || icon) && (
          <div className="flex items-center justify-between mb-3">
            {title && (
              <div>
                <h3 className={`font-semibold ${variant === 'default' || variant === 'outline' ? 'text-gray-900' : 'text-white'}`}>
                  {title}
                </h3>
                {subtitle && (
                  <p className={`text-sm ${variant === 'default' || variant === 'outline' ? 'text-gray-500' : 'text-white/80'}`}>
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {icon && <div className="flex-shrink-0">{icon}</div>}
          </div>
        )}
        
        {/* Card value (for stat cards) */}
        {value && (
          <div className={`text-2xl font-bold mb-2 ${variant === 'default' || variant === 'outline' ? 'text-gray-800' : 'text-white'}`}>
            {value}
          </div>
        )}
        
        {/* Card content (children) */}
        {!loading && children}
        
        {/* Loading state */}
        {loading && (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        )}
      </div>
      
      {/* Optional footer */}
      {footer && (
        <div className={`px-5 py-3 border-t ${variant === 'default' || variant === 'outline' ? 'border-gray-100 bg-gray-50' : 'border-white/10 bg-black/10'}`}>
          {footer}
        </div>
      )}
    </>
  );

  // Render card with appropriate wrapper (Link, button, or div)
  if (to) {
    return (
      <Link to={to} className={`block ${getCardClasses()} ${interactiveClasses}`}>
        {cardContent}
      </Link>
    );
  } else if (onClick) {
    return (
      <button onClick={onClick} className={`block w-full text-left ${getCardClasses()} ${interactiveClasses}`}>
        {cardContent}
      </button>
    );
  } else {
    return (
      <div className={getCardClasses()}>
        {cardContent}
      </div>
    );
  }
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info', 'outline']),
  className: PropTypes.string,
  footer: PropTypes.node,
  loading: PropTypes.bool
};

export default Card; 