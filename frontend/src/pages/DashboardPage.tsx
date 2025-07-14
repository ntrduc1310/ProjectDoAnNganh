import { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  Users,
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { DashboardStats, TeamMember, Task, Activity as ActivityType } from '../types';

const DashboardPage = () => {
  const { isDarkMode } = useTheme();
  
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    tasksInProgress: 0,
    overdueTasks: 0,
    completedThisWeek: 0
  });

  const [teamWorkload, setTeamWorkload] = useState<TeamMember[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API calls
        // const [statsResponse, teamResponse] = await Promise.all([
        //   api.get('/dashboard/stats'),
        //   api.get('/team-workload')
        // ]);
        
        // Simulate API calls
        setTimeout(() => {
          setStats({
            activeProjects: 12,
            tasksInProgress: 34,
            overdueTasks: 5,
            completedThisWeek: 18
          });

          setTeamWorkload([
            { id: '1', name: 'Nguyễn Trọng Đức', workloadScore: 85, maxCapacity: 100 },
            { id: '2', name: 'Trần Thị Mai', workloadScore: 92, maxCapacity: 100 },
            { id: '3', name: 'Lê Văn Hùng', workloadScore: 75, maxCapacity: 100 },
            { id: '4', name: 'Phạm Thị Lan', workloadScore: 68, maxCapacity: 100 },
            { id: '5', name: 'Võ Minh Tuấn', workloadScore: 95, maxCapacity: 100 }
          ]);

          setMyTasks([
            {
              id: '1',
              title: 'Thiết kế giao diện Dashboard',
              project: 'ProjectDoAnNganh2',
              dueDate: '2024-07-16',
              priority: 'high',
              status: 'in-progress'
            },
            {
              id: '2',
              title: 'Review code API Authentication',
              project: 'ProjectDoAnNganh2',
              dueDate: '2024-07-18',
              priority: 'medium',
              status: 'todo'
            },
            {
              id: '3',
              title: 'Cập nhật tài liệu dự án',
              project: 'ProjectDoAnNganh2',
              dueDate: '2024-07-20',
              priority: 'low',
              status: 'todo'
            }
          ]);

          setActivities([
            {
              id: '1',
              user: 'Nguyễn Trọng Đức',
              action: 'hoàn thành task',
              target: 'Thiết kế Login Page',
              project: 'ProjectDoAnNganh2',
              timestamp: '2024-07-14T10:30:00Z',
              type: 'task_completed'
            },
            {
              id: '2',
              user: 'Trần Thị Mai',
              action: 'tạo task mới',
              target: 'Refactor API',
              project: 'ProjectDoAnNganh2',
              timestamp: '2024-07-14T09:15:00Z',
              type: 'task_created'
            },
            {
              id: '3',
              user: 'Lê Văn Hùng',
              action: 'cập nhật dự án',
              target: 'ProjectDoAnNganh2',
              timestamp: '2024-07-14T08:45:00Z',
              type: 'project_updated'
            }
          ]);

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array means this runs once on mount

  const getWorkloadColor = (score: number) => {
    if (score >= 90) return 'bg-red-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getWorkloadStatus = (score: number) => {
    if (score >= 90) return 'Quá tải';
    if (score >= 80) return 'Cao';
    return 'OK'; // Thay 'Bình thường' bằng 'OK' để ngắn hơn
  };

  // Hoặc nếu muốn giữ text đầy đủ, có thể dùng viết tắt:
  // const getWorkloadStatus = (score: number) => {
  //   if (score >= 90) return 'Quá tải';
  //   if (score >= 80) return 'Cao';
  //   return 'B.thường'; // Viết tắt
  // };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Vừa xong';
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${Math.floor(diffHours / 24)} ngày trước`;
  };

  if (loading) {
    return (
      <div className={`min-h-screen p-6 flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Đang tải dữ liệu dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 space-y-6 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Dashboard
        </h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Tổng quan dự án và hiệu suất team
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
            : 'bg-white/80 border-gray-200 hover:bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Dự án đang hoạt động
              </p>
              <p className={`text-3xl font-bold mt-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.activeProjects}
              </p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <FolderOpen className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className={`backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
            : 'bg-white/80 border-gray-200 hover:bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tasks đang thực hiện
              </p>
              <p className={`text-3xl font-bold mt-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.tasksInProgress}
              </p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className={`backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
            : 'bg-white/80 border-gray-200 hover:bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tasks quá hạn
              </p>
              <p className="text-3xl font-bold text-red-400 mt-2">
                {stats.overdueTasks}
              </p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className={`backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
            : 'bg-white/80 border-gray-200 hover:bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Hoàn thành tuần này
              </p>
              <p className="text-3xl font-bold text-green-400 mt-2">
                {stats.completedThisWeek}
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Workload Chart */}
        <div className={`lg:col-span-2 backdrop-blur-sm border rounded-xl p-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-blue-400 mr-3" />
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Team Workload
            </h2>
            <TrendingUp className={`h-5 w-5 ml-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          
          <div className="space-y-4">
            {teamWorkload.map((member) => (
              <div key={member.id} className="flex items-center space-x-4">
                <div className={`w-32 text-sm truncate ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {member.name}
                </div>
                <div className={`flex-1 rounded-full h-6 relative overflow-hidden ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getWorkloadColor(member.workloadScore)}`}
                    style={{ width: `${member.workloadScore}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {member.workloadScore}%
                  </div>
                </div>
                {/* Fixed status badge with consistent width and text wrapping */}
                <div className="w-20 text-right">
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap inline-block min-w-0 ${
                    member.workloadScore >= 90
                      ? 'bg-red-500/20 text-red-400'
                      : member.workloadScore >= 80
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {getWorkloadStatus(member.workloadScore)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks */}
        <div className={`backdrop-blur-sm border rounded-xl p-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-blue-400 mr-3" />
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              My Tasks
            </h2>
          </div>
          
          <div className="space-y-3">
            {myTasks.map((task) => {
              const daysUntilDue = getDaysUntilDue(task.dueDate);
              return (
                <div key={task.id} className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50' 
                    : 'bg-gray-50 border-gray-200 hover:bg-white'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-medium text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className={`text-xs mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.project}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`${
                      daysUntilDue <= 1
                        ? 'text-red-400'
                        : daysUntilDue <= 3
                        ? 'text-yellow-400'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {daysUntilDue <= 0 ? 'Quá hạn' : `${daysUntilDue} ngày nữa`}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      task.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : task.status === 'in-progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {task.status === 'completed' ? 'Hoàn thành' : 
                       task.status === 'in-progress' ? 'Đang làm' : 'Chờ'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className={`backdrop-blur-sm border rounded-xl p-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center mb-6">
            <Activity className="h-6 w-6 text-blue-400 mr-3" />
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Hoạt động gần đây
            </h2>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'task_completed'
                    ? 'bg-green-400'
                    : activity.type === 'task_created'
                    ? 'bg-blue-400'
                    : 'bg-yellow-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {activity.user}
                    </span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium text-blue-400">"{activity.target}"</span>
                    {activity.project && (
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {' '}trong {activity.project}
                      </span>
                    )}
                  </p>
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;