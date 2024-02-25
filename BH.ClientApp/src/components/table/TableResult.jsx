import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TableResult = ({ result }) => {
  console.log('HiGood', result);
  return (
    <div className='flex flex-col items-center'>
      <div className='overflow-x-auto'>
        <div className='p-1.5 w-[1200px] inline-block align-middle'>
          <div className='overflow-hidden border rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='py-3 pl-4'>
                    <div className='flex items-center h-5'>
                      <input
                        id='checkbox-all'
                        type='checkbox'
                        className='text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                      />
                      <label htmlFor='checkbox' className='sr-only'>
                        Checkbox
                      </label>
                    </div>
                  </th>
                  {/* <th
                    scope='col'
                    className='py-3 pl-4 text-xs font-bold text-left text-gray-500 uppercase '
                  >
                    ID
                  </th> */}
                  <th
                    scope='col'
                    className='py-3 pl-4 text-xs font-bold text-left text-gray-500 uppercase '
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='py-3 pl-4 text-xs font-bold text-left text-gray-500 uppercase '
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='py-3 pl-4 text-xs font-bold text-left text-gray-500 uppercase '
                  >
                    Match
                  </th>
                  <th
                    scope='col'
                    className='py-3 pr-4 text-xs font-bold text-right text-gray-500 uppercase '
                  >
                    View CV
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {result.map((item, index) => (
                  <tr key={item.id}>
                    <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                      <div className='flex items-center h-5'>
                        <input
                          type='checkbox'
                          className='text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                        />
                        <label htmlFor='checkbox' className='sr-only'>
                          Checkbox
                        </label>
                      </div>
                    </td>
                    {/* <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                      {index + 1}
                    </td> */}
                    <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                      {item.name}
                    </td>
                    <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                      {item.email}
                    </td>
                    <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                      <div style={{ width: 48, height: 48 }}>
                        <CircularProgressbar
                          value={item.score}
                          text={`${item.score}%`}
                          strokeWidth={10}
                          styles={{
                            root: { width: '48px' },
                            path: {
                              stroke:
                                Math.round(item.score) < 40
                                  ? '#ff0000'
                                  : Math.round(item.score) < 70
                                  ? '#fcba03'
                                  : '#4CAF50',
                            },
                            trail: { stroke: '#f0f0f0' },
                            text: {
                              fontSize: '24px',
                              fill:
                                Math.round(item.score) < 30
                                  ? '#ff0000'
                                  : Math.round(item.score) < 70
                                  ? '#fcba03'
                                  : '#4CAF50',
                            },
                          }}
                        />
                      </div>
                    </td>
                    {/* <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                    
                      {item.score}%
                    </td> */}
                    <td className='py-3 pr-4 text-sm text-gray-800 whitespace-nowrap float-end'>
                      <button
                        className='bg-blue-500 text-white px-2 py-1 rounded'
                        onClick={() => {
                          const url = item.locationPath;
                          window.open(url, '_blank');
                        }}
                      >
                        View CV
                      </button>
                    </td>
                    {/* <td className='py-3 pl-4 text-sm text-gray-800 whitespace-nowrap'>
                        <button className='bg-gray-300 px-2 py-1 rounded'>
                          <span>&#8226;&#8226;&#8226;</span>
                        </button>
                      </td> */}
                  </tr>
                ))}
                {/* <tr>
                    <td className='py-3 pl-4'>
                      <div className='flex items-center h-5'>
                        <input
                          type='checkbox'
                          className='text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                        />
                        <label htmlFor='checkbox' className='sr-only'>
                          Checkbox
                        </label>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                      1
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      Jone Doe
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      jonne62@gmail.com
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                      <a
                        className='text-green-500 hover:text-green-700'
                        href='#'
                      >
                        Edit
                      </a>
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                      <a className='text-red-500 hover:text-red-700' href='#'>
                        Delete
                      </a>
                    </td>
                  </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableResult;
