import { useState, useEffect, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { TextField, Autocomplete, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
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

const CreateJob = () => {
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const [jobLink, setJobLink] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');

  const [selectedEducation, setSelectedEducation] = useState([]);
  const [jobMinExperience, setJobMinExperience] = useState('');
  const [jobMaxExperience, setJobMaxExperience] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [selectedJobType, setSelectedJobType] = useState('Select Job Type');
  const [jobType, setJobType] = useState([]);
  const [jobtypeId, setjobtypeId] = useState(-1);

  const [selectedWorkPlace, setSelectedWorkPlace] =
    useState('Select Work Place');
  const [workPlace, setWorkPlace] = useState([]);
  const [workPlaceId, setWorkPlaceId] = useState(-1);

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);

  const education = [
    "Bachelor's Degree (BSc)",
    "Master's Degree (MSc)",
    'Doctorate/Ph.D.',
    'High School Diploma/GED',
    'Vocational/Technical Training',
    'High School Certificate',
    'Postgraduate Diploma',
  ];

  //GET ALL THE WORKPLACE FOR THE DROPDOWN
  useEffect(() => {
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    axios
      .get(`${BASE_URL}JobPost/get-all-workplace`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        const workPlace = response.data.data; // Assuming the response contains an array of workflow objects
        setWorkPlace(workPlace);
      })
      .catch((error) => {
        console.error('Error fetching Work Place:', error);
      });
  }, []);

  //GET ALL THE SKILLS FOR THE DROPDOWN
  useEffect(() => {
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    axios
      .get(`${BASE_URL}JobPost/get-all-skills`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        const skills = response.data.data; // Assuming the response contains an array of workflow objects
        setSkills(skills);
        console.log(skills);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  //POST CREATE JOB BY LINK
  const handleCreateJobLink = (e) => {
    e.preventDefault();
    const initialBorderColor = '#B5B5B5';
    // Check if jobLink is empty
    if (jobLink.trim() === '') {
      // Set focus to the input field
      document.getElementById('jobLink').focus();

      // You can also change the border color to red
      // Update the input field style accordingly
      document.getElementById('jobLink').style.borderColor = 'red';

      document.getElementById('jobLink').onblur = function () {
        this.style.borderColor = initialBorderColor;
      };

      console.log('Job Link is required');
      return; // Prevent further execution of the function
    }
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    const jobLinkData = {
      url: jobLink,
      organizationId: organizationId,
      modifiedBy: userId,
    };

    axios
      .post(`${BASE_URL}JobPost/save-by-url`, jobLinkData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        // Handle successful response
        console.log('Job created successfully:', response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Create Job Successfully',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/myjobs'); // Redirect to "/myjobs" on success
          }
        });
        // Redirect or perform other actions as needed
      })
      .catch((error) => {
        console.error('Error creating job:', error);
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong!',
          icon: 'error',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/create'); // Redirect to "/myjobs" on success
          }
        });
        // Handle error (display error message, etc.)
      });
  };

  //POST CREATE JOB MANUALLY
  const handleCreateJob = (e) => {
    e.preventDefault();
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    const jobData = {
      modifiedBy: userId, // Your user ID here
      organizationId: organizationId, // Your organization ID here
      title: jobTitle,
      description: jobDescription,
      jobType: jobtypeId,
      minExperience: jobMinExperience,
      maxExperience: jobMaxExperience,
      location: jobLocation,
      education: selectedEducation.join(','),
      skills: selectedSkills.join(','),
      workPlace: workPlaceId,
      status: 14,
    };

    axios
      .post(`${BASE_URL}JobPost/save`, jobData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        // Handle successful response
        console.log('Job created successfully:', response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Create Job Successfully',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/myjobs'); // Redirect to "/myjobs" on success
          }
        });

        // Redirect or perform other actions as needed
      })
      .catch((error) => {
        console.error('Error creating job:', error);
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong!',
          icon: 'error',
        });
        // Handle error (display error message, etc.)
      });
  };

  //GET ALL THE JOBTYPE FOR THE DROPDOWN
  useEffect(() => {
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    axios
      .get(`${BASE_URL}JobPost/get-all-job-type`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        const jobType = response.data.data; // Assuming the response contains an array of workflow objects
        setJobType(jobType);
      })
      .catch((error) => {
        console.error('Error fetching jobtype:', error);
      });
  }, []);

  // Function to handle dropdown change (JobType)
  const handleDropdownChange = (e) => {
    const selectedJobTypeId = e.target.options[e.target.selectedIndex].id;
    setjobtypeId(selectedJobTypeId);
  };

  // Function to handle dropdown change (WorkPlace)
  const handleDropdownChangeWorkPlace = (e) => {
    const selectedWorkPlaceId = e.target.options[e.target.selectedIndex].id;
    setWorkPlaceId(selectedWorkPlaceId);
  };

  const handleDiv1Click = () => {
    const firstDiv = firstDivRef.current;
    const secondDiv = secondDivRef.current;
    if (firstDiv) {
      firstDiv.style.zIndex = '-50'; // Change the z-index to your desired value
    }
    if (secondDiv) {
      secondDiv.style.zIndex = '50';
    }
    setIsDisable(true);
  };
  const handleDiv2Click = () => {
    const firstDiv = firstDivRef.current;
    const secondDiv = secondDivRef.current;
    if (secondDiv) {
      secondDiv.style.zIndex = '-50'; // Change the z-index to your desired value
    }
    if (firstDiv) {
      firstDiv.style.zIndex = '50'; // Change the z-index to your desired value
    }
    setIsDisable(false);
  };

  return (
    <div className='bg-[#E7EAEE] pb-[100px] flex-1'>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '20px', marginLeft: '20px' }}>
  <StyledBreadcrumb
    component="a"
    href="#"
    label="Home"
    icon={<HomeIcon fontSize="small" />}
  />
  <StyledBreadcrumb
    label="CreateJob"
    
  />
</Breadcrumbs>
      <div className='flex flex-col items-center'>
        {/* First Div - Upload Area */}
        <div
          ref={firstDivRef}
          className='w-full h-[30%] bg-transparent -z-50 absolute'
          onClick={handleDiv1Click}
        ></div>
        <div
          className='mb-[70px] w-2/4 flex flex-col justify-center'
          onClick={handleDiv1Click}
        >
          <label htmlFor='jobLink' className='block text-lg font-bold mb-2'>
            Job Link
          </label>
          <div onClick={handleDiv1Click}>
            <input
              type='text'
              disabled={isDisable ? false : true}
              id='jobLink'
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>

          <button
            onClick={handleCreateJobLink}
            disabled={isDisable ? false : true}
            className={`w-full px-4 py-2 my-2 rounded ${
              !isDisable ? 'bg-black text-white' : 'bg-[#5674FC] text-white'
            }`}
            // className='bg-[#5674FC] w-full text-white px-4 py-2 my-2 rounded'
          >
            Create Job
          </button>
        </div>

        {/* Second Div - Job Title, Description, and Create Button */}
        <div
          ref={secondDivRef}
          onClick={handleDiv2Click}
          className='w-full h-[70%] top-[40%] mt-20 bg-transparent z-50 absolute'
        ></div>
        <div className='w-2/4 flex flex-col' onClick={handleDiv2Click}>
          <h3 className='text-lg font-semibold mb-10 text-center'>Or</h3>

          <div className='mb-2 w-full flex flex-col justify-center'>
            <label htmlFor='jobTitle' className='block text-lg font-bold mb-2 '>
              Job Title
            </label>
            <input
              type='text'
              id='jobTitle'
              value={jobTitle}
              disabled={!isDisable ? false : true}
              onClick={handleDiv2Click}
              onChange={(e) => setJobTitle(e.target.value)}
              className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
            />
            <div className='flex'>
              {/* 'jobType' div */}
              <div className='mb-2 w-1/2 pr-2'>
                <label
                  className='block text-lg font-bold mb-2'
                  htmlFor='workflowType'
                >
                  Job Type
                </label>
                <select
                  className='w-full h-10 border mb-4  p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                  id='jobType'
                  disabled={!isDisable ? false : true}
                  value={selectedJobType}
                  onClick={handleDiv2Click}
                  onChange={(e) => {
                    setSelectedJobType(e.target.value);
                    handleDropdownChange(e);
                  }}
                >
                  <option key={-1} value={'Select Workflow'} id={-1}>
                    Select Job Type
                  </option>
                  {jobType.map((jobType) => (
                    <option
                      key={jobType.id}
                      value={jobType.name}
                      id={jobType.id}
                    >
                      {jobType.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 'location' div */}
              <div className='mb-2 w-1/2 pr-2'>
                <label
                  className='block text-lg font-bold mb-2 ml-2'
                  htmlFor='workflowType'
                >
                  Location
                </label>
                <input
                  type='string'
                  id='location'
                  onClick={handleDiv2Click}
                  disabled={!isDisable ? false : true}
                  className='w-full mb-4 ml-2  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300 '
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                />
              </div>
            </div>

            <div className='flex'>
              {/* 'education' div */}
              <div className='mb-2 w-1/2 pr-2'>
                <label
                  className='block text-lg font-bold mb-2'
                  htmlFor='education'
                >
                  Education
                </label>
                {/* <div className='flex items-center'>
                  <input
                    type='string'
                    id='Education'
                    className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                    value={jobEducation}
                    onChange={(e) => setJobEducation(e.target.value)}
                  />
                </div> */}
                <Autocomplete
                  sx={{
                    background: '#fff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px', // Set the border radius for the entire input field
                    },

                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#B5B5B5', // Set the border color
                      // Set the border radius
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3182CE', // Set the focused border color
                      // Additional styles for focused state
                    },

                    '& .MuiInputLabel-root.Mui-focused': {
                      transform: 'translate(14px, 10px) scale(0.75)', // Adjust placeholder position
                    },
                    // '& .MuiAutocomplete-inputRoot': {
                    //   height: '40px', // Adjust the height as needed
                    // },
                    '& .MuiInputLabel-root': {
                      transform: 'translate(14px, 16px) scale(1)', // Adjust placeholder position
                    },

                    // '& .MuiAutocomplete-tag': {
                    //   display: 'none', // Hide selected items inside Autocomplete
                    // },
                  }}
                  multiple
                  options={education}
                  getOptionLabel={(option) => option}
                  onClick={handleDiv2Click}
                  disableCloseOnSelect
                  disabled={!isDisable ? false : true}
                  onChange={(event, value) => setSelectedEducation(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      // label='Multiple Autocomplete'
                      placeholder='Select Education'
                      className='w-full'
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <MenuItem
                      {...props}
                      key={option}
                      value={option}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      {option}
                      {selected ? <CheckIcon color='info' /> : null}
                    </MenuItem>
                  )}
                />
              </div>

              {/* 'workplace' div */}
              <div className='mb-2 w-1/2 pr-2'>
                <label
                  className='block text-lg font-bold mb-2 ml-2'
                  htmlFor='workflowType'
                >
                  Work Place
                </label>
                <select
                  className='w-full mb-4 ml-2  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                  id='workflowType'
                  onClick={handleDiv2Click}
                  value={selectedWorkPlace}
                  disabled={!isDisable ? false : true}
                  onChange={(e) => {
                    setSelectedWorkPlace(e.target.value);
                    handleDropdownChangeWorkPlace(e);
                  }}
                >
                  <option key={-1} value={'Select Work Place'} id={-1}>
                    Select Work Place
                  </option>
                  {workPlace.map((workPlace) => (
                    <option
                      key={workPlace.id}
                      value={workPlace.name}
                      id={workPlace.id}
                    >
                      {workPlace.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex'>
              {/* 'MinExp' div */}
              <div className='mb-2 w-1/2 pr-2'>
                <label
                  className='block text-lg font-bold mb-2'
                  htmlFor='experience'
                >
                  Min Experience
                </label>
                <div className='flex items-center'>
                  <input
                    type='number'
                    disabled={!isDisable ? false : true}
                    onClick={handleDiv2Click}
                    id='experience'
                    className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                    value={jobMinExperience}
                    onChange={(e) => setJobMinExperience(e.target.value)}
                  />
                  <span className='text-gray-600 bg-white self-center border-l p-2 h-9 mb-4 rounded ml-1  flex items-center'>
                    Years
                  </span>
                </div>
              </div>

              {/* 'MaxExp' div */}
              <div className='mb-2 w-1/2 pl-2'>
                <label
                  className='block text-lg font-bold mb-2'
                  htmlFor='experience'
                >
                  Max Experience
                </label>
                <div className='flex items-center'>
                  <input
                    type='number'
                    id='experience'
                    onClick={handleDiv2Click}
                    disabled={!isDisable ? false : true}
                    className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                    value={jobMaxExperience}
                    onChange={(e) => setJobMaxExperience(e.target.value)}
                  />
                  <span className='text-gray-600 bg-white mb-4 self-center border-l p-2 h-9 rounded ml-1  flex items-center'>
                    Years
                  </span>
                </div>
              </div>
            </div>

            <div className='flex'>
              {/* 'skills' div */}
              <div className='mb-2 w-full pr-2'>
                <label
                  className='block text-lg font-bold mb-2'
                  htmlFor='workflowType'
                >
                  Skills
                </label>
                <Autocomplete
                  sx={{
                    background: '#fff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px', // Set the border radius for the entire input field
                    },

                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#B5B5B5', // Set the border color
                      // Set the border radius
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3182CE', // Set the focused border color
                      // Additional styles for focused state
                    },

                    '& .MuiInputLabel-root.Mui-focused': {
                      transform: 'translate(14px, 10px) scale(0.75)', // Adjust placeholder position
                    },
                    // '& .MuiAutocomplete-inputRoot': {
                    //   height: '40px', // Adjust the height as needed
                    // },
                    '& .MuiInputLabel-root': {
                      transform: 'translate(14px, 16px) scale(1)', // Adjust placeholder position
                    },
                    // '& .MuiAutocomplete-tag': {
                    //   display: 'none', // Hide selected items inside Autocomplete
                    // },
                  }}
                  multiple
                  options={skills}
                  getOptionLabel={(option) => option}
                  onClick={handleDiv2Click}
                  disableCloseOnSelect
                  disabled={!isDisable ? false : true}
                  onChange={(event, value) => setSelectedSkills(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      // label='Multiple Autocomplete'
                      placeholder='Select Skills'
                      className='w-full'
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <MenuItem
                      {...props}
                      key={option}
                      value={option}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      {option}
                      {selected ? <CheckIcon color='info' /> : null}
                    </MenuItem>
                  )}
                />
                {/* <div className='mt-2'>
                    {selectedSkills.map((item, index) => (
                      <div
                        key={index}
                        className='bg-gray-200 p-2 rounded-md inline-block mr-2'
                      >
                        {item}
                        <CloseIcon
                          className='ml-1 cursor-pointer'
                          onClick={() => handleRemoveSkill(index)}
                        />
                      </div>
                    ))}
                  </div> */}
              </div>
            </div>
          </div>

          <div className='mb-2 w-full flex flex-col justify-center my-4'>
            <label
              htmlFor='jobDescription'
              className='block text-lg font-bold mb-2'
            >
              Job Description
            </label>
            <textarea
              id='jobDescription'
              value={jobDescription}
              onClick={handleDiv2Click}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={!isDisable ? false : true}
              rows='4'
              className=' mb-4 h-[190px]  border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
            ></textarea>
          </div>
          <Link to='/myjobs'>
            <button
              onClick={handleCreateJob}
              disabled={!isDisable ? false : true}
              className={`w-full px-4 py-2 my-2 rounded ${
                isDisable ? 'bg-black text-white' : 'bg-[#5674FC] text-white'
              }`}
            >
              Create Job
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
