import './header.scss'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaCaretUp, FaRegBell } from "react-icons/fa6";
import { useState } from 'react';

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Cookies from 'js-cookie';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const signOut = useSignOut();
    const navigate = useNavigate();

    const handleSignOut = () => {
        try {
            signOut();
            Cookies.remove('userId');
            Cookies.remove('organizationId');
            Cookies.remove('userName');
            navigate("/login");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

  return (
    <div className='header bg-[#F8F9FF] '>
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
          <h2 className='text-[32px] font-bold'>{Cookies.get('organizationName')}</h2>
        </div>
        <div className='headerMenu flex items-center justify-between gap-5'>
          <Link to="/myjobs">
            <button className='bg-[#5674FC] px-4 py-2 text-white font-semibold text-[14px] rounded-[4px]'>
              Screening CV
            </button>
          </Link>
          <p className='relative'>
            <FaRegBell className='text-xl' />
            <span className='absolute bg-red-600 top-[-12px] right-[-4px] h-4 w-4 rounded-full text-center text-white flex items-center justify-center text-sm'>
              1
            </span>
          </p>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='h-6 w-9 flex relative items-center gap-1'
          >
            <img
              src={logo}
              alt='BinaryHire Logo'
              className='h-6 w-6 rounded-full border border-black'
            />
            {!isOpen ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          {isOpen && (
            <div className='absolute bg-[#F8F9FF] top-20 right-10 flex flex-col gap-2 p-2'>
              <button>Change Password</button>
              <button onClick={handleSignOut}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
