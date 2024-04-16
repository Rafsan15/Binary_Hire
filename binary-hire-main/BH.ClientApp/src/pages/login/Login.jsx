import './login.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_URL}Account/Login`, formData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res.data.data.userRoleName !== 'Customer') {
            setError('You are not authorized to access this platform.');
          } else {
            if (
              signIn({
                auth: {
                  token: res.data.data.token,
                  type: 'Bearer',
                },
              })
            ) {
              Cookies.set('userId', res.data.data.userId, { expires: 7 }); // expires in 7 days
              Cookies.set('organizationId', res.data.data.organizationId, {
                expires: 7,
              }); // expires in 7 days
              Cookies.set('userName', res.data.data.userName, { expires: 7 }); // expires in 7 days
              Cookies.set('organizationName', res.data.data.organizationName, {
                expires: 7,
              }); // expires in 7 days
              navigate('/dashboard');
            } else {
              setError('Authentication failed');
            }
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while processing your request');
        }
      });
  };

  return (
    <div className='login flex-1 flex flex-col justify-center items-center'>
      {loading && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
          <div className='rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping'></div>
        </div>
      )}
      <div className='headerSection mx-10 mt-5 mb-10'>
        <div className='logo'>
          <Link to='/'>
            <img
              src={logo}
              alt='BinaryHire Logo'
              className='object-contain h-24 w-24'
            />
          </Link>
        </div>
      </div>
      <div className='formSection w-full flex justify-center'>
        <form
          onSubmit={onSubmit}
          className='formContent w-full max-w-md border p-10 rounded-lg bg-slate-50'
        >
          <div className='formHeader mb-10'>
            <h3 className='font-bold text-2xl'>Login</h3>
            <h6>to get started</h6>
          </div>
          <div className='formInputs flex flex-col gap-5'>
            <input
              type='text'
              name='userName'
              id='userName'
              className='p-2 border rounded-lg'
              placeholder='abrar@example.com'
              required
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
            <input
              type='password'
              name='password'
              id='password'
              className='p-2 border rounded-lg'
              placeholder='Please Enter Your Password'
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button className='mt-8 p-2 bg-blue-500 text-white rounded-lg w-full'>
            Login
          </button>
          {error && <div className='error mt-2 text-red-500'>{error}</div>}
          <div className='forgotPassword mt-10 flex flex-col gap-2'>
            <a href='#'>Forgot Password?</a>
            <p className='font-light'>Problem? Contact Us.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
