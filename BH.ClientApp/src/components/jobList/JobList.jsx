import Cookies from 'js-cookie';
import JobListItem from '../jobListItem/JobListItem';
import './jobList.scss';
import axios from 'axios';
import BASE_URL from '../../../app_settings';
import { useEffect, useState } from 'react';

const JobList = ({ header, jobs, icon }) => {

    return (
        <div className='jobList my-16'>
            <h3 className="jobListHeader bg-[#E7EAEE] h-[56px] font-bold text-[24px] text-[#3F4345] mx-[32px] flex items-center px-[32px] rounded-t-[4px] border-[.25px] border-black">{header}</h3>
            {jobs.map((job) => (
                <JobListItem key={job.id} jobName={job.title} icon={icon}/>
            ))}
        </div>
    );
}

export default JobList;
