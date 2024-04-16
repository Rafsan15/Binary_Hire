import { useState, useEffect } from 'react';
import FilteredJobs from '../../components/filteredJobs/FilteredJobs';
import FilteredJobsHeader from '../../components/filteredJobsHeader/FilteredJobsHeader';
import FilteringOptions from '../../components/filteringOptions/FilteringOptions';
import JobSearchOptions from '../../components/jobSearchOptions/JobSearchOptions';
import './myJobs.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import BASE_URL from '../../../app_settings';
import { Pages } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const MyJobs = () => {
  const location1 = useLocation();
  const searchParams = new URLSearchParams(location1.search);
  const initialSearchValue = searchParams.get('search') || '';

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchValue);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedWorkplaces, setSelectedWorkplaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  //for filter badges
  const [selectedJobTypesNames, setSelectedJobTypesNames] = useState([]);
  const [selectedWorkplacesNames, setSelectedWorkplacesNames] = useState([]);
  const [deleteRef, setDeleteRef] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchTotalJobCount(); // Fetch total job count when the component mounts
  }, [
    currentPage,
    selectedJobTypes,
    selectedWorkplaces,
    searchInput,
    pageSize,
    deleteRef,
  ]); // Fetch jobs whenever currentPage changes

  //Fetch jobs for specific pages
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        page: currentPage,
        pageSize: pageSize,
        organizationId,
        searchModel: {
          valueSearch: {
            searchValueType: 'string',
            searchValue: searchTerm,
            searchColumnList: ['title', 'description'],
          },
          columnFilter: [
            {
              columnName: 'jobType',
              columnValue: selectedJobTypes,
              columnValueType: 'number',
            },
            {
              columnName: 'workPlace',
              columnValue: selectedWorkplaces,
              columnValueType: 'number',
            },
          ],
        },
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/get-all`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );

      setJobs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  //Fetch Job Counts only
  const fetchTotalJobCount = async () => {
    try {
      setLoading(true);
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        organizationId,
        searchModel: {
          valueSearch: {
            searchValueType: 'string',
            searchValue: searchTerm,
            searchColumnList: ['title', 'description'],
          },
          columnFilter: [
            {
              columnName: 'jobType',
              columnValue: selectedJobTypes,
              columnValueType: 'number',
            },
            {
              columnName: 'workPlace',
              columnValue: selectedWorkplaces,
              columnValueType: 'number',
            },
          ],
        },
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/get-all-count`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );

      if (response.data.isSuccess) {
        setTotalJobs(response.data.data);
        setTotalPages(Math.ceil(response.data.data / pageSize)); // Calculate total pages
        setLoading(false);
      } else {
        console.error(
          'Error retrieving total job count:',
          response.data.message
        );
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching total job count:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleCheckboxChange = async (type, option) => {
    switch (type) {
      case 'jobType':
        const updatedJobTypes = selectedJobTypes.includes(option.id.toString())
          ? selectedJobTypes.filter((id) => id !== option.id.toString())
          : [...selectedJobTypes, option.id.toString()];
        setSelectedJobTypes(updatedJobTypes);
        await makeFilteredAPICalls(updatedJobTypes, selectedWorkplaces);
        break;
      case 'workplaceOption':
        const updatedWorkplaces = selectedWorkplaces.includes(
          option.id.toString()
        )
          ? selectedWorkplaces.filter((id) => id !== option.id.toString())
          : [...selectedWorkplaces, option.id.toString()];
        setSelectedWorkplaces(updatedWorkplaces);
        await makeFilteredAPICalls(selectedJobTypes, updatedWorkplaces);
        break;
      case 'search':
        await makeFilteredAPICalls(selectedJobTypes, selectedWorkplaces);
        break;
      default:
        break;
    }
  };

  const makeFilteredAPICalls = async (selectedJobTypes, selectedWorkplaces) => {
    try {
      setLoading(true);
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        page: 1, // Always reset to page 1 when making filtered API calls
        pageSize: pageSize,
        organizationId,
        searchModel: {
          valueSearch: {
            searchValueType: 'string',
            searchValue: searchTerm,
            searchColumnList: ['title', 'description'],
          },
          columnFilter: [
            {
              columnName: 'jobType',
              columnValue: selectedJobTypes,
              columnValueType: 'number',
            },
            {
              columnName: 'workPlace',
              columnValue: selectedWorkplaces,
              columnValueType: 'number',
            },
          ],
        },
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/get-all`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );

      const response2 = await axios.post(
        `${BASE_URL}JobPost/get-all-count`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );

      setJobs(response.data.data);

      const jobsLength = response2.data.data;
      setTotalPages(Math.ceil(jobsLength / pageSize));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
      setLoading(false);
    }
  };

  const deleteRefresh = () => {
    setDeleteRef(!deleteRef);
  };

  return (
    <div className='myJobs flex-1 flex-col min-h-screen bg-[#ffffff]'>
      {loading && (
        <div>
          <div className='backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50'></div>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50'></div>
        </div>
      )}
      <div>
        <JobSearchOptions
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          location={location}
          setLocation={setLocation}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className='flex flex-grow border-t'>
        <div className='w-[275px] m-8 p-4 bg-white'>
          <FilteringOptions
            setJobs={setJobs}
            selectedJobTypes={selectedJobTypes}
            setSelectedJobTypes={setSelectedJobTypes}
            selectedWorkplaces={selectedWorkplaces}
            setSelectedWorkplaces={setSelectedWorkplaces}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className='flex-1 m-8 p-'>
          <FilteredJobsHeader
            jobs={jobs}
            totalJobs={totalJobs}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
            selectedJobTypes={selectedJobTypes}
            setSelectedJobTypes={setSelectedJobTypes}
            selectedJobTypesNames={selectedJobTypesNames}
            selectedWorkplaces={selectedWorkplaces}
            setSelectedJobTypesNames={setSelectedJobTypesNames}
            setSelectedWorkplaces={setSelectedWorkplaces}
            handleCheckboxChange={handleCheckboxChange}
          />
          <FilteredJobs
            searchTerm={searchTerm}
            location={location}
            jobs={jobs}
            setJobs={setJobs}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalJobs={totalJobs}
            handlePageSizeChange={handlePageSizeChange}
            deleteRefresh={deleteRefresh}
          />
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
