import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Folder, Settings, LogOut, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 dark:bg-gray-900 text-white p-4">
        {/* Header with app name and theme toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Project App</h2>
          <ThemeToggle />
        </div>

        <nav className="space-y-2">
          {/* Home Link */}
          <Link 
            to="/" 
            className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
              isActive('/') ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <Home className="mr-3" size={20} />
            Trang chủ
          </Link>
          
          {/* Projects Link */}
          <Link 
            to="/projects" 
            className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
              isActive('/projects') ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <Folder className="mr-3" size={20} />
            Dự án
          </Link>
          
          {/* Dashboard Link */}
          <Link 
            to="/dashboard" 
            className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
              isActive('/dashboard') ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <BarChart3 className="mr-3" size={20} />
            Dashboard
          </Link>
          
          {/* Settings Link */}
          <Link 
            to="/settings" 
            className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
              isActive('/settings') ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <Settings className="mr-3" size={20} />
            Cài đặt
          </Link>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center py-2 px-4 rounded-lg hover:bg-red-600 w-full text-left transition-colors mt-4"
          >
            <LogOut className="mr-3" size={20} />
            Đăng xuất
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
        <Outlet />
      </div>
    </div>
  );
}