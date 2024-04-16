// TextElement.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const TextElement = ({ id, workflowTypeName, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'textElement',
    item: { id, workflowTypeName },
  });

  // State to manage the input field value
  const [editedText, setEditedText] = useState(workflowTypeName);

  // State to manage whether the input field is visible
  const [isEditing, setIsEditing] = useState(false);

  // Check if the id is 1, 2, or 3
  const shouldRenderButtons = ![1, 2, 3].includes(Number(id));

  // const handleEditClick = () => {
  //   const newText = prompt('Enter new text:', text);
  //   if (newText !== null) {
  //     // Check if the user clicked cancel in the prompt
  //     onEdit(newText);
  //   }
  // };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedText(workflowTypeName); // Reset to the original text
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={` text-white p-2 mb-4 rounded  flex shadow-lg justify-between ${
        isDragging && 'opacity-50'
      }`}
      style={{ backgroundColor: '#1e88e5', opacity: 1 }}
      // style={{ backgroundColor: '#B4EEB4' }}

    >
      {/* Display input field when editing, otherwise display text */}
      {isEditing ? (
        <input
          className='text-black rounded pl-2'
          type='text'
          value={editedText}
          onChange={handleInputChange}
        />
      ) : (
        <div>{workflowTypeName}</div>
      )}

      {shouldRenderButtons && (
        <div className='mx-2'>
          {!isEditing && (
            <>
              {/* <button className='mx-5' onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => onDelete(id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button> */}
            </>
          )}
          {isEditing && (
            <>
              <button className='mx-5' onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faCheck} />
              </button>

              <button onClick={handleCancelClick}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

TextElement.propTypes = {
  id: PropTypes.number.isRequired,
  workflowTypeName: PropTypes.string.isRequired,
  // onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TextElement;
