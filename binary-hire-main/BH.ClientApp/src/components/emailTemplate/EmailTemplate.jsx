import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../app_settings';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import InfoIcon from '@mui/icons-material/Info';
import { Icon } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip'; // Import Chip component
import { emphasize, styled } from '@mui/material/styles';
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
});

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const EmailTemplateEditor = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [option, setOption] = useState('');
  const [emailTypes, setEmailTypes] = useState([]);
  const [emails, setEmails] = useState([]);
  const [matchingEmail, setMatchingEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();

    getAllTheEmailTypesForTheDropdown();
  }, []);

  

  const fetchData = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      axios.post(
        `${BASE_URL}EmailTemplate/check-template-email-exists-by-organization-id`,
        organizationId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error email exists by organization id:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}EmailTemplate/save`,
        {
          emailTypeId: parseInt(option),
          subject,
          body,
          organizationId,
          id: matchingEmail.id,
          modifiedBy: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      Swal.fire({
        title: 'Success!',
        text: 'Successfully updated',
        icon: 'success',
      })
      console.log('Save response:', response.data);
    } catch (error) {
      setLoading(false);
      console.error('Error saving:', error);
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      })
    }
  };

  // GET ALL THE EMAIL TYPES FOR THE DROPDOWN
  const getAllTheEmailTypesForTheDropdown = async () => {
    setLoading(true);
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    axios
      .get(`${BASE_URL}EmailTemplate/get-all-email-template-type`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        setLoading(false);
        const emailTypeData = response.data.data; // Assuming the response contains an array of email types
        setEmailTypes(emailTypeData);

        // Set the default option to the first value from emailTypes
        if (emailTypeData.length > 0) {
          setOption(emailTypeData[0].id);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching Email Types:', error);
      });
  };

  // GET ALL THE EMAIL

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const response = await axios.post(
          `${BASE_URL}EmailTemplate/get-all`,
          {
            page: 1,
            pageSize: 10,
            organizationId,
          },
          {
            headers: {
              userId,
              organizationId,
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setLoading(false);
        setEmails(response.data.data);

        const matchedEmail = response.data.data.find((email) => {
          return email.emailTypeId === parseInt(option);
        });
        if (matchedEmail) {
          setMatchingEmail(matchedEmail);
          setSubject(matchedEmail.subject); // Set the subject from the matching email
          setBody(matchedEmail.body);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching Emails:', error);
      }
    };
    fetchEmails();
  }, [option]);

  return (
     
    <div className='flex'>
       {/* <Breadcrumbs aria-label="breadcrumb" className="cursor-pointer" style={{ marginTop: '38px', marginLeft: '38px' }}>
  <StyledBreadcrumb
    component="a"
    href="/myjobs"
    label="Manage Jobs"
    icon={<ListAltIcon fontSize="small" />}
  />
  <StyledBreadcrumb
    label="Screening"
    
  />
</Breadcrumbs> */}
      {loading && 
            <div>
                <div className="backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>
                <div className="rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50"></div>
            </div>}
      {/* Left side */}
      {/* <div className='border p-4 rounded-lg  bg-[#CEF3F5]'>
        <h3 className="text-sm font-semibold mb-2">Workplace</h3>
        
      </div> */}
        <div className='w-1/3 p-8 bg-[#ffffff]'>
            <div className='max-w-xl border p-6 rounded-lg  bg-[#CEF3F5]'>
              <h1 className='text-xl font-bold mb-4'>Choose Email Type</h1>
              <div className='mb-4'>
                <select
                  id='option'
                  className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  {emailTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='max-w-xl mt-4 border p-6 rounded-lg  bg-[#CEF3F5]'>
                <div className='mt-2'>
                <h2 className='text-lg font-bold mb-2'>
                  Mandatory Rules
                </h2>
                <span className='text-red-500'>*</span> Utilize the <code className="bg-[#869fb2] text-white px-2 py-1 rounded-md">@#userName#@</code> tag to generate the applicant's name.
                <br/>
                <br/>
                <span className='text-red-500'>*</span> Utilize the <code className="bg-[#869fb2] text-white px-2 py-1 rounded-md">@#jobTitle#@</code> tag to generate the job title.
                <br/>
                <br/>
                <span className='text-red-500'>*</span> Utilize the <code className="bg-[#869fb2] text-white px-2 py-1 rounded-md">@#companyName#@</code> tag to generate the Company name.
                {/* <br/>
                <br/>
                <span className='text-red-500'>*</span> Add you name in the <code className="bg-[#869fb2] text-white px-2 py-1 rounded-md">[Add Name]</code> section
                <br/>
                <br/>
                <span className='text-red-500'>*</span> Add you designation in the <code className="bg-[#869fb2] text-white px-2 py-1 rounded-md">[Designation]</code> section */}

        

              {/* <ul className='list-disc pl-6'>
                <li className="inline-block">
                </li>
              </ul> */}

               </div>
            </div>

        </div>

      {/* Right side */}
      <div className='w-3/4 bg-gray-100 p-8'>
        <h1 className='text-xl font-bold mb-4'>
          Email Template For{' '}
          {option
            ? emailTypes.find((type) => type.id === parseInt(option))?.name
            : ''}
        </h1>
        <div className='mb-4'>
          <label
            htmlFor='subject'
            className='block text-gray-700 font-semibold mb-2'
          >
            Subject:
          </label>
          <input
            type='text'
            id='subject'
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='body'
            className='block text-gray-700 font-semibold mb-2'
          >
            Email Body:
          </label>
          <textarea
            id='body'
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
            rows='18'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button
          className='bg-blue-500 mb-20  text-white py-2 px-4 rounded hover:bg-blue-600'
          style={{ float: 'right' }}
          onClick={handleSave}
        >
          Save
        </button>
       
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
