import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Bell, 
  Palette, 
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, icon, children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-lg border p-6 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-100'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      taskUpdates: true,
      projectUpdates: false,
      weeklyReport: true
    },
    appearance: {
      theme: isDarkMode ? 'dark' : 'light',
      language: 'vi',
      timezone: 'Asia/Ho_Chi_Minh'
    },
    privacy: {
      profileVisible: true,
      activityTracking: true,
      dataSharing: false
    },
    account: {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // TODO: Implement save functionality
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    // TODO: Implement data export
  };

  const handleImportData = () => {
    console.log('Importing user data...');
    // TODO: Implement data import
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
      console.log('Deleting account...');
      // TODO: Implement account deletion
    }
  };

  return (
    <div className={`min-h-screen p-6 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Cài đặt
          </h1>
          <p className={`mt-2 text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Quản lý tài khoản và tùy chọn ứng dụng của bạn
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <SettingsSection
            title="Thông tin tài khoản"
            description="Cập nhật thông tin cá nhân và mật khẩu"
            icon={<User className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={settings.account.name}
                    onChange={(e) => handleSettingChange('account', 'name', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    title="Enter your full name"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.account.email}
                    onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    title="Enter your email address"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={settings.account.currentPassword}
                      onChange={(e) => handleSettingChange('account', 'currentPassword', e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border pr-10 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      title="Enter current password"
                      placeholder="Mật khẩu hiện tại"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={settings.account.newPassword}
                      onChange={(e) => handleSettingChange('account', 'newPassword', e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border pr-10 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      title="Enter new password"
                      placeholder="Mật khẩu mới"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={settings.account.confirmPassword}
                      onChange={(e) => handleSettingChange('account', 'confirmPassword', e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border pr-10 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      title="Confirm new password"
                      placeholder="Xác nhận mật khẩu mới"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Appearance Settings */}
          <SettingsSection
            title="Giao diện"
            description="Tùy chỉnh giao diện và ngôn ngữ"
            icon={<Palette className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Chế độ tối
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Bật/tắt giao diện tối
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  type="button"
                  aria-label="Toggle dark mode"
                  title="Toggle dark mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Ngôn ngữ
                  </label>
                  <select
                    value={settings.appearance.language}
                    onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    title="Select language"
                    aria-label="Select language"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Múi giờ
                  </label>
                  <select
                    value={settings.appearance.timezone}
                    onChange={(e) => handleSettingChange('appearance', 'timezone', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    title="Select timezone"
                    aria-label="Select timezone"
                  >
                    <option value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Notification Settings */}
          <SettingsSection
            title="Thông báo"
            description="Quản lý cách bạn nhận thông báo"
            icon={<Bell className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />}
          >
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email thông báo', desc: 'Nhận thông báo qua email' },
                { key: 'push', label: 'Thông báo đẩy', desc: 'Nhận thông báo trên trình duyệt' },
                { key: 'taskUpdates', label: 'Cập nhật task', desc: 'Thông báo khi task thay đổi' },
                { key: 'projectUpdates', label: 'Cập nhật dự án', desc: 'Thông báo khi dự án thay đổi' },
                { key: 'weeklyReport', label: 'Báo cáo tuần', desc: 'Nhận báo cáo tổng kết hàng tuần' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.label}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notifications', item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications[item.key as keyof typeof settings.notifications] ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    type="button"
                    aria-label={`Toggle ${item.label}`}
                    title={`Toggle ${item.label}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications[item.key as keyof typeof settings.notifications] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </SettingsSection>

          {/* Data Management */}
          <SettingsSection
            title="Quản lý dữ liệu"
            description="Sao lưu, khôi phục và xóa dữ liệu"
            icon={<Database className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleExportData}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Download size={16} />
                  <span>Xuất dữ liệu</span>
                </button>
                <button
                  onClick={handleImportData}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Upload size={16} />
                  <span>Nhập dữ liệu</span>
                </button>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                isDarkMode ? 'border-red-800 bg-red-900/20' : 'border-red-200 bg-red-50'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  isDarkMode ? 'text-red-400' : 'text-red-800'
                }`}>
                  Vùng nguy hiểm
                </h4>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}>
                  Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Xóa tài khoản</span>
                </button>
              </div>
            </div>
          </SettingsSection>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save size={16} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
