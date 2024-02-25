import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';
import BASE_URL from '../../../app_settings';
import TableResult from '../../components/table/TableResult';
import Pagination from '../../components/Pagination/Pagination';

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

const Result = () => {
  const { jobId } = useParams();
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Fetch data whenever currentPage or pageSize changes

  const fetchData = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        page: currentPage,
        pageSize,
        organizationId,
        jobPostId: jobId,
      };

      const [resultResponse, countResponse, titleResponse] = await Promise.all([
        axios.post(`${BASE_URL}Result/get-all`, requestBody, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }),
        axios.post(`${BASE_URL}Result/get-all-count`, requestBody, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }),
        axios.post(`${BASE_URL}JobPost/get-by-id`, jobId, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      setResult(resultResponse.data.data);
      setTotalResults(countResponse.data.data);
      setTotalPages(Math.ceil(countResponse.data.data / pageSize));
      setJobTitle(titleResponse.data.data.title);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <div className='result bg-[#F1F5F9] flex-1 p-10 md:p-10'>
      <Breadcrumbs aria-label="breadcrumb" >
  <StyledBreadcrumb
    component="a"
    href="#"
    label="Home"
    icon={<HomeIcon fontSize="small" />}
  />
  <StyledBreadcrumb
    label="Work Flow"
    
  />
</Breadcrumbs>
      <h1 className='text-[28px] font-semibold mb-4 overflow-x-auto flex flex-col items-center'>
        {jobTitle}
      </h1>
      <div className='flex flex-col items-center'>
        {/* <button
          className=' bg-blue-500 text-white px-4 py-2 rounded-md'
          style={{ margin: 'auto' }}
        >
          Recruitment complete
        </button> */}
      </div>

      {loading ? (
        <div className='loading-container'>
          <CircularProgress />
        </div>
      ) : (
        <TableResult result={result} />
      )}
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default Result;
