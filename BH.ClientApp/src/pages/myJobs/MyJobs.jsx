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
  const [location, setLocation] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedWorkplaces, setSelectedWorkplaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  //for filter badges
  const [selectedJobTypesNames, setSelectedJobTypesNames] = useState([]);
  const [selectedWorkplacesNames, setSelectedWorkplacesNames] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchTotalJobCount(); // Fetch total job count when the component mounts
  }, [currentPage, selectedJobTypes, selectedWorkplaces, searchTerm, pageSize]); // Fetch jobs whenever currentPage changes

  //Fetch jobs for specific pages
  const fetchJobs = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  //Fetch Job Counts only
  const fetchTotalJobCount = async () => {
    try {
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
      } else {
        console.error(
          'Error retrieving total job count:',
          response.data.message
        );
      }
    } catch (error) {
      console.error('Error fetching total job count:', error);
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

        // To add/remove filter badges
        if (selectedJobTypes.includes(option.id.toString())) {
          const indexToRemove = selectedJobTypesNames.indexOf(option.name);
          if (indexToRemove !== -1) {
            const updatedJobTypesNames = [...selectedJobTypesNames];
            updatedJobTypesNames.splice(indexToRemove, 1);
            setSelectedJobTypesNames(updatedJobTypesNames);
          }
        } else {
          setSelectedJobTypesNames([...selectedJobTypesNames, option.name]);
        }

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
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
    }
  };

  return (
    <div className='myJobs flex-1 flex-col min-h-screen bg-[#E7EAEE]'>
      <div className='p-4'>
        <JobSearchOptions
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className='flex flex-grow'>
        <div className='w-[314px] m-8 p-4 bg-white'>
          <FilteringOptions
            setJobs={setJobs}
            selectedJobTypes={selectedJobTypes}
            setSelectedJobTypes={setSelectedJobTypes}
            selectedWorkplaces={selectedWorkplaces}
            setSelectedWorkplaces={setSelectedWorkplaces}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className='flex-1 m-8 p-4'>
          <FilteredJobsHeader
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
          />
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
