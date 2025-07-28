import React, { useEffect, useState } from 'react';
import {
  Bell, FolderOpen, Clock, AlertTriangle, CheckCircle, Zap, BarChart3, Users,
  TrendingUp, Eye, Plus, Calendar, Activity, Settings, PieChart, MessageSquare,
  Download, Filter, Star, Timer, Target, Award, ChevronRight, MoreHorizontal,
  Briefcase, GitBranch, Code, Database, Smartphone, Monitor, Palette, Shield, X,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Listbox } from '@headlessui/react';

// Mock data
const teamMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Frontend Developer',
    department: 'Công nghệ',
    email: 'a@example.com',
    status: 'online',
    rating: 4,
    workload: 75,
    level: 'Senior',
    weeklyHours: 40,
    currentTasks: 3,
    completedTasks: 10,
    overdueTasks: 1,
    efficiency: 85,
    skills: ['React', 'TypeScript', 'CSS'],
    currentProjects: [
      { name: 'Website Redesign', priority: 'high', progress: 70 },
      { name: 'API Development', priority: 'medium', progress: 50 }
    ],
    initials: 'NA',
    bgColor: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'UI/UX Designer',
    department: 'Thiết kế',
    email: 'b@example.com',
    status: 'away',
    rating: 5,
    workload: 45,
    level: 'Mid',
    weeklyHours: 35,
    currentTasks: 2,
    completedTasks: 8,
    overdueTasks: 0,
    efficiency: 90,
    skills: ['Figma', 'Photoshop', 'Illustrator'],
    currentProjects: [
      { name: 'Mobile App Redesign', priority: 'high', progress: 60 },
      { name: 'Landing Page', priority: 'low', progress: 30 }
    ],
    initials: 'TB',
    bgColor: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    role: 'Backend Developer',
    department: 'Công nghệ',
    email: 'c@example.com',
    status: 'busy',
    rating: 3,
    workload: 85,
    level: 'Senior',
    weeklyHours: 42,
    currentTasks: 5,
    completedTasks: 15,
    overdueTasks: 2,
    efficiency: 80,
    skills: ['Node.js', 'Express', 'MongoDB'],
    currentProjects: [
      { name: 'Database Optimization', priority: 'medium', progress: 40 },
      { name: 'Server Migration', priority: 'high', progress: 90 }
    ],
    initials: 'LC',
    bgColor: 'bg-red-500'
  },
  {
    id: 4,
    name: 'Phạm Minh T',
    role: 'DevOps Engineer',
    department: 'Công nghệ',
    email: 't@example.com',
    status: 'online',
    rating: 4,
    workload: 60,
    level: 'Mid',
    weeklyHours: 38,
    currentTasks: 4,
    completedTasks: 12,
    overdueTasks: 1,
    efficiency: 75,
    skills: ['Docker', 'Kubernetes', 'AWS'],
    currentProjects: [
      { name: 'CI/CD Pipeline', priority: 'high', progress: 80 },
      { name: 'Infrastructure Monitoring', priority: 'medium', progress: 50 }
    ],
    initials: 'MT',
    bgColor: 'bg-purple-500'
  }
];

const aiSuggestions = [
  {
    id: 1,
    title: 'Cân bằng tải công việc',
    description: 'Giao thêm 2-3 task cho Trần Thị Hoa (tải thấp: 45%). Có thể tăng hiệu suất team lên 15%.',
    priority: 'high',
    savings: '8h',
    status: 'new'
  },
  {
    id: 2,
    title: 'Tối ưu timeline',
    description: 'Gia hạn 2 ngày cho Project Alpha để tránh burnout. Nguyễn Trọng Đức có thể cần nghỉ ngơi.',
    priority: 'medium',
    savings: null,
    status: 'new'
  },
  {
    id: 3,
    title: 'Phân bổ kỹ năng',
    description: 'Task UI/UX Design phù hợp với Trần Thị Hoa (95% efficiency). Mobile App cần designer.',
    priority: 'low',
    savings: null,
    status: 'new'
  },
  {
    id: 4,
    title: 'Dự đoán deadline',
    description: 'Dựa trên velocity hiện tại, Project Beta sẽ trễ 3 ngày. Cần thêm 1 developer.',
    priority: 'high',
    savings: null,
    status: 'new'
  }
];

// ✅ DATA CHO PROJECTS
const projectsData = [
  {
    name: 'E-commerce Platform',
    progress: 85,
    status: 'on-track',
    deadline: '15/08/2025',
    team: 5
  },
  {
    name: 'Mobile App Redesign',
    progress: 60,
    status: 'at-risk',
    deadline: '22/08/2025',
    team: 3
  },
  {
    name: 'API Microservices',
    progress: 40,
    status: 'delayed',
    deadline: '30/07/2025',
    team: 4
  },
  {
    name: 'Data Analytics Dashboard',
    progress: 90,
    status: 'on-track',
    deadline: '10/08/2025',
    team: 2
  }
];

// ✅ DATA CHO TECH STACK
const techStackData = [
  {
    tech: 'React/TypeScript',
    usage: 85,
    icon: Monitor,
    projects: 6
  },
  {
    tech: 'Node.js/Express',
    usage: 70,
    icon: Database,
    projects: 4
  },
  {
    tech: 'Python/Django',
    usage: 60,
    icon: GitBranch,
    projects: 3
  },
  {
    tech: 'Mobile (React Native)',
    usage: 45,
    icon: Smartphone,
    projects: 2
  },
  {
    tech: 'UI/UX Design',
    usage: 90,
    icon: Palette,
    projects: 8
  },
  {
    tech: 'DevOps/Security',
    usage: 55,
    icon: Shield,
    projects: 5
  }
];

// ✅ DATA CHO ACTIVITIES
const activitiesData = [
  {
    user: 'Nguyễn Trọng Đức',
    action: 'hoàn thành',
    target: 'API Integration Module',
    time: '2 giờ trước',
    type: 'completion',
    avatar: 'NTĐ'
  },
  {
    user: 'AI System',
    action: 'gợi ý',
    target: 'phân bổ lại workload cho team Frontend',
    time: '4 giờ trước',
    type: 'ai-suggestion',
    avatar: 'AI'
  },
  {
    user: 'Lê Văn An',
    action: 'bắt đầu',
    target: 'Database Schema Design',
    time: '6 giờ trước',
    type: 'start',
    avatar: 'LVA'
  },
  {
    user: 'Trần Thị Hoa',
    action: 'cập nhật',
    target: 'Mobile App Mockups (85% → 90%)',
    time: '8 giờ trước',
    type: 'update',
    avatar: 'TTH'
  },
  {
    user: 'Phạm Minh Tú',
    action: 'deploy',
    target: 'Production Environment v2.1.0',
    time: '1 ngày trước',
    type: 'deployment',
    avatar: 'PMT'
  }
];

// ✅ DATA CHO QUICK ACTIONS
const quickActionsData = [
  {
    icon: Plus,
    label: 'Tạo Task',
    color: 'bg-blue-500',
    count: null
  },
  {
    icon: Calendar,
    label: 'Lịch trình',
    color: 'bg-green-500',
    count: '3 cuộc họp'
  },
  {
    icon: PieChart,
    label: 'Báo cáo',
    color: 'bg-purple-500',
    count: null
  },
  {
    icon: MessageSquare,
    label: 'Tin nhắn',
    color: 'bg-yellow-500',
    count: '5 tin mới'
  },
  {
    icon: Users,
    label: 'Team Chat',
    color: 'bg-indigo-500',
    count: '2 online'
  },
  {
    icon: Target,
    label: 'Mục tiêu',
    color: 'bg-red-500',
    count: '8/10'
  },
  {
    icon: Settings,
    label: 'Cài đặt',
    color: 'bg-gray-500',
    count: null
  },
  {
    icon: Download,
    label: 'Xuất dữ liệu',
    color: 'bg-teal-500',
    count: null
  }
];

interface Project {
  name: string;
  priority: string;
  progress: number;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: string;
  rating: number;
  workload: number;
  level: string;
  weeklyHours: number;
  currentTasks: number;
  completedTasks: number;
  overdueTasks: number;
  efficiency: number;
  skills: string[];
  currentProjects: Project[];
  initials: string;
  bgColor: string;
  avgTaskTime?: string;
}

interface AiSuggestion {
  id: number;
  title: string;
  description: string;
  priority: string;
  savings: string | null;
  status: string;
}

interface ProjectData {
  name: string;
  progress: number;
  status: string;
  deadline: string;
  team: number;
}

interface TechStack {
  tech: string;
  usage: number;
  icon: React.ElementType;
  projects: number;
}

interface ActivityData {
  user: string;
  action: string;
  target: string;
  time: string;
  type: string;
  avatar: string;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  color: string;
  count: string | null;
}

export const DashboardPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isAiModalOpen, setAiModalOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  // Handler functions
  const handleCreateTask = () => setTaskModalOpen(true);
  const handleAiSuggestion = () => setAiModalOpen(true);
  const handleReport = () => setReportModalOpen(true);
  const handleCloseModal = () => {
    setTaskModalOpen(false);
    setAiModalOpen(false);
    setReportModalOpen(false);
  };

  useEffect(() => {
    // TODO: Fetch data and other side effects
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // ✅ HELPER FUNCTION TO GET PROGRESS BAR WIDTH CLASS
  const getProgressWidthClass = (progress: number) => {
    if (progress <= 10) return 'w-[10%]';
    if (progress <= 20) return 'w-[20%]';
    if (progress <= 30) return 'w-[30%]';
    if (progress <= 40) return 'w-[40%]';
    if (progress <= 45) return 'w-[45%]';
    if (progress <= 50) return 'w-[50%]';
    if (progress <= 55) return 'w-[55%]';
    if (progress <= 60) return 'w-[60%]';
    if (progress <= 65) return 'w-[65%]';
    if (progress <= 70) return 'w-[70%]';
    if (progress <= 75) return 'w-[75%]';
    if (progress <= 78) return 'w-[78%]';
    if (progress <= 80) return 'w-[80%]';
    if (progress <= 85) return 'w-[85%]';
    if (progress <= 90) return 'w-[90%]';
    if (progress <= 92) return 'w-[92%]';
    if (progress <= 95) return 'w-[95%]';
    return 'w-full';
  };

  const timeOptions = [
    { value: 'day', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
  ];

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      {/* ✅ ALERTS SECTION */}
      <div className="mb-6 space-y-3">
        <div className={`flex items-center justify-between p-4 rounded-lg border-l-4 border-yellow-500 ${
          isDarkMode ? 'bg-yellow-900/20 border-yellow-400' : 'bg-yellow-50 border-yellow-500'
        }`}>
          <div className="flex items-center space-x-3">
            <AlertTriangle className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} size={20} />
            <span className={`font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              Có 5 task sắp hết hạn trong tuần này
            </span>
          </div>
          <button 
            type="button"
            title="Đóng thông báo"
            aria-label="Đóng thông báo cảnh báo"
            className={`p-1 rounded ${isDarkMode ? 'hover:bg-yellow-800' : 'hover:bg-yellow-200'}`}
          >
            <X size={16} />
          </button>
        </div>

        <div className={`flex items-center justify-between p-4 rounded-lg border-l-4 border-blue-500 ${
          isDarkMode ? 'bg-blue-900/20 border-blue-400' : 'bg-blue-50 border-blue-500'
        }`}>
          <div className="flex items-center space-x-3">
            <Bell className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
            <span className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              AI đề xuất cân bằng tải cho team Frontend
            </span>
          </div>
          <button 
            type="button"
            title="Đóng thông báo"
            aria-label="Đóng thông báo AI"
            className={`p-1 rounded ${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-200'}`}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ✅ HEADER WITH ENHANCED ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard Decision Support
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Hệ thống hỗ trợ ra quyết định phân công nhiệm vụ và cân bằng tải thông minh
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Listbox value={selectedTimeRange} onChange={setSelectedTimeRange}>
              <Listbox.Button className={`flex items-center justify-between px-3 py-2 rounded-lg border font-medium min-w-[120px] ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                <span>
                  {timeOptions.find(o => o.value === selectedTimeRange)?.label}
                </span>
                <ChevronDown size={18} className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              </Listbox.Button>
              <Listbox.Options className="absolute left-0 mt-1 w-full rounded-lg shadow-lg bg-white dark:bg-gray-800 z-10">
                {timeOptions.map(option => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active }: { active: boolean }) =>
                      `cursor-pointer select-none px-4 py-2 rounded-lg ${active ? 'bg-blue-500 text-white' : isDarkMode ? 'text-white' : 'text-gray-900'}`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <button 
            type="button"
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            onClick={handleCreateTask}
          >
            <Plus size={18} className="mr-2" />
            Tạo Task
          </button>
          
          <button 
            type="button"
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            onClick={handleAiSuggestion}
          >
            <Zap size={18} className="mr-2" />
            AI Gợi Ý
          </button>

          <button 
            type="button"
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
            onClick={handleReport}
          >
            <Download size={18} className="mr-2" />
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* ✅ ENHANCED STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 mb-8">
        {/* Card 1: Dự án hoạt động */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 hover:shadow-lg transition-all cursor-pointer group`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}>
              <FolderOpen size={24} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>8</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dự án hoạt động</p>
              <div className="flex items-center mt-1">
                <TrendingUp size={12} className="text-green-500 mr-1" />
                <span className="text-xs text-green-500">+2 tuần này</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Tasks đang làm */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 hover:shadow-lg transition-all cursor-pointer group`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} group-hover:scale-110 transition-transform`}>
              <Clock size={24} className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>24</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tasks đang làm</p>
              <div className="flex items-center mt-1">
                <Timer size={12} className="text-blue-500 mr-1" />
                <span className="text-xs text-blue-500">Avg: 2.8h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Tasks quá hạn */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 hover:shadow-lg transition-all cursor-pointer group`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} group-hover:scale-110 transition-transform`}>
              <AlertTriangle size={24} className={isDarkMode ? 'text-red-400' : 'text-red-600'} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-500">3</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tasks quá hạn</p>
              <div className="flex items-center mt-1">
                <AlertTriangle size={12} className="text-red-500 mr-1" />
                <span className="text-xs text-red-500">Cần xử lý ngay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Hoàn thành tuần */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 hover:shadow-lg transition-all cursor-pointer group`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} group-hover:scale-110 transition-transform`}>
              <CheckCircle size={24} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-500">31</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hoàn thành tuần</p>
              <div className="flex items-center mt-1">
                <Award size={12} className="text-green-500 mr-1" />
                <span className="text-xs text-green-500">+15% so với tuần trước</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: AI Gợi ý */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <Zap size={24} className="group-hover:animate-pulse" />
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span className="text-xs">+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold">7</h3>
          <p className="text-sm text-purple-100">AI Gợi ý</p>
          <p className="text-xs text-purple-200 mt-1">3 gợi ý mới hôm nay</p>
        </div>

        {/* Card 6: Cân bằng tải */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 size={24} className="group-hover:animate-pulse" />
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span className="text-xs">+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold">78%</h3>
          <p className="text-sm text-indigo-100">Cân bằng tải</p>
          <div className="mt-2 w-full bg-white/20 rounded-full h-2">
            <div className={`bg-white h-2 rounded-full ${getProgressWidthClass(78)} transition-all duration-500`}></div>
          </div>
        </div>

        {/* Card 7: Hiệu suất team */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <Users size={24} className="group-hover:animate-pulse" />
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span className="text-xs">+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold">92%</h3>
          <p className="text-sm text-emerald-100">Hiệu suất team</p>
          <div className="mt-2 w-full bg-white/20 rounded-full h-2">
            <div className={`bg-white h-2 rounded-full ${getProgressWidthClass(92)} transition-all duration-500`}></div>
          </div>
        </div>
      </div>

      {/* ✅ ENHANCED TEAM WORKLOAD ANALYSIS - CHI TIẾT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`lg:col-span-2 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users size={24} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Phân tích khối lượng công việc nhóm
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Chi tiết workload và hiệu suất của từng thành viên
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                title="Lọc dữ liệu"
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Filter size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              <button 
                type="button"
                className={`text-sm flex items-center px-3 py-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <Eye size={16} className="mr-1" />
                Xem tất cả
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {teamMembers.map((member: TeamMember) => (
              <div key={member.id} className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                {/* Member Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full ${member.bgColor} flex items-center justify-center text-white font-bold text-lg`}>
                        {member.initials}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                        isDarkMode ? 'border-gray-700' : 'border-white'
                      } ${getStatusColor(member.status)}`}></div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {member.name}
                        </h4>
                        <div className="flex items-center">
                          {[1,2,3,4,5].map((star) => (
                            <Star 
                              key={star} 
                              size={14} 
                              className={`${star <= member.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className={`ml-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {member.rating}
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {member.role} • {member.department}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      member.workload >= 80 ? 'text-red-500' : 
                      member.workload >= 60 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {member.workload}%
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Tải công việc
                    </p>
                  </div>
                </div>

                {/* Workload Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Tải công việc: {member.level}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {member.weeklyHours}h/tuần
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${member.bgColor} ${getProgressWidthClass(member.workload)} transition-all duration-500`}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {member.currentTasks}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Đang làm
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500">
                      {member.completedTasks}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Hoàn thành
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-500">
                      {member.overdueTasks}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Quá hạn
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {member.efficiency}%
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Hiệu suất
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h5 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Kỹ năng chính:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Projects */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Dự án hiện tại:
                    </h5>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Thời gian TB: {member.avgTaskTime}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {member.currentProjects.map((project, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {project.name}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(project.priority)}`}>
                              {project.priority === 'high' ? 'Cao' : project.priority === 'medium' ? 'TB' : 'Thấp'}
                            </span>
                          </div>
                          <div className="mt-1">
                            <div className="w-full h-1.5 bg-gray-200 rounded-full">
                              <div 
                                className={`h-1.5 bg-blue-500 rounded-full ${getProgressWidthClass(project.progress)} transition-all duration-300`}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <span className={`ml-3 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {project.progress}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <button 
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Giao task
                    </button>
                    <button 
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                  <button 
                    type="button"
                    title="Tùy chọn khác"
                    className={`p-1.5 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ ENHANCED AI SUGGESTIONS */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Zap size={20} className="text-purple-500" />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Gợi ý AI
              </h3>
            </div>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
              7 gợi ý mới
            </span>
          </div>

          <div className="space-y-4">
            {aiSuggestions.map((suggestion: AiSuggestion, idx: number) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${suggestion.priority === 'high' ? 'border-red-500' : suggestion.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'} ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-blue-50 border-blue-100'} transition-all hover:shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award size={18} className={suggestion.priority === 'high' ? 'text-red-500' : suggestion.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'} />
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : ''}`}>
                        {suggestion.title}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                      {suggestion.description}
                    </p>
                    <div className="flex items-center mt-2 gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        Ưu tiên: {suggestion.priority === 'high' ? 'Cao' : suggestion.priority === 'medium' ? 'TB' : 'Thấp'}
                      </span>
                      {suggestion.savings && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Tiết kiệm: {suggestion.savings}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 ml-2"
                    aria-label="Xem chi tiết gợi ý"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button 
              type="button"
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              Xem tất cả gợi ý AI
            </button>
          </div>
        </div>
      </div>

      {/* ✅ NEW SECTIONS - THÊM NHIỀU CHỨC NĂNG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Project Status Overview */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Briefcase size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tình trạng dự án
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {projectsData.map((project: ProjectData, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'on-track' ? 'bg-green-100 text-green-700' :
                    project.status === 'at-risk' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {project.status === 'on-track' ? 'Đúng tiến độ' :
                     project.status === 'at-risk' ? 'Có rủi ro' : 'Trễ tiến độ'}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tiến độ</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        project.status === 'on-track' ? 'bg-green-500' :
                        project.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                      } ${getProgressWidthClass(project.progress)}`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Deadline: {project.deadline}
                  </span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Team: {project.team} người
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Overview */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Code size={20} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tech Stack Usage
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {techStackData.map((item: TechStack, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <item.icon size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.tech}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.projects} dự án
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.usage}%
                  </p>
                  <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                    <div 
                      className={`h-1 bg-blue-500 rounded-full ${getProgressWidthClass(item.usage)}`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Enhanced */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Activity size={20} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hoạt động gần đây
              </h3>
            </div>
            <button 
              type="button"
              className={`text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}
            >
              Xem tất cả
            </button>
          </div>

          <div className="space-y-4">
            {activitiesData.map((activity: ActivityData, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  activity.type === 'completion' ? 'bg-green-500' :
                  activity.type === 'ai-suggestion' ? 'bg-purple-500' :
                  activity.type === 'start' ? 'bg-blue-500' :
                  activity.type === 'update' ? 'bg-yellow-500' :
                  'bg-indigo-500'
                }`}>
                  {activity.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                    <span className="font-medium">"{activity.target}"</span>
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {activity.time}
                    </p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activity.type === 'completion' ? 'bg-green-100 text-green-700' :
                      activity.type === 'ai-suggestion' ? 'bg-purple-100 text-purple-700' :
                      activity.type === 'start' ? 'bg-blue-100 text-blue-700' :
                      activity.type === 'update' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>
                      {activity.type === 'completion' ? 'Hoàn thành' :
                       activity.type === 'ai-suggestion' ? 'AI Gợi ý' :
                       activity.type === 'start' ? 'Bắt đầu' :
                       activity.type === 'update' ? 'Cập nhật' :
                       'Triển khai'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ QUICK ACTIONS ENHANCED */}
      <div className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl border p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Thao tác nhanh
          </h3>
          <button 
            type="button"
            className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
          >
            Tùy chỉnh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickActionsData.map((action: QuickAction, index: number) => (
            <button 
              key={index}
              type="button"
              className={`flex flex-col items-center p-4 rounded-xl border transition-all hover:shadow-md hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`p-3 rounded-lg ${action.color} text-white mb-2`}>
                <action.icon size={20} />
              </div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {action.label}
              </span>
              {action.count && (
                <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {action.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Modal Tạo Task */}
      {isTaskModalOpen && (
        <Modal onClose={handleCloseModal} title={
          <div className="flex items-center space-x-2">
            <Plus size={22} className="text-blue-500" />
            <span className={isDarkMode ? 'text-white' : ''}>Tạo Task mới</span>
          </div>
        }>
          <form
            className="space-y-5"
            onSubmit={e => {
              e.preventDefault();
              alert('Task đã được tạo!');
              handleCloseModal();
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="task-title" className={`font-semibold text-sm ${isDarkMode ? 'text-white' : ''}`}>
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                id="task-title"
                type="text"
                className={`w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
                placeholder="Nhập tiêu đề task"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="task-desc" className={`font-semibold text-sm ${isDarkMode ? 'text-white' : ''}`}>
                Mô tả
              </label>
              <textarea
                id="task-desc"
                className={`w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                rows={3}
                placeholder="Nhập mô tả task"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="task-priority" className={`font-semibold text-sm ${isDarkMode ? 'text-white' : ''}`}>
                Độ ưu tiên
              </label>
              <select
                id="task-priority"
                className={`w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                aria-label="Chọn độ ưu tiên"
                title="Chọn độ ưu tiên"
              >
                <option value="high">Cao 🔥</option>
                <option value="medium">Trung bình ⚡</option>
                <option value="low">Thấp 🌱</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg font-medium bg-gray-400 text-white hover:bg-gray-500 transition-colors"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Tạo Task
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal AI Gợi Ý */}
      {isAiModalOpen && (
        <Modal onClose={handleCloseModal} title={
          <div className="flex items-center space-x-2">
            <Zap size={22} className="text-purple-500" />
            <span className={isDarkMode ? 'text-white' : ''}>AI Gợi Ý</span>
          </div>
        }>
          <div className="space-y-5">
            {aiSuggestions.map((suggestion: AiSuggestion) => (
              <div key={suggestion.id} className={`p-4 rounded-xl border-l-4 ${suggestion.priority === 'high' ? 'border-red-500' : suggestion.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'} ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-blue-50 border-blue-100'} transition-all hover:shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award size={18} className={suggestion.priority === 'high' ? 'text-red-500' : suggestion.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'} />
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : ''}`}>
                        {suggestion.title}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                      {suggestion.description}
                    </p>
                    <div className="flex items-center mt-2 gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        Ưu tiên: {suggestion.priority === 'high' ? 'Cao' : suggestion.priority === 'medium' ? 'TB' : 'Thấp'}
                      </span>
                      {suggestion.savings && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Tiết kiệm: {suggestion.savings}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 ml-2"
                    aria-label="Nhận gợi ý này"
                    title="Nhận gợi ý này"
                    onClick={() => alert('Đã nhận gợi ý AI!')}
                  >
                    <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              aria-label="Xem tất cả gợi ý AI"
              title="Xem tất cả gợi ý AI"
              onClick={() => alert('Xem tất cả gợi ý AI')}
            >
              Xem tất cả gợi ý AI
            </button>
          </div>
        </Modal>
      )}

      {/* Modal Xuất Báo Cáo */}
      {isReportModalOpen && (
        <Modal onClose={handleCloseModal} title={
          <div className="flex items-center space-x-2">
            <Download size={22} className="text-purple-500" />
            <span className={isDarkMode ? 'text-white' : ''}>Xuất Báo Cáo</span>
          </div>
        }>
          <form
            className="space-y-5"
            onSubmit={e => {
              e.preventDefault();
              alert('Báo cáo đã được xuất!');
              handleCloseModal();
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="report-type" className={`font-semibold text-sm ${isDarkMode ? 'text-white' : ''}`}>
                Loại báo cáo
              </label>
              <select
                id="report-type"
                className={`w-full px-3 py-2 rounded border focus:ring-2 focus:ring-purple-500 outline-none transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                aria-label="Chọn loại báo cáo"
                title="Chọn loại báo cáo"
              >
                <option value="task">Task</option>
                <option value="project">Project</option>
                <option value="workload">Workload</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="report-format" className={`font-semibold text-sm ${isDarkMode ? 'text-white' : ''}`}>
                Định dạng
              </label>
              <select
                id="report-format"
                className={`w-full px-3 py-2 rounded border focus:ring-2 focus:ring-purple-500 outline-none transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                aria-label="Chọn định dạng báo cáo"
                title="Chọn định dạng báo cáo"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg font-medium bg-gray-400 text-white hover:bg-gray-500 transition-colors"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Xuất báo cáo
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Simple Modal component
const Modal: React.FC<{ onClose: () => void; title?: React.ReactNode; children?: React.ReactNode }> = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw] relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onClick={onClose}
        aria-label="Đóng"
      >
        ×
      </button>
      {title && <h2 className="font-bold text-lg mb-2">{title}</h2>}
      {children}
    </div>
  </div>
);