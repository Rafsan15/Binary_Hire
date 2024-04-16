import React, { useState } from 'react';
import { Button, TextareaAutosize, Menu, MenuItem, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import './StickyNote.css'; // Import your CSS file for custom styles

const StickyNote = ({ width, height, noteText, onNoteTextChange, onClose }) => {
  // const [noteText, setNoteText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [noteColor, setNoteColor] = useState('bg-yellow-100');
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.nodeName === 'HR') return;
    setIsDragging(true);
    const stickyNoteRect = e.currentTarget.getBoundingClientRect();
    setInitialPosition({
      x: e.clientX-100 - stickyNoteRect.left,
      y: e.clientY-120 - stickyNoteRect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const stickyNote = document.querySelector('.sticky-note');
      stickyNote.style.left = `${e.clientX - initialPosition.x}px`;
      stickyNote.style.top = `${e.clientY - initialPosition.y}px`;
    }
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed as prop
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleNoteColorChange = (color) => {
    setNoteColor(color);
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`sticky-note ${noteColor} relative`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex justify-between items-center px-1">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleNoteColorChange('bg-yellow-100')}>Yellow</MenuItem>
            <MenuItem onClick={() => handleNoteColorChange('bg-pink-100')}>Pink</MenuItem>
            <MenuItem onClick={() => handleNoteColorChange('bg-blue-100')}>Blue</MenuItem>
            {/* Add more color options as needed */}
          </Menu>
        </div>
        <hr />
        <TextareaAutosize
          className="note-textarea pl-3 pt-1"
          style={{ width: 'calc(100% - 24px)', height: 'calc(100% - 40px)', backgroundColor: 'transparent', overflow: 'auto' }}
          value={noteText? noteText : ''}
          onChange={(e) => onNoteTextChange(e.target.value)}
          placeholder="Write your note here..."
        />
      </div>
    </div>
  );
};

export default StickyNote;
