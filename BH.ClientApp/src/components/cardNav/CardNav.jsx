import React from 'react';

const CardNav = ({ activeSection, setActiveSection }) => {
  return (
    <nav className='p-4 border-b-2 border-gray'>
      <button
        onClick={() => setActiveSection('board')}
        className={`text-black mx-8 ${
          activeSection === 'board'
            ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1'
            : ''
        }`}
      >
        Board
      </button>

      <button
        onClick={() => setActiveSection('favourites')}
        className={`text-black ${
          activeSection === 'favourites'
            ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1'
            : ''
        }`}
      >
        Favourites
      </button>

      {/* Add more buttons as needed */}
    </nav>
  );
};

export default CardNav;
