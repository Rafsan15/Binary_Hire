import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSave = (e) => {
        setLoading(true);
        const authToken = Cookies.get('_auth');
        const userName = Cookies.get('userName');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        const changePasswordModel = {
        organizationId: organizationId,
        userName: userName,
        oldPassword: oldPassword,
        password: newPassword,
        confirmPassword: confirmPassword
        };

        axios
        .post(`${BASE_URL}Account/change-password`, changePasswordModel, {
            headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId,
            },
        })
        .then((response) => {
            setLoading(false);
            if(response.data && response.data.data){
                Swal.fire({
                title: 'Success!',
                text: 'Password changed Successfully',
                icon: 'success',
                }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard'); // Redirect to "/myjobs" on success
                }
                });
            }
            else{
                setError(response.data.message);
            }
            
            // Redirect or perform other actions as needed
        })
        .catch((error) => {
            setLoading(false);
            setError("An error occurred while processing your request"); // Set generic error message
        });
    }
    return (

        <div className='bg-[#FFFFFF] pb-[100px] flex-1 mt-10'>
            {loading && 
            <div>
                <div className="backdrop fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>
                <div className="rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping absolute top-[50%] left-[50%] z-50"></div>
            </div>}
            
            <div className='flex flex-col items-center mt-5'>
            <div className='ml-10  mb-4'>
                <span className='text-xl'>Reset Password</span>
            </div>

            <div className='mb-[80px] w-2/4 flex flex-col justify-center' >
                    {/* <label htmlFor='oldPassword' className='block text-lg font-bold mb-2'>
                        Old Password
                
                    </label> */}
                    <div>
                        <input
                        type='password'
                        id='oldPassword'
                        placeholder='Old Password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={`w-full mb-4  h-10 border p-2 ${error=='Invalid Current Password'? 'border-[#FF0000]': 'border-[#B5B5B5]'} rounded-[10px] focus:outline-none focus:ring focus:border-blue-300`}
                        />
                    </div>
                    {/* <label htmlFor='newPassword' className='block text-lg font-bold mb-2'>
                        New Password
                
                    </label> */}
                    <div>
                        <input
                        type='password'
                        id='newPassword'
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full mb-4  h-10 border p-2 ${error=='Password must be equal to confirm password.'? 'border-[#FF0000]': 'border-[#B5B5B5]'} rounded-[10px] focus:outline-none focus:ring focus:border-blue-300`}
                        />
                    </div>

                    {/* <label htmlFor='confirmPassword' className='block text-lg font-bold mb-2'>
                        Confirm Password
                
                    </label> */}
                    <div>
                        <input
                        type='password'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full mb-4  h-10 border p-2 ${error=='Password must be equal to confirm password.'? 'border-[#FF0000]': 'border-[#B5B5B5]'} rounded-[10px] focus:outline-none focus:ring focus:border-blue-300`}
                        />
                    </div>
                    {error && <div className="error mt-2 text-red-500">{error}</div>}
                    <button
                        onClick={handleSave}
                        className={`w-full px-4 py-2 my-2 rounded bg-[#5674FC] text-white`}
                    >
                        Save
                    </button>
                </div>
                </div>
            </div>
    )
}

export default ChangePassword;