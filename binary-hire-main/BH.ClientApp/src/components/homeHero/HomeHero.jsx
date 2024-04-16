import React from 'react';
import { FaRegStar, FaStar, FaSuitcase, FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { LuScanFace } from 'react-icons/lu';

import NumberAnimation from './NumberAnimation';

const HomeHero = ({ jobsCount, finishedJobsCount, closedJobsCount }) => {
  //   function Number({ n }) {
  //     const { number } = useSpring({
  //       from: { number: 0 },
  //       number: n,
  //       delay: 200,
  //       config: { mass: 1, tension: 20, friction: 10 },
  //     });
  //     return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  //   }
  return (
    <>
      <div className='flex '>
        <div className='relative mx-4 mt-8 mb-4 flex flex-col  text-gray-700 bg-green-300 shadow-md border bg-clip-border rounded-xl w-full '>
          <div className='p-8 flex items-center justify-between '>
            <div
              style={{
                padding: '8px',
                border: '3px solid #4A5568',
                borderRadius: '20%',
              }}
            >
              <FaSuitcase size={34} />
            </div>
            <div className='flex flex-col justify-center text-right'>
              <p className='block text-xl antialiased font-medium leading-relaxed text-inherit'>
                Total Jobs
              </p>
              <h5 className='block mb-2 font-sans text-4xl antialiased font-bold leading-snug tracking-normal '>
                <NumberAnimation n={jobsCount} />
              </h5>
            </div>
          </div>
        </div>
        <div className='relative mr-4 mt-8 mb-4 flex flex-col  text-gray-700 bg-blue-300 shadow-md border bg-clip-border rounded-xl w-full '>
          <div className='p-8 flex items-center justify-between '>
            <div
              style={{
                padding: '8px',
                border: '3px solid #4A5568',
                borderRadius: '20%',
              }}
            >
              <FaCheck size={34} />
            </div>
            <div className='flex flex-col justify-center text-right'>
              <p className='block  text-xl antialiased font-medium leading-relaxed text-inherit'>
                Finished Jobs
              </p>
              <h5 className='block mb-2 font-sans text-4xl antialiased font-bold leading-snug tracking-normal '>
                <NumberAnimation n={finishedJobsCount} />
              </h5>
            </div>
          </div>
        </div>
        <div className='relative mr-4 mt-8 mb-4 flex flex-col  text-gray-700 bg-red-300 shadow-md border bg-clip-border rounded-xl w-full '>
          <div className='p-8 flex items-center justify-between '>
            <div
              style={{
                padding: '8px',
                border: '3px solid #4A5568',
                borderRadius: '20%',
              }}
            >
              <IoClose size={34} />
            </div>
            <div className='flex flex-col justify-center text-right'>
              <p className='block  text-xl antialiased font-medium leading-relaxed text-inherit'>
                Closed Jobs
              </p>
              <h5 className='block mb-2 font-sans text-4xl antialiased font-bold leading-snug tracking-normal '>
                <NumberAnimation n={closedJobsCount} />
              </h5>
            </div>
          </div>
        </div>
        <div className='relative mr-4 mt-8 mb-4 flex flex-col  text-gray-700 bg-orange-300 shadow-md border bg-clip-border rounded-xl w-full '>
          <div className='p-8 flex items-center justify-between '>
            <div
              style={{
                padding: '8px',
                border: '3px solid #4A5568',
                borderRadius: '20%',
              }}
            >
              <LuScanFace size={34} />
            </div>
            <div className='flex flex-col justify-center text-right'>
              <p className='block  text-xl antialiased font-medium leading-relaxed text-inherit'>
                Remaining
              </p>
              <h5 className='block mb-2 font-sans text-4xl antialiased font-bold leading-snug tracking-normal '>
                <NumberAnimation n={96} />
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
