import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Home, FolderKan, Settings, LogOut } from 'lucide-react';

export function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-primary text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-secondary p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-white mb-10">ProjectDoAnNganh2</h1>
        <nav className="flex-grow">
          <Link to="/" className="flex items-center py-3 px-4 rounded-lg text-gray-300 hover:bg-dark-tertiary transition-colors">
            <Home className="mr-3" size={20} />
            Dự án
          </Link>
          <Link to="/settings" className="flex items-center py-3 px-4 rounded-lg text-gray-300 hover:bg-dark-tertiary transition-colors mt-2">
            <Settings className="mr-3" size={20} />
            Cài đặt
          </Link>
        </nav>
        <button onClick={handleLogout} className="flex items-center w-full py-3 px-4 rounded-lg text-gray-300 hover:bg-red-800/50 transition-colors">
          <LogOut className="mr-3" size={20} />
          Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}