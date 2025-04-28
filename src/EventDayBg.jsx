import React from 'react';

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
