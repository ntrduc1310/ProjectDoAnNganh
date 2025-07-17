import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { registerSchema, type RegisterFormInputs } from '../types';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid, isSubmitting } 
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        console.log("Dữ liệu đăng ký hợp lệ:", data);
        
        try {
            // Giả lập thời gian xử lý
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // TODO: Gọi API đăng ký ở đây
            // const response = await api.post('/auth/register', data);
            
            // Chuyển hướng về login với thông báo thành công
            navigate('/login', { 
                state: { 
                    message: `Đăng ký thành công! Chào mừng ${data.firstName} ${data.lastName}`,
                    type: 'success'
                } 
            });
            
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <UserPlus className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Tạo tài khoản mới
                    </h1>
                    <p className="text-gray-300">
                        Gia nhập hệ thống quản lý dự án
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Fields Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Họ
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="firstName"
                                        type="text"
                                        {...register("firstName")}
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            errors.firstName 
                                                ? 'border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                                        }`}
                                        placeholder="Họ"
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="mt-1 text-xs text-red-400 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Tên
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="lastName"
                                        type="text"
                                        {...register("lastName")}
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            errors.lastName 
                                                ? 'border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                                        }`}
                                        placeholder="Tên"
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="mt-1 text-xs text-red-400 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

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
                                    placeholder="Tạo mật khẩu mạnh"
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

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword")}
                                    className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.confirmPassword 
                                            ? 'border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                                    }`}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-400 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-2">Yêu cầu mật khẩu:</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Ít nhất 6 ký tự</li>
                                <li>• Có ít nhất 1 chữ hoa</li>
                                <li>• Có ít nhất 1 chữ thường</li>
                                <li>• Có ít nhất 1 số</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                                isValid && !isSubmitting
                                    ? 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/20 shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang tạo tài khoản...
                                </span>
                            ) : (
                                'Tạo tài khoản'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">hoặc</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Đã có tài khoản?{' '}
                            <Link 
                                to="/login" 
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                            >
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>© 2025  Hệ thống hỗ trợ ra quyết định phân công nhiệm vụ. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;