// WorkflowPage.jsx
import { useState, useEffect } from 'react';
import DragDropArea from './DragDropArea';
import TextElement from './TextElement';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const WorkflowPage = () => {
  const location1 = useLocation();
  const searchParams = new URLSearchParams(location1.search);
  const initialSearchValue = searchParams.get('redirect') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchValue);
  const [workflowNames, setWorkflowNames] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('Select Workflow');
  const [workflowId, setWorkflowId] = useState(-1);
  const [workflowDetails, setWorkflowDetails] = useState([]);
  // const [newTextElement, setNewTextElement] = useState('');
  const [droppedElements, setDroppedElements] = useState([]);
  const [clickCheck, setClickCheck] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [textElements, setTextElements] = useState([]);

  //GET ALL THE WORKFLOW FOR THE DROPDOWN
  useEffect(() => {
    setLoading(true);
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    const requestBody = {
      page: 1, // Example value for the page parameter
      pageSize: 100, // Example value for the pageSize parameter
      organizationId: organizationId, // Assuming organizationId is retrieved from cookies
    };

    axios
      .post(`${BASE_URL}WorkFlow/get-all`, requestBody, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        setLoading(false);
        const workflows = response.data.data; // Assuming the response contains an array of workflow objects
        setWorkflows(workflows);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching workflows:', error);
      });
    setIsSaved(false);
  }, [isSaved]);

  //GET ALL THE DRAGGABLE ELEMENTS OF THE LEFT(E.G. EXPERIENCE, EDUCATION)
  useEffect(() => {
    setLoading(true);
    // Retrieve the authentication token from cookies
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    // Fetch workflow types from the API endpoint
    axios
      .get(`${BASE_URL}WorkFlow/get-all-workflow-type`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          userId,
          organizationId,
        },
      })
      .then((response) => {
        setLoading(false);
        // Extract the workflow types from the response and set them in state
        setTextElements(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        // Handle errors, such as setting an error state or displaying an error message
        console.error('Error fetching workflow types:', error);
      });
  }, []);

  // Function to handle dropdown change
  const handleDropdownChange = (e) => {
    const selectedWorkflowId = e.target.options[e.target.selectedIndex].id;
    setWorkflowId(selectedWorkflowId);
  };

  //GET THE SPECIFIC WORKFLOWS UPON SELECTING FROM THE DROPDOWN
  useEffect(() => {
    // Fetch workflow details based on the selected workflow ID
    const fetchWorkflowDetails = async () => {
      setLoading(true);
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const requestBody = workflowId;

        const response = await axios.post(
          `${BASE_URL}WorkFlow/get-by-id`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              userId,
              organizationId,
            },
          }
        );
        setLoading(false);
        const workflowDetails = response.data.data.workflowDetailResponseModel;
        // setWorkflowDetails(workflowDetails);
        // Update dropped elements state based on workflow details
        setDroppedElements(workflowDetails); // Adjust this line based on the actual structure of workflowDetails
      } catch (error) {
        setLoading(false);
        console.error('Error fetching workflow details:', error);
      }
    };

    // Check if a workflow ID is selected before fetching details
    if (workflowId && workflowId != -1) {
      fetchWorkflowDetails();
    } else {
      // If 'Select Workflow' is chosen, clear the dropped elements
      setDroppedElements([]);
    }
  }, [workflowId]);

  // useEffect(() => {
  //   const storedWorkflow = localStorage.getItem('selectedWorkflow');
  //   const storedTextElements = JSON.parse(localStorage.getItem('textElements'));
  //   const storedDroppedElements = JSON.parse(
  //     localStorage.getItem('droppedElements')
  //   );

  //   if (storedWorkflow) {
  //     setSelectedWorkflow(storedWorkflow);
  //   }

  //   if (storedTextElements) {
  //     setTextElements(storedTextElements);
  //   }

  //   if (storedDroppedElements) {
  //     setDroppedElements(storedDroppedElements);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('selectedWorkflow', selectedWorkflow);
  //   localStorage.setItem('textElements', JSON.stringify(textElements));
  //   localStorage.setItem('droppedElements', JSON.stringify(droppedElements));
  // }, [selectedWorkflow, textElements, droppedElements]);

  const handleDeleteTextElementNonDrop = (id) => {
    // Remove the element from textElements
    // const updatedTextElements = textElements.filter(
    //   (element) => element.id !== id
    // );
    // // Update the state with the modified textElements
    // setTextElements(updatedTextElements);
  };

  const handleDeleteTextElement = (id) => {
    // Remove the element from droppedElements if it exists
    const updatedDroppedElements = droppedElements.filter((el) => el.id !== id);
    setDroppedElements(updatedDroppedElements);
  };

  const handleEditElement = (id, newText) => {
    // console.log(newText);
    // if (newText.length > 0) {
    //   const updatedTextElements = textElements.map((el) =>
    //     el.id === id ? { ...el, text: newText } : el
    //   );
    //   setTextElements(updatedTextElements);
    // }
  };

  const handleDrop = (id, workflowTypeName) => {
    if (workflowId == -1) {
      const isIdAlreadyDropped = droppedElements.some(
        (element) => element.id === id
      );
      console.log(isIdAlreadyDropped);
      if (isIdAlreadyDropped) {
        // Show an error message or handle the error as needed
        console.error(`Element with ID ${id} is already dropped.`);
      } else {
        // Add the new element to droppedElements
        setDroppedElements([...droppedElements, { id, workflowTypeName }]);
        console.log('Element dropped successfully.');
      }
    }
  };

  // Define a function to update selectedWorkflow in the parent component
  const updateSelectedWorkflow = (workflow) => {
    setWorkflowId(-1);
    setSelectedWorkflow(workflow);
  };

  // const handleCheck = () => {
  //   setClickCheck(true);
  //   setShowInput(true);
  // };

  // const isSelectWorkflow = selectedWorkflow === 'Select Workflow';

  return (
    <div className='flex flex-1'>
      {loading && (
        <div>
          <div className='backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50'></div>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50'></div>
        </div>
      )}
      <div className='w-1/3 border p-4 flex-col'>
        {/* <Breadcrumbs
          aria-label='breadcrumb'
          style={{
            marginTop: '20px',
            marginLeft: '20px',
            marginBottom: '20px',
          }}
        >
          <StyledBreadcrumb
            component='a'
            href='#'
            label='Home'
            icon={<HomeIcon fontSize='small' />}
          />
          <StyledBreadcrumb label='Work Flow' />
        </Breadcrumbs> */}
        <div
          className='border-2 rounded p-4 mb-10'
          style={{ backgroundColor: '#CEF3F5' }}
          id='workflowType'
        >
          <label
            className='block text-lg font-bold mb-2'
            htmlFor='workflowType'
          >
            Workflow Type
          </label>
          <select
            className='w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
            id='workflowType'
            value={selectedWorkflow}
            onChange={(e) => {
              setSelectedWorkflow(e.target.value);
              handleDropdownChange(e);
            }}
          >
            <option key={-1} value={'Select Workflow'} id={-1}>
              Select to view existing Workflows
            </option>
            {workflows.map((workflow) => (
              <option key={workflow.id} value={workflow.name} id={workflow.id}>
                {workflow.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className=' border-2 rounded p-4 mb-10'
          style={{ backgroundColor: '#CEF3F5' }}
          id='textElement'
        >
          <div>
            {textElements.map((element) => (
              <TextElement
                key={element.id}
                id={element.id}
                workflowTypeName={element.name}
                // onEdit={(newText) => handleEditElement(element.id, newText)}
                onDelete={() => handleDeleteTextElementNonDrop(element.id)}
              />
            ))}
          </div>

          {/* {clickCheck === false ? (
            <button
              className=' text-white p-2 rounded'
              style={{ backgroundColor: '#5674FC' }}
              onClick={() => handleCheck()}
            >
              Add
            </button>
          ) : (
            <div className='mt-4'>
              <button
                className=' text-white p-2 rounded'
                style={{ backgroundColor: '#AAB9FD' }}
                onClick={() => handleAddTextElement()}
              >
                Save
              </button>
              {showInput && (
                <input
                  type='text'
                  value={newTextElement}
                  onChange={(e) => setNewTextElement(e.target.value)}
                  className='border p-2 ml-2'
                />
              )}
            </div>
          )} */}
        </div>
      </div>

      <DragDropArea
        droppedElements={droppedElements}
        onDrop={handleDrop}
        onDelete={handleDeleteTextElement}
        selectedWorkflow={selectedWorkflow} // Pass the selected workflow to DragDropArea
        updateSelectedWorkflow={updateSelectedWorkflow} // Pass the function down
        setDroppedElements={setDroppedElements}
        setWorkflowNames={setWorkflowNames} // Pass setWorkflowNames as a prop
        workflowDetails={workflowDetails}
        workflows={workflows}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default WorkflowPage;
