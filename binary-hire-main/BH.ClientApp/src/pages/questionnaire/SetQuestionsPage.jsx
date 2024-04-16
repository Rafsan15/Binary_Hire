import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import BASE_URL from '../../../app_settings';
import axios from 'axios';
import Cookies from 'js-cookie';
import { InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from '@mui/icons-material/ListAlt';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const SetQuestionsPage = () => {
  const location1 = useLocation();
  const { jobId } = useParams(); // Retrieve the job ID from the URL
  const searchParams = new URLSearchParams(location1.search);
  const navigate = useNavigate();
  const initialSearchValue = searchParams.get('redirect') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchValue);
  const [jobPost, setJobPost] = useState();
  const [questions, setQuestions] = useState([]);
  const [addquestions, setAddQuestions] = useState('');
  const [jobs, setJobs] = useState([]);
  const [questionTexts, setQuestionTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fechJobPost();
    fetchQuestion();
  }, [jobId]);

  // GET JOBS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const response = await axios.post(
          `${BASE_URL}JobPost/get-by-id`,
          jobId,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              userId,
              organizationId,
              'Content-Type': 'application/json', // Set content type to JSON
            },
          }
        );
        setJobs(response.data.data);
      } catch (error) {
        console.error('Error Job exists by organization id:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = {
        jobId,
        questionItems: questionTexts.map((question) => ({
          id: question.id,
          modifiedBy: userId, // Assuming modifiedBy should be set to the current user ID
          organizationId: organizationId,
          questionText: question.questionText,
          isDelete: question.isDelete,
        })),
      };

      const response = await axios.post(
        `${BASE_URL}Question/list-save`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      if (response.data.isSuccess) {
        Swal.fire({
          title: 'Success!',
          text: 'Successfully saved',
          icon: 'success',
        }).then((result)=>{
          if(searchTerm){
            navigate(searchTerm)
          }
        }
          
        )
        // Optionally, you can redirect or show a success message
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong!',
          icon: 'error',
        })
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      })
    }
  };

  //fech job post by Id

  const fechJobPost = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}JobPost/get-by-id`,
        jobId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );
      setLoading(false);
      setJobPost(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching job:', error);
    }
  };

  // FETCH QUESTION BY ID JOBID

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}Question/get-all`,
        {
          searchModel: {
            columnFilter: [
              {
                columnName: 'jobId',
                columnValue: [jobId],
                columnValueType: 'number',
              },
            ],
          },
          page: 1,
          pageSize: 100,
          organizationId: organizationId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );
      setLoading(false);
      setQuestions(response.data.data);
      console.log('gfgf', questions);
      setQuestionTexts(response.data.data); // Store fetched questionTexts
      console.log(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const handleDeleteQuestion = (id, indexToRemove) => {
    const updatedQuestionsL = questions.filter(
      (_, index) => index !== indexToRemove
    );
    setQuestions(updatedQuestionsL);
    if (id == 0) {
      const updatedQuestionsP = questionTexts.filter(
        (_, index) => index !== indexToRemove
      );
      setQuestionTexts(updatedQuestionsP);
    } else {
      const updatedQuestionsP = questionTexts.map((obj) =>
        obj.id === id ? { ...obj, isDelete: true } : obj
      );
      setQuestionTexts(updatedQuestionsP);
    }
  };

  // Update question state when questions are fetched
  useEffect(() => {
    if (questions.length > 0) {
      // Set the question text in the text field
    }
  }, [questions]);

  const handleAddQuestion = () => {
    //let var1 = [... questions]
    if (addquestions.trim() !== '') {
      setQuestions((prevQuestions) => [
        { questionText: addquestions.trim(), id: 0 },
        ...prevQuestions,
      ]);
      setQuestionTexts((prevQuestions) => [
        { questionText: addquestions.trim(), id: 0 },
        ...prevQuestions,
      ]);
      setAddQuestions(''); // Clear the addquestions state
      // You probably meant to set the question and questionTexts states here
      // Clear the question state
      // setQuestionTexts((prevQuestionTexts) => [
      //   ...prevQuestionTexts,
      //   addquestions.trim(),
      // ]); // Add the new question to questionTexts state
      setError(false)
    }else{
      setError(true);
    }
  };

  const truncatedTitle = jobPost?.title.length > 30 ? `${jobPost.title.slice(0, 30)}...` : jobPost?.title;

  
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const skillsArray = jobPost?.skills.split(',');

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddQuestion();
    }
  };

  return (
    <div className='flex'>
      {loading && 
            <div>
                <div className="backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>

                <div className="rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50"></div>
            </div>}
      <div className='w-1/3 p-8 bg-[#ffffff]'>
        <Breadcrumbs aria-label="breadcrumb" className="cursor-pointer">
          <StyledBreadcrumb
            component="a"
            href="/myjobs"
            label="Manage Jobs"
            icon={<ListAltIcon fontSize="small" />}
            />
          <StyledBreadcrumb label="Questionnaire" />
        </Breadcrumbs>
        <div className='mb-4 mt-5'>

          <h1 className='font-bold mb-4'>Job Title</h1>
        </div>

        <div className='mb-4 text-justify border p-3 rounded-lg  bg-[#CEF3F5]'>
          <label className='text-normal font-bold mb-4' title={jobPost?.title}>
          {jobPost?.title}
          </label>
        </div>

        <h1 className='font-bold mb-4'>Job Description</h1>
        <div className='mb-4 text-justify border p-3 rounded-lg  bg-[#CEF3F5]
        '>
          <div className="text-justify max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200 pr-3 ">
            {showFullDescription ? (
              <p>{jobPost?.description}</p>
            ) : (
              <p>{jobPost?.description.slice(0, 120)}...</p>
            )}
            
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleDescription}
              >
                {showFullDescription ? 'See less' : 'See more'}
              </button>
            
          </div>
        </div>
        {/* Display skills as badges */}
        <h1 className='font-bold mb-4'>Required Skills</h1>
        <div className="mt-4 flex flex-wrap">
          {skillsArray?.map((skill, index) => (
            <span key={index} className="inline-block bg-[#CEF3F5] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div class="border-2 border-[#434248] border-opacity-20 h-100"></div>

      <div
        style={{
          padding: '20px',
          width: '1000px',
          margin: '0 auto',
        }}
      >

        <label
          htmlFor='jobLink'
          className='block text-lg font-bold mb-2'
          style={{ textAlign: 'left' }}
        >
          Set Your Interview Questions
        </label>

    
        <TextField
          label='Question'
          value={addquestions}
          onChange={(e) => setAddQuestions(e.target.value)}
          fullWidth
          margin='normal'
          style={{ marginBottom: '20px', width: '100%' }}
          required
          error={error} // Pass the error state to the TextField component
          helperText={error ? 'This field is required' : ''}
          onKeyPress={handleEnterKeyPress}
        />
        <Button
          variant='contained'
          onClick={handleAddQuestion}
          style={{ backgroundColor: '#7cbf8a', color: 'white', textTransform: 'none', fontSize: "18px" }}
        >
          Add Question
        </Button>
        <div style={{ marginTop: '20px' }}>
          <label htmlFor='jobLink' className='block text-bg font-bold mb-2'>
            Preview Questions:
          </label>

          <ul className='max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200 pr-4'>
            {questions.map((q, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextField
                  label={`Question ${index + 1}`}
                  value={q.questionText}
                  onChange={(e) => {
                    const editedQuestions = [...questions];
                    editedQuestions[index].questionText = e.target.value;
                    setQuestions(editedQuestions);
                    setQuestionTexts(editedQuestions);
                  }}
                  fullWidth
                  margin='normal'
                  style={{ marginBottom: '20px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Button
                          onClick={() => handleDeleteQuestion(q.id, index)}
                          style={{ color: 'red' }}
                        >
                          <DeleteIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={async () => await handleSave()}
          className={
            'float-right text-white px-4 py-2 my-2 rounded bg-[#5674FC]'
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SetQuestionsPage;
