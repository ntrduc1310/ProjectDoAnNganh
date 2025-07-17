import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // ✅ Sử dụng isDarkMode thay vì theme

  return (
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
  );
};