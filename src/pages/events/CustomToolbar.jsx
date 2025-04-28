import React, { useState, useEffect, useRef } from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const CustomToolbar = (props) => {
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Parse selected date from props.date (react-big-calendar passes it)
  const currentDate = props.date || new Date();
  const selectedMonth = currentDate.getMonth();
  const selectedYear = currentDate.getFullYear();

  // Month/year options
  const months = monthNames;
  const years = [];
  for (let y = selectedYear - 5; y <= selectedYear + 5; y++) years.push(y);

  // Handlers
  const handleMonthChange = (monthIdx) => {
    setDropdownOpen(false);
    const newDate = new Date(selectedYear, monthIdx, 1);
    props.onNavigate('DATE', newDate);
  };
  const handleYearChange = (year) => {
    setDropdownOpen(false);
    const newDate = new Date(year, selectedMonth, 1);
    props.onNavigate('DATE', newDate);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  return (
    <div className="flex items-center justify-between mb-4" style={{ minHeight: 40 }}>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200"
          onClick={() => props.onNavigate('PREV')}
          aria-label="Previous Month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {/* Separate Month and Year Dropdowns */}
        <div className="flex items-center gap-0" ref={dropdownRef}>
          {/* Month Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="text-lg font-semibold flex items-center justify-center px-3 py-1 rounded focus:outline-none bg-white hover:bg-gray-100"
              onClick={() => setDropdownOpen(dropdownOpen === 'month' ? false : 'month')}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen === 'month'}
              style={{ minWidth: 100 }}
            >
              {monthNames[selectedMonth]}
              <svg className="ml-1 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen === 'month' && (
              <div className="absolute z-10 left-0 mt-2 bg-white rounded shadow-lg max-h-48 overflow-y-auto w-36 scrollbar-hide">
  <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                {months.map((month, idx) => (
                  <button
                    key={month}
                    className={`block w-full text-left px-4 py-2 text-sm ${selectedMonth === idx ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => { handleMonthChange(idx); setDropdownOpen(false); }}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Year Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="text-lg font-semibold flex items-center justify-center px-3 py-1 rounded focus:outline-none bg-white hover:bg-gray-100"
              onClick={() => setDropdownOpen(dropdownOpen === 'year' ? false : 'year')}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen === 'year'}
              style={{ minWidth: 80 }}
            >
              {selectedYear}
              <svg className="ml-1 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen === 'year' && (
              <div className="absolute z-10 left-0 mt-2 bg-white rounded shadow-lg max-h-48 overflow-y-auto w-24 scrollbar-hide">
  <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                {years.map((year) => (
                  <button
                    key={year}
                    className={`block w-full text-left px-4 py-2 text-sm ${selectedYear === year ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => { handleYearChange(year); setDropdownOpen(false); }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200"
          onClick={() => props.onNavigate('NEXT')}
          aria-label="Next Month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      {/* Right group: View selectors */}
      <div className="flex items-center space-x-1">
        {props.views.map(view => (
          <button
            type="button"
            key={view}
            className={`px-2 py-1 rounded ${props.view === view ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            onClick={() => props.onView(view)}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomToolbar;
