import { FaPenToSquare } from 'react-icons/fa6';
import './jobButton.scss'

const JobButton = (props) => {
    return (
        <div className='jobButton pl-20 pr-20'>
            <button className='h-[118px] w-[118px] text-[#FFFFFF] bg-gray-800 border p-2 flex flex-col gap-3 justify-center items-center'>
                <img src={props.imgSrc} alt="arrow-left" className='' />
                <span>{props.job}</span>
            </button>    
        </div>
    );
}

export default JobButton;
