import { FaAirbnb, FaEllipsis, FaStar } from 'react-icons/fa6';
import './filteredJobs.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import Pagination from '../Pagination/Pagination';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilteredJobs = ({ searchTerm, location, jobs, setJobs, handlePageChange, currentPage, totalPages, pageSize, totalJobs, handlePageSizeChange }) => {

        // State to store the IDs of selected checkboxes
        const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

        // Function to handle checkbox click event
        const handleCheckboxChange = (jobId) => {
          if (selectedCheckboxes.includes(jobId)) {
            setSelectedCheckboxes(selectedCheckboxes.filter(id => id !== jobId));
          } else {
            setSelectedCheckboxes([...selectedCheckboxes, jobId]);
          }
        };

        // Function to handle star click for a specific job
        const handleStarClick = async (jobId, currentIsFav) => {
            try {
                const updatedIsFav = !currentIsFav;
                // Update the state to toggle the isFav property for the clicked job
                setJobs(prevJobs =>
                    prevJobs.map(job =>
                        job.id === jobId ? { ...job, isFav: updatedIsFav } : job
                    )
                );

                const organizationId = Cookies.get('organizationId');
                const userId = Cookies.get('userId');

                const requestBody = {
                                      "jobId": jobId,
                                      "isFav": updatedIsFav,
                                      "modifiedBy": userId
                                    };

                // Make an API call to update the favorite list
                await axios.post(`${BASE_URL}JobPost/update-job-favourites`, requestBody, {
                  headers: {
                    userId,
                    organizationId,
                  }
                });
            } catch (error) {
                console.error('Error updating favorite list:', error);
                 // If an error occurs, revert the state back to the original state to maintain consistency
                  setJobs(prevJobs =>
                      prevJobs.map(job =>
                          job.id === jobId ? { ...job, isFav: currentIsFav } : job
                      )
                  );
              }
        };

        

        return (
            <div>
              {selectedCheckboxes.length > 0 && (
                <button className='mb-2 text-red-500'>Delete All</button>
              )}
              {jobs.map((job) => (
                <Accordion key={job.id} className='border border-black mt-5 rounded-[4px]'>
                  {/* Accordion Header - Job Listing */}
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex items-center gap-5'>
                        <div onClick={(e) => e.stopPropagation()}>
                          <input type='checkbox'
                            checked={selectedCheckboxes.includes(job.id)}
                            onChange={() => handleCheckboxChange(job.id)}
                          />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <label>
                            <span>{job.title}</span>
                          </label>
                          <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
                            <button className='bg-[#D9D9D9] px-3 py-1 mr-[56px] font-[12px] rounded-[4px]'>
                              {job.statusName}
                            </button>
                            <div onClick={() => handleStarClick(job.id, job.isFav)}>
                              {job.isFav ? <FaStar style={{ color: 'orange' }} /> : <FaStar />}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Right Side - Button */}
                      <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
                        <Link to={`/screening/${job.id}`} className='mr-[20px]'>
                          <button
                            className='bg-[#5674FC] px-4 py-2 text-white font-semibold text-[14px] rounded-[4px]'
                          >
                            {job.statusName === 'closed' ? 'Show Results' : 'Screening CV'}
                          </button>
                        </Link>
                        {/* <FaEllipsis /> */}
                      </div>
                    </div>
                  </AccordionSummary>

                  {/* Accordion Content - Job Description */}
                  <AccordionDetails>
                    <div className='p-3'>
                      <p className='ml-5'>{job.description}</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}

              <div className="pagination flex justify-center mt-10">
                {/* <Stack spacing={2}>
                  <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined" 
                    shape="rounded" 
                  />
                </Stack> */}
                <Pagination
                  pageSize={pageSize}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalResults={totalJobs}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            </div>

      )}

export default FilteredJobs;
