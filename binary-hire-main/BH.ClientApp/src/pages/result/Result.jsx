import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';
import BASE_URL from '../../../app_settings';
import TableResult from '../../components/table/TableResult';
import Pagination from '../../components/Pagination/Pagination';
import Swal from 'sweetalert2';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { Icon } from '@mui/material';
import { Assessment } from '@mui/icons-material';

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
  const [jobPost, setJobPost] = useState();
  const [canditateId, setCanditateId] = useState([]);
  const [isAssessmentDone, setIsAssessmentDone] = useState([]);
  const [jobStatus, setJobStatus] = useState(false);

  useEffect(() => {
    fetchData();
    fetchJobById();
  }, [currentPage, pageSize]); // Fetch data whenever currentPage or pageSize changes
  useEffect(() => {
    if (canditateId.length > 0) {
      checkAssessment();
    }
  }, [canditateId]);
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
      setJobPost(titleResponse.data.data);
      setCanditateId(resultResponse.data.data.map((candidate) => candidate.id));
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchJobById = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(`${BASE_URL}JobPost/get-by-id`, jobId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.isSuccess && response.data.data) {
        const { statusName } = response.data.data;
        if (statusName === 'Closed') {
          setJobStatus(true);
        } else {
          setJobStatus(false);
        }
      }
    } catch (error) {
      console.error('Error fetching job by ID:', error);
    }
  };

  const checkAssessment = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');
      const assessmentResults = [];

      for (const candidateId of canditateId) {
        const response = await axios.post(
          `${BASE_URL}Assessment/is-assessment-done`,
          candidateId,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              userId,
              organizationId,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data) {
          assessmentResults.push({
            result: response.data.data,
          });
        } else {
          console.error('Failed to get isAssessment:', response.data.message);
          // Handle failure case if necessary
        }
      }

      setIsAssessmentDone(assessmentResults);
      setLoading(false);
      console.log('Assessment Results:', assessmentResults);
    } catch (error) {
      setLoading(false);
      console.error('Error saving grade:', error);
    }
  };

  const jobComplete = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        id: jobId,
        modifiedBy: userId,
        organizationId: organizationId,
        title: jobPost.title,
        description: jobPost.description,
        jobType: jobPost.jobType,
        minExperience: jobPost.minExperience,
        maxExperience: jobPost.maxExperience,
        location: jobPost.location,
        education: jobPost.education,
        skills: jobPost.skills,
        workPlace: jobPost.workPlace,
        isFav: jobPost.isFav,
        isDeleted: jobPost.isDeleted,
        status: 17,
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/save`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        Swal.fire({
          title: 'Success!',
          text: 'Process is closed',
          icon: 'success',
        });
        fetchData();
        // Optionally, you can redirect or show a success message
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong!',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      });
    }
  };
  const handleComplete = async () => {
    Swal.fire({
      title: 'Do you want to close this process?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        jobComplete();
      } else {
        Swal.fire('Cancelled', 'Your process is still ongoing.', 'info');
      }
    });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  console.log('jobStatus', jobStatus);

  return (
    <div className='result border-2 bg-[#FFFFFF] flex-1 p-10 md:p-10'>
      <Breadcrumbs aria-label='breadcrumb' className='cursor-pointer'>
        <StyledBreadcrumb
          component='a'
          href='/myjobs'
          label='Manage Jobs'
          icon={<ListAltIcon fontSize='small' />}
        />
        <StyledBreadcrumb label='Results' />
      </Breadcrumbs>

      <div className='flex flex-col items-center'>
        {/* <button
          className=' bg-blue-500 text-white px-4 py-2 rounded-md'
          style={{ margin: 'auto' }}
        >
          Recruitment complete
        </button> */}
      </div>

      {loading ? (
        <div>
          <div className='backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50'></div>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50'></div>
        </div>
      ) : (
        <>
          {/* <div className="flex flow-root px-[130px]">
        <h1 className="text-[28px] font-semibold overflow-x-auto flex flex-col items-center">
        {jobPost?.title}
      </h1>
          {(jobPost && jobPost.status==17)?<></>:
        <button onClick={handleComplete} className='mt-2 float-right ml-2 bg-blue-500 text-white px-4 py-2 rounded-md'>
              Close Job
            </button>
          }
        <Link to={`/AssessmentSummery/${jobId}`}>
                <button className='mt-2 float-right bg-blue-500 text-white px-4 py-2 rounded-md'>
                  Assessment Summery
                </button>
          </Link>
            
      
        </div> */}
          <div className='flex flex-col items-center'>
            <div className='flex justify-between w-[1200px] mt-6 mb-1 px-2'>
              <div id='1' className='basis-1/1'>
                <h1 className='text-[28px] font-semibold overflow-x-auto'>
                  {jobPost?.title}
                </h1>
              </div>
              <div id='2' className='basis-1/1'>
                <div className='space-x-2'>
                  <Link to={`/AssessmentSummery/${jobId}`}>
                    <button
                      className='bg-blue-500 text-black px-4 py-2 rounded-md bg-transparent border-2 border-[#434248] border-opacity-20 hover:bg-[#00a3ff] hover:bg-opacity-20'
                      title='View Assessment Summary'
                    >
                      Summary
                    </button>
                  </Link>
                  {jobPost && jobPost.status === 17 ? null : (
                    <button
                      onClick={handleComplete}
                      className='bg-blue-500 text-black px-4 py-2 rounded-md bg-transparent border-2 border-[#434248] border-opacity-20 hover:bg-[#434248] hover:bg-opacity-20'
                      title='Close Job'
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div id='3' className='basis-1/1'>
              <div className='flex flex-col justify-between'>
                <TableResult
                  jobId={jobId}
                  result={result}
                  isAssessmentDone={isAssessmentDone}
                  jobPost={jobPost}
                  jobStatus={jobStatus}
                />
              </div>
            </div>
          </div>
        </>
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
