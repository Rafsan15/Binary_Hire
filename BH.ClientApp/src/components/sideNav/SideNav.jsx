import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const Menus = [
    { title: 'Dashboard', src: 'dashboard', route: '/dashboard' },
    { title: 'Create Jobs', src: 'create', route: '/create' },
    { title: 'Manage Jobs', src: 'manage', route: '/myjobs' },
    { title: 'Workflow', src: 'workflow', route: '/WorkflowPage' },
  ];

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div
          className={`bg-gray-800  h-screen p-5 pt-8 ${
            open ? 'w-72' : 'w-20'
          } relative duration-300 ease-in-out transition-all  will-change-transform flex-grow`}
        >
          <img
            src='/src/assets/arrow-left.png'
            className={`absolute  cursor-pointer -right-3 top-8 w-7 border-blue border-2 rounded-full ${
              !open && 'rotate-180'
            }`}
            onClick={() => setOpen(!open)}
          />
          <div>
            <div className='pt-6'>
              {Menus.map((Menu, index) => (
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
                  <img src={`/src/assets/${Menu.src}.png`} className='mr-4' />
                  <span
                    className={`text-xl font-regular whitespace-nowrap ${
                      !open && 'hidden'
                    } origin-left duration-200 group-hover:block`}
                  >
                    {Menu.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
