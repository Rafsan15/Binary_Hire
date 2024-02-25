import React, { useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Paginator } from 'primereact/paginator';
import './PaginatorDemo.css';

import { Dropdown } from 'primereact/dropdown'; // Import Dropdown from PrimeReact

const Pagination = ({
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  onPageSizeChange,
}) => {
  // const [customFirst2, setCustomFirst2] = useState(0);
  // const [customRows2, setCustomRows2] = useState(10);

  const [dpageSize, setDPageSize] = useState(pageSize);

  const onCustomPageChange2 = (event) => {
    // setCustomFirst2(event.first);
    // setCustomRows2(event.rows);
    const newPage = event.page + 1;
    onPageChange(newPage); // Update the current page in the parent component
  };

  const template2 = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 },
      ];

      return (
        <React.Fragment>
          <span
            className='mx-2'
            style={{ color: 'var(--text-color)', userSelect: 'none' }}
          >
            Items per page:{' '}
          </span>

          <Dropdown
            panelClassName='custom-dropdown'
            value={dpageSize}
            options={dropdownOptions}
            onChange={(e) => {
              // setCustomRows2(e.value);
              setDPageSize(e.value);
              onPageSizeChange(e.value); // Trigger onPageSizeChange to update the UI
              onPageChange(1); // Trigger onPageChange to update the UI
            }}
            style={{
              borderColor: 'lightgray',
              borderWidth: '1px',
              borderStyle: 'solid',
              alignitems: 'center',
            }}
          />
        </React.Fragment>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          style={{
            color: 'var(--text-color)',
            userSelect: 'none',
            width: '120px',
            textAlign: 'center',
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  return (
    <div>
      <div className='paginator-demo '>
        <div className='card'>
          <Paginator
            template={template2}
            first={(currentPage - 1) * dpageSize} // Assuming pageSize is always 20
            rows={dpageSize} // Assuming pageSize is always 20
            totalRecords={totalResults} // Adjust totalRecords based on total items and rows per page
            onPageChange={onCustomPageChange2}
            className=' my-8 bg-transparent paginator-right '
            currentPage={currentPage - 1} // Adjust currentPage to 0-based index
            // alwaysShow={false} // Optional: Set to true if you want to always show the paginator
          >
            {console.log('pagesize', pageSize)}
            {console.log('dpagesize', dpageSize)}
            {console.log('currentPage', currentPage)}
            {console.log('totalPages', totalPages)}
          </Paginator>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
