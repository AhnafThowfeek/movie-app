import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field changed: ${name} = ${value}`); // Debug log
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        console.log('=== SIGNUP BUTTON CLICKED ===');
        console.log('Current signup info:', signupInfo);
        
        const { username, email, password } = signupInfo;
        
        // Check if all fields are filled
        if (!username || !email || !password) {
            console.log('Validation failed - missing fields:', {
                username: !!username,
                email: !!email,
                password: !!password
            });
            return handleError('username, email and password are required');
        }
        
        console.log('Validation passed, making API call...');
        
        try {
            console.log('Sending request to:', 'http://localhost:5000/auth/signup');
            console.log('Request body:', JSON.stringify(signupInfo));
            
            const response = await fetch('http://localhost:5000/auth/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            const result = await response.json();
            console.log('Server response:', result);
            
            const { success, message, error } = result;
            if (success) {
                console.log('Signup successful!');
                handleSuccess(message);
                setIsSuccess(true);
                setSuccessMessage(message || 'Signup successful! Redirecting to login...'); // FIXED
                setTimeout(() => navigate('/login'), 1000);
            } else {
                console.log('Signup failed:', error || message);
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            console.error('Network/Parse error:', err);
            handleError('Connection failed. Please check if your server is running.');
        }
    };

    return (
        <div className='min-h-screen bg-neutral-900 text-white flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-neutral-800 rounded-lg p-8 shadow-lg'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Signup</h1>
                <form onSubmit={handleSignup} className='space-y-4'>
                    <div>
                        <label htmlFor='username' className='block mb-1'>Name</label>
                        <input
                            id='username'
                            onChange={handleChange}
                            type='text'
                            name='username'
                            placeholder='Enter your name...'
                            value={signupInfo.username}
                            className='w-full px-4 py-2 rounded bg-neutral-700 text-white outline-none'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block mb-1'>Email</label>
                        <input
                            id='email'
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                            className='w-full px-4 py-2 rounded bg-neutral-700 text-white outline-none'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block mb-1'>Password</label>
                        <input
                            id='password'
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                            className='w-full px-4 py-2 rounded bg-neutral-700 text-white outline-none'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full py-2 font-bold rounded bg-gradient-to-r from-red-400 to-orange-300 text-black hover:scale-105 transition-all'
                        onClick={() => console.log('Button clicked!')} // Additional debug
                    >
                        Signup
                    </button>
                    <p className='text-center text-sm mt-2'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-orange-300 underline hover:text-white'>
                            Login
                        </Link>
                    </p>
                </form>
                <ToastContainer />
                
               
            </div>
        </div>
    );
}

export default Signup;