import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs component - A reusable component for tabbed navigation
 * Handles tab switching, active tab styling, and renders tab content
 */
const Tabs = ({
  tabs,
  defaultActiveTab = 0,
  onChange,
  variant = 'default',
  className = '',
  tabClassName = '',
  contentClassName = '',
}) => {
  // Track active tab index
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  
  // Handle tab click
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };
  
  // Determine tab styles based on variant
  const getTabStyles = (isActive) => {
    const baseClasses = `py-3 px-4 font-medium text-sm focus:outline-none transition-colors ${tabClassName}`;
    
    switch(variant) {
      case 'pills':
        return isActive 
          ? `${baseClasses} bg-blue-600 text-white rounded-lg`
          : `${baseClasses} text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg`;
        
      case 'underline':
        return isActive 
          ? `${baseClasses} text-blue-600 border-b-2 border-blue-600`
          : `${baseClasses} text-gray-600 hover:text-gray-900 border-b-2 border-transparent`;
          
      case 'contained':
        return isActive 
          ? `${baseClasses} bg-white text-blue-600 rounded-t-lg border-t border-l border-r border-gray-200`
          : `${baseClasses} text-gray-600 hover:text-gray-900 bg-gray-100 rounded-t-lg border border-transparent`;
          
      default: // Default tabs style
        return isActive 
          ? `${baseClasses} text-blue-600 border-b-2 border-blue-600`
          : `${baseClasses} text-gray-600 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent`;
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className={`flex border-b border-gray-200 ${variant === 'contained' ? 'mb-0' : 'mb-4'}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={getTabStyles(index === activeTab)}
            role="tab"
            aria-selected={index === activeTab}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            <div className="flex items-center">
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
              {tab.badge && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div 
        role="tabpanel" 
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className={`${contentClassName} ${variant === 'contained' ? 'border border-t-0 border-gray-200 rounded-b-lg p-4 bg-white' : ''}`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  defaultActiveTab: PropTypes.number,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'pills', 'underline', 'contained']),
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default Tabs; 