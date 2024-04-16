import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

const Closed = ({ job, handleFavoriteToggle }) => {
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFavoriteToggle(job.id, !job.isFav); // Toggle the favorite status
  };

  return (
    <Link className="flex" to={`/result/${job.id}`}>
      <div className="relative mb-4 text-gray-700 bg-white shadow-md border bg-clip-border rounded-xl w-full hover:bg-red-100 transition-colors duration-300">
        <Tooltip
          title="Set interview questions under this job"
          arrow
          placement="bottom-end"
        >
          {/* <IconButton
            component={Link}
            to={`/questionnaire/${job.id}`}
            style={{
              color: "blue",
              position: "absolute",
              bottom: "25px",
              right: "10px",
            }}
          >
            <StickyNote2Icon />
          </IconButton> */}
        </Tooltip>

        <button
          onClick={handleToggleFavorite}
          type="button"
          className="absolute top-2 right-2 mt-4 mr-2 bg-white rounded-full p-1 transition-colors duration-300 hover:bg-red-100"
        >
          {job.isFav ? (
            <FaStar className="h-6 w-6 text-yellow-500 cursor-pointer" />
          ) : (
            <FaRegStar className="h-6 w-6 text-gray-500 cursor-pointer" />
          )}
        </button>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased 
          font-semibold leading-snug tracking-normal text-blue-gray-900" title={job?.title}>
            {job.title.split(" ").slice(0, 5).join(" ")}{" "}
            {job.title.split(" ").length > 5 ? "..." : ""}
          </h5>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit">
            {job.jobTypeName}
            <br />
            {job.workPlaceName}
          </p>
        </div>
        <div className="p-6 pt-0 flex items-center justify-between">
          <div className="block w-[90px] text-center font-sans text-base antialiased font-semibold leading-relaxed text-red-600 bg-red-100 p-1 rounded-md">
            {job.statusName}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Closed;
