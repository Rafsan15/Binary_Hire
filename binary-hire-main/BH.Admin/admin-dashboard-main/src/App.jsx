import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import CreateUser from "./scenes/users/CreateUser";
import UserList from "./scenes/users/UserList";
import CompanyList from "./scenes/company/CompanyList";
import Login from "./scenes/login/Login";
import Cookies from 'js-cookie';

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const authToken = Cookies.get('_auth');
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {location.pathname !== "/login" && <Sidebar />}
          <main className="content">
          {location.pathname !== "/login" && <Topbar />}
            <Routes>
            {authToken ? (
              <Route path='/login' element={<Navigate to="/" />} />
            ) : (
              <Route path='/login' element={<Login />} />
            )}
              <Route element={<AuthOutlet fallbackPath='/login' />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/user-create" element={<CreateUser />} />
                <Route path="/company-list" element={<CompanyList />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
