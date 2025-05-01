/**
 * Messages API Service
 * 
 * Provides functions to interact with the messages API endpoints
 * for fetching, sending, and managing messages and message threads.
 * 
 * Why did the API call need glasses?
 * Because it couldn't C# without them! 👓
 * 
 * @module messagesApi
 */

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../config/api.config';

/**
 * Messages API endpoint paths
 * 
 * @constant
 * @type {Object}
 */
const MESSAGES_API = {
  GET_THREADS: `${API_BASE_URL}/messages/threads`,
  GET_THREAD: (threadId) => `${API_BASE_URL}/messages/threads/${threadId}`,
  SEND_MESSAGE: `${API_BASE_URL}/messages/send`,
  CREATE_THREAD: `${API_BASE_URL}/messages/threads/create`,
  MARK_AS_READ: (messageId) => `${API_BASE_URL}/messages/${messageId}/read`,
};

/**
 * Get all message threads for the current user
 * 
 * Fetches the list of message threads (conversations) that the current
 * user is participating in, sorted by most recent activity.
 * 
 * @async
 * @function getMessageThreads
 * @returns {Promise<Array>} Array of message threads
 * @throws {Error} If the request fails
 */
export const getMessageThreads = async () => {
  try {
    const response = await axios.get(MESSAGES_API.GET_THREADS);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch message threads');
    console.error('Error fetching message threads:', error);
    throw error;
  }
};

/**
 * Get a specific message thread with all messages
 * 
 * Fetches a specific message thread by ID including all messages
 * in the thread and participant information.
 * 
 * @async
 * @function getMessageThread
 * @param {string} threadId - The ID of the thread to fetch
 * @returns {Promise<Object>} The thread with messages
 * @throws {Error} If the request fails
 */
export const getMessageThread = async (threadId) => {
  try {
    const response = await axios.get(MESSAGES_API.GET_THREAD(threadId));
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch message thread');
    console.error('Error fetching message thread:', error);
    throw error;
  }
};

/**
 * Send a new message in an existing thread
 * 
 * Posts a new message to an existing conversation thread.
 * 
 * @async
 * @function sendMessage
 * @param {string} threadId - The ID of the thread
 * @param {string} text - The message text
 * @returns {Promise<Object>} The sent message
 * @throws {Error} If the request fails
 */
export const sendMessage = async (threadId, text) => {
  try {
    const response = await axios.post(MESSAGES_API.SEND_MESSAGE, {
      threadId,
      text,
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to send message');
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Create a new message thread
 * 
 * Initiates a new conversation thread with specified recipients
 * and an initial message.
 * 
 * @async
 * @function createMessageThread
 * @param {Array<string>} recipientIds - Array of recipient user IDs
 * @param {string} subject - The thread subject
 * @param {string} initialMessage - The first message in the thread
 * @returns {Promise<Object>} The new thread
 * @throws {Error} If the request fails
 */
export const createMessageThread = async (recipientIds, subject, initialMessage) => {
  try {
    const response = await axios.post(MESSAGES_API.CREATE_THREAD, {
      recipientIds,
      subject,
      initialMessage,
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to create message thread');
    console.error('Error creating message thread:', error);
    throw error;
  }
};

/**
 * Mark a message as read
 * 
 * Updates a message's status to "read" when a user views it.
 * This is typically called automatically when a message is displayed.
 * 
 * @async
 * @function markMessageAsRead
 * @param {string} messageId - The ID of the message to mark as read
 * @returns {Promise<Object>} Result of the operation
 * @throws {Error} If the request fails
 */
export const markMessageAsRead = async (messageId) => {
  try {
    const response = await axios.put(MESSAGES_API.MARK_AS_READ(messageId));
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    // No toast here since this is a background operation
    throw error;
  }
};

/**
 * All message API functions as a default export
 */
export default {
  getMessageThreads,
  getMessageThread,
  sendMessage,
  createMessageThread,
  markMessageAsRead,
}; 