import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CableIcon from '@mui/icons-material/Cable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
const SideNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const MenuComponents = {
    DashboardIcon: DashboardIcon,
    NoteAddIcon: NoteAddIcon,
    ListAltIcon: ListAltIcon,
    CableIcon: CableIcon,
    CalendarMonthIcon: CalendarMonthIcon,
    EmailIcon: EmailIcon,

  };
  const Menus = [
    { title: 'Dashboard', src: 'DashboardIcon', route: '/dashboard' },
    { title: 'Create Jobs', src: 'NoteAddIcon', route: '/create' },
    { title: 'Manage Jobs', src: 'ListAltIcon', route: '/myjobs' },
    { title: 'Workflow', src: 'CableIcon', route: '/WorkflowPage' },
    { title: 'My Calendar', src: 'CalendarMonthIcon', route: '/myscheduler' },
    { title: 'Email Templates', src: 'EmailIcon', route: '/email' },
  ];

  return (
    <>
      <div className='flex z-40  '>
        <div
          className={`bg-gray-800  h-full p-5 pt-8 ${
            open ? 'w-72' : 'w-20'
          } relative duration-300 ease-in-out transition-all  will-change-transform flex-grow`}
        >
          {open?<ArrowCircleLeftIcon
            className='absolute bg-white text-blue-500 cursor-pointer  -right-3 top-8 w-7 border-blue border-2 rounded-full'
            onClick={() => setOpen(!open)}
            style={{width:30, height:30}}
          />:
          <ArrowCircleRightIcon
            className='absolute bg-white text-blue-500 cursor-pointer  -right-3 top-8 w-7 border-blue border-2 rounded-full'
            onClick={() => setOpen(!open)}
            style={{width:30, height:30}}
          />
          }
          
          {/* <img
            src='/src/assets/arrow-left.png'
            className={`absolute  cursor-pointer  -right-3 top-8 w-7 border-blue border-2 rounded-full ${
              !open && 'rotate-180'
            }`}
            onClick={() => setOpen(!open)}
          /> */}
          <div>
            <div className='pt-6'>
              {Menus.map((Menu, index) => {
                const IconComponent = MenuComponents[Menu.src];
                return (
                  <Link
                    key={index}
                    to={Menu.route}
                    className={`flex rounded-md p-2 items-center ${
                      location.pathname === Menu.route
                        ? 'bg-blue-500 text-white cursor-pointer'
                        : 'hover:bg-black text-white cursor-pointer'
                    }    ${Menu.gap ? 'mt-9' : 'mt-2'}`}
                    title={Menu.title}
                  >
                    {IconComponent && <IconComponent />}{' '}
                    {/* Render the icon dynamically */}
                    <span
                      className={`text-xl font-regular whitespace-nowrap ${
                        !open && 'hidden'
                      } origin-left duration-200 group-hover:block ml-3`}
                    >
                      {Menu.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
