import React, { useEffect, useState } from 'react';
import { 
  Bell, 
  FolderOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  BarChart3, 
  Users,
  TrendingUp,
  Eye,
  Plus,
  Calendar,
  Activity,
  Settings,
  PieChart,
  MessageSquare,
  Download,
  Filter,
  Star,
  Timer,
  Target,
  Award,
  ChevronRight,
  MoreHorizontal,
  Briefcase,
  GitBranch,
  Code,
  Database,
  Smartphone,
  Monitor,
  Palette,
  Shield,
  X
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const DashboardPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  useEffect(() => {
    console.log('Dashboard loaded');
  }, []);

  // ✅ MOCK DATA CHO TEAM WORKLOAD CHI TIẾT
  const teamMembers = [
    {
      id: 1,
      name: 'Nguyễn Trọng Đức',
      initials: 'NTĐ',
      email: 'duc.nguyen@company.com',
      avatar: null,
      role: 'Senior Developer',
      department: 'Frontend Team',
      workload: 85,
      status: 'online',
      level: 'Cao',
      color: 'yellow',
      bgColor: 'bg-yellow-500',
      currentTasks: 8,
      completedTasks: 24,
      overdueTasks: 1,
      efficiency: 92,
      skills: ['React', 'TypeScript', 'Node.js'],
      currentProjects: [
        { name: 'Dashboard UI', progress: 75, priority: 'high' },
        { name: 'API Integration', progress: 60, priority: 'medium' },
        { name: 'User Management', progress: 30, priority: 'low' }
      ],
      weeklyHours: 42,
      avgTaskTime: '2.5h',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Lê Văn An',
      initials: 'LVA',
      email: 'an.le@company.com',
      avatar: null,
      role: 'Full-stack Developer',
      department: 'Backend Team',
      workload: 65,
      status: 'busy',
      level: 'Trung bình',
      color: 'blue',
      bgColor: 'bg-blue-500',
      currentTasks: 5,
      completedTasks: 18,
      overdueTasks: 0,
      efficiency: 87,
      skills: ['Python', 'Django', 'PostgreSQL'],
      currentProjects: [
        { name: 'Database Design', progress: 90, priority: 'high' },
        { name: 'API Development', progress: 45, priority: 'medium' }
      ],
      weeklyHours: 38,
      avgTaskTime: '3.2h',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Trần Thị Hoa',
      initials: 'TTH',
      email: 'hoa.tran@company.com',
      avatar: null,
      role: 'UI/UX Designer',
      department: 'Design Team',
      workload: 45,
      status: 'away',
      level: 'Thấp',
      color: 'green',
      bgColor: 'bg-green-500',
      currentTasks: 3,
      completedTasks: 15,
      overdueTasks: 0,
      efficiency: 95,
      skills: ['Figma', 'Adobe XD', 'Photoshop'],
      currentProjects: [
        { name: 'Mobile App Design', progress: 80, priority: 'medium' }
      ],
      weeklyHours: 32,
      avgTaskTime: '4.1h',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Phạm Minh Tú',
      initials: 'PMT',
      email: 'tu.pham@company.com',
      avatar: null,
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      workload: 70,
      status: 'online',
      level: 'Cao',
      color: 'purple',
      bgColor: 'bg-purple-500',
      currentTasks: 6,
      completedTasks: 22,
      overdueTasks: 2,
      efficiency: 89,
      skills: ['Docker', 'Kubernetes', 'AWS'],
      currentProjects: [
        { name: 'CI/CD Pipeline', progress: 95, priority: 'high' },
        { name: 'Security Audit', progress: 20, priority: 'high' }
      ],
      weeklyHours: 45,
      avgTaskTime: '2.8h',
      rating: 4.6
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
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            title="Chọn khoảng thời gian"
            aria-label="Bộ lọc khoảng thời gian"
            className={`px-3 py-2 rounded-lg border font-medium ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="day">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
          </select>

          <button 
            type="button"
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Plus size={18} className="mr-2" />
            Tạo Task
          </button>
          
          <button 
            type="button"
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Zap size={18} className="mr-2" />
            AI Gợi Ý
          </button>

          <button 
            type="button"
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
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
            {teamMembers.map((member) => (
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
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Cân bằng tải công việc
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Giao thêm 2-3 task cho Trần Thị Hoa (tải thấp: 45%). Có thể tăng hiệu suất team lên 15%.
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Độ ưu tiên: Cao</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Tiết kiệm: 8h</span>
                  </div>
                </div>
                <button 
                  type="button"
                  title="Xem chi tiết gợi ý"
                  className="text-blue-500 hover:text-blue-600 ml-2"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
              isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tối ưu timeline
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Gia hạn 2 ngày cho Project Alpha để tránh burnout. Nguyễn Trọng Đức có thể cần nghỉ ngơi.
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">Độ ưu tiên: TB</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">Risk: Burnout</span>
                  </div>
                </div>
                <button 
                  type="button"
                  title="Xem chi tiết gợi ý"
                  className="text-green-500 hover:text-green-600 ml-2"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
              isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phân bổ kỹ năng
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Task UI/UX Design phù hợp với Trần Thị Hoa (95% efficiency). Mobile App cần designer.
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">Skill Match: 95%</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Urgent</span>
                  </div>
                </div>
                <button 
                  type="button"
                  title="Xem chi tiết gợi ý"
                  className="text-yellow-500 hover:text-yellow-600 ml-2"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
              isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Dự đoán deadline
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Dựa trên velocity hiện tại, Project Beta sẽ trễ 3 ngày. Cần thêm 1 developer.
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">Risk: Trễ deadline</span>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">Cần resource</span>
                  </div>
                </div>
                <button 
                  type="button"
                  title="Xem chi tiết gợi ý"
                  className="text-purple-500 hover:text-purple-600 ml-2"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
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
            {projectsData.map((project, index) => (
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
            {techStackData.map((item, index) => (
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
            {activitiesData.map((activity, index) => (
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
          {quickActionsData.map((action, index) => (
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
    </div>
  );
};