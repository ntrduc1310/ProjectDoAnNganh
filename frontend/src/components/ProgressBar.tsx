import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className = '',
  color = 'blue',
  size = 'md',        // ✅ SỬ DỤNG
  showLabel = false,
  animated = true     // ✅ SỬ DỤNG
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const getWidthClass = (percent: number) => {
    if (percent === 0) return 'w-0';
    if (percent <= 25) return 'w-1/4';
    if (percent <= 50) return 'w-1/2';
    if (percent <= 75) return 'w-3/4';
    if (percent === 78) return 'w-[78%]';
    if (percent <= 80) return 'w-4/5';
    if (percent === 85) return 'w-[85%]';
    if (percent === 92) return 'w-[92%]';
    if (percent >= 100) return 'w-full';
    return `w-[${Math.round(percent)}%]`;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      purple: 'bg-purple-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color as keyof typeof colors] || 'bg-blue-500';
  };

  const getBackgroundClasses = (color: string) => {
    const backgrounds = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      yellow: 'bg-yellow-100',
      red: 'bg-red-100',
      purple: 'bg-purple-100',
      indigo: 'bg-indigo-100'
    };
    return backgrounds[color as keyof typeof backgrounds] || 'bg-gray-200';
  };

  // ✅ SỬ DỤNG size variable
  const getSizeClasses = (size: string) => {
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    };
    return sizes[size as keyof typeof sizes] || 'h-2';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Progress Bar Container */}
      <div className={`
        w-full 
        ${getSizeClasses(size)}
        ${getBackgroundClasses(color)} 
        rounded-full 
        overflow-hidden
      `}>
        {/* Progress Bar Fill */}
        <div 
          className={`
            ${getSizeClasses(size)}
            ${getColorClasses(color)} 
            ${getWidthClass(percentage)}
            rounded-full 
            ${animated ? 'transition-all duration-500 ease-out' : ''}
          `}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-600">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;