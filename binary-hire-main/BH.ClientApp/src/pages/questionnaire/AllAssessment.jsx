import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import BASE_URL from '../../../app_settings';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, emphasize } from '@mui/material/styles';
import Pagination from '../../components/Pagination/Pagination';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(70, 130, 180)',
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

const AllAssessment = () => {
  const { jobId } = useParams();
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        page: currentPage,
        pageSize,
        jobId: jobId,
      };

      const [resultResponse, countResponse, titleResponse] = await Promise.all([
        axios.post(
          `${BASE_URL}Assessment/get-assessment-summery`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              userId,
              organizationId,
            },
          }
        ),
        axios.post(
          `${BASE_URL}Assessment/get-assessment-summery-count`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              userId,
              organizationId,
            },
          }
        ),
        axios.post(`${BASE_URL}JobPost/get-by-id`, jobId, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json',
          },
        }),
      ]);
      setLoading(false);
      setResult(resultResponse.data.data);
      setTotalResults(countResponse.data.data);
      setTotalPages(Math.ceil(countResponse.data.data / pageSize));
      setJobTitle(titleResponse.data.data.title);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };
  return (
    <div className='result border-2 bg-[#FFFFFF] flex-1 p-10 md:p-10'>
      {loading && (
        <div>
          <div className='backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50'></div>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50'></div>
        </div>
      )}
      <Breadcrumbs aria-label='breadcrumb' className='cursor-pointer'>
        <StyledBreadcrumb
          component='a'
          href='/myjobs'
          label='Manage Jobs'
          icon={<ListAltIcon fontSize='small' />}
        />
        <StyledBreadcrumb
          component='a'
          href={`/result/${jobId}`}
          label='Results'
        />
        <StyledBreadcrumb label='Assessment Summary' />
      </Breadcrumbs>
      {/* <h1 className="text-[28px] font-semibold mb-4 overflow-x-auto flex flex-col items-center">
        Assessment Summary
      </h1> */}
      <div className='flex flex-col items-center'>
        <div className='flex justify-between w-[1200px] mt-6 mb-1 px-2'>
          <div id='1' className='basis-1/1'>
            <h1 className='text-[28px] font-semibold overflow-x-auto'>
              {jobTitle}
            </h1>
          </div>
        </div>
        {/* <h1 className="text-[20px] font-semibold mb-4 overflow-x-auto flex flex-col items-center">
        {jobTitle}
      </h1> */}
        <div className='flex flex-col items-center '>
          <div id='3' className='basis-1/1'>
            <div className='relative'>
              <div className='p-1.5 w-[1200px] inline-block align-middle'>
                <div className='overflow-hidden border rounded-lg'>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell align='left'>Email</StyledTableCell>
                          <StyledTableCell>Question Asked</StyledTableCell>
                          <StyledTableCell align='left'>Score</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!result || result.length == 0 ? (
                          <TableCell colSpan={4} align='center'>
                            No data
                          </TableCell>
                        ) : (
                          result.map((item, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell component='th' scope='row'>
                                {item.name}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {item.email}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {item.questionAsked}
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
                            </StyledTableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default AllAssessment;
