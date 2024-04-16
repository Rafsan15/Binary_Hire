import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faTrash,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import ExclusiveSymbol from '../../components/BPMN/ExclusiveSymbol';

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
  searchTerm,
}) => {
  const [, drop] = useDrop({
    accept: 'textElement',
    drop: (item) => onDrop(item.id, item.workflowTypeName),
  });

  const [workflowName, setWorkflowName] = useState('');
  const [error, setError] = useState(false);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const navigate = useNavigate();
  const [bpmnObj, setBpmnObj] = useState({});
  const [isFinish, setIsFinish] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    createNode();
    if (selectedWorkflow != 'Select Workflow') {
      setIsFinish(false);
    }
  }, [droppedElements]);
  useEffect(() => {
    if (selectedWorkflow != 'Select Workflow') {
      createNode();
      setIsFinish(true);
    }
  }, [selectedWorkflow]);
  // useEffect(() => {
  //   if (isSave) {
  //     handleSaveWorkflow();
  //     setIsSave(false);
  //   }
  // }, [isSaved]);

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      // Input field is empty, focus on it
      setError(true);
      inputRef.current.focus();
      return;
    } else {
      setError(false);
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
          .then((response) => {
            // Handle success response if needed
            Swal.fire({
              title: 'Success!',
              text: 'Workflow Added Successfully',
              icon: 'success',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              setIsSaved(true); // If necessary, update state to reflect that the workflow is saved
              navigate(searchTerm);
            });
          })
          .catch((error) => {
            // Handle errors, such as setting an error state or displaying an error message
            Swal.fire({
              title: 'Oops!',
              text: 'Something went wrong!',
              icon: 'error',
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
    setError(false);
    setIsFinish(false);
  };

  const createNode = () => {
    let resultNode = {
      nodeObj: [],
      connector: [],
      group: [],
    };

    droppedElements.map((element, index) => {
      if (index == 0) {
        const model = {
          id: '1',
          offsetX: 35,
          offsetY: 100,
          width: 50,
          height: 50,
          shape: {
            type: 'Bpmn',
            shape: 'Event',
            // Sets event as End and trigger as None
            event: {
              event: 'Start',
              trigger: 'None',
            },
          },
        };
        resultNode.nodeObj.push(model);
        const model2 = {
          id: '2',
          offsetX: 161,
          offsetY: 100,
          width: 100,
          height: 100,
          shape: {
            type: 'Bpmn',
            shape: 'Activity',
            //Sets activity as Task
            activity: {
              activity: 'Task',
              //Sets the type of the task as Send
              task: {
                type: 'none',
              },
            },
          },
          annotations: [
            {
              content: element.workflowTypeName, // Description inside the event task
              style: { color: 'black' },
            },
          ],
        };
        resultNode.nodeObj.push(model2);
      } else if (index == 1) {
        const model3 = [
          {
            id: '3',
            offsetX: 320,
            offsetY: 100,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Gateway',
              gateway: {
                type: 'Exclusive',
              },
            },
          },
          {
            id: '4',
            offsetX: 70,
            offsetY: 300,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Activity',
              //Sets activity as Task
              activity: {
                activity: 'Task',
                //Sets the type of the task as Send
                task: {
                  type: 'none',
                },
              },
            },
            annotations: [
              {
                content: element.workflowTypeName, // Description inside the event task
                style: { color: 'black' },
              },
            ],
          },
          {
            id: 'th1',
            offsetX: 490,
            offsetY: 100,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Activity',
              //Sets activity as Task
              activity: {
                activity: 'Task',
                //Sets the type of the task as Send
                task: {
                  type: 'none',
                },
              },
            },
            annotations: [
              {
                content: 'Check Threshold', // Description inside the event task
                style: { color: 'black' },
              },
            ],
          },
          {
            id: '21',
            offsetX: 690,
            offsetY: 100,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Gateway',
              gateway: {
                type: 'Parallel',
              },
            },
          },
        ];
        resultNode.nodeObj.push(...model3);
      } else if (index == 2) {
        const model4 = [
          {
            id: '5',
            offsetX: 240,
            offsetY: 300,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Gateway',
              gateway: {
                type: 'Exclusive',
              },
            },
          },
          // {
          //   id: 'textNode3',
          //   offsetX: 320, // Adjust the X position as needed
          //   offsetY: 600, // Adjust the Y position as needed
          //   width: 100,
          //   height: 100,
          //   shape: {
          //     type: 'Text',
          //     content: 'Meet Requirements?',
          //     style: { fontSize: 12, color: 'black' },
          //   },
          //   style: { fill: 'transparent' },
          // },
          {
            id: '6',
            offsetX: 100,
            offsetY: 500,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Activity',
              //Sets activity as Task
              activity: {
                activity: 'Task',
                //Sets the type of the task as Send
                task: {
                  type: 'none',
                },
              },
            },
            annotations: [
              {
                content: element.workflowTypeName, // Description inside the event task
                style: { color: 'black' },
              },
            ],
          },
          {
            id: 'th2',
            offsetX: 390,
            offsetY: 300,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Activity',
              //Sets activity as Task
              activity: {
                activity: 'Task',
                //Sets the type of the task as Send
                task: {
                  type: 'none',
                },
              },
            },
            annotations: [
              {
                content: 'Check Threshold', // Description inside the event task
                style: { color: 'black' },
              },
            ],
          },
          {
            id: '22',
            offsetX: 600,
            offsetY: 300,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Gateway',
              gateway: {
                type: 'Parallel',
              },
            },
          },
        ];
        resultNode.nodeObj.push(...model4);
        let group = {
          id: 'group3',
          children: ['5', 'textNode3'],
        };
        // resultNode.group.push(group);
      } else if (index == 3) {
        const model5 = [
          {
            id: '7',
            offsetX: 260,
            offsetY: 500,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Gateway',
              gateway: {
                type: 'Exclusive',
              },
            },
          },
          {
            id: 'textNode',
            offsetX: 320, // Adjust the X position as needed
            offsetY: 550, // Adjust the Y position as needed
            width: 100,
            height: 100,
            shape: {
              type: 'Text',
              content: 'Meet Requirements?',
              style: { fontSize: 12, color: 'black' },
            },
            style: { fill: 'transparent' },
          },
          {
            id: '8',
            offsetX: 70,
            offsetY: 670,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Activity',
              //Sets activity as Task
              activity: {
                activity: 'Task',
                //Sets the type of the task as Send
                task: {
                  type: 'none',
                },
              },
            },
            annotations: [
              {
                content: element.workflowTypeName, // Description inside the event task
                style: { color: 'black' },
              },
            ],
          },
          {
            id: 'th3',
            offsetX: 420,
            offsetY: 500,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Activity',
              //Sets activity as Task
              activity: {
                activity: 'Task',
                //Sets the type of the task as Send
                task: {
                  type: 'none',
                },
              },
            },
            annotations: [
              {
                content: 'Check Threshold', // Description inside the event task
                style: { color: 'black' },
              },
            ],
          },
          {
            id: '23',
            offsetX: 600,
            offsetY: 500,
            width: 100,
            height: 100,
            shape: {
              type: 'Bpmn',
              shape: 'Gateway',
              gateway: {
                type: 'Parallel',
              },
            },
          },
        ];
        resultNode.nodeObj.push(...model5);
        let group = {
          id: 'group2',
          children: ['7', 'textNode'],
        };
        // resultNode.group.push(group);
      }
      if (resultNode.nodeObj?.find((obj) => obj.id === '3')) {
        const model6 = {
          id: '11',
          offsetX: 800,
          offsetY: 350,
          width: 100,
          height: 100,
          shape: {
            type: 'Bpmn',
            shape: 'Activity',
            //Sets activity as Task
            activity: {
              activity: 'Task',
              //Sets the type of the task as Send
              task: {
                type: 'none',
              },
            },
          },
          annotations: [
            {
              content: 'Check Certification', // Description inside the event task
              style: { color: 'black' },
            },
          ],
        };
        resultNode.nodeObj.push(model6);
      }
      if (isFinish) {
        if (droppedElements.length == 1) {
          const model7 = [
            {
              id: 'f4',
              offsetX: 750,
              offsetY: 750,
              width: 100,
              height: 100,
              shape: {
                type: 'Bpmn',
                shape: 'Activity',
                //Sets activity as Task
                activity: {
                  activity: 'Task',
                  //Sets the type of the task as Send
                  task: {
                    type: 'none',
                  },
                },
              },
              annotations: [
                {
                  content: 'Final Score', // Description inside the event task
                  style: { color: 'black' },
                },
              ],
            },
            {
              id: 'f5',
              offsetX: 850,
              offsetY: 600,
              width: 50,
              height: 50,
              shape: {
                type: 'Bpmn',
                shape: 'Event',
                // Sets event as End and trigger as None
                event: {
                  event: 'End',
                  trigger: 'None',
                },
              },
            },
          ];
          resultNode.nodeObj.push(...model7);
        } else {
          const model5 = [
            {
              id: 'f1',
              offsetX: 260,
              offsetY: 670,
              width: 100,
              height: 100,
              shape: {
                type: 'Bpmn',
                shape: 'Gateway',
                gateway: {
                  type: 'Exclusive',
                },
              },
            },
            // {
            //   id: 'textNode',
            //   offsetX: 320, // Adjust the X position as needed
            //   offsetY: 600, // Adjust the Y position as needed
            //   width: 100,
            //   height: 100,
            //   shape: {
            //     type: 'Text',
            //     content: 'Meet Requirements?',
            //     style: { fontSize: 12, color: 'black' },
            //   },
            //   style: { fill: 'transparent' },
            // },
            {
              id: 'f2',
              offsetX: 430,
              offsetY: 670,
              width: 100,
              height: 100,
              shape: {
                type: 'Bpmn',
                shape: 'Activity',
                //Sets activity as Task
                activity: {
                  activity: 'Task',
                  //Sets the type of the task as Send
                  task: {
                    type: 'none',
                  },
                },
              },
              annotations: [
                {
                  content: 'Check Threshold', // Description inside the event task
                  style: { color: 'black' },
                },
              ],
            },
            {
              id: 'f3',
              offsetX: 600,
              offsetY: 670,
              width: 100,
              height: 100,
              shape: {
                type: 'Bpmn',
                shape: 'Gateway',
                gateway: {
                  type: 'Parallel',
                },
              },
            },
            {
              id: 'f4',
              offsetX: 750,
              offsetY: 750,
              width: 100,
              height: 100,
              shape: {
                type: 'Bpmn',
                shape: 'Activity',
                //Sets activity as Task
                activity: {
                  activity: 'Task',
                  //Sets the type of the task as Send
                  task: {
                    type: 'none',
                  },
                },
              },
              annotations: [
                {
                  content: 'Final Score', // Description inside the event task
                  style: { color: 'black' },
                },
              ],
            },
            {
              id: 'f5',
              offsetX: 850,
              offsetY: 600,
              width: 50,
              height: 50,
              shape: {
                type: 'Bpmn',
                shape: 'Event',
                // Sets event as End and trigger as None
                event: {
                  event: 'End',
                  trigger: 'None',
                },
              },
            },
          ];
          resultNode.nodeObj.push(...model5);
        }
      }
      resultNode.nodeObj?.map((element, index) => {
        if (element.id == 2) {
          resultNode.connector.push({
            id: 'connector1',
            sourceID: '1',
            targetID: '2',
          });
        } else if (element.id == 4) {
          resultNode.connector.push({
            id: 'connector2',
            sourceID: '2',
            targetID: '3',
          });
          resultNode.connector.push({
            id: 'connector3',
            sourceID: '3',
            targetID: '4',
          });
          resultNode.connector.push({
            id: 'connector10',
            sourceID: '21',
            targetID: '11',
          });
          resultNode.connector.push({
            id: 'connector11',
            sourceID: 'th1',
            targetID: '21',
          });
          resultNode.connector.push({
            id: 'connector12',
            sourceID: '3',
            targetID: 'th1',
          });
          resultNode.connector.push({
            id: 'connector13',
            sourceID: '21',
            targetID: '4',
          });
        } else if (element.id == 6) {
          resultNode.connector.push({
            id: 'connector4',
            sourceID: '4',
            targetID: '5',
          });
          resultNode.connector.push({
            id: 'connector5',
            sourceID: '5',
            targetID: '6',
          });
          resultNode.connector.push({
            id: 'connector14',
            sourceID: '5',
            targetID: 'th2',
          });
          resultNode.connector.push({
            id: 'connector15',
            sourceID: 'th2',
            targetID: '22',
          });
          resultNode.connector.push({
            id: 'connector16',
            sourceID: '22',
            targetID: '11',
          });
          resultNode.connector.push({
            id: 'connector20',
            sourceID: '22',
            targetID: '6',
          });

          // resultNode.connector?.push({
          //   id: 'connector11',
          //   sourceID: '5',
          //   targetID: '11',
          // });
        } else if (element.id == 8) {
          resultNode.connector.push({
            id: 'connector6',
            sourceID: '6',
            targetID: '7',
          });
          resultNode.connector.push({
            id: 'connector7',
            sourceID: '7',
            targetID: '8',
          });
          resultNode.connector.push({
            id: 'connector17',
            sourceID: '7',
            targetID: 'th3',
          });
          resultNode.connector.push({
            id: 'connector18',
            sourceID: 'th3',
            targetID: '23',
          });
          resultNode.connector.push({
            id: 'connector19',
            sourceID: '23',
            targetID: '11',
          });

          resultNode.connector.push({
            id: 'connector23',
            sourceID: '23',
            targetID: '8',
          });
        }
        if (
          isFinish &&
          (element.id == 2 ||
            element.id == 4 ||
            element.id == 6 ||
            element.id == 8)
        ) {
          if (droppedElements.length == 1 && element.id == 2) {
            resultNode.connector.push({
              id: 'connector22',
              sourceID: 2,
              targetID: 'f4',
            });
            resultNode.connector.push({
              id: 'connector29',
              sourceID: 'f4',
              targetID: 'f5',
            });
          } else if (droppedElements.length * 2 == element.id) {
            resultNode.connector.push({
              id: 'connector21',
              sourceID: 'f1',
              targetID: 'f2',
            });

            resultNode.connector.push({
              id: 'connector22',
              sourceID: element.id,
              targetID: 'f1',
            });
            resultNode.connector.push({
              id: 'connector24',
              sourceID: 'f2',
              targetID: 'f3',
            });
            resultNode.connector.push({
              id: 'connector25',
              sourceID: 'f1',
              targetID: 'f4',
            });
            resultNode.connector.push({
              id: 'connector26',
              sourceID: 'f3',
              targetID: 'f4',
            });
            resultNode.connector.push({
              id: 'connector27',
              sourceID: 'f3',
              targetID: '11',
            });
            resultNode.connector.push({
              id: 'connector28',
              sourceID: '11',
              targetID: 'f4',
            });
            resultNode.connector.push({
              id: 'connector29',
              sourceID: 'f4',
              targetID: 'f5',
            });
          }
        }
      });
    });
    // if(droppedElements.length === 1) {

    // }
    setBpmnObj(resultNode);
  };

  return (
    //     <div ref={drop} className='w-2/3 border p-4'>
    // {selectedWorkflow === 'Select Workflow' ? (
    //   <div
    //     className='border-2 rounded p-4 mb-10'
    //     style={{ backgroundColor: '#FFFFFF' }}
    //   >
    //     <div className='block text-lg font-bold mb-2' >Workflow Name
    //     <span className='text-red-500'>*</span>

    //     </div>
    //     <input
    //       ref={inputRef}
    //       type='text'
    //       id='workflowName'
    //       className={`w-full border p-2 h-9 rounded-md focus:outline-none focus:ring-red-300 ${error ? 'focus:ring border-red-500 focus:border-red-500' : ''}`}
    //       value={workflowName}
    //       onChange={(e) => setWorkflowName(e.target.value)}
    //     />
    //     {error && <p className='text-red-500 pt-1'>Workflow name cannot be empty.</p>}
    //   </div>
    // ) : (
    //   <div className='mb-4'>
    //     <label
    //       className='block text-sm font-bold mb-2'
    //       htmlFor='workflowName'
    //     >
    //       Workflow Name
    //     </label>
    //     <input
    //       type='text'
    //       id='workflowName'
    //       className='w-full border rounded-md p-2 '
    //       value={
    //         selectedWorkflow === 'Select Workflow'
    //           ? ''
    //           : selectedWorkflow || workflowName
    //       }
    //       onChange={(e) => setWorkflowName(e.target.value)}
    //       disabled={
    //         selectedWorkflow === 'Select Workflow'
    //           ? ''
    //           : selectedWorkflow || workflowName
    //       }
    //     />
    //   </div>
    // )}
    //       <div
    //         className='w-full border-2 rounded p-4 mb-10 relative'
    //         style={{
    //           backgroundColor: '#FFFFFF',
    //           height: droppedElements.length === 0 ? '265px' : 'auto',
    //         }}
    // ref={drop}
    //       >
    //         {droppedElements.length === 0 ? (
    // <>

    // <div className='flex flex-col justify-center items-center h-full'>
    //               <div
    //                 className='border-dotted border-2 rounded p-4'
    //                 style={{ borderColor: '#60A5FA' }}
    //               >
    //                 <FontAwesomeIcon
    //                   icon={faPlus}
    //                   size='4x' // Adjust the size as needed
    //                   className='text-blue-200 cursor-pointer'
    //                 />
    //               </div>
    //               <p className='text-gray-500 mt-4'>
    //         Drag text elements from the left side and drop them here.
    //       </p>
    //             </div>
    //           </>
    //   ) : (
    //     <>
    //       {droppedElements.map((element, index) => (
    //         <div key={element.id} className='flex flex-col items-center'>
    //           <button className='relative group'>
    //             <div
    //                     className='bg-blue-400 text-white relative p-2 rounded shadow-lg'
    //                     style={{ width: '130px' }}
    //                   >
    //             <div
    //                       className='flex items-center justify-center'
    //                       style={{ width: '100%', justifyContent: 'space-between' }}
    //                     >
    //               <span className='mr-2'>{element.workflowTypeName}</span>
    //               {selectedWorkflow === 'Select Workflow' && (
    //                 <FontAwesomeIcon
    //                   icon={faTrash}
    //                   className='text-white opacity-100 cursor-pointer opacity-0 group-hover:text-red-500 group-hover:opacity-100'
    //                   onClick={() => onDelete(element.id)}
    //                 />
    //               )}
    //             </div>
    //           </div>
    //         </button>
    //         <div className='m-4'>
    //           {index < droppedElements.length - 1 && ( // Check if it's not the last element
    //             <div className='m-1'>
    //               <FontAwesomeIcon
    //                 icon={faArrowDown}
    //                 className='text-2xl'
    //                 style={{ color: '#60A5FA' }}
    //               />
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     ))}

    //             {selectedWorkflow !== 'Select Workflow' ? (
    // <div className='flex justify-between'>
    //   <button
    //     className='bg-red-500 text-white p-2 mt-4 rounded '
    //     onClick={() => handleDeleteWorkflow(selectedWorkflow)}
    //   >
    //     Reset
    //   </button>
    //   <button
    //     className='bg-blue-500 text-white p-2 mt-4 rounded'
    //     onClick={handleCreateWorkflow}
    //   >
    //     New
    //   </button>
    // </div>
    //             ) : (
    //               <div className='flex justify-between'>
    //                 <button
    //                   className='bg-red-500 text-white p-2 mt-4 rounded '
    //                   onClick={handleCancelWorkflow}
    //                 >
    //                   Cancel
    //                 </button>
    //                 <button
    //                   className='bg-blue-500 text-white p-2 mt-4 rounded'
    //                   onClick={handleSaveWorkflow}
    //                 >
    //                   Save
    //                 </button>
    //               </div>
    //             )}
    //           </>
    //         )}
    //       </div>

    //       {showDuplicateAlert && (
    //         <div
    //           className='p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
    //           role='alert'
    //         >
    //           <span className='font-medium'>Warning alert!</span> Workflow name
    //           already exists. Choose a different name.
    //           <button className='ml-4' onClick={handleCloseAlert}>
    //             <FontAwesomeIcon icon={faTimes} />
    //           </button>
    //         </div>
    //       )}
    //     </div>

    <div ref={drop} className='flex-1 border h-screen'>
      {selectedWorkflow === 'Select Workflow' ? (
        <div
          className='border-2 rounded p-4 mb-10'
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className='block text-lg font-bold mb-2'>
            Workflow Name
            <span className='text-red-500'>*</span>
          </div>
          <input
            ref={inputRef}
            type='text'
            id='workflowName'
            className={`w-full border p-2 h-9 rounded-md focus:outline-none focus:ring-red-300 ${
              error ? 'focus:ring border-red-500 focus:border-red-500' : ''
            }`}
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
          {error && (
            <p className='text-red-500 pt-1'>Workflow name cannot be empty.</p>
          )}
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

      <ExclusiveSymbol
        nodes={bpmnObj.nodeObj}
        connector={bpmnObj.connector}
        group={bpmnObj.group}
      />

      <div className='flex justify-between'>
        <button
          className='bg-red-500 text-white p-2 mt-4 rounded '
          onClick={() => {
            window.location.reload();
          }}
        >
          Reset
        </button>

        {selectedWorkflow == 'Select Workflow' && (
          <button
            className='bg-blue-500 text-white p-2 mt-4 rounded'
            onClick={() => {
              setIsFinish(true);
              createNode();
              handleSaveWorkflow();
            }}
          >
            Save
          </button>
        )}
      </div>
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
