import './landing.scss'
import logo  from '../../assets/logo.png'
import hero from '../../assets/hero.jpg';
import Footer from '../../components/footer/Footer'
import { FaAngleRight, FaPlay  } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ColorButton from '../../components/colorButton/ColorButton';

const Landing = () => {
    return (
        <div className='landing'>
            <div className="headerSection flex justify-between mt-5 mx-28">
                <div className="logo">
                <Link to="/"><img src={logo} alt="BinaryHire Logo" className='object-contain h-24 w-24' /></Link>
                </div>
                <div className="menu flex mt-5">
                    <ul className='flex gap-5'>
                        <li><Link to="login">LOGIN</Link></li>
                        <li><a href="#" className='text-violet-500 flex items-center'>BOOK A DEMO <FaAngleRight className='mt-0.5 ml-0.5'/></a></li>
                    </ul>
                </div>
            </div>
            <div className="heroSection mt-5 mx-28">
                <div className="bannerSection flex justify-between">
                    <div className="heroText w-3/4">
                        <p className='bg-gray-200 w-40 text-center border-1 border-gray-300 rounded-full text-sm py-1'>WE CAN HELP YOU</p>
                        <h1 className='text-6xl w-3/4 mt-2'>Grow faster with our all-in-one, Smart Recruitment System</h1>
                        <h6 className='text-xl w-3/4 mt-5'>Our recruitment system is usable as a standalone software or it can be used as an integrated software with your office system. Whichever way you prefer to use it, we promise our system will be flawless.</h6>
                    </div>
                    <div className="heroImg w-1/4">
                        <img src={hero} alt="Hero Banner" className="object-contain h-auto" />
                    </div>
                </div>
                <div className="heroButtons flex">
                    <button className='sqrbtn w-fit h-10 border border-black mr-8 text-center mt-5 flex items-center justify-center px-2'>Watch Video <FaPlay className='mt-0.5 ml-0.5'/></button>
                    <button className='sqrbtn w-fit h-10 border border-black text-center mt-5 flex items-center justify-center px-2'>Get Started <FaAngleRight className='mt-0.5 ml-0.5'/></button>
                </div>
            </div>
            <div className="experienceSection flex justify-around items-center mt-14 mx-28 border rounded-lg border-gray-400 bg-slate-100 py-6">
                <div className="experience text-center">
                    <h2 className='font-bold text-4xl'>2</h2>
                    <span className='text-lg'>Years Experience</span>
                </div>
                <div className="resumes text-center">
                    <h2 className='font-bold text-4xl'>3K+</h2>
                    <span>Resumes</span>
                </div>
                <div className="review text-center">
                    <h2 className='font-bold text-4xl'>4.8</h2>
                    <span>Average Review</span>
                </div>
                <div className="works text-center">
                    <h2 className='font-bold text-4xl'>10+</h2>
                    <span>Professional Works</span>
                </div>
            </div>
            <div className="plansSection mx-28 my-16">
                <h1 className='text-4xl text-center mb-14'>CHOOSE THE RIGHT PLAN</h1>
                <div className="plansCard flex justify-between">
                    <div className="planCard border border-gray-300 rounded-lg w-80 flex flex-col items-center gap-2 bg-slate-200 p-10">
                        <h4 className='text-lg font-bold'>SILVER<span className='text-sm font-normal'>/month</span></h4>
                        <h6 className='text-sm font-semibold'>5€<span className='text-xs font-normal'>/user</span></h6>
                        <ul className='list-disc flex flex-col gap-2'>
                            <li>20 Screening Sessions </li>
                            <li>250 Emails  </li>
                            <li>20 Scheduling</li>
                            <li>Standalone</li>
                            <li>No Audit Log</li>
                        </ul>
                        <ColorButton />
                    </div>
                    <div className="planCard border border-gray-300 rounded-lg w-80 flex flex-col items-center gap-2 bg-slate-200 p-10">
                        <h4 className='text-lg font-bold'>GOLD<span className='text-sm font-normal'>/month</span></h4>
                        <h6 className='text-sm font-semibold'>10€<span className='text-xs font-normal'>/user</span></h6>
                        <ul className='list-disc flex flex-col gap-2'>
                            <li>50 Screening Sessions </li>
                            <li>500 Emails  </li>
                            <li>100 Scheduling</li>
                            <li>Standalone</li>
                            <li>Audit Log</li>
                        </ul>
                        <ColorButton />
                    </div>
                    <div className="planCard border border-gray-300 rounded-lg w-80 flex flex-col items-center gap-2 bg-slate-200 p-10">
                        <h4 className='text-lg font-bold'>PLATINUM<span className='text-sm font-normal'>/month</span></h4>
                        <h6 className='text-sm font-semibold'>20€<span className='text-xs font-normal'>/user</span></h6>
                        <ul className='list-disc flex flex-col gap-2'>
                            <li>Unlimited Screening Sessions </li>
                            <li>1000 Emails  </li>
                            <li>500 Scheduling</li>
                            <li>Standalone</li>
                            <li>Audit Log</li>
                        </ul>
                        <ColorButton />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default Landing;
