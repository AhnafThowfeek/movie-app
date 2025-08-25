import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('email and password are required');
        try {
            
            const response = await fetch("http://localhost:5000/auth/signin", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => navigate('/'), 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err);
            console.log('error',err);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-900 px-4">
            <div className="max-w-md w-full space-y-8 bg-neutral-800 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign in to access your account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={loginInfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            className="w-full px-4 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-orange-500 outline-none"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={loginInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password..."
                            className="w-full px-4 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 font-bold rounded bg-gradient-to-r from-red-400 to-orange-300 text-black hover:scale-105 transition-all"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-300">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-orange-300 hover:text-white underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
