import { createContext, useState, useEffect, useContext } from 'react';
import { termApi } from '../services/domains/term';

// Create context
export const TermContext = createContext();

/**
 * Custom hook to use the Term context
 * @returns {Object} Term context value
 */
export const useTerms = () => useContext(TermContext);

/**
 * Term Provider Component
 * Provides term-related state and functions to the app
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function TermProvider({ children }) {
  const [terms, setTerms] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load terms on mount
  useEffect(() => {
    async function loadTerms() {
      try {
        setLoading(true);
        const response = await termApi.getAll();
        
        if (response.status === 200) {
          setTerms(response.data);
          
          // Set current term to the active one or the first one
          const activeTerm = response.data.find(term => term.isActive) || response.data[0];
          setCurrentTerm(activeTerm || null);
        } else {
          setError('Failed to load terms');
        }
      } catch (err) {
        console.error('Error loading terms:', err);
        setError('Error loading terms');
      } finally {
        setLoading(false);
      }
    }
    
    loadTerms();
  }, []);

  /**
   * Change the current term
   * 
   * @param {string} termId - Term ID to set as current
   */
  const changeCurrentTerm = termId => {
    const term = terms.find(t => t.id === termId);
    if (term) {
      setCurrentTerm(term);
    }
  };

  /**
   * Create a new term
   * 
   * @param {Object} termData - New term data
   * @returns {Promise<Object>} Created term
   */
  const createTerm = async (termData) => {
    try {
      const response = await termApi.create(termData);
      
      if (response.status === 200) {
        setTerms(prev => [...prev, response.data]);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create term');
      }
    } catch (err) {
      console.error('Error creating term:', err);
      throw err;
    }
  };

  /**
   * Update a term
   * 
   * @param {string} id - Term ID
   * @param {Object} termData - Updated term data
   * @returns {Promise<Object>} Updated term
   */
  const updateTerm = async (id, termData) => {
    try {
      const response = await termApi.update(id, termData);
      
      if (response.status === 200) {
        setTerms(prev => prev.map(term => 
          term.id === id ? response.data : term
        ));
        
        // Update current term if it's the one being updated
        if (currentTerm && currentTerm.id === id) {
          setCurrentTerm(response.data);
        }
        
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update term');
      }
    } catch (err) {
      console.error('Error updating term:', err);
      throw err;
    }
  };
  
  /**
   * Set a term as active
   * 
   * @param {string} id - Term ID to set as active
   * @returns {Promise<Object>} Updated term
   */
  const setActiveTerm = async (id) => {
    try {
      // First deactivate the current active term if exists
      if (currentTerm && currentTerm.isActive) {
        await termApi.update(currentTerm.id, { isActive: false });
      }
      
      // Then activate the new term
      const response = await termApi.update(id, { isActive: true });
      
      if (response.status === 200) {
        // Update terms list
        setTerms(prev => prev.map(term => ({
          ...term,
          isActive: term.id === id
        })));
        
        // Set as current term
        const activatedTerm = terms.find(t => t.id === id);
        if (activatedTerm) {
          setCurrentTerm({...activatedTerm, isActive: true});
        }
        
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to set active term');
      }
    } catch (err) {
      console.error('Error setting active term:', err);
      throw err;
    }
  };

  // Context value
  const contextValue = {
    terms,
    currentTerm,
    loading,
    error,
    createTerm,
    updateTerm,
    changeCurrentTerm,
    setActiveTerm
  };

  return (
    <TermContext.Provider value={contextValue}>
      {children}
    </TermContext.Provider>
  );
} 