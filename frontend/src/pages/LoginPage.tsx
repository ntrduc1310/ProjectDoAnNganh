import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="min-h-screen bg-dark-primary text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark-secondary rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-400">
            Chào Mừng Trở Lại
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
              Tạo tài khoản
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          {/* Form fields */}
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-300"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;