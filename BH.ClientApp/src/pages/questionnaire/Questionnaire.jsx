import { useState } from 'react';

const Questionnaire = () => {
  const [answer, setAnswer] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log('Saved:', answer);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancelled');
  };

  return (
    <div className=' p-10'>
      <div className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          Softwareentwickler - TypeScript/JavaScript (m/w/d)
        </h2>

        <div className='mb-4'>
          <label className='block font-semibold mb-2'>Candidate Name:</label>
        </div>
      </div>

      <div className='border rounded p-4 max-h-40 overflow-y-auto mb-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>
            1. Lorem Ipsum is simply dummy text
          </h3>
          <div className='flex items-center mb-2'>
            <input
              type='radio'
              id='good'
              name='answer'
              value='Good'
              checked={answer === 'Good'}
              onChange={() => setAnswer('Good')}
            />
            <label htmlFor='good' className='mr-4'>
              Good
            </label>

            <input
              type='radio'
              id='average'
              name='answer'
              value='Average'
              checked={answer === 'Average'}
              onChange={() => setAnswer('Average')}
            />
            <label htmlFor='average' className='mr-4'>
              Average
            </label>

            <input
              type='radio'
              id='bad'
              name='answer'
              value='Bad'
              checked={answer === 'Bad'}
              onChange={() => setAnswer('Bad')}
            />
            <label htmlFor='bad'>Bad</label>
          </div>
        </div>
      </div>

      <div className='flex space-x-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className='bg-gray-500 text-white px-4 py-2 rounded-md'
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
