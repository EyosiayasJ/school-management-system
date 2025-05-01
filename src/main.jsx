/**
 * Application Entry Point
 * 
 * This is the main entry file for the School Management System application.
 * It renders the root App component into the DOM and sets up React's StrictMode
 * for development-time checks and warnings.
 * 
 * The application's styling is imported here via index.css, which includes
 * Tailwind CSS utility classes and global style definitions.
 * 
 * @module main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Renders the root component into the DOM
 * 
 * Creates a React root at the 'root' element and renders the App component
 * wrapped in StrictMode for additional development-time checks.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
