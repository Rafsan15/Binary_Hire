import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faTrash,
  faTimes,
faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2'  

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';

const DragDropArea = ({
  droppedElements,
  onDrop,
  onDelete,
  selectedWorkflow,
  updateSelectedWorkflow,
  setDroppedElements,
  setWorkflowNames,
  workflows,
  setIsSaved,
  isSaved,
}) => {
  const [, drop] = useDrop({
    accept: 'textElement',
    drop: (item) => onDrop(item.id, item.workflowTypeName),
  });

  const [workflowName, setWorkflowName] = useState('');
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  const inputRef = useRef(null);

  

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      // Input field is empty, focus on it
      inputRef.current.focus();
      return;
    }
  
    if (workflowName && droppedElements.length > 0) {
      const existingWorkflows = workflows;
  
      const isNameExists = existingWorkflows.some(
        (workflow) => workflow.name === workflowName
      );
  
      if (isNameExists) {
        // Show duplicate name alert
        setShowDuplicateAlert(true);
  
        // Hide alert after a few seconds (adjust as needed)
        //setTimeout(() => setShowDuplicateAlert(false), 5000);
      } else {

        // Retrieve authentication token and user/organization IDs from cookies
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        
        // Define the API data object
        const api_data = {
          workflowMaster: {
            id: 0, // Assuming this is new workflow creation, so ID is 0
            modifiedBy: userId, // Your user ID here
            organizationId: organizationId, // Your organization ID here
            name: workflowName,
          },
          workflowDetail: droppedElements.map((item, index) => ({
            id: 0, // Assuming this is new workflow creation, so ID is 0
            modifiedBy: userId, // Your user ID here
            workflowMasterId: 0, // This will be replaced with actual workflowMaster ID after creation
            workflowTypeId: item.id,
            priority: index + 1, // Assuming priority starts from 1
          })),
        };
  
  
        // Make the API call to save the workflow
        axios
          .post(`${BASE_URL}WorkFlow/save`, api_data, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            },
        })
        .then(response => {
          // Handle success response if needed
          Swal.fire({
            title: "Success!",
            text: "Workflow Added Successfully",
            icon: "success"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            setIsSaved(true); // If necessary, update state to reflect that the workflow is saved
          });
        })
        .catch(error => {
          // Handle errors, such as setting an error state or displaying an error message
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong!",
            icon: "error"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
             // If necessary, update state to reflect that the workflow is saved
          });
        });
  
        // Clear form fields and reset selected workflow
        setWorkflowName('');
        setDroppedElements([]);
        updateSelectedWorkflow('Select Workflow');
  
        // Optionally, you can also clear duplicate name alert
        setShowDuplicateAlert(false);
      }
    }
  };
  



  const handleCreateWorkflow = () => {
    setDroppedElements([]);
    updateSelectedWorkflow('Select Workflow');
  };

  const handleDeleteWorkflow = (workflowId) => {
    // const existingWorkflows =
    //   JSON.parse(localStorage.getItem('savedWorkflow')) || [];
    // const updatedWorkflows = existingWorkflows.filter(
    //   (workflow) => workflow.name !== workflowId
    // );
    // localStorage.setItem('savedWorkflow', JSON.stringify(updatedWorkflows));
    setDroppedElements([]);
    updateSelectedWorkflow('Select Workflow');

    const updatedWorkflowNames = updatedWorkflows.map(
      (workflow) => workflow.name
    );
    setWorkflowNames(updatedWorkflowNames);
  };

  const handleCloseAlert = () => {
    setShowDuplicateAlert(false);
  };
  const handleCancelWorkflow = () => {
    setWorkflowName('');
    setDroppedElements([]);
    updateSelectedWorkflow('Select Workflow');
  };

  return (
    <div ref={drop} className='w-2/3 border p-4'>
      {selectedWorkflow === 'Select Workflow' ? (
        <div
          className='border-2 rounded p-4 mb-10'
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className='block text-lg font-bold mb-2'>Workflow Name</div>
          <input
            ref={inputRef}
            type='text'
            id='workflowName'
            className='w-full border p-2 h-9 rounded-md focus:outline-none focus:ring focus:border-blue-300'
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
        </div>
      ) : (
        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='workflowName'
          >
            Workflow Name
          </label>
          <input
            type='text'
            id='workflowName'
            className='w-full border rounded-md p-2 '
            value={
              selectedWorkflow === 'Select Workflow'
                ? ''
                : selectedWorkflow || workflowName
            }
            onChange={(e) => setWorkflowName(e.target.value)}
            disabled={
              selectedWorkflow === 'Select Workflow'
                ? ''
                : selectedWorkflow || workflowName
            }
          />
        </div>
      )}
      <div
        className='w-full border-2 rounded p-4 mb-10 relative'
        style={{
          backgroundColor: '#FFFFFF',
          height: droppedElements.length === 0 ? '265px' : 'auto',
        }}
ref={drop}
      >
        {droppedElements.length === 0 ? (
<>
      
<div className='flex flex-col justify-center items-center h-full'>
              <div
                className='border-dotted border-2 rounded p-4'
                style={{ borderColor: '#60A5FA' }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  size='4x' // Adjust the size as needed
                  className='text-blue-200 cursor-pointer'
                />
              </div>
              <p className='text-gray-500 mt-4'>
        Drag text elements from the left side and drop them here.
      </p>
            </div>
          </>
  ) : (
    <>
      {droppedElements.map((element, index) => (
        <div key={element.id} className='flex flex-col items-center'>
          <button className='relative group'>
            <div
                    className='bg-blue-400 text-white relative p-2 rounded shadow-lg'
                    style={{ width: '120px' }}
                  >
            <div
                      className='flex items-center justify-center'
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
              <span className='mr-2'>{element.workflowTypeName}</span>
              {selectedWorkflow === 'Select Workflow' && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className='text-white opacity-100 cursor-pointer opacity-0 group-hover:text-red-500 group-hover:opacity-100'
                  onClick={() => onDelete(element.id)}
                />
              )}
            </div>
          </div>
        </button>
        <div className='m-4'>
          {index < droppedElements.length - 1 && ( // Check if it's not the last element
            <div className='m-1'>
              <FontAwesomeIcon
                icon={faArrowDown}
                className='text-2xl'
                style={{ color: '#60A5FA' }}
              />
            </div>
          )}
        </div>
      </div>
    ))}

            {selectedWorkflow !== 'Select Workflow' ? (
              <div className='flex justify-between'>
                <button
                  className='bg-red-500 text-white p-2 mt-4 rounded '
                  onClick={() => handleDeleteWorkflow(selectedWorkflow)}
                >
                  Reset
                </button>
                <button
                  className='bg-blue-500 text-white p-2 mt-4 rounded'
                  onClick={handleCreateWorkflow}
                >
                  New
                </button>
              </div>
            ) : (
              <div className='flex justify-between'>
                <button
                  className='bg-red-500 text-white p-2 mt-4 rounded '
                  onClick={handleCancelWorkflow}
                >
                  Cancel
                </button>
                <button
                  className='bg-blue-500 text-white p-2 mt-4 rounded'
                  onClick={handleSaveWorkflow}
                >
                  Save
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showDuplicateAlert && (
        <div
          className='p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
          role='alert'
        >
          <span className='font-medium'>Warning alert!</span> Workflow name
          already exists. Choose a different name.
          <button className='ml-4' onClick={handleCloseAlert}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  );
    
};

DragDropArea.propTypes = {
  droppedElements: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedWorkflow: PropTypes.string.isRequired,
  updateSelectedWorkflow: PropTypes.func.isRequired,
  setDroppedElements: PropTypes.func.isRequired,
  setWorkflowNames: PropTypes.func.isRequired,
};

export default DragDropArea;
