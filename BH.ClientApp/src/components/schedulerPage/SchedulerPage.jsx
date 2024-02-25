import React, { useState, useEffect } from "react";
import Scheduler from "../../pages/scheduler/Scheduler";
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import Toolbar from "../../pages/toolbar/Toolbar";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SchedulerPage = () => {
  const { resultId } = useParams();
  const [currentTimeFormatState, setCurrentTimeFormatState] = useState(true);
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    fetchEvents();
    getByResultId();
  },[])

  const convertToISODate= (dateString) =>{
    const date = new Date(dateString);

  // Extract the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the ISO 8601 formatted date string
  const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

  return isoDateString;
  }
  const convertToCustomFormat = (isoDateString) => {
    // Create a new Date object from the provided ISO 8601 formatted date string
    const date = new Date(isoDateString);
  
    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0"); // Incrementing day by 1
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    // Construct the custom formatted date string
    const customFormattedDateString = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    return customFormattedDateString;
  }

  const fetchEvents = async () => {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        page: 1,
        pageSize: 200,
        organizationId,
        searchModel: {
          columnFilter: [
            {
              columnName: 'createdBy',
              columnValue: [userId],
              columnValueType: 'number'
            }
          ]
        }
      };

      const response = await axios.post(
        `${BASE_URL}Schedule/get-all`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
          },
        }
      );
        let tmpData = [];
      response.data.data.forEach((event) => {
        const transformedEvent = {
          start_date: convertToCustomFormat(event.startTime),
          end_date: convertToCustomFormat(event.endTime),
          text: event.description,
          id: event.id,
        };
        tmpData.push(transformedEvent);
      });
      setData(tmpData)
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSaveSchadule = async (e) => {
    const resultTemp = await getByResultId();
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    const SchaduleData = {
      id: e.id,
      modifiedBy: userId, // Your user ID here
      organizationId: organizationId,
      jobPostId: resultTemp.jobPostId,
      resultId: resultTemp.id,
      onDate: '2024-02-25T03:56:12.787Z',
      startTime: convertToISODate(e.start_date),
      endTime: convertToISODate(e.end_date) // Your organization ID here
      
    };
    try {

      const response = await axios.post(`${BASE_URL}Schedule/save`, SchaduleData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          userId,
          organizationId,
        },
      });
      setResultData(response.data.data);
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      })
    }

    
  };

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };
    const updatedMessages = [newMessage, ...messages];

    if (updatedMessages.length > maxLogLength) {
      updatedMessages.length = maxLogLength;
    }
    setMessages(updatedMessages);
  };

  const logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : "";
    const message = `event ${action}: ${id} ${text}`;
    addMessage(message);
    handleSaveSchadule(ev)
  };

  const handleTimeFormatStateChange = (state) => {
    setCurrentTimeFormatState(state);
  };

  const getByResultId = async () => {

    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = resultId;

      const response = await axios.post(`${BASE_URL}Result/get-result-by-id`, requestBody, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          userId,
          organizationId,
        },
      });
      setResultData(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching workflow details:', error);
    }
  
};

  return (
    <div className="flex-1 mx-12">
      <div>
        {/* <div className="tool-bar">
          <Toolbar
            timeFormatState={currentTimeFormatState}
            onTimeFormatStateChange={handleTimeFormatStateChange}
          />
        </div> */}
        <div className="scheduler-container">
          <Scheduler
            events={data}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={logDataUpdate}
            resultData={resultData}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulerPage;
