import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Cookies from 'js-cookie';
import axios from 'axios';
import BASE_URL from '../../../app_settings';
import { emphasize, styled } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { FaPlusCircle } from 'react-icons/fa';
import { PiNoteFill } from 'react-icons/pi';
import StickyNote from '../../components/Note/StickyNote';

const ViewQuestionsPage = ({ questions, setQuestions }) => {
  const { resultId, jobId } = useParams();

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [isCloseNote, setIsCloseNote] = useState(true);
  const [numQuestionsNeeded, setNumQuestionsNeeded] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isAssessmentDone, setIsAssessmentDone] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });
  useEffect(() => {
    // Fetch resume URL or set it manually
    const resumeUrl =
      'https://drive.google.com/file/d/1bl1HbCAqUCiKNDGfcYs6pnSsYo1U1Kpu/preview';

    setResumeUrl(resumeUrl);

    checkAssessment();
    fetchResume();
    fetchJob();
  }, []);
  const fechData = async () => {
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

      // Initialize grades for each question
      const questionsWithGrades = response.data.data.map((question) => ({
        ...question,
        grade: '', // Initialize grade property
      }));
      setGeneratedQuestions(questionsWithGrades);
      setLoading(false);
      // setSelectedQuestions(questionsWithGrades);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const fetchJob = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(`${BASE_URL}JobPost/get-by-id`, jobId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
          'Content-Type': 'application/json', // Set content type to JSON
        },
      });
      setLoading(false);
      setNoteText(response.data.data.note);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const saveNote = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}JobPost/save-note`,
        {
          jobPostId: jobId,
          Note: noteText,
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
    } catch (error) {
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const fetchResume = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}Result/get-result-by-id`,
        resultId,
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
      setResumeUrl(response.data.data.locationPath.replace('view', 'preview'));
    } catch (error) {
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const checkAssessment = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}Assessment/is-assessment-done`,
        resultId,
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
      if (response.data && response.data.data) {
        setIsAssessmentDone(response.data.data);

        getAssessmentScore();

        // Optionally, you can redirect or show a success message
      } else {
        fechData();
        setIsAssessmentDone(false);

        console.error('Failed to get isAssessment:', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error saving grade:', error);
    }
  };
  const saveAssessment = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const assessmentItems = generatedQuestions.map((question) => ({
        id: 0,
        modifiedBy: userId,
        organizationId: organizationId,
        questionId: question.id,
        score: question.grade ? parseInt(question.grade) : 0, // If grade is selected, store it, otherwise store 0
      }));

      const requestBody = {
        resultId: resultId,
        assessmentItems: assessmentItems,
      };

      const response = await axios.post(
        `${BASE_URL}Assessment/list-save`,
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
        console.log('Grade saved successfully:', response.data.data);
        Swal.fire({
          title: 'Success!',
          text: 'Assessment is completed',
          icon: 'success',
        });
        setIsAssessmentDone(true);
        saveNote();
        // Optionally, you can redirect or show a success message
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong!',
          icon: 'error',
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      });
    }
  };
  const handleSave = async () => {
    Swal.fire({
      title: 'Do you want to complete this assessment?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        saveAssessment();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const handleNoteTextChange = (newText) => {
    setNoteText(newText);
  };

  const getAssessmentScore = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const response = await axios.post(
        `${BASE_URL}Assessment/get-all`,
        {
          searchModel: {
            columnFilter: [
              {
                columnName: 'resultId',
                columnValue: [resultId],
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
      if (response.data) {
        setGeneratedQuestions(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  const handleGradeChange = (questionIndex, grade) => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions[questionIndex].grade = grade;
    setGeneratedQuestions(updatedQuestions);
  };
  const onClose = () => {
    setIsCloseNote(true);
  };
  const onNoteClick = () => {
    setIsCloseNote(false);
  };

  return (
    <div
      id='1'
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {loading && (
        <div>
          <div className='backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50'></div>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50'></div>
        </div>
      )}
      <div
        id='2'
        style={{
          padding: '20px',
          margin: '20px',

          width: '100%',
          height: '100%',
        }}
      >
        <Breadcrumbs aria-label='breadcrumb' className='cursor-pointer mb-3'>
          <StyledBreadcrumb
            component='a'
            href='/myjobs'
            label='Manage Jobs'
            icon={<ListAltIcon fontSize='small' />}
          />
          <StyledBreadcrumb
            label='Results'
            component='a'
            href={`/result/${jobId}`}
          />
          <StyledBreadcrumb label='Assessment' />
        </Breadcrumbs>

        <div className='flex flex-row '>
          <div className=' id=24  mt-10 basis-1/2 md:basis-1/2 '>
            <div className='border bg-[#ECF4EE] rounded-md p-4 flex flex-row '>
              <div className='basis-3/4'>
                <label
                  htmlFor='jobLink'
                  className='block text-bg font-bold  '
                  style={{ fontSize: '22px' }}
                >
                  Interview Questions
                </label>
              </div>
              <div className='basis-1/4  flex justify-end items-center '>
                <button
                  onClick={onNoteClick}
                  className='bg-blue-500 mr-2 text-black px-4 py-2 rounded-md bg-transparent 
      border-2 border-[#434248] border-opacity-40	 hover:bg-green-300 hover:bg-opacity-20	'
                  title='Create Questions'
                >
                  <PiNoteFill color='green' size={18} />
                </button>
                <Link
                  // to={`/questionnaire/${jobId}`}
                  to={{
                    pathname: `/questionnaire/${jobId}`,
                    search: `?redirect=${encodeURIComponent(
                      `/assessment/${resultId}/${jobId}`
                    )}`,
                  }}
                >
                  <button
                    className='bg-blue-500 text-black px-4 py-2 rounded-md bg-transparent 
      border-2 border-[#434248] border-opacity-40	 hover:bg-green-300 hover:bg-opacity-20	'
                    title='Create Questions'
                  >
                    <FaPlusCircle color='green' size={18} />
                  </button>
                </Link>
              </div>
            </div>

            <div
              id='scroll'
              className='border rounded-md mt-4 p-5 bg-[#F3F4F6]'
              style={{
                maxHeight: '900px',
                overflowY: 'auto',
                // width: '100%', // Ensure the div takes up the full width
                // maxWidth: 'calc(100vw - 640px)', // Limit maximum width to prevent it from growing too wide
                // Add some margin between the div and the iframe
              }}
            >
              <FormControl>
                {generatedQuestions.map((question, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: '20px', display: 'inline-block' }}
                  >
                    <h3
                      className='si'
                      style={{
                        color: '#009688',
                        display: 'inline-block',
                        marginRight: '10px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                      }}
                    >
                      Q :
                    </h3>
                    <p
                      style={{
                        color: '#212121',
                        display: 'inline-block',
                        verticalAlign: 'top',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                      }}
                    >
                      {question.questionText}
                    </p>

                    <RadioGroup
                      row
                      value={question.grade}
                      onChange={(e) => handleGradeChange(index, e.target.value)}
                      name={`grade-${index}`}
                      key={question.id}
                    >
                      <FormControlLabel
                        value='100'
                        control={<Radio color='primary' />}
                        label={
                          <span style={{ color: '#043b0b', fontWeight: '' }}>
                            Excellent
                          </span>
                        }
                      />
                      <FormControlLabel
                        value='80'
                        control={<Radio color='primary' />}
                        label={
                          <span style={{ color: '#0c8243', fontWeight: '' }}>
                            Good
                          </span>
                        }
                      />
                      <FormControlLabel
                        value='60'
                        control={<Radio color='primary' />}
                        label={
                          <span style={{ color: '#2196f3', fontWeight: '' }}>
                            Fair
                          </span>
                        }
                      />
                      <FormControlLabel
                        value='40'
                        control={<Radio color='primary' />}
                        label={
                          <span style={{ color: '#ff9800', fontWeight: '' }}>
                            Poor
                          </span>
                        }
                      />
                      <FormControlLabel
                        value='20'
                        control={<Radio color='primary' />}
                        label={
                          <span style={{ color: '#f44336', fontWeight: '' }}>
                            Very Poor
                          </span>
                        }
                      />
                    </RadioGroup>
                  </div>
                ))}
              </FormControl>
            </div>
            {isAssessmentDone ? (
              <></>
            ) : (
              <div className='mt-4'>
                <button
                  onClick={async () => await handleSave()}
                  className={
                    ' text-white px-4 py-2 my-2 rounded  bg-[#5674FC] '
                  }
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div id='23' className='basis mt-10 1/2 md:basis-2/3'>
            <iframe
              src={resumeUrl}
              title='Resume'
              allow='autoplay'
              style={{
                height: '988px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                marginLeft: '40px',
                width: '100%',
              }}
            />
          </div>
        </div>

        {!isCloseNote && (
          <div>
            <StickyNote
              width={300}
              height={250}
              noteText={noteText}
              onNoteTextChange={handleNoteTextChange}
              onClose={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQuestionsPage;
