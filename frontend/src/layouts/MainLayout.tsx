import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext'; // ✅ FIX IMPORT
import { 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  Home,
  FolderOpen,
  BarChart3,
  Cog,
  Sun,
  Moon,
  Search,
  Plus,
  Bot
} from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { QuickActions } from '../components/QuickActions';

export const MainLayout: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'tasks', label: 'Quản lý Task', icon: FolderOpen, path: '/tasks' },
    { id: 'analytics', label: 'Phân tích', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Cài đặt', icon: Settings, path: '/settings' },
  ];

  const managementItems = [
    { label: 'Người dùng', icon: User },
    { label: 'Nhóm', icon: FolderOpen },
    { label: 'Quyền hạn', icon: Settings },
    { label: 'Logs', icon: BarChart3 },
    { label: 'Backup', icon: Cog },
    { label: 'API Keys', icon: Settings },
    { label: 'Webhooks', icon: Settings }
  ];

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR FIXED */}
      <div className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-r ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } overflow-y-auto`}>
        
        {/* Sidebar Header */}
        <div className={`sticky top-0 z-10 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Project App
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`p-2 rounded-md lg:hidden ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Đóng menu bên"
              title="Đóng menu điều hướng"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE NAVIGATION AREA */}
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {/* Main Navigation */}
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    isActive
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-label={`Điều hướng đến ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} className="mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

            {/* Management Section */}
            <div className={`pt-4 mt-4 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <p className={`px-4 text-xs font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } mb-3`}>
                Quản lý
              </p>
              
              {managementItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} className="mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* USER SECTION - STICKY BOTTOM */}
          <div className={`sticky bottom-0 p-4 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className={`flex items-center p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              } text-white text-sm font-medium flex-shrink-0`}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {user?.name || 'User'}
                </p>
                <p className={`text-xs truncate ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-md transition-colors flex-shrink-0 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Đăng xuất khỏi ứng dụng"
                title="Đăng xuất"
              >
                <LogOut size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Đóng menu điều hướng"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top Navigation */}
        <header className={`sticky top-0 z-30 backdrop-blur-sm border-b ${
          isDarkMode 
            ? 'bg-gray-900/90 border-gray-700' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`p-2 rounded-lg transition-colors lg:hidden ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label="Mở menu điều hướng"
                  title="Mở menu"
                >
                  <Menu size={20} aria-hidden="true" />
                </button>
                
                {/* ✅ SEARCH BAR + QUICK ACTIONS */}
                <div className="flex items-center space-x-3 flex-1 max-w-lg">
                  {/* Search Bar */}
                  <div className={`relative flex-1 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  } rounded-lg`}>
                    <Search 
                      size={18} 
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} 
                    />
                    <input
                      type="text"
                      placeholder="Tìm kiếm projects, tasks..."
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white placeholder-gray-400' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                  
                  {/* Quick Actions */}
                  <QuickActions />
                </div>
              </div>

              {/* Right Actions - giữ nguyên */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  aria-label={`Chuyển sang chế độ ${isDarkMode ? 'sáng' : 'tối'}`}
                  title={`Chuyển sang chế độ ${isDarkMode ? 'sáng' : 'tối'}`}
                >
                  {isDarkMode ? (
                    <Sun size={20} aria-hidden="true" />
                  ) : (
                    <Moon size={20} aria-hidden="true" />
                  )}
                </button>

                {/* Notifications */}
                <NotificationDropdown />

                {/* User Menu */}
                <div className="relative group">
                  <button 
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    aria-label="Menu người dùng"
                    title="Menu người dùng"
                  >
                    <User size={20} aria-hidden="true" />
                    <span className="hidden md:block text-sm font-medium">
                      {user?.name || 'User'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className={`border-t mt-auto ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © 2025 Project Decision Support System. Đồ án ngành 2.
              </p>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Version 1.0.0
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};