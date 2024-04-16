import './header.scss';
import logo from '../../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaRegBell } from 'react-icons/fa6';
import { FaCog, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const handleSignOut = () => {
    try {
      signOut();
      Cookies.remove('userId');
      Cookies.remove('organizationId');
      Cookies.remove('userName');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleClickOutside = (event) => {
    if (
      isOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest('.menu-button')
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className='header bg-[#F8F9FF] fixed top-0 left-0 w-full z-50 '>
      <div className='headerSection  h-[76px] w-auto flex justify-between items-center py-[14px] px-[32px]'>
        <div className='logo'>
          <Link to='/'>
            <img
              src={logo}
              alt='BinaryHire Logo'
              className='object-contain h-20 w-36'
            />
          </Link>
        </div>
        <div className='companyName'>
          <h2 className='text-[32px] font-bold'>
            {Cookies.get('organizationName')}
          </h2>
        </div>
        <div className='headerMenu flex items-center justify-between gap-5 z-10'>
          {/* <Link to='/myjobs'>
            <button className='bg-[#5674FC] px-4 py-2 text-white font-semibold text-[14px] rounded-[4px]'>
              Screening CV
            </button>
          </Link> */}
          <p className='relative'>
            <FaRegBell className='text-xl mb-[-6px]' />
            <span className='absolute bg-red-600 top-[-8px] right-[-6px] h-4 w-4 rounded-full text-center text-white flex items-center justify-center text-sm'>
              1
            </span>
          </p>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='h-6 w-9 flex relative items-center gap-1 menu-button'
          >
            {/* <img
              src={logo}
              alt='BinaryHire Logo'
              className='h-6 w-6 rounded-full border border-black'
            /> */}
            <PersonIcon className='h-6 w-6 rounded-full border border-black' />
            {!isOpen ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          {isOpen && (
            <div
              ref={menuRef}
              className='absolute bg-white shadow-lg w-[200px] top-20 right-10 rounded-md overflow-hidden transition-all duration-300'
            >
              {/* <Link to='/email'>
                <button className='w-full p-2 text-left hover:bg-gray-100 focus:outline-none'>
                  <FaCog className='inline-block mr-2' /> Manage Template
                </button>
              </Link> */}
              <Link to='/changePassword'>
                <button className='w-full p-2 text-left hover:bg-gray-100 focus:outline-none'>
                  <FaLock className='inline-block mr-2' /> Reset Password
                </button>
              </Link>
              
              <button
                className='w-full p-2 text-left hover:bg-gray-100 focus:outline-none'
                onClick={handleSignOut}
              >
                <FaSignOutAlt className='inline-block mr-2' /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
