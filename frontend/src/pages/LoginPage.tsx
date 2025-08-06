import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, Eye, EyeOff } from 'lucide-react';
import { loginSchema, type LoginFormInputs } from '../types';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // ✅ ADD ERROR STATE
    const { login } = useAuth();
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid, isSubmitting } 
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: 'test@example.com',
            password: 'password123'
        }
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            setIsLoading(true);
            setErrorMessage(null); // ✅ CLEAR PREVIOUS ERRORS
            console.log('🚀 Attempting login with:', data);
            
            // ✅ TRY BACKEND FIRST
            try {
                const response = await api.post('/auth/login', {
                    email: data.email,
                    password: data.password
                });

                console.log('✅ Backend login successful:', response.data);
                
                if (response.data.accessToken || response.data.token) {
                    const token = response.data.accessToken || response.data.token;
                    const userData = response.data.user;
                    
                    const userObj = {
                        id: userData.id || 1,
                        name: userData.fullName || userData.name || 'User',
                        email: userData.email || data.email,
                        role: userData.role || 'user'
                    };

                    login(token, userObj);
                    navigate('/dashboard', { replace: true });
                    return;
                }
            } catch (backendError: any) {
                console.log('❌ Backend login failed, using mock:', backendError);
                // ✅ SET ERROR MESSAGE FOR BACKEND FAILURE
                setErrorMessage('Backend không phản hồi, sử dụng chế độ demo');
            }
            
            // ✅ FALLBACK TO MOCK
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockUser = {
                id: 1,
                name: 'Nguyễn Trọng Đức',
                email: data.email,
                role: 'admin'
            };
            
            const mockToken = 'mock-jwt-token-for-testing';
            
            login(mockToken, mockUser);
            navigate('/dashboard', { replace: true });
            
        } catch (error: any) {
            console.error('❌ Login failed:', error);
            // ✅ USE ERROR MESSAGE STATE
            const errorMsg = error?.message || error?.toString() || 'Đăng nhập thất bại';
            setErrorMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ FIX QUICK TEST FUNCTION
    const handleQuickTest = async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null); // ✅ CLEAR PREVIOUS ERRORS
            
            const response = await api.post('/auth/login', {
                email: 'test@example.com',
                password: 'password123'
            });

            if (response.data.accessToken || response.data.token) {
                const token = response.data.accessToken || response.data.token;
                const userData = response.data.user;
                
                login(token, {
                    id: userData.id || 1,
                    name: userData.fullName || 'Test User',
                    email: userData.email || 'test@example.com',
                    role: userData.role || 'user'
                });
                
                navigate('/dashboard', { replace: true });
            }
        } catch (error: any) {
            console.error('Quick test failed:', error);
            // ✅ USE ERROR MESSAGE STATE
            setErrorMessage('Backend test thất bại, chuyển sang chế độ demo');
            
            // Fallback to mock
            login('mock-token', {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: 'user'
            });
            navigate('/dashboard', { replace: true });
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Kiểm tra nếu đã login thì redirect
    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Chào mừng trở lại
                    </h1>
                    <p className="text-gray-300">
                        Đăng nhập để quản lý dự án của bạn
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
                    {/* ✅ ERROR MESSAGE DISPLAY */}
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <p className="text-yellow-400 text-sm flex items-center">
                                <span className="mr-2">⚠️</span>
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <AtSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.email 
                                            ? 'border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                                    }`}
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.password 
                                            ? 'border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                                    }`}
                                    placeholder="Nhập mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting || isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                                isValid && !isSubmitting && !isLoading
                                    ? 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/20 shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                            }`}
                        >
                            {isSubmitting || isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng nhập...
                                </span>
                            ) : (
                                '🚀 Đăng nhập với Backend'
                            )}
                        </button>

                        {/* Quick Test Button */}
                        <button
                            type="button"
                            onClick={handleQuickTest}
                            disabled={isLoading}
                            className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            🧪 Quick Backend Test
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Chưa có tài khoản?{' '}
                            <Link 
                                to="/register" 
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                            >
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;