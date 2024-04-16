// FilteringOptions.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from  '../../../app_settings'
import Cookies from 'js-cookie';


const FilteringOptions = ({ jobs, setJobs, selectedJobTypes, selectedWorkplaces, setSelectedJobTypes, setSelectedWorkplaces, handleCheckboxChange }) => {

  const [jobTypes, setJobTypes] = useState([]);
  const [workplaceOptions, setWorkplaceOptions] = useState([]);

  const [jobCategories, setJobCategories] = useState({
    design: false,
    sales: false,
    marketing: false,
  });
  const [dateOptions, setDateOptions] = useState({
    pastWeek: false,
    pastMonth: false,
    past6Months: false,
  });

  useEffect(() => {
    fetchJobTypes();
    fetchWorkplaceOptions();
  }, []);

  const fetchJobTypes = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.get(`${BASE_URL}JobPost/get-all-job-type`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      });

      setJobTypes(response.data.data);
    } catch (error) {
      console.error('Error fetching job types:', error);
    }
  };

  const fetchWorkplaceOptions = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.get(`${BASE_URL}JobPost/get-all-workplace`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      });

      setWorkplaceOptions(response.data.data);
    } catch (error) {
      console.error('Error fetching workplace options:', error);
    }
  };

  return (
  <div className='filteringOptions p-4'>
    <h3 className="text-md font-semibold mb-4">Filtered by:</h3>
        {/* Job Type */}
      <div className="mb-4 border p-4 rounded-lg bg-[#CEF3F5]">
          <h3 className="text-sm font-semibold mb-2">Job Type</h3>
          {jobTypes.map((jobType) => (
          <div key={jobType.id}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(jobType.id.toString())}
                onChange={() => handleCheckboxChange('jobType', jobType)}
              />
              <span className="ml-2">{jobType.name}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Job Categories */}
      <div className="mb-4 border p-4 rounded-lg  bg-[#CEF3F5]">
        <h3 className="text-sm font-semibold mb-2">Job Categories</h3>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobCategories.frontend}
              onChange={() => setJobCategories((prev) => ({ ...prev, frontend: !prev.frontend }))}
            />
            <span className="ml-2">Frontend</span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobCategories.backend}
              onChange={() => setJobCategories((prev) => ({ ...prev, backend: !prev.backend }))}
            />
            <span className="ml-2">Backend</span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobCategories.tester}
              onChange={() => setJobCategories((prev) => ({ ...prev, tester: !prev.tester }))}
            />
            <span className="ml-2">Testing</span>
          </label>
        </div>
      </div>

      {/* Dates */}
      <div className="mb-4 border p-4 rounded-lg  bg-[#CEF3F5]">
        <h3 className="text-sm font-semibold mb-2">Dates</h3>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={dateOptions.pastWeek}
              onChange={() => setDateOptions((prev) => ({ ...prev, pastWeek: !prev.pastWeek }))}
            />
            <span className="ml-2">Past Week</span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={dateOptions.pastMonth}
              onChange={() => setDateOptions((prev) => ({ ...prev, pastMonth: !prev.pastMonth }))}
            />
            <span className="ml-2">Past Month</span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={dateOptions.past6Months}
              onChange={() => setDateOptions((prev) => ({ ...prev, past6Months: !prev.past6Months }))}
            />
            <span className="ml-2">Past 6 Months</span>
          </label>
        </div>
      </div>

      {/* Workplace */}
      <div className='border p-4 rounded-lg  bg-[#CEF3F5]'>
        <h3 className="text-sm font-semibold mb-2">Workplace</h3>
        {workplaceOptions.map((workplaceOption) => (
        <div key={workplaceOption.id}>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedWorkplaces.includes(workplaceOption.id.toString())}
              onChange={() => handleCheckboxChange('workplaceOption', workplaceOption)}
            />
            <span className="ml-2">{workplaceOption.name}</span>
          </label>
        </div>
        ))}
      </div>
      
    </div>
  );
};

export default FilteringOptions;