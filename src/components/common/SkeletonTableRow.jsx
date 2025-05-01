import PropTypes from 'prop-types';

function SkeletonTableRow({ colSpan = 4 }) {
  return (
    <tr className="animate-pulse">
      {[...Array(colSpan)].map((_, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
        </td>
      ))}
    </tr>
  );
}

SkeletonTableRow.propTypes = {
  colSpan: PropTypes.number
};

export default SkeletonTableRow;