import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaRegStar } from 'react-icons/fa';
import behaviorApi from '../../services/domains/behavior';

/**
 * BehaviorRatingForm Component
 * Allows teachers to rate student behavior with scores and comments
 */
const BehaviorRatingForm = ({ 
  termId, 
  studentId, 
  classId,
  teacherId, 
  initialScore = 5, 
  initialComments = '', 
  onSaved, 
  onCancel 
}) => {
  const [score, setScore] = useState(initialScore);
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle saving the behavior rating
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!termId || !studentId || !classId || !teacherId) {
      setError('Missing required information. Please try again.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create behavior rating
      const response = await behaviorApi.create({
        termId,
        studentId,
        classId,
        teacherId,
        score,
        comments
      });
      
      if (response.status === 200) {
        // Call callback if provided
        if (onSaved) {
          onSaved(response.data);
        }
      } else {
        setError(response.message || 'Failed to save behavior rating');
      }
    } catch (err) {
      console.error('Error saving behavior rating:', err);
      setError('An error occurred while saving the rating');
    } finally {
      setLoading(false);
    }
  };

  // Handle score selection
  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  // Render star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleScoreChange(i)}
          className={`text-xl focus:outline-none ${
            i <= score ? 'text-yellow-500' : 'text-gray-300'
          }`}
          aria-label={`Rate ${i} out of 10`}
        >
          {i <= score ? <FaStar /> : <FaRegStar />}
        </button>
      );
    }
    return stars;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Behavior Score (1-10)
        </label>
        <div className="flex gap-1">
          {renderStars()}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {score <= 3 ? 'Needs significant improvement' : 
           score <= 6 ? 'Average behavior' : 
           score <= 8 ? 'Good behavior' : 'Excellent behavior'}
        </div>
      </div>
      
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
          Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Optional comments about student behavior..."
        />
      </div>
      
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Rating'}
        </button>
      </div>
    </form>
  );
};

BehaviorRatingForm.propTypes = {
  termId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  teacherId: PropTypes.string.isRequired,
  initialScore: PropTypes.number,
  initialComments: PropTypes.string,
  onSaved: PropTypes.func,
  onCancel: PropTypes.func
};

export default BehaviorRatingForm; 