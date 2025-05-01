/**
 * Event Day Background Component
 * 
 * This component renders a custom background for calendar day cells
 * in the events calendar. It highlights days that have events scheduled
 * with a light blue background.
 * 
 * Used as a custom component with the React Big Calendar library to
 * enhance the visual indication of events in the calendar view.
 * 
 * @module EventDayBg
 */

import React from 'react';

/**
 * EventDayBg Component
 * 
 * Renders a calendar day cell with conditional background styling
 * based on whether the day has any scheduled events.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to render inside the day cell
 * @param {Date} props.date - The date object representing the current day cell
 * @param {Array<Object>} props.events - Array of event objects with start dates
 * @returns {JSX.Element} The styled day cell component
 */
export default function EventDayBg({ children, date, events }) {
  // Check if there is an event on this day
  const hasEvent = events.some(event => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  });

  return (
    <div
      style={{
        backgroundColor: hasEvent ? '#EFF6FF' : 'transparent',
        transition: 'background 0.2s',
        width: '100%',
        height: '100%',
      }}
      className="rbc-day-bg"
    >
      {children}
    </div>
  );
}
