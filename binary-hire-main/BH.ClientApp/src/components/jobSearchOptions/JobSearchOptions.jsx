import './jobSearchOptions.scss';
import { useState } from 'react';

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//   const backgroundColor =
//     theme.palette.mode === 'light'
//       ? theme.palette.grey[100]
//       : theme.palette.grey[800];
//   return {
//     backgroundColor,
//     height: theme.spacing(3),
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightRegular,
//     '&:hover, &:focus': {
//       backgroundColor: emphasize(backgroundColor, 0.06),
//     },
//     '&:active': {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(backgroundColor, 0.12),
//     },
//   };
// }); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const JobSearchOptions = ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  handleCheckboxChange,
  searchInput,
  setSearchInput,
}) => {
  return (
    <div className='jobSearchOptions bg-[#F8F9FF] -mt-2 relative h-[75px]'>
      {/* <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '20px', marginLeft: '20px' }}>
  <StyledBreadcrumb
    component="a"
    href="#"
    label="Home"
    icon={<HomeIcon fontSize="small" />}
  />
  <StyledBreadcrumb
    label="My Jobs"
    
  />
</Breadcrumbs> */}

      <div className='pt-[50px] mb-4 flex justify-center items-center gap-8 absolute left-[25%]'>
        {/* Location Selector */}
        <select
          id='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='p-2 border border-[#B5B5B5] w-[116px] h-[46px] rounded-[10px] text-center'
        >
          <option value=''>All</option>
          <option value='Dresden'>Dresden</option>
          <option value='Munich'>Munich</option>
          <option value='Cologne'>Cologne</option>
        </select>
        {/* Search Input */}
        <input
          type='text'
          placeholder='Enter job title or keyword'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-[#B5B5B5] p-2 w-[425px] h-[46px] rounded-[10px]'
        />
        {/* Search Button */}
        <button
          onClick={() => {
            handleCheckboxChange('search'), setSearchInput(searchTerm);
          }}
          className='bg-[#5674FC] text-white px-4 py-2 rounded-[10px] w-[91px] h-[43px]'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default JobSearchOptions;
