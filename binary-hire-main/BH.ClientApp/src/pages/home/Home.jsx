import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "../../../app_settings";
import JobButton from "../../components/jobButton/JobButton";
import CardNav from "../../components/cardNav/CardNav";
import JobList from "../../components/jobList/JobList";
import OpenJobs from "../../components/homeCard/OpenJobs";
import InProgress from "../../components/homeCard/InProgress";
import Finished from "../../components/homeCard/Finished";
import Closed from "../../components/homeCard/Closed";
import HomeHero from "../../components/homeHero/HomeHero";

const Home = () => {
  const [activeSection, setActiveSection] = useState("board");
  const [jobs, setJobs] = useState([]);
  const [jobsCount, setJobsCount] = useState(0);
  const [finishedJobsCount, setFinishedJobsCount] = useState(0);
  const [closedJobsCount, setClosedJobsCount] = useState(0);

  useEffect(() => {
    if (activeSection === "board") {
      fetchJobs();
    } else if (activeSection === "favourites") {
      fetchFavoriteJobs();
    }
  }, [activeSection]);

  useEffect(() => {
    fetchGetAllCountJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const authToken = Cookies.get("_auth");
      const userId = Cookies.get("userId");
      const organizationId = Cookies.get("organizationId");

      const requestBody = {
        page: 1,
        pageSize: 30,
        organizationId,
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/get-all`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );

      console.log("Response data:", response.data);

      setJobs(response.data.data);

      const countFinished = response.data.data.filter(
        (job) => job.status === 16
      ).length;
      setFinishedJobsCount(countFinished);

      const countClosed = response.data.data.filter(
        (job) => job.status === 17
      ).length;
      setClosedJobsCount(countClosed);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchFavoriteJobs = async () => {
    try {
      const authToken = Cookies.get("_auth");
      const userId = Cookies.get("userId");
      const organizationId = Cookies.get("organizationId");

      const requestBody = {
        organizationId: organizationId,
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/get-job-favourites`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            UserId: userId,
            OrganizationId: organizationId,
            "Content-Type": "application/json",
          },
        }
      );

      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching favorite jobs:", error);
    }
  };

  const handleFavoriteToggle = async (jobId, isFav) => {
    try {
      const authToken = Cookies.get("_auth");
      const userId = Cookies.get("userId");
      const organizationId = Cookies.get("organizationId");

      const requestBody = {
        jobId,
        isFav,
        modifiedBy: userId,
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/update-job-favourites`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            "Content-Type": "application/json",
          },
        }
      );

      setJobs((prevJobs) => {
        const updatedJobs = prevJobs.map((job) =>
          job.id === jobId ? { ...job, isFav } : job
        );
        return updatedJobs;
      });
      // If the job was unfavorited and the active section is 'favourites', remove it from the UI
      if (activeSection === "favourites" && !isFav) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const fetchGetAllCountJobs = async () => {
    try {
      const authToken = Cookies.get("_auth");
      const userId = Cookies.get("userId");
      const organizationId = Cookies.get("organizationId");

      const requestBody = {
        page: 2147483647,
        pageSize: 2147483647,
        organizationId,
      };

      const response = await axios.post(
        `${BASE_URL}JobPost/get-all-count`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );

      setJobsCount(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const renderJobsByStatus = (status) => {
    return jobs
      .filter((job) => job.status === status)
      .map((job) => {
        switch (status) {
          case 14:
            return (
              <OpenJobs
                key={job.id}
                job={job}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            );
          case 15:
            return (
              <InProgress
                key={job.id}
                job={job}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            );

          case 16:
            return (
              <Finished
                key={job.id}
                job={job}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            );

          case 17:
            return (
              <Closed
                key={job.id}
                job={job}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            );

          default:
            return null;
        }
      });
  };

  return (
    <div className="home flex-1 ">
      {/* <div className='jobButtons px-[199px] py-[46px] flex justify-between bg-[#E7EAEE]'>
        <Link to='/create'>
          <JobButton job='Create Job' imgSrc='./src/assets/create.png' />
        </Link>
        <Link to='/myjobs'>
          <JobButton job='Manage Jobs' imgSrc='./src/assets/manage.png' />
        </Link>
        <Link to='/WorkflowPage'>
          <JobButton job='Workflow' imgSrc='./src/assets/workflow.png' />
        </Link>
      </div> */}
      <HomeHero
        jobsCount={jobsCount}
        finishedJobsCount={finishedJobsCount}
        closedJobsCount={closedJobsCount}
      />
      <CardNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex justify-between items-center h-12   border-b border-gray shadow-lg  ">
        {[14, 15, 16, 17].map((status) => (
          <div key={status} className="flex-1">
            <div className="h-full flex justify-center items-center shadow-bottom mr-2 border-r">
              <span className="text-center  text-lg font-medium">
                {status === 14 && "Open"}
                {status === 15 && "In Progress"}
                {status === 16 && "Finished"}
                {status === 17 && "Closed"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className="1 overflow-x-auto  overflow-y-auto relative "
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        <div className="flex  bg-[#E7EAEE]  ">
          {[14, 15, 16, 17].map((status) => (
            <div
              key={status}
              className="w-1/4 border-r "
              style={{
                borderRightWidth: "4px",
                borderRightColor: "white",
                minHeight: "100%",

                // borderTopWidth: '4px',
                // borderTopColor: 'white',
              }}
            >
              <div className="m-4">{renderJobsByStatus(status)}</div>
            </div>
          ))}
        </div>
      </div>
      {/* <JobList header='Recent Results' /> */}
      {/* {activeSection === 'favourites' && <JobList header='Favourites' />} */}
    </div>
  );
};

export default Home;
