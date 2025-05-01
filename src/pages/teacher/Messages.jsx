import { useState, useEffect } from 'react';
import ActionBar from '../../components/common/ActionBar';
import { formatDistanceToNow } from 'date-fns';

/**
 * Messages Component
 * 
 * A comprehensive messaging system for teachers to communicate with students,
 * parents, and staff. Features message threads, real-time updates, and search.
 * 
 * Why couldn't the messages get through to the client?
 * Because they were stuck in the "POST" office! 📨
 * 
 * @component
 * @example
 * return (
 *   <Messages />
 * )
 */

// Mock data for development - would be replaced by API calls in production
const MOCK_THREADS = [
  {
    id: 'thread-1',
    participants: [
      { id: 'user-1', name: 'You', role: 'teacher' },
      { id: 'user-2', name: 'John Smith', role: 'parent' }
    ],
    subject: 'Regarding homework assignment',
    latestMessage: {
      id: 'msg-5',
      senderId: 'user-2',
      text: 'Thank you for explaining the homework requirements. My child will submit it by Friday.',
      timestamp: '2023-06-08T10:45:00Z',
      read: false
    },
    unreadCount: 1,
    updatedAt: '2023-06-08T10:45:00Z'
  },
  {
    id: 'thread-2',
    participants: [
      { id: 'user-1', name: 'You', role: 'teacher' },
      { id: 'user-3', name: 'Emily Johnson', role: 'student' }
    ],
    subject: 'Extra credit assignment',
    latestMessage: {
      id: 'msg-10',
      senderId: 'user-1',
      text: 'Yes, you can submit the extra credit assignment by next Monday.',
      timestamp: '2023-06-07T15:30:00Z',
      read: true
    },
    unreadCount: 0,
    updatedAt: '2023-06-07T15:30:00Z'
  },
  {
    id: 'thread-3',
    participants: [
      { id: 'user-1', name: 'You', role: 'teacher' },
      { id: 'user-4', name: 'Michael Brown', role: 'parent' },
      { id: 'user-5', name: 'Principal Roberts', role: 'staff' }
    ],
    subject: 'Student behavior concerns',
    latestMessage: {
      id: 'msg-15',
      senderId: 'user-5',
      text: 'Let\'s schedule a meeting to discuss this further. How about Thursday at 3PM?',
      timestamp: '2023-06-06T09:15:00Z',
      read: true
    },
    unreadCount: 0,
    updatedAt: '2023-06-06T09:15:00Z'
  },
  {
    id: 'thread-4',
    participants: [
      { id: 'user-1', name: 'You', role: 'teacher' },
      { id: 'user-6', name: 'Sarah Wilson', role: 'teacher' }
    ],
    subject: 'Department meeting agenda',
    latestMessage: {
      id: 'msg-22',
      senderId: 'user-6',
      text: 'I\'ve prepared the agenda for next week\'s department meeting. Please review and let me know if you\'d like to add anything.',
      timestamp: '2023-06-05T14:20:00Z',
      read: true
    },
    unreadCount: 0,
    updatedAt: '2023-06-05T14:20:00Z'
  }
];

// Mock messages for specific threads - would come from API in production
const MOCK_MESSAGES = {
  'thread-1': [
    {
      id: 'msg-1',
      senderId: 'user-1',
      text: 'Hello Mr. Smith, I wanted to discuss the recent homework assignment for your child.',
      timestamp: '2023-06-07T14:30:00Z',
      read: true
    },
    {
      id: 'msg-2',
      senderId: 'user-2',
      text: 'Hello, thank you for reaching out. What specific aspect of the homework would you like to discuss?',
      timestamp: '2023-06-07T15:45:00Z',
      read: true
    },
    {
      id: 'msg-3',
      senderId: 'user-1',
      text: 'I noticed that your child did not submit the math assignment that was due yesterday. I wanted to check if there were any difficulties that prevented the submission.',
      timestamp: '2023-06-07T16:20:00Z',
      read: true
    },
    {
      id: 'msg-4',
      senderId: 'user-2',
      text: 'I wasn\'t aware of this. Could you please provide more details about the assignment requirements?',
      timestamp: '2023-06-08T09:10:00Z',
      read: true
    },
    {
      id: 'msg-5',
      senderId: 'user-2',
      text: 'Thank you for explaining the homework requirements. My child will submit it by Friday.',
      timestamp: '2023-06-08T10:45:00Z',
      read: false
    }
  ],
  'thread-2': [
    {
      id: 'msg-6',
      senderId: 'user-3',
      text: 'Ms. Johnson, I was wondering if there are any extra credit opportunities available for the Science class?',
      timestamp: '2023-06-06T11:05:00Z',
      read: true
    },
    {
      id: 'msg-7',
      senderId: 'user-1',
      text: 'Hi Emily, yes there are extra credit assignments available. Would you be interested?',
      timestamp: '2023-06-06T13:45:00Z',
      read: true
    },
    {
      id: 'msg-8',
      senderId: 'user-3',
      text: 'Yes, I would like to improve my grade. What kind of assignment would it be?',
      timestamp: '2023-06-07T09:20:00Z',
      read: true
    },
    {
      id: 'msg-9',
      senderId: 'user-3',
      text: 'Also, when would it be due?',
      timestamp: '2023-06-07T09:22:00Z',
      read: true
    },
    {
      id: 'msg-10',
      senderId: 'user-1',
      text: 'Yes, you can submit the extra credit assignment by next Monday.',
      timestamp: '2023-06-07T15:30:00Z',
      read: true
    }
  ]
};

/**
 * Messages Component 
 * 
 * Provides a complete messaging interface for teachers to communicate with
 * students, parents, and staff members through threaded conversations.
 * 
 * @returns {JSX.Element} The messaging interface component
 */
const Messages = () => {
  // State management for the messaging UI
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Fetch all message threads on component mount
   * In production, this would call the message API service
   */
  useEffect(() => {
    const fetchThreads = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call - would be a real API call in production
      setTimeout(() => {
        try {
          setThreads(MOCK_THREADS);
          setLoading(false);
        } catch (err) {
          setError('Failed to load messages.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchThreads();
  }, []);

  /**
   * Fetch messages for a specific thread when selected
   * Loads the conversation history for the selected thread
   */
  useEffect(() => {
    if (!selectedThreadId) return;
    
    const fetchMessages = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          // Get messages for the selected thread
          const threadMessages = MOCK_MESSAGES[selectedThreadId] || [];
          setMessages(threadMessages);
          
          // Mark thread as read in the threads list
          setThreads(prevThreads => 
            prevThreads.map(thread => 
              thread.id === selectedThreadId 
                ? { ...thread, unreadCount: 0 } 
                : thread
            )
          );
          
          setLoading(false);
        } catch (err) {
          setError('Failed to load messages.');
          setLoading(false);
        }
      }, 500);
    };
    
    fetchMessages();
  }, [selectedThreadId]);

  /**
   * Filter threads based on search term
   * Searches in subject and participant names
   * 
   * @returns {Array} Filtered list of message threads
   */
  const filteredThreads = threads.filter(thread => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search in thread subject
    if (thread.subject.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Search in participant names
    const participantMatch = thread.participants.some(
      participant => participant.name.toLowerCase().includes(searchLower)
    );
    
    return participantMatch;
  });

  /**
   * Format timestamp to relative time (e.g., "5 minutes ago")
   * 
   * @param {string} timestamp - ISO timestamp string
   * @returns {string} Formatted relative time string
   */
  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  /**
   * Handle sending a new message in the current thread
   * 
   * @param {Event} e - Form submit event
   * @returns {void}
   */
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!selectedThreadId || !newMessage.trim()) return;
    
    // Create new message object
    const newMessageObj = {
      id: `msg-${Date.now()}`,
      senderId: 'user-1', // Current user
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: true
    };
    
    // Add message to the current conversation
    setMessages(prev => [...prev, newMessageObj]);
    
    // Update the thread with the latest message
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === selectedThreadId 
          ? {
              ...thread,
              latestMessage: newMessageObj,
              updatedAt: new Date().toISOString()
            } 
          : thread
      )
    );
    
    // Clear the input
    setNewMessage('');
    
    // In a real app, this would send the message to the server
  };

  /**
   * Get names of thread participants excluding the current user
   * 
   * @param {Object} thread - The thread object
   * @returns {string} Comma-separated list of participant names
   */
  const getOtherParticipants = (thread) => {
    const otherParticipants = thread.participants.filter(
      participant => participant.id !== 'user-1'
    );
    
    return otherParticipants.map(p => p.name).join(', ');
  };

  /**
   * Handle starting a new conversation
   * This would open a new conversation modal in a real app
   */
  const handleNewConversation = () => {
    // In a real app, this would open a modal to select recipients and start a new thread
    alert('This would open a new conversation modal in a real application.');
  };

  return (
    <div className="h-full flex flex-col">
      <ActionBar 
        title="Messages" 
        actionButton={{
          label: "New Message",
          onClick: handleNewConversation
        }}
      />
      
      <div className="flex-1 flex overflow-hidden bg-white rounded-lg shadow">
        {/* Threads List */}
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search Box */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Threads List */}
          <div className="flex-1 overflow-y-auto">
            {loading && !selectedThreadId ? (
              <div className="p-4 text-center text-gray-500">Loading messages...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : filteredThreads.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchTerm ? "No messages matching your search" : "No messages yet"}
              </div>
            ) : (
              filteredThreads.map(thread => (
                <div 
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedThreadId === thread.id ? 'bg-blue-50' : ''
                  } ${thread.unreadCount > 0 ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{getOtherParticipants(thread)}</h3>
                      <p className="text-sm text-gray-600 mt-1">{thread.subject}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatTimestamp(thread.updatedAt)}</span>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {thread.latestMessage.text}
                    </p>
                    
                    {thread.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Message Content */}
        <div className="hidden md:flex md:w-2/3 flex-col">
          {selectedThreadId ? (
            <>
              {/* Thread Header */}
              {threads.map(thread => 
                thread.id === selectedThreadId ? (
                  <div key={thread.id} className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">
                          {getOtherParticipants(thread)}
                        </h2>
                        <p className="text-sm text-gray-600">{thread.subject}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
              
              {/* Messages List */}
              <div className="flex-1 p-4 overflow-y-auto">
                {loading ? (
                  <div className="text-center text-gray-500">Loading messages...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500">No messages in this conversation yet</div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => {
                      const isCurrentUser = message.senderId === 'user-1';
                      
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div 
                            className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg px-4 py-2 ${
                              isCurrentUser 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="mt-2">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Message View */}
        <div className="md:hidden w-full">
          {!selectedThreadId ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <p>Select a conversation to view messages</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-white z-10 flex flex-col">
              {/* Mobile Thread Header */}
              {threads.map(thread => 
                thread.id === selectedThreadId ? (
                  <div key={thread.id} className="p-4 border-b border-gray-200 flex items-center">
                    <button 
                      onClick={() => setSelectedThreadId(null)}
                      className="mr-2 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {getOtherParticipants(thread)}
                      </h2>
                      <p className="text-sm text-gray-600">{thread.subject}</p>
                    </div>
                  </div>
                ) : null
              )}
              
              {/* Mobile Messages List */}
              <div className="flex-1 p-4 overflow-y-auto">
                {loading ? (
                  <div className="text-center text-gray-500">Loading messages...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500">No messages in this conversation yet</div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => {
                      const isCurrentUser = message.senderId === 'user-1';
                      
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div 
                            className={`max-w-xs rounded-lg px-4 py-2 ${
                              isCurrentUser 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Mobile Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 