import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./app.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Landing from "./pages/landing/Landing";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import MyJobs from "./pages/myJobs/MyJobs";
import CreateJob from "./pages/createJob/CreateJob";
import Result from "./pages/result/Result";
import Screening from "./pages/screening/Screening";
import WorkflowPage from "./pages/workflow/WorkflowPage";
import SetQuestionsPage from "./pages/questionnaire/SetQuestionsPage";
import ViewQuestionsPage from "./pages/questionnaire/ViewQuestionsPage";
import EditQuestionsPage from "./pages/questionnaire/EditQuestionsPage";
import SideNav from "./components/sideNav/SideNav";
import TableResult from "./components/table/TableResult";
import Cookies from "js-cookie";
import Scheduler from "./components/schedulerPage/SchedulerPage";
import MyScheduler from "./components/schedulerPage/MySchedulerPage";
import Email from "./pages/email/Email";
import ChangePassword from "./pages/changePassword/ChangePassword";
import AllAssessment from "./pages/questionnaire/AllAssessment";
import Consent from "./components/landing/Consent";

function App() {
  const location = useLocation();
  const authToken = Cookies.get("_auth"); // Adjust this based on your cookie structure

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        {location.pathname !== "/login" && location.pathname !== "/" && (
          <Header />
        )}

        <div
          className="flex min-h-screen"
          style={{
            marginTop:
              location.pathname !== "/login" && location.pathname !== "/"
                ? "76px"
                : "0",
          }}
        >
          {location.pathname !== "/login" && location.pathname !== "/" && (
            <SideNav />
          )}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/consent" element={<Consent />} />
            {/*
              Wrap the login route with a check for authentication.
              If authenticated, redirect to the dashboard.
            */}
            {authToken ? (
              <Route path="/login" element={<Navigate to="/dashboard" />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            <Route element={<AuthOutlet fallbackPath="/login" />}>
              <Route path="/dashboard" element={<Home />} />
              <Route exact path="/myjobs" element={<MyJobs />} />
              <Route exact path="/create" element={<CreateJob />} />
              <Route exact path="/result/:jobId" element={<Result />} />
              <Route path="/screening/:jobId" element={<Screening />} />
              <Route path="/WorkflowPage" element={<WorkflowPage />} />
              <Route
                path="/questionnaire/:jobId"
                element={<SetQuestionsPage />}
              />
              <Route
                path="/assessment/:resultId/:jobId"
                element={<ViewQuestionsPage />}
              />
              <Route path="/editQuestion" element={<EditQuestionsPage />} />
              <Route path="/result1" element={<TableResult />} />
              <Route path="/scheduler/:resultId" element={<Scheduler />} />
              <Route path="/AssessmentSummery/:jobId" element={<AllAssessment />} />
              <Route path="/myscheduler/" element={<MyScheduler />} />
              <Route path="/email" element={<Email />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </Route>
          </Routes>
        </div>

        {location.pathname !== "/login" && location.pathname !== "/" && (
          <Footer />
        )}
      </>
    </DndProvider>
  );
}

export default App;
