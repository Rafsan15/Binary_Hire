import { useState, useEffect, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { TextField, Autocomplete, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
  const [loading, setLoading] = useState(false);

  const [selectedEducation, setSelectedEducation] = useState([]);
  const [jobMinExperience, setJobMinExperience] = useState('0');
  const [jobMaxExperience, setJobMaxExperience] = useState('0');
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

  const [jobTitleError, setJobTitleError] = useState('');
  const [jobLocationError, setJobLocationError] = useState('');
  const [jobDescriptionError, setJobDescriptionError] = useState('');
  const [maxExperienceError, setMaxExperienceError] = useState('');
  const [jobTypeError, setJobTypeError] = useState('');
  const [skillsError, setSkillsError] = useState('');
  const [educationError, setEducationError] = useState('');
  const [workPlaceError, setWorkPlaceError] = useState('');
  const [jobLinkError, setJobLinkError] = useState('');

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
    setLoading(true);
    e.preventDefault();
    const initialBorderColor = '#B5B5B5';
    // Check if jobLink is empty
    if (jobLink.trim() === '') {
      setJobLinkError('Job Link is required');
      // Set focus to the input field
      document.getElementById('jobLink').focus();

      // You can also change the border color to red
      // Update the input field style accordingly
      document.getElementById('jobLink').style.borderColor = 'red';

      document.getElementById('jobLink').style.boxShadow = '0 0 0 .2px red';

      document.getElementById('jobLink').onblur = function () {
        this.style.borderColor = initialBorderColor;
        this.style.boxShadow = null;
      };

      console.log('Job Link is required');
      setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
    setLoading(true);
    e.preventDefault();
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    setJobTitleError('');
    setJobLocationError('');
    setJobDescriptionError('');

    // Validate job title
    if (!jobTitle.trim()) {
      setJobTitleError('Job Title is required');
    }

    // Validate job type
    if (!selectedJobType || selectedJobType === 'Select Job Type') {
      setJobTypeError('Job Type is required');
    }

    // Validate job location
    if (!jobLocation.trim()) {
      setJobLocationError('Location is required');
    }

    // Validate job description
    if (!jobDescription.trim()) {
      setJobDescriptionError('Job Description is required');
    }

    if (!selectedWorkPlace || selectedWorkPlace === 'Select Work Place') {
      setWorkPlaceError('Work Place is required');
    }

    // Validate selectedSkills
    if (selectedSkills.length === 0) {
      setSkillsError('Skills are required');
    }

    // Validate selectedEducation
    if (selectedEducation.length === 0) {
      setEducationError('Education is required');
    }

    // If any error exists, prevent form submission
    if (
      jobTitleError !== '' ||
      jobTypeError !== '' ||
      jobLocationError !== '' ||
      jobDescriptionError !== '' ||
      workPlaceError !== '' ||
      skillsError !== '' ||
      educationError !== ''
    ) {
      setLoading(false);
      console.log(
        jobTitleError,
        jobTypeError,
        jobLocationError,
        jobDescriptionError,
        workPlaceError,
        skillsError,
        educationError
      );
      return;
    }

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
        setLoading(false);
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
        setLoading(false);
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

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className='w-full bg-[#FFFFFF] pb-[100px] flex-1 mt-10'>
      {loading && (
        <div>
          <div className='backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50'></div>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50'></div>
        </div>
      )}
      {/* <Breadcrumbs
        aria-label="breadcrumb"
        style={{ marginTop: "20px", marginLeft: "20px" }}
      >
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb label="CreateJob" />
      </Breadcrumbs> */}
      <div className='w-full flex flex-col items-center'>
        <div className='w-full flex justify-center mb-4'>
          <button
            className={`py-2 px-4 rounded-tl-md ${
              activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleTabChange(1)}
          >
            Job Details
          </button>
          <button
            className={`py-2 px-4 rounded-tr-md ${
              activeTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleTabChange(2)}
          >
            Job Link
          </button>
        </div>

        {activeTab === 1 && (
          <div>
            {/* Content for the first tab */}
            <div className='w-full flex flex-col'>
              <div className='mb-2 w-full flex flex-col justify-center'>
                <label
                  htmlFor='jobTitle'
                  className='block text-lg font-bold mb-2 '
                >
                  Job Title
                </label>
                <input
                  type='text'
                  required
                  id='jobTitle'
                  value={jobTitle}
                  onClick={handleDiv2Click}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    setJobTitleError(
                      e.target.value.trim() ? '' : 'Job Title is required'
                    );
                  }}
                  className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                />
                {jobTitleError && (
                  <span className='error text-red-500'>{jobTitleError}</span>
                )}
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
                      value={selectedJobType}
                      onClick={handleDiv2Click}
                      onChange={(e) => {
                        setSelectedJobType(e.target.value);
                        handleDropdownChange(e);
                        console.log(e.target.value);
                        setJobTypeError(
                          e.target.value.trim() !== '' &&
                            e.target.value !== 'Select Job Type'
                            ? ''
                            : 'Job Type is required'
                        );
                      }}
                    >
                      <option key={-1} value={'Select Job Type'} id={-1}>
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
                    {jobTypeError && (
                      <span className='error text-red-500'>{jobTypeError}</span>
                    )}
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
                      className='w-full mb-4 ml-2  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300 '
                      value={jobLocation}
                      onChange={(e) => {
                        setJobLocation(e.target.value);
                        setJobLocationError(
                          e.target.value.trim() ? '' : 'Location is required'
                        );
                      }}
                    />
                    {jobLocationError && (
                      <span className='error text-red-500'>
                        {jobLocationError}
                      </span>
                    )}
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
                      onChange={(event, value) => {
                        setSelectedEducation(value);
                        setEducationError(
                          value.length > 0 ? '' : 'Education is required'
                        );
                      }}
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
                    {educationError && (
                      <span className='error text-red-500'>
                        {educationError}
                      </span>
                    )}
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
                      onChange={(e) => {
                        setSelectedWorkPlace(e.target.value);
                        handleDropdownChangeWorkPlace(e);
                        setWorkPlaceError(
                          e.target.value !== 'Select Work Place'
                            ? ''
                            : 'Work Place is required'
                        );
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
                    {workPlaceError && (
                      <span className='error text-red-500'>
                        {workPlaceError}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className='flex'>
                    {/* 'MinExp' div */}
                    <div className='mb-2 w-1/2 pr-2'>
                      <label
                        className='block text-lg font-bold mb-2'
                        htmlFor='experience'
                      >
                        Minimum Experience
                      </label>
                      <div className='flex items-center'>
                        <input
                          type='number'
                          onClick={handleDiv2Click}
                          id='experience'
                          className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                          value={jobMinExperience}
                          min='0'
                          onChange={(e) => {
                            let value = parseInt(e.target.value);

                            if (value < 0) {
                              value = 0;
                            }
                            setJobMinExperience(value);
                          }}
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
                        Maximum Experience
                      </label>
                      <div className='flex items-center'>
                        <input
                          type='number'
                          id='experience'
                          onClick={handleDiv2Click}
                          className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                          value={jobMaxExperience}
                          min='0'
                          onChange={(e) => {
                            let value = parseInt(e.target.value);

                            if (value < 0) {
                              value = 0;
                            }
                            if (value < jobMinExperience) {
                              setMaxExperienceError(
                                'Maximum experience cannot be less than minimum experience'
                              );
                            } else {
                              setMaxExperienceError(''); // Clear the error message if the condition is met
                            }
                            setJobMaxExperience(value);
                          }}
                        />
                        <span className='text-gray-600 bg-white mb-4 self-center border-l p-2 h-9 rounded ml-1  flex items-center'>
                          Years
                        </span>
                      </div>
                    </div>
                  </div>
                  {maxExperienceError && (
                    <span className='error text-red-500'>
                      {maxExperienceError}
                    </span>
                  )}
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
                      required
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
                      onChange={(event, value) => {
                        setSelectedSkills(value);
                        setSkillsError(
                          value.length > 0 ? '' : 'Skills are required'
                        );
                      }}
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
                    {skillsError && (
                      <span className='error text-red-500'>{skillsError}</span>
                    )}
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
                  required
                  onClick={handleDiv2Click}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setJobDescriptionError(
                      e.target.value.trim() ? '' : 'Job Description is required'
                    );
                  }}
                  rows='4'
                  className=' mb-4 h-[190px]  border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                ></textarea>
                {jobDescriptionError && (
                  <span className='error text-red-500'>
                    {jobDescriptionError}
                  </span>
                )}
              </div>
              <Link to='/myjobs'>
                <button
                  onClick={handleCreateJob}
                  className='w-full px-4 py-2 my-2 rounded bg-[#5674FC] text-white'
                >
                  Create Job
                </button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className='w-1/2 px-14'>
            {/* Content for the second tab */}
            <div
              className='w-full flex flex-col justify-center'
              onClick={handleDiv1Click}
            >
              <label htmlFor='jobLink' className='block text-lg font-bold mb-2'>
                Job Application Link
                <Tooltip title='Provide URL of your desire Job Post '>
                  <IconButton>
                    <InfoIcon
                      style={{
                        color: '#66B2FF',
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </label>

              <div onClick={handleDiv1Click}>
                <input
                  type='text'
                  id='jobLink'
                  value={jobLink}
                  onChange={(e) => {
                    setJobLink(e.target.value);
                    // Clear the error message when the user starts typing again
                    setJobLinkError('');
                  }}
                  className='w-full mb-4  h-10 border p-2 border-[#B5B5B5] rounded-[10px] focus:outline-none focus:ring focus:border-blue-300'
                />
                {jobLinkError && (
                  <span className='error text-red-500'>{jobLinkError}</span>
                )}
              </div>

              <button
                onClick={handleCreateJobLink}
                className='w-full px-4 py-2 my-2 rounded bg-[#5674FC] text-white'
                // className='bg-[#5674FC] w-full text-white px-4 py-2 my-2 rounded'
              >
                Create Job
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
