import { FaAirbnb, FaEllipsis, FaStar } from "react-icons/fa6";
import "./filteredJobs.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "../../../app_settings";
import Pagination from "../Pagination/Pagination";
import { Icon } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Swal from "sweetalert2";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilteredJobs = ({
  searchTerm,
  location,
  jobs,
  setJobs,
  handlePageChange,
  currentPage,
  totalPages,
  pageSize,
  totalJobs,
  handlePageSizeChange,
  deleteRefresh,
}) => {
  // State to store the IDs of selected checkboxes
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Function to handle checkbox click event
  const handleCheckboxChange = (jobId) => {
    if (selectedCheckboxes.includes(jobId)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== jobId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, jobId]);
    }
  };

  // Function to handle star click for a specific job
  const handleStarClick = async (jobId, currentIsFav) => {
    try {
      const updatedIsFav = !currentIsFav;
      // Update the state to toggle the isFav property for the clicked job
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, isFav: updatedIsFav } : job
        )
      );

      const organizationId = Cookies.get("organizationId");
      const userId = Cookies.get("userId");

      const requestBody = {
        jobId: jobId,
        isFav: updatedIsFav,
        modifiedBy: userId,
      };

      // Make an API call to update the favorite list
      await axios.post(
        `${BASE_URL}JobPost/update-job-favourites`,
        requestBody,
        {
          headers: {
            userId,
            organizationId,
          },
        }
      );
    } catch (error) {
      console.error("Error updating favorite list:", error);
      // If an error occurs, revert the state back to the original state to maintain consistency
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, isFav: currentIsFav } : job
        )
      );
    }
  };
  // Function to handle delete
  const handleDelete = async () => {
    try {
      const authToken = Cookies.get("_auth");
      const userId = Cookies.get("userId");
      const organizationId = Cookies.get("organizationId");

      // Show confirmation dialog with SweetAlert
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these jobs!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If user confirms deletion
      if (confirmed.isConfirmed) {
        const response = await axios.post(
          `${BASE_URL}JobPost/delete`,
          { ids: selectedCheckboxes },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              userId,
              organizationId,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.isSuccess) {
          console.log("Jobs deleted successfully:", response.data.data);
          deleteRefresh();
          setSelectedCheckboxes([]);
          // Notify user of successful deletion
          Swal.fire(
            "Deleted!",
            "Your selected jobs have been deleted.",
            "success"
          );
        } else {
          console.error("Failed to delete jobs:", response.data.message);
          // Notify user of failure if needed
          Swal.fire(
            "Error",
            "Failed to delete jobs. Please try again later.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error deleting jobs:", error);
      // Notify user of error if needed
      Swal.fire("Error", "An error occurred while deleting jobs.", "error");
    }
  };

  const getStatusColor = (statusName) => {
    switch (statusName) {
      case "Open":
        return "green-600";
      case "InProgress":
        return "orange-600";
      case "Completed":
        return "blue-600";
      case "Closed":
        return "red-600";
      default:
        return "blue-600"; // Default color
    }
  };
  const getStatusBg = (statusName) => {
    switch (statusName) {
      case "Open":
        return "green-100";
      case "InProgress":
        return "orange-100";
      case "Completed":
        return "blue-100";
      case "Closed":
        return "red-100";
      default:
        return "blue-100"; // Default color
    }
  };

  return (
    <div>
      {selectedCheckboxes.length > 0 && (
        <button className="mb-2 text-red-500" onClick={handleDelete}>
          Delete All
        </button>
      )}
      {jobs.map((job) => (
        <Accordion
          key={job.id}
          className="border mt-5 rounded-[4px]"
          style={{ backgroundColor: "rgba(206, 243, 245, 0.2)" }}
        >
          {/* Accordion Header - Job Listing */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-5">
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedCheckboxes.includes(job.id)}
                    onChange={() => handleCheckboxChange(job.id)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div onClick={() => handleStarClick(job.id, job.isFav)}>
                    {job.isFav ? (
                      <FaStar style={{ color: "orange" }} />
                    ) : (
                      <FaStar />
                    )}
                  </div>
                  <label>
                    <span className="text-lg">{job.title}</span>
                  </label>
                </div>
              </div>
              {/* Right Side - Button */}
              <div
                className="flex items-center gap-5"
                onClick={(e) => e.stopPropagation()}
              >
                <Link to={`/questionnaire/${job.id}`}>
                  <Tooltip title="Set interiew questions under this job">
                    <Icon
                      fontSize="large"
                      style={{ color: "blue", paddingBottom: "50px" }} // Adjust marginBottom value
                    >
                      <StickyNote2Icon />
                    </Icon>
                  </Tooltip>
                </Link>
                <span
                  className={`text-${getStatusColor(
                    job.statusName
                  )} bg-${getStatusBg(
                    job.statusName
                  )} block font-sans text-base antialiased font-semibold leading-relaxed p-1 rounded-md w-[90px] text-center`}
                >
                  {job.statusName}
                </span>

                <Link
                  to={`/${job.statusName === "Open" ? "screening" : "result"}/${
                    job.id
                  }`}
                  className="mr-[20px]"
                >
                  {job.statusName === "Open" ? (
                    <button className="bg-[#5674FC] px-4 py-2 text-white font-semibold text-[14px] rounded-[4px] w-[140px]">
                      {" "}
                      Start Screening{" "}
                    </button>
                  ) : job.statusName === "InProgress" ? (
                    <button className="bg-green-600 px-4 py-2 text-white font-semibold text-[14px] rounded-[4px] w-[140px]">
                      {" "}
                      View Screening{" "}
                    </button>
                  ) : job.statusName === "Finished" ? (
                    <button className="bg-orange-600 px-4 py-2 text-white font-semibold text-[14px] rounded-[4px] w-[140px]">
                      {" "}
                      View Results{" "}
                    </button>
                  ) : (
                    <button className="bg-orange-600 px-4 py-2 text-white font-semibold text-[14px] rounded-[4px] w-[140px]">
                      {" "}
                      View Results{" "}
                    </button>
                  )}
                  {/* <button className="bg-[#5674FC] px-4 py-2 text-white font-semibold text-[14px] rounded-[4px] w-[140px]">
                    {
                      job.statusName === "Open" ? "Start Screening" : 
                      (
                        job.statusName === "InProgress" ? "View Screening" : 
                        (
                          job.statusName === "Finished" ? "View Results" : "View Results"
                        )
                      )
                    }
                    {job.statusName === "InProgress"
                      ? "View Screening"
                      : job.statusName === "Completed"
                      ? "Show Results"
                      : "Start Screening"}
                  </button> */}
                </Link>

                {/* <FaEllipsis /> */}
              </div>
            </div>
          </AccordionSummary>
          <hr />
          {/* Accordion Content - Job Description */}
          <AccordionDetails>
            <div className="p-3">
              <p className="ml-5 text-md font-bold mb-2">Job Description:</p>
              <p className="ml-5 leading-normal">{job.description}</p>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

      <div className="pagination flex justify-center mt-10">
        {/* <Stack spacing={2}>
                  <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined" 
                    shape="rounded" 
                  />
                </Stack> */}
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalJobs}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default FilteredJobs;
