import { useState, useEffect, useRef } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import { FiEye } from 'react-icons/fi';

import BASE_URL from '../../../app_settings';
import axios from 'axios';
import Cookies from 'js-cookie';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import EditNoteIcon from '@mui/icons-material/EditNote';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(70, 130, 180)',
    // backgroundColor: 'rgba(0, 163, 255, 0.7)',

    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableResult = ({
  result,
  jobId,
  jobPost,
  isAssessmentDone,
  jobStatus,
}) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownPosition = useRef({});

  const handleActionClick = (item, event) => {
    setSelectedItem(item);
    setIsDropdownOpen(!isDropdownOpen);
    const rect = event?.target.getBoundingClientRect();
    if (rect) {
      dropdownPosition.current = {
        top: rect.top + window.scrollY + event.target.offsetHeight,
        left: rect.left + window.scrollX,
      };
    }
  };

  const handleOptionClick = (action) => {
    // Handle option click here based on the action
    console.log('Selected action:', action);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchEmailAccept = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}EmailTemplate/get-all`,
        {
          searchModel: {
            columnFilter: [
              {
                columnName: 'emailTypeId',
                columnValue: ['21'],
                columnValueType: 'number',
              },
            ],
          },
          page: 1,
          pageSize: 1,
          organizationId: organizationId,
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

      return response.data.data;
    } catch (error) {
      console.error('Error fetching Emails:', error);
    }
  };

  const fetchEmailReject = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}EmailTemplate/get-all`,
        {
          searchModel: {
            columnFilter: [
              {
                columnName: 'emailTypeId',
                columnValue: ['22'],
                columnValueType: 'number',
              },
            ],
          },
          page: 1,
          pageSize: 1,
          organizationId: organizationId,
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

      return response.data.data;
    } catch (error) {
      console.error('Error fetching Emails:', error);
    }
  };

  const handleReject = async (item) => {
    let response = await fetchEmailReject();
    const subject = response[0].subject.replace('@#jobTitle#@', jobPost?.title);
    const organizationName = Cookies.get('organizationName');
    let body = response[0].body.replace(/@#userName#@/g, item.name);
    body = body.replace(/@#jobTitle#@/g, jobPost?.title);
    body = body.replace(/@#companyName#@/g, organizationName);

    const mailtoUrl = `mailto:${item.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleAccept = async (item) => {
    let response = await fetchEmailAccept();
    const subject = response[0].subject.replace('@#jobTitle#@', jobPost?.title);
    const organizationName = Cookies.get('organizationName');
    let body = response[0].body.replace(/@#userName#@/g, item.name);
    body = body.replace(/@#jobTitle#@/g, jobPost?.title);
    body = body.replace(/@#companyName#@/g, organizationName);
    const mailtoUrl = `mailto:${item.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className='flex flex-col items-center '>
      <div className='relative'>
        <div className='p-1.5 w-[1200px] inline-block align-middle'>
          <div className='overflow-hidden border rounded-lg'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align='left'>Email</StyledTableCell>
                    <StyledTableCell align='left'>Score</StyledTableCell>
                    <StyledTableCell>View CV</StyledTableCell>
                    <StyledTableCell align='left'>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((item, index) => (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component='th' scope='row'>
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align='left'>
                        {item.email}
                      </StyledTableCell>
                      <StyledTableCell align='left'>
                        <div style={{ width: 48, height: 48 }}>
                          <CircularProgressbar
                            value={item.score}
                            text={`${item.score}%`}
                            strokeWidth={10}
                            styles={{
                              root: { width: '55px' },
                              path: {
                                stroke:
                                  Math.round(item.score) < 40
                                    ? '#ff0000'
                                    : Math.round(item.score) < 70
                                    ? '#fcba03'
                                    : '#4CAF50',
                              },
                              trail: { stroke: '#f0f0f0' },
                              text: {
                                fontSize: '24px',
                                fontWeight: 'bold',
                                fill:
                                  Math.round(item.score) < 30
                                    ? '#ff0000'
                                    : Math.round(item.score) < 70
                                    ? '#fcba03'
                                    : '#4CAF50',
                              },
                            }}
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className='flex w-full '>
                          <button
                            className='bg-gray-100 border flex items-center text-black  px-2 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-400 hover:text-white'
                            onClick={() => {
                              const url = item.locationPath;
                              window.open(url, '_blank');
                            }}
                          >
                            View <FiEye className='ml-2' size={16} />
                          </button>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        {selectedItem === item && isDropdownOpen && (
                          <div
                            ref={dropdownRef}
                            className=' w-48 absolute right-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '
                          >
                            <button
                              onClick={() => handleAccept(item)}
                              className='flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full'
                            >
                              <Icon
                                style={{
                                  color: '#12d77e',
                                  marginRight: '8px',
                                }}
                              >
                                <MarkEmailReadIcon />
                              </Icon>
                              Acceptance Email
                            </button>
                            <button
                              onClick={() => handleReject(item)}
                              className='flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full'
                            >
                              <Icon
                                style={{
                                  color: '#FF0000',
                                  marginRight: '8px',
                                }}
                              >
                                <UnsubscribeIcon />
                              </Icon>
                              Rejection Email
                            </button>
                            <button
                              onClick={() => {
                                const url = `/scheduler/${item.id}`;
                                navigate(url);
                              }}
                              className='flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full'
                            >
                              <Icon
                                style={{
                                  color: '#00a3ff',
                                  marginRight: '8px',
                                }}
                              >
                                <CalendarMonthIcon />
                              </Icon>
                              Schedule Interview
                            </button>
                            <button
                              onClick={() => {
                                const url = `/assessment/${item.id}/${jobId}`;
                                navigate(url);
                              }}
                              className='flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full'
                            >
                              <Icon
                                style={{
                                  color: '#878fff',
                                  marginRight: '8px',
                                }}
                              >
                                <EditNoteIcon />
                              </Icon>
                              {isAssessmentDone[index]?.result
                                ? 'View Assessment'
                                : 'Start Assessment'}
                            </button>

                            {/* <button
                              onClick={() => handleAccept(item)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                              
                            > <Icon
                            
                            style={{ color: 'blue', }} // Adjust marginBottom value
                          >
                            <EmailIcon />
                          </Icon>
                              Acceptance
                            </button> */}
                            {/* <button
                              onClick={() => handleReject(item)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            >
                              Rejection
                            </button> */}
                            {/* <button
                              onClick={() => {
                                const url = `/scheduler/${item.id}`;
                                navigate(url);
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            >
                              Schedule
                            </button> */}
                            {/* <button
                              onClick={() => {
                                const url = `/assessment/${item.id}/${jobId}`;
                                navigate(url);
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            >
                              Assessment
                            </button> */}
                          </div>
                        )}

                        <button
                          onClick={() => handleActionClick(item)}
                          disabled={jobStatus}
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            jobStatus ? 'bg-gray-300 ' : 'bg-gray-200'
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-4 h-4'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 12a2 2 0 100-4 2 2 0 000 4zM2 10a2 2 0 114 0 2 2 0 01-4 0zm14 0a2 2 0 114 0 2 2 0 01-4 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableResult;
