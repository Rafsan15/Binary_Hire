import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa6';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer px-28 flex flex-col gap-4 border-t-2 py-2 bg-[#5674FC0C] h-[100px]'>
      <div className='top mt-2'>
        <p className='text-center text-[16px] text-[#98A2B3]'>
          © 2023 Binary Brenz. All rights reserved.
        </p>
      </div>
      <div className='bottom flex justify-between mb-2'>
        <div className='left flex'>
          <ul className='flex gap-5 text-[#667085]'>
            <a href=''>
              <li>
                <FaFacebookF />
              </li>
            </a>
            <a href=''>
              <li>
                <FaInstagram />
              </li>
            </a>
            <a href=''>
              <li>
                <FaTwitter />
              </li>
            </a>
            <a href=''>
              <li>
                <FaLinkedinIn />
              </li>
            </a>
          </ul>
        </div>
        <div className='right flex text-[16px] text-[#667085]'>
          <ul className='flex gap-5'>
            <li className='cursor-pointer'>Privacy Policy</li>
            <li className='cursor-pointer'>General Info</li>
            <li className='cursor-pointer'>Terms of Use</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
