import React, { useState, useEffect, useRef } from 'react';
import { Plus, FileText, Folder, Users, Settings, Calendar, Target, type LucideIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  className?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
  description: string;
  shortcut?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className = '' }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Quick actions shortcuts
      if (event.ctrlKey && event.shiftKey) {
        switch (event.key) {
          case 'T':
            event.preventDefault();
            handleCreateTask();
            break;
          case 'P':
            event.preventDefault();
            handleCreateProject();
            break;
          case 'U':
            event.preventDefault();
            handleManageUsers();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreateTask = () => {
    navigate('/tasks');
    // Trigger create task modal after navigation
    setTimeout(() => {
      const createButton = document.querySelector('[data-create-task]') as HTMLButtonElement;
      if (createButton) {
        createButton.click();
      }
    }, 100);
    setIsOpen(false);
  };

  const handleCreateProject = () => {
    navigate('/dashboard');
    // TODO: Open create project modal
    console.log('Create new project');
    setIsOpen(false);
  };

  const handleManageUsers = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  const handleScheduleEvent = () => {
    // TODO: Open calendar/event scheduling
    console.log('Schedule new event');
    setIsOpen(false);
  };

  const handleCreateGoal = () => {
    // TODO: Open goal creation
    console.log('Create new goal');
    setIsOpen(false);
  };

  const handleOpenSettings = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'task',
      label: 'Tạo Task',
      icon: FileText,
      action: handleCreateTask,
      description: 'Tạo task mới cho dự án',
      shortcut: 'Ctrl+Shift+T'
    },
    {
      id: 'project',
      label: 'Tạo Dự án',
      icon: Folder,
      action: handleCreateProject,
      description: 'Khởi tạo dự án mới',
      shortcut: 'Ctrl+Shift+P'
    },
    {
      id: 'users',
      label: 'Quản lý Users',
      icon: Users,
      action: handleManageUsers,
      description: 'Thêm hoặc quản lý người dùng',
      shortcut: 'Ctrl+Shift+U'
    },
    {
      id: 'event',
      label: 'Lên lịch',
      icon: Calendar,
      action: handleScheduleEvent,
      description: 'Tạo sự kiện hoặc cuộc họp'
    },
    {
      id: 'goal',
      label: 'Đặt mục tiêu',
      icon: Target,
      action: handleCreateGoal,
      description: 'Thiết lập mục tiêu mới'
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: Settings,
      action: handleOpenSettings,
      description: 'Mở trang cài đặt hệ thống'
    }
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Quick Actions Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md transition-all duration-200 ${
          isDarkMode 
            ? 'text-gray-400 hover:text-white hover:bg-gray-700 bg-gray-800/50' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-gray-50'
        } ${isOpen ? 'rotate-45' : ''}`}
        aria-label="Hành động nhanh"
        title="Hành động nhanh (Tạo mới)"
      >
        <Plus size={20} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown Menu */}
          <div className={`absolute right-0 mt-2 w-72 rounded-lg shadow-lg border z-50 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            {/* Header */}
            <div className={`px-4 py-3 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Hành động nhanh
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tạo mới hoặc thực hiện các tác vụ nhanh
              </p>
            </div>

            {/* Actions List */}
            <div className="py-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-white' 
                        : 'hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Icon size={16} className={
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {action.label}
                          </p>
                          {action.shortcut && (
                            <span className={`text-xs px-2 py-1 rounded ${
                              isDarkMode 
                                ? 'bg-gray-700 text-gray-400' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              {action.shortcut}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className={`px-4 py-3 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <p className={`text-xs ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                💡 Mẹo: Sử dụng Ctrl+Shift+[Phím] để thực hiện nhanh
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
