import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
          setLoading(true);
          axios.post(`${BASE_URL}Account/Login`, {userName: email, password})
          .then((res) => {
              setLoading(false);
              if (res.status === 200) {
                  if (res.data.data.userRoleName !== "Admin") {
                      setError("You are not authorized to access this platform."); // Set error message if user role is not "Customer"
                  } else {
                      if (signIn({
                          auth: {
                              token: res.data.data.token,
                              type: 'Bearer'
                          }
                      })) {
                          Cookies.set('userId', res.data.data.userId);
                          Cookies.set('organizationId', res.data.data.organizationId);
                          Cookies.set('userName', res.data.data.userName);
                          navigate("/");
                      } else {
                          setError("Authentication failed");
                      }
                  }
              }
          })
          .catch((error) => {
              setLoading(false);
              if (error.response && error.response.data && error.response.data.message) {
                  setError(error.response.data.message); // Set error message from API response
              } else {
                  setError("An error occurred while processing your request"); // Set generic error message
              }
          });
    };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Admin Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
