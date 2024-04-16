import './screening.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaInfoCircle } from 'react-icons/fa';
import ProgressBar from '@ramonak/react-progress-bar';
import Loader from '../../components/loader/Loader';
import { Link, useParams, useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import Swal from 'sweetalert2';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';

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

const Screening = () => {
  const { jobId } = useParams(); // Retrieve the job ID from the URL
  const navigate = useNavigate();
  const [selectedWorkflow, setSelectedWorkflow] = useState('Select Workflow');
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [visibleLoaders, setVisibleLoaders] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);
  const [progress, setProgress] = useState(0);
  //const [totalRunTime, setTotalRunTime] = useState(0);
  const [screeningStarted, setScreeningStarted] = useState(false);
  const [fileDirectory, setFileDirectory] = useState('');

  const [workflows, setWorkflows] = useState([]);
  const [workflowId, setWorkflowId] = useState(-1);
  const [droppedElements, setDroppedElements] = useState([]);

  const [currentProgress, setCurrentProgress] = useState(0);
  //const [currentStatus, setCurrentStatus] = useState("");
  const [currentReqState, setCurrentReqState] = useState('');
  const [dummyState, setDummyState] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [jobTitle, setJobTitle] = useState('');

  //GET ALL THE WORKFLOW FOR THE DROPDOWN
  const getJobById = async () => {
    //setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(`${BASE_URL}JobPost/get-by-id`, jobId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
          'Content-Type': 'application/json', // Set content type to JSON
        },
      });
      setJobTitle(response.data.data.title);
    } catch (error) {
      console.error('Error Job exists by organization id:', error);
    }
  };
  useEffect(() => {
    const setElements = async (workfId) => {
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const requestBody = workfId;

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

        const workflowDetails = response.data.data.workflowDetailResponseModel;
        // Update dropped elements state based on workflow details
        setDroppedElements(workflowDetails);
        startScreening();
        // Update other states or perform additional actions
        setScreeningStarted(true);
      } catch (error) {
        console.error('Error fetching workflow details:', error);
      }
    };
    const getInitWorkflow = async () => {
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const requestBody = jobId;

        const response = await axios.post(
          `${BASE_URL}Result/get-workflow-by-job-id`,
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

        if (response.data.data && response.data.data != 0) {
          setWorkflowId(response.data.data);
          setElements(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching workflow details:', error);
      }
    };
    const getInitStatus = async () => {
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const requestBody = jobId;

        const response = await axios.post(
          `${BASE_URL}JobPost/get-current-request-status-by-id`,
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

        if (response.data.data && response.data.data == 'Completed') {
          navigate(`/result/${jobId}`);
        } else if (
          response.data.data &&
          (response.data.data == 'Queued' ||
            response.data.data == 'In Progress')
        ) {
          setIsInputVisible(false);
          getInitWorkflow();
          // handleStartScreening();
          // setScreeningStarted(true);
        }
      } catch (error) {
        console.error('Error fetching workflow details:', error);
      }
    };
    getJobById();
    getInitStatus();
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
        const workflows = response.data.data; // Assuming the response contains an array of workflow objects
        setWorkflows(workflows);
      })
      .catch((error) => {
        console.error('Error fetching workflows:', error);
      });
  }, []);
  useEffect(() => {
    let progressInterval;
    if (screeningStarted) {
      //getCurrentProgress()
      // const totalRunTime1 = 5500 * droppedElements.length;

      // After the totalRunTime, set screeningStarted to false
      // setTimeout(() => {
      //   setScreeningStarted(false);
      // }, totalRunTime1);

      progressInterval = setInterval(() => {
        getCurrentStatus();
        // if(currentReqState && (currentReqState=='In Progress' || currentReqState=='Completed')){
        //   getCurrentProgress()
        // }
      }, 3000);
    }
    return () => {
      clearInterval(progressInterval); // Cleanup interval on component unmount or when screening is stopped
      setVisibleLoaders([]);
    };
  }, [screeningStarted]);
  useEffect(() => {
    if (
      currentReqState &&
      (currentReqState == 'In Progress' || currentReqState == 'Completed')
    ) {
      getCurrentProgress();
    }
    if (currentReqState && currentReqState == 'Completed') {
      setButtonActive(true);
      if (progress == 0) setProgress(100);
    }
  }, [currentReqState, dummyState]);

  useEffect(() => {
    if (currentReqState == 'In Progress') {
      //getCurrentProgress();
      setVisibleLoaders([
        Math.floor(currentProgress / (100 / droppedElements.length)),
      ]);

      // Check if currentProgress is 0 or 100 and set screeningStarted to false accordingly
      // if (currentProgress === 0 || currentProgress === 96) {
      //   setScreeningStarted(false);
      //   //clearInterval(progressInterval); // Clear interval when screening is stopped
      //   setVisibleLoaders([]);
      // }
    } else if (currentReqState == 'Completed') {
      setScreeningStarted(false);
      //clearInterval(progressInterval); // Clear interval when screening is stopped
      setVisibleLoaders([]);
    }
  }, [currentReqState, currentProgress]);

  // Function to handle dropdown change
  const handleDropdownChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const selectedWorkflowId = selectedOption.getAttribute('id');
    setWorkflowId(selectedWorkflowId);
    setSelectedWorkflow(selectedOption.value);
  };

  const handleStartScreening = () => {
    // Check if a workflow ID is selected before fetching details
    if (workflowId && workflowId != -1) {
      // Fetch workflow details based on the selected workflow ID
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const requestBody = workflowId;

        axios
          .post(`${BASE_URL}WorkFlow/get-by-id`, requestBody, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              userId,
              organizationId,
            },
          })
          .then((response) => {
            const workflowDetails =
              response.data.data.workflowDetailResponseModel;
            // Update dropped elements state based on workflow details
            setDroppedElements(workflowDetails);
            startScreening();
            // Update other states or perform additional actions
            setScreeningStarted(true);
            // Adjust this line based on the actual structure of workflowDetails
          })
          .catch((error) => {
            console.error('Error fetching workflow details:', error);
          });
      } catch (error) {
        console.error('Error fetching workflow details:', error);
      }
    } else {
      // If 'Select Workflow' is chosen, clear the dropped elements
      setDroppedElements([]);
    }
  };

  const getCurrentProgress = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.get(`${BASE_URL}Result/task-progress`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          userId,
          organizationId,
        },
      });
      setCurrentProgress(response.data);
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching workflow details:', error);
    }
  };
  const startScreening = () => {
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    const jobLinkData = {
      jobPostId: jobId,
      workflowId: workflowId,
      userId: userId,
      fileDirectory: fileDirectory,
    };

    axios
      .post(`${BASE_URL}Result/process`, jobLinkData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        // Handle successful response
        // Redirect or perform other actions as needed
      })
      .catch((error) => {
        // console.error('Error creating job:', error);
        // Handle error (display error message, etc.)
        // getCurrentStatus();
        // if(currentStatus){
        //   Swal.fire({
        //     title: 'Your request has been taken!',
        //     text: 'Your current request status : ' + currentStatus,
        //     icon: 'info',
        //   }).then((result) => {
        //   });
        // }
      });
  };

  const getCurrentStatus = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = jobId;

      const response = await axios.post(
        `${BASE_URL}JobPost/get-current-request-status-by-id`,
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
      //console.log('Setting current status:', response.data.data);
      setDummyState((prev) => !prev);
      setCurrentReqState(response.data.data);
    } catch (error) {
      console.error('Error fetching workflow details:', error);
    }
  };

  // useEffect(() => {
  //   screeningStarted && {};

  //   // Log the updated state value after the component re-renders
  //   console.log('screening status', screeningStarted);
  // }, [screeningStarted]);

  const handleStopScreening = () => {
    // ... (existing logic for stopping screening)
    // Set screeningStarted to false when the button is clicked
    setScreeningStarted(false);
  };

  // useEffect(() => {
  //   // Retrieve existing workflows from local storage
  //   const existingWorkflows =
  //     JSON.parse(localStorage.getItem('savedWorkflow')) || [];

  //   // Extract names from existing workflows
  //   const names = existingWorkflows.map((workflow) => workflow.name);

  //   // Set the workflow names in the state
  //   setWorkflowNames(names);

  //   // Set the selected workflow to the first one in the list (you can modify this logic)
  //   if (names.length > 0) {
  //     setSelectedWorkflow('Select Workflow', names[0]);
  //   }
  // }, []);

  // useEffect(() => {
  //   const existingWorkflows =
  //     JSON.parse(localStorage.getItem('savedWorkflow')) || [];
  //   // Find the selected workflow from local storage
  //   const selectedWorkflowData = existingWorkflows.find(
  //     (workflow) => workflow.name === selectedWorkflow
  //   );

  //   console.log(selectedWorkflow);

  //   // Set the text elements for the selected workflow
  //   setTextElements(
  //     selectedWorkflowData
  //       ? selectedWorkflowData.elements || [] // If elements exist, set them; otherwise, set an empty array
  //       : []
  //   );
  // }, [selectedWorkflow]);

  const handleShowTextElements = () => {
    setIsDivVisible((prev) => !prev);
    //console.log(isDivVisible);
  };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0]; // Assuming single file selection
  //   if (file) {
  //     const directoryPath = file.webkitRelativePath.split("/").slice(0, -1).join("/"); // Extract directory path from file
  //     setFileDirectory(directoryPath);
  //   }
  // };

  // useEffect(() => {
  //   if (screeningStarted) {
  //     setVisibleLoaders([]);
  //     const totalLoaders = droppedElements.length;
  //     const l_dorppedElemets = droppedElements.length;
  //     const startTime = Date.now(); // Capture the start time
  //     const loaderTimeouts = [];

  //     // Create an array of loader timeouts
  // droppedElements.forEach((_, index) => {
  //   loaderTimeouts.push(
  //     setTimeout(() => {
  //       setVisibleLoaders([index]); // Update visibleLoaders with the index of the current text element

  //       // If it's the last loader, log the message after 5 seconds
  //       if (index === l_dorppedElemets - 1) {
  //         setTimeout(() => {
  //           setVisibleLoaders([]);
  //           const endTime = Date.now();
  //           const totalTime = endTime - startTime;
  //           console.log(`Total loader run time: ${totalTime} ms`);
  //           console.log('Last loader has finished!');
  //           setButtonActive(true);
  //         }, 5000);
  //       }
  //     }, 5000 * index)
  //   );
  // });

  //     // Sort the loader timeouts based on their execution times
  //     loaderTimeouts.sort((a, b) => a - b);

  //     // Calculate the total run time
  //     const stotalRunTime = 5000 * totalLoaders;
  //     console.log(stotalRunTime, 'Hi');
  //     setTotalRunTime(stotalRunTime);

  //     // Clean up timeouts when component unmounts
  //     return () => {
  //       loaderTimeouts.forEach((timeout) => clearTimeout(timeout));
  //     };
  //   }
  //   setScreeningStarted(false);
  //   // Pass totalRunTime to ProgressBar component
  // }, [screeningStarted, workflowId, droppedElements]);

  // useEffect(() => {
  //   if (screeningStarted) {
  //     let interval;
  //     let currentProgress = 0;

  //     // const startAnimation = () => {
  //     //   if (droppedElements.length === 0 || totalRunTime === 0) {
  //     //     // Handle the case where there are no text elements or totalRunTime is 0
  //     //     //setProgress(0);
  //     //     return;
  //     //   }

  //     //   const steps = totalRunTime / droppedElements.length / 1000;

  //     //   interval = setInterval(() => {
  //     //     currentProgress += 100 / droppedElements.length;
  //     //     setProgress(Math.floor(currentProgress));

  //     //     if (currentProgress >= 100) {
  //     //       clearInterval(interval);
  //     //     }
  //     //   }, steps * 1000);
  //     // };

  //     // Reset progress to 0 when selectedWorkflow changes
  //     //setProgress(0);

  //     startAnimation();

  //     // Clean up the interval when the component unmounts
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }

  //   setScreeningStarted(false);
  // }, [screeningStarted, workflowId, totalRunTime, droppedElements.length]); // Include totalRunTime and textElements.length as dependencies

  return (
    <>
      <div className='flex-1 bg-[#FFFFFF] '>
        <Breadcrumbs
          aria-label='breadcrumb'
          className='cursor-pointer'
          style={{ marginTop: '38px', marginLeft: '38px' }}
        >
          <StyledBreadcrumb
            component='a'
            href='/myjobs'
            label='Manage Jobs'
            icon={<ListAltIcon fontSize='small' />}
          />
          <StyledBreadcrumb label='Screening' />
        </Breadcrumbs>
        <h1 className='text-[28px] font-semibold overflow-x-auto mt-2 flex flex-col items-center'>
          {jobTitle}
        </h1>
        <div className='px-20 pb-20 pt-5'>
          {isInputVisible ? (
            <div className='mx-auto p-10 max-w-2xl bg-white border mb-12 border-gray-300 rounded-md shadow-md'>
              <div className='mb-12 '>
                <div className='flex items-center'>
                  <h2 className='block text-lg font-bold'>
                    Cloud Resume Directory
                    <span className='text-red-500'>*</span>
                  </h2>

                  <Tooltip title='Paste cloud resume folder link (e.g., Google Drive, Dropbox)'>
                    <IconButton>
                      <InfoIcon
                        style={{
                          color: '#66B2FF',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>

                <input
                  type='text'
                  id='CV_link'
                  value={fileDirectory}
                  onChange={(e) => setFileDirectory(e.target.value)}
                  className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                />
              </div>

              <div className='mb-12'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <span className='block text-lg font-bold '>
                      Select Workflow<span className='text-red-500'>*</span>
                    </span>
                    <Tooltip title="Select or create a custom workflow to organize your priorities. Click 'Create Workflow' to set your preferences.">
                      <IconButton>
                        <InfoIcon
                          style={{
                            color: '#66B2FF',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <div className='flex items-center '>
                    <FaCirclePlus
                      style={{ color: 'green', textDecoration: 'underline' }}
                    />
                    <Link
                      // to='/WorkflowPage'
                      to={{
                        pathname: `/WorkflowPage`,
                        search: `?redirect=${encodeURIComponent(
                          `/screening/${jobId}`
                        )}`,
                      }}
                    >
                      <button
                        className='text-blue-500 ml-1'
                        style={{
                          fontSize: '14px',
                          textDecoration: 'underline',
                        }}
                      >
                        Create Workflow
                      </button>
                    </Link>
                  </div>
                </div>

                <select
                  className='w-full border p-2 mb-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                  // value={workflowId}
                  onChange={(e) => {
                    setWorkflowId(e.target.value);
                    handleDropdownChange(e);
                  }}
                  disabled={screeningStarted}
                >
                  <option>Select Workflow</option>
                  {workflows.map((workflow) => (
                    <option
                      key={workflow.id}
                      value={workflow.name}
                      id={workflow.id}
                    >
                      {workflow.name}
                    </option>
                  ))}
                </select>

                <button
                  className={`mt-2 px-4 py-2 rounded-md ${
                    workflowId === -1
                      ? 'bg-gray-500 text-white' // Gray when disabled
                      : screeningStarted
                      ? 'bg-gray-500 text-white' // Black when screeningStarted is true
                      : 'bg-blue-500 text-white' // Blue when active
                  }`}
                  style={{ float: 'right' }}
                  onClick={handleStartScreening}
                  disabled={workflowId === -1 || screeningStarted}
                  title={workflowId === -1 ? 'Please select a workflow' : ''}
                >
                  Start Screening
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className='mx-auto p-10 max-w-2xl border bg-white border-gray-300 rounded-md shadow-md'>
            <span>
              Current Status :{' '}
              {currentReqState ? currentReqState : 'Not Started'}
            </span>
            <ProgressBar
              completed={progress}
              bgColor='#5674FC'
              labelColor='#ffffff'
              animateOnRender
              style={{ width: '300px', height: '20px' }} // Add your desired styles
            />

            <button
              className={`mt-2  ${
                !isDivVisible ? 'text-blue-500' : 'text-black'
              }`}
              style={{
                fontSize: '12px',
                textDecoration: 'underline',
                float: 'right',
              }}
              onClick={handleShowTextElements}
              disabled={workflowId === -1}
            >
              Show Progress Details
            </button>

            {isDivVisible && workflowId !== -1 && (
              <div id='1'>
                <div className='mt-8'>
                  {workflowId !== -1 && (
                    <div className='flex items-center'>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className='text-green-500 mr-2'
                      />
                      <span className='text-green-500 font-semibold'>
                        Selected Workflow: {selectedWorkflow}
                      </span>
                    </div>
                  )}
                </div>

                <div className='mt-8 relative'>
                  {droppedElements.map((element, index) => (
                    <div
                      key={element.id}
                      className='flex flex-col items-center'
                    >
                      <button className='relative group'>
                        <div
                          className={`bg-blue-400 text-white relative p-2 rounded shadow-lg ${
                            visibleLoaders.includes(index) &&
                            'bg-green-400 text-black'
                          }`}
                          style={{ width: '120px' }}
                        >
                          <div className='flex items-center'>
                            <span className='mr-2'>
                              {element.workflowTypeName}
                            </span>
                            {visibleLoaders.includes(index) && <Loader />}
                          </div>
                        </div>
                      </button>

                      {index < droppedElements.length - 1 && (
                        <div className='m-4'>
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            className='text-2xl'
                            style={{ color: '#60A5FA' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='mx-auto mb-12 pt-10 max-w-2xl flex justify-end'>
            {screeningStarted ? (
              <button
                className='mt-2 bg-red-500 text-white px-4 py-2 rounded-md'
                onClick={handleStopScreening}
                disabled={!screeningStarted}
              >
                Stop Screening
              </button>
            ) : buttonActive ? (
              <Link className='flex' to={`/result/${jobId}`}>
                <button className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'>
                  View Result
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Screening;
