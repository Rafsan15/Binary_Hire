import React, { useState } from 'react';

const EmailTemplateEditor = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSave = () => {
    // Handle save functionality
    console.log('Subject:', subject);
    console.log('Body:', body);
  };

  return (
    <div className='flex h-screen'>
      {/* Left side */}
      <div className='w-1/4 bg-gray-200 p-8'>
        <h1 className='text-2xl font-bold mb-4'>Choose an Option</h1>
        <div className='flex space-x-4'>
          <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
            Acceptance
          </button>
          <button className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>
            Rejection
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className='w-1/2 bg-gray-100 p-8'>
        <h1 className='text-2xl font-bold mb-4'>Email Template Editor</h1>
        <div className='mb-4'>
          <label
            htmlFor='subject'
            className='block text-gray-700 font-semibold mb-2'
          >
            Subject:
          </label>
          <input
            type='text'
            id='subject'
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='body'
            className='block text-gray-700 font-semibold mb-2'
          >
            Email Body:
          </label>
          <textarea
            id='body'
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
            rows='8'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button
          className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
          onClick={handleSave}
        >
          Save
        </button>
        <div className='mt-4'>
          <h2 className='text-lg font-semibold mb-2'>
            Rules for Writing Email Templates:
          </h2>
          <ul className='list-disc pl-6'>
            <li>Be clear and concise</li>
            <li>Include a greeting and closing</li>
            <li>Avoid using jargon or technical terms</li>
            <li>Use proper formatting and grammar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
