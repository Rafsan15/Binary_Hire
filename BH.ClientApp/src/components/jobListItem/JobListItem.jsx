import { FaAngleRight, FaBriefcase, FaStar } from 'react-icons/fa6';
import './jobListItem.scss';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { orange } from '@mui/material/colors';

const JobListItem = ({ jobName, icon }) => {
    return (
        <div className='jobListItem'>
            <p className="bg-[#E7EAEE] h-[46px] text-[16px] mx-[32px] flex items-center justify-between px-[32px] border-[.25px] border-t-0 border-black"><span className='flex gap-4 items-center'><FaBriefcase />{jobName}{icon && <FaStar style={{color: 'orange'}}/>}</span><FaAngleRight/></p>
        </div>
    );
}

export default JobListItem;
