import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InProgress = ({ job, handleFavoriteToggle }) => {
  const handleToggleFavorite = () => {
    handleFavoriteToggle(job.id, !job.isFav); // Toggle the favorite status
  };

  return (
    <>
      <Link className='flex' to={`/screening/${job.id}`}>
        <div className='relative mb-4 flex flex-col  text-gray-700 bg-white shadow-md border bg-clip-border rounded-xl w-full hover:bg-orange-100 transition-colors duration-300'>
          <div className='p-6'>
            <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
              {job.title.split(' ').slice(0, 5).join(' ')}{' '}
              {job.title.split(' ').length > 5 ? '...' : ''}
            </h5>
            <p className='block font-sans text-base antialiased font-medium leading-relaxed text-inherit'>
              {job.jobTypeName}
              <br />
              {job.workPlaceName}
            </p>
          </div>
          <div className='p-6 pt-0 flex items-center justify-between'>
            <div className='block font-sans text-base antialiased font-semibold leading-relaxed text-orange-600 bg-orange-100 p-1 rounded-md'>
              {job.statusName}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggleFavorite();
              }}
              type='button'
            >
              {job.isFav ? (
                <FaStar
                  className='h-5 w-5 text-yellow-500 mr-2 cursor-pointer'
                  onClick={handleToggleFavorite}
                />
              ) : (
                <FaRegStar
                  className='h-5 w-5 text-gray-500 mr-2 cursor-pointer'
                  onClick={handleToggleFavorite}
                />
              )}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default InProgress;
