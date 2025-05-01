import PropTypes from 'prop-types';
import Card from './Card';

/**
 * StatCard component - Used for displaying key performance indicators or statistics
 * Uses the base Card component with stat-specific styling
 */
const StatCard = ({
  title,
  value,
  previousValue,
  icon,
  variant = 'default',
  to,
  loading = false,
  percentChange = null,
  prefix = '',
  suffix = '',
  compact = false,
  showTrend = true
}) => {
  // Calculate percent change if both current and previous values are provided
  const calculatedPercentChange = percentChange !== null
    ? percentChange
    : previousValue !== undefined && previousValue !== 0 && value !== undefined
      ? ((value - previousValue) / previousValue) * 100
      : null;
  
  // Format percent change with + or - sign
  const formattedChange = calculatedPercentChange !== null 
    ? `${calculatedPercentChange > 0 ? '+' : ''}${calculatedPercentChange.toFixed(1)}%` 
    : null;
  
  // Determine if trend is positive (green), negative (red), or neutral (gray)
  const getTrendColor = () => {
    if (calculatedPercentChange === null) return 'text-gray-500';
    return calculatedPercentChange > 0 ? 'text-green-500' : calculatedPercentChange < 0 ? 'text-red-500' : 'text-gray-500';
  };
  
  // Format the displayed value with optional prefix and suffix
  const formattedValue = `${prefix}${typeof value === 'number' ? value.toLocaleString() : value}${suffix}`;
  
  // Render the stat card footer with trend info if needed
  const renderFooter = () => {
    if (!showTrend || calculatedPercentChange === null) return null;
    
    return (
      <div className="flex items-center">
        <span className={`text-sm font-medium ${getTrendColor()}`}>
          {formattedChange}
        </span>
        {calculatedPercentChange !== 0 && (
          <span className={`material-icons text-sm ml-1 ${getTrendColor()}`}>
            {calculatedPercentChange > 0 ? 'trending_up' : 'trending_down'}
          </span>
        )}
        <span className="text-xs text-gray-500 ml-2">vs previous period</span>
      </div>
    );
  };
  
  return (
    <Card
      title={title}
      value={formattedValue}
      icon={icon}
      variant={variant}
      to={to}
      loading={loading}
      footer={!compact && renderFooter()}
      className={compact ? 'p-2' : ''}
    />
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  previousValue: PropTypes.number,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info', 'outline']),
  to: PropTypes.string,
  loading: PropTypes.bool,
  percentChange: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  compact: PropTypes.bool,
  showTrend: PropTypes.bool
};

export default StatCard;