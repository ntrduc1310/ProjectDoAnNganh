import React, { useState, useEffect, useCallback } from 'react';
import { Plus, X, AlertCircle, RefreshCw } from 'lucide-react';
import { tasksApi, dashboardApi, checkApiHealth, type Task, type DashboardStats } from '../services/api';

export const DashboardPage: React.FC = () => {
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  
  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '' as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | '',
    status: 'TODO' as Task['status'],
    assigneeEmail: '',
    projectId: ''
  });

  // ✅ Connection health check
  const checkConnection = useCallback(async () => {
    setConnectionStatus('checking');
    try {
      const isHealthy = await checkApiHealth();
      setConnectionStatus(isHealthy ? 'connected' : 'disconnected');
      return isHealthy;
    } catch (error) {
      setConnectionStatus('disconnected');
      return false;
    }
  }, []);

  // ✅ SIMPLIFIED: Direct API calls for debugging
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting loadData...');

      // Check connection first
      const isConnected = await checkConnection();
      console.log('🔗 Connection check:', isConnected);
      if (!isConnected) {
        throw new Error('Không thể kết nối đến server backend');
      }

      // Load tasks first (simplified)
      console.log('📋 Loading tasks...');
      try {
        const tasksData = await tasksApi.getAllTasks();
        console.log('✅ Tasks loaded successfully:', tasksData);
        setTasks(tasksData);
      } catch (tasksError) {
        console.error('❌ Tasks loading failed:', tasksError);
        setTasks([]); // Set empty tasks on error
      }

      // Load stats
      console.log('📊 Loading stats...');
      try {
        const statsData = await dashboardApi.getStats();
        console.log('✅ Stats loaded successfully:', statsData);
        setStats(statsData);
      } catch (statsError) {
        console.error('❌ Stats loading failed:', statsError);
        // Set fallback stats
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          inProgressTasks: 0,
          totalProjects: 1,
          teamMembers: 5
        });
      }

    } catch (err: any) {
      console.error('❌ Dashboard load failed:', err);
      setError(err.message || 'Không thể tải dữ liệu');
      
      // Set fallback data on error
      setTasks([]);
      setStats({
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        totalProjects: 1,
        teamMembers: 5
      });
    } finally {
      setLoading(false);
    }
  }, [checkConnection]);

  // ✅ Enhanced task creation
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.priority) {
      setError('Vui lòng chọn độ ưu tiên');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const taskData: Omit<Task, 'id'> = {
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: form.status,
        assigneeEmail: form.assigneeEmail,
        projectId: form.projectId ? parseInt(form.projectId) : 1
      };
      
      console.log('🔄 Creating task:', taskData);
      await tasksApi.createTask(taskData); // ✅ Returns Task directly
      console.log('✅ Task created successfully');
      
      // Reset form and reload data
      setForm({ 
        title: '', 
        description: '', 
        priority: '',
        status: 'TODO',
        assigneeEmail: '', 
        projectId: '' 
      });
      
      setShowCreateForm(false);
      await loadData();
      
    } catch (err: any) {
      console.error('❌ Task creation failed:', err);
      setError(err.response?.data?.message || 'Không thể tạo task');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-reload and connection monitoring
  useEffect(() => {
    loadData();
    
    // Set up periodic connection check
    const connectionInterval = setInterval(checkConnection, 30000); // Check every 30s
    
    return () => clearInterval(connectionInterval);
  }, [loadData, checkConnection]);

  // ✅ Connection status indicator
  const ConnectionStatus = () => (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
      connectionStatus === 'connected' 
        ? 'bg-green-100 text-green-800' 
        : connectionStatus === 'disconnected'
        ? 'bg-red-100 text-red-800'
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        connectionStatus === 'connected' 
          ? 'bg-green-500' 
          : connectionStatus === 'disconnected'
          ? 'bg-red-500'
          : 'bg-yellow-500 animate-pulse'
      }`} />
      <span>
        {connectionStatus === 'connected' && 'Đã kết nối'}
        {connectionStatus === 'disconnected' && 'Mất kết nối'}
        {connectionStatus === 'checking' && 'Đang kiểm tra...'}
      </span>
    </div>
  );

  // ✅ Enhanced loading state
  if (loading && !tasks.length && !stats) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-lg">Đang tải dữ liệu...</div>
          <ConnectionStatus />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with connection status */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Tổng quan dự án và nhiệm vụ</p>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectionStatus />
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
              title="Tải lại dữ liệu"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <div className="flex-1">
              <strong>Lỗi:</strong> {error}
            </div>
            <button 
              onClick={loadData}
              className="ml-4 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Tổng Tasks</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Hoàn thành</h3>
            <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Đang làm</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgressTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Dự án</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.totalProjects}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Thành viên</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.teamMembers}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={connectionStatus === 'disconnected'}
            >
              <Plus size={20} />
              <span>New Task</span>
            </button>
          </div>
          
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg mb-2">Chưa có tasks nào</p>
              <p className="text-sm">Tạo task đầu tiên để bắt đầu!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                          task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          task.priority === 'CRITICAL' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                          task.status === 'IN_REVIEW' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                        {task.assigneeEmail && (
                          <span>👤 {task.assigneeEmail}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={() => setShowCreateForm(true)}
              className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"
              disabled={connectionStatus === 'disconnected'}
            >
              <div className="font-medium text-blue-900">📝 Tạo Task Mới</div>
              <div className="text-sm text-blue-700">Thêm nhiệm vụ mới cho dự án</div>
            </button>
            
            <button 
              onClick={loadData}
              className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200"
            >
              <div className="font-medium text-green-900">🔄 Làm Mới Dữ Liệu</div>
              <div className="text-sm text-green-700">Cập nhật thông tin mới nhất</div>
            </button>
            
            <div className="w-full text-left p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="font-medium text-gray-900">📊 Thống Kê</div>
              <div className="text-sm text-gray-700 mt-2">
                <div>Tasks: {tasks.length}</div>
                <div>Hoàn thành: {tasks.filter(t => t.status === 'COMPLETED').length}</div>
                <div>Đang làm: {tasks.filter(t => t.status === 'IN_PROGRESS').length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tạo Task Mới</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
                title="Đóng"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề *
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề task"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  id="task-description"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Nhập mô tả chi tiết cho task"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Độ ưu tiên *
                  </label>
                  <select
                    id="task-priority"
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn độ ưu tiên</option>
                    <option value="HIGH">Cao</option>
                    <option value="MEDIUM">Trung bình</option>
                    <option value="LOW">Thấp</option>
                    <option value="CRITICAL">Khẩn cấp</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="task-project-id" className="block text-sm font-medium text-gray-700 mb-1">
                    Project ID
                  </label>
                  <input
                    id="task-project-id"
                    type="number"
                    value={form.projectId}
                    onChange={e => setForm({ ...form, projectId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="task-assignee" className="block text-sm font-medium text-gray-700 mb-1">
                  Email người nhận
                </label>
                <input
                  id="task-assignee"
                  type="email"
                  value={form.assigneeEmail}
                  onChange={e => setForm({ ...form, assigneeEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example@company.com"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading || connectionStatus === 'disconnected'}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang tạo...' : 'Tạo Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;