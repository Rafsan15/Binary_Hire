import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './app.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Landing from './pages/landing/Landing';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import MyJobs from './pages/myJobs/MyJobs';
import CreateJob from './pages/createJob/CreateJob';
import Result from './pages/result/Result';
import Screening from './pages/screening/Screening';
import WorkflowPage from './pages/workflow/WorkflowPage';
import Questionnaire from './pages/questionnaire/Questionnaire';
import SideNav from './components/sideNav/SideNav';
import TableResult from './components/table/TableResult';
import Cookies from 'js-cookie';
import Scheduler from './components/schedulerPage/SchedulerPage';
import Email from './pages/email/Email';

function App() {
  const location = useLocation();
  const authToken = Cookies.get('_auth'); // Adjust this based on your cookie structure

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        {location.pathname !== '/login' && location.pathname !== '/' && (
          <Header />
        )}

        <div className='flex'>
          {location.pathname !== '/login' && location.pathname !== '/' && (
            <SideNav />
          )}
          <Routes>
            <Route path='/' element={<Landing />} />
            {/*
              Wrap the login route with a check for authentication.
              If authenticated, redirect to the dashboard.
            */}
            {authToken ? (
              <Route path='/login' element={<Navigate to='/dashboard' />} />
            ) : (
              <Route path='/login' element={<Login />} />
            )}
            <Route element={<AuthOutlet fallbackPath='/login' />}>
              <Route path='/dashboard' element={<Home />} />
              <Route exact path='/myjobs' element={<MyJobs />} />
              <Route exact path='/create' element={<CreateJob />} />
              <Route exact path='/result/:jobId' element={<Result />} />
              <Route path='/screening/:jobId' element={<Screening />} />
              <Route path='/WorkflowPage' element={<WorkflowPage />} />
              <Route path='/Questionnaire' element={<Questionnaire />} />
              <Route path='/result1' element={<TableResult />} />
              <Route path='/scheduler/:resultId' element={<Scheduler />} />
              <Route path='/email' element={<Email />} />
            </Route>
          </Routes>
        </div>

        {location.pathname !== '/login' && location.pathname !== '/' && (
          <Footer />
        )}
      </>
    </DndProvider>
  );
}

export default App;
