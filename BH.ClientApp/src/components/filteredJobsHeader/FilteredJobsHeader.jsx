import { FaRegCircleXmark } from 'react-icons/fa6';

const FilteredJobsHeader = ({ totalJobs, totalPages, currentPage, pageSize, selectedJobTypes, setSelectedJobTypes, selectedWorkplaces, setSelectedWorkplaces, handleCheckboxChange, selectedJobTypesNames, setSelectedJobTypesNames }) => {

    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalJobs);

    const handleRemoveJobType = (selectedJobNameToRemove) => {
        // Filter out the selected job type to remove
        const updatedJobTypes = selectedJobTypes.filter((id) => id !== selectedJobNameToRemove);
        console.log("FilteredJob Header"+updatedJobTypes);

        // Filter out the selected job type name to remove
        const updatedJobTypeNames = selectedJobTypesNames.filter((name) => name !== selectedJobNameToRemove);
        console.log("FilteredJob Header"+updatedJobTypeNames);
        // Update the state with the filtered arrays
        setSelectedJobTypes(updatedJobTypes);
        setSelectedJobTypesNames(updatedJobTypeNames);
    };

    return (
        <div className='filteredJobs flex flex-col'>
            <div>
                <div className="flex flex-wrap">
                    {selectedJobTypesNames.map((selectedJobName) => (
                        <div key={selectedJobName} className="inline-flex items-center bg-orange-500 text-white rounded-full px-3 py-1 mr-2 mb-2">
                        <p>{selectedJobName}</p>
                        <button
                            className="ml-2"
                            onClick={() => handleRemoveJobType(selectedJobName)}
                        >
                            <FaRegCircleXmark className="w-4 h-4 fill-current" />
                        </button>
                        </div>
                    ))}
                </div>
                <h3 className="text-lg font-semibold">All Jobs</h3>
                <h2 className='font-light'>Showing {startIndex} - {endIndex} of {totalJobs} result(s)</h2>
                <div className='flex justify-between mb-4'>
                    {/* <div className='flex gap-5'>
                        <div className='flex items-center gap-2 bg-[#FFEFBF] p-1 rounded-[3px]'>Part-time <FaRegCircleXmark /></div>
                        <div className='flex items-center gap-2 bg-[#FFEFBF] p-1 rounded-[3px]'>Sales <FaRegCircleXmark /></div>
                        <div className='flex items-center gap-2 bg-[#FFEFBF] p-1 rounded-[3px]'>Business <FaRegCircleXmark /></div>
                        <div className='flex items-center gap-2 bg-[#FFEFBF] p-1 rounded-[3px]'>Junior Level <FaRegCircleXmark /></div>
                        <button className='text-[#5674FC] underline'>Reset all filters</button>
                    </div> */}
                    {/* <div>
                        <select
                        id="location"
                        className="p-2 bg-[#E7EAEE] w-[148px] h-[44px] rounded-[4px] text-center font-[14px]"
                        >
                            <option value="">All</option>
                            <option value="Munich">Most Relevant</option>
                            <option value="Dresden">Most Recent</option>
                        </select>
                    </div> */}
                </div>
                <hr />
            </div>
        </div>
    );
}

export default FilteredJobsHeader;
