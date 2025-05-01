/**
 * Message Hooks
 * 
 * Custom React hooks for working with the messaging system.
 * Provides state management and API interactions for message threads and conversations.
 * 
 * Why did the React developer have great fishing skills?
 * They knew how to create the perfect custom hooks! 🎣
 * 
 * @module messageHooks
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  getMessageThreads, 
  getMessageThread, 
  sendMessage, 
  createMessageThread, 
  markMessageAsRead 
} from '../services/messagesApi';

/**
 * Hook for managing message threads and interactions
 * 
 * Provides state and functions for fetching message threads,
 * viewing thread details, sending messages, and creating new threads.
 * 
 * @function useMessages
 * @returns {Object} Message state and functions
 * @returns {Array} returns.threads - List of message threads
 * @returns {Object|null} returns.currentThread - Currently selected thread
 * @returns {boolean} returns.loading - Loading state
 * @returns {string|null} returns.error - Error message if any
 * @returns {Function} returns.fetchThreads - Function to fetch all threads
 * @returns {Function} returns.fetchThread - Function to fetch a specific thread
 * @returns {Function} returns.sendMessage - Function to send a message
 * @returns {Function} returns.createThread - Function to create a new thread
 * @returns {Function} returns.markAsRead - Function to mark a message as read
 * @returns {Function} returns.getUnreadCount - Function to get unread message count
 */
export const useMessages = () => {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Fetch all message threads for the current user
   * 
   * @async
   * @returns {Array} Array of message threads
   */
  const fetchThreads = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMessageThreads();
      setThreads(data);
      return data;
    } catch (err) {
      setError('Failed to fetch message threads');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Fetch a specific thread with its messages
   * 
   * @async
   * @param {string} threadId - ID of the thread to fetch
   * @returns {Object|null} The thread with messages, or null if error
   */
  const fetchThread = useCallback(async (threadId) => {
    if (!threadId) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMessageThread(threadId);
      setCurrentThread(data);
      
      // Update the thread in the threads list to mark as read
      setThreads(prevThreads => 
        prevThreads.map(thread => 
          thread.id === threadId 
            ? { ...thread, unreadCount: 0 } 
            : thread
        )
      );
      
      return data;
    } catch (err) {
      setError('Failed to fetch message thread');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Send a message in the current thread
   * 
   * @async
   * @param {string} threadId - ID of the thread to send to
   * @param {string} text - Message text content
   * @returns {Object|null} The sent message, or null if error
   */
  const sendNewMessage = useCallback(async (threadId, text) => {
    if (!threadId || !text) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const sentMessage = await sendMessage(threadId, text);
      
      // Update current thread with the new message
      setCurrentThread(prevThread => {
        if (prevThread && prevThread.id === threadId) {
          return {
            ...prevThread,
            messages: [...prevThread.messages, sentMessage],
            updatedAt: new Date().toISOString(),
            latestMessage: sentMessage
          };
        }
        return prevThread;
      });
      
      // Update threads list with the latest message
      setThreads(prevThreads => 
        prevThreads.map(thread => 
          thread.id === threadId 
            ? {
                ...thread,
                latestMessage: sentMessage,
                updatedAt: new Date().toISOString()
              } 
            : thread
        )
      );
      
      return sentMessage;
    } catch (err) {
      setError('Failed to send message');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Create a new message thread
   * 
   * @async
   * @param {Array<string>} recipientIds - IDs of thread recipients
   * @param {string} subject - Thread subject line
   * @param {string} initialMessage - First message in the thread
   * @returns {Object|null} The created thread, or null if error
   */
  const createNewThread = useCallback(async (recipientIds, subject, initialMessage) => {
    if (!recipientIds || !recipientIds.length || !subject || !initialMessage) {
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const newThread = await createMessageThread(recipientIds, subject, initialMessage);
      
      // Add the new thread to the threads list
      setThreads(prevThreads => [newThread, ...prevThreads]);
      
      return newThread;
    } catch (err) {
      setError('Failed to create message thread');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Mark a message as read
   * 
   * @async
   * @param {string} messageId - ID of the message to mark as read
   * @returns {boolean} Success status
   */
  const markAsRead = useCallback(async (messageId) => {
    if (!messageId) return false;
    
    try {
      await markMessageAsRead(messageId);
      return true;
    } catch (err) {
      console.error('Error marking message as read:', err);
      return false;
    }
  }, []);
  
  /**
   * Get the total count of unread messages across all threads
   * 
   * @returns {number} Total unread message count
   */
  const getUnreadCount = useCallback(() => {
    return threads.reduce((count, thread) => count + (thread.unreadCount || 0), 0);
  }, [threads]);
  
  return {
    threads,
    currentThread,
    loading,
    error,
    fetchThreads,
    fetchThread,
    sendMessage: sendNewMessage,
    createThread: createNewThread,
    markAsRead,
    getUnreadCount
  };
};

/**
 * Hook for working with a specific message thread
 * 
 * Provides focused state and functions for a single conversation thread.
 * 
 * @function useMessageThread
 * @param {string} threadId - The ID of the thread to fetch
 * @returns {Object} Thread state and functions
 * @returns {Object|null} returns.thread - The message thread
 * @returns {Array} returns.messages - Messages in the thread
 * @returns {boolean} returns.loading - Loading state
 * @returns {string|null} returns.error - Error message if any
 * @returns {Function} returns.sendMessage - Function to send a message in this thread
 * @returns {Function} returns.markAsRead - Function to mark a message as read
 */
export const useMessageThread = (threadId) => {
  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Fetch thread data when threadId changes
   * Loads the thread details and messages
   */
  useEffect(() => {
    if (!threadId) return;
    
    const fetchThreadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getMessageThread(threadId);
        setThread(data);
        setMessages(data.messages || []);
      } catch (err) {
        setError('Failed to fetch message thread');
      } finally {
        setLoading(false);
      }
    };
    
    fetchThreadData();
  }, [threadId]);
  
  /**
   * Send a message in this specific thread
   * 
   * @async
   * @param {string} text - Message text content
   * @returns {Object|null} The sent message, or null if error
   */
  const sendThreadMessage = useCallback(async (text) => {
    if (!threadId || !text) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const sentMessage = await sendMessage(threadId, text);
      
      // Add the sent message to the messages list
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      
      // Update thread with latest message info
      setThread(prevThread => {
        if (prevThread) {
          return {
            ...prevThread,
            updatedAt: new Date().toISOString(),
            latestMessage: sentMessage
          };
        }
        return prevThread;
      });
      
      return sentMessage;
    } catch (err) {
      setError('Failed to send message');
      return null;
    } finally {
      setLoading(false);
    }
  }, [threadId]);
  
  /**
   * Mark a message in this thread as read
   * 
   * @async
   * @param {string} messageId - ID of the message to mark as read
   * @returns {boolean} Success status
   */
  const markMessageRead = useCallback(async (messageId) => {
    if (!messageId) return false;
    
    try {
      await markMessageAsRead(messageId);
      
      // Update the message in the local messages list
      setMessages(prevMessages => 
        prevMessages.map(message => 
          message.id === messageId 
            ? { ...message, read: true } 
            : message
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error marking message as read:', err);
      return false;
    }
  }, []);
  
  return {
    thread,
    messages,
    loading,
    error,
    sendMessage: sendThreadMessage,
    markAsRead: markMessageRead
  };
}; 