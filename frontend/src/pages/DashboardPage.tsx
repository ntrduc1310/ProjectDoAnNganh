import React, { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Trash2, X } from 'lucide-react';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { tasksApi, dashboardApi, type Task } from '../services/api';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalProjects: number;
  teamMembers: number;
}

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '' as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | '',
    status: 'TODO' as 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
    assigneeEmail: '',
    projectId: ''
  });

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Loading dashboard data...');
      
      // ✅ Load tasks with proper error handling
      try {
        const tasksResponse = await tasksApi.getAllTasks();
        console.log('📋 Raw tasks response:', tasksResponse);
        console.log('📋 Tasks data:', tasksResponse.data);
        
        // ✅ Ensure tasks is always an array
        if (Array.isArray(tasksResponse.data)) {
          setTasks(tasksResponse.data);
          console.log('✅ Tasks loaded successfully:', tasksResponse.data.length, 'tasks');
        } else {
          console.warn('⚠️ Tasks response is not an array:', tasksResponse.data);
          setTasks([]);
        }
      } catch (tasksError) {
        console.error('❌ Failed to load tasks:', tasksError);
        setTasks([]); // Fallback to empty array
      }
      
      // ✅ Load stats with proper error handling
      try {
        const statsResponse = await dashboardApi.getStats();
        console.log('📊 Raw stats response:', statsResponse);
        console.log('📊 Stats data:', statsResponse.data);
        
        if (statsResponse.data) {
          setStats(statsResponse.data);
          console.log('✅ Stats loaded successfully');
        } else {
          console.warn('⚠️ Stats response is empty');
          setStats({
            totalTasks: 0,
            completedTasks: 0,
            inProgressTasks: 0,
            totalProjects: 0,
            teamMembers: 0
          });
        }
      } catch (statsError) {
        console.error('❌ Failed to load stats:', statsError);
        // Fallback stats
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          inProgressTasks: 0,
          totalProjects: 0,
          teamMembers: 0
        });
      }
      
    } catch (err: any) {
      console.error('❌ Dashboard load failed:', err);
      
      let errorMessage = 'Không thể tải dữ liệu';
      if (err.response) {
        errorMessage = `API Error ${err.response.status}: ${err.response.data?.message || err.response.statusText}`;
      } else if (err.message) {
        errorMessage = `Network Error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.priority) {
        setError('Vui lòng chọn độ ưu tiên');
        setLoading(false);
        return;
      }

      const taskData: Omit<Task, 'id'> = {
        title: form.title,
        description: form.description,
        priority: form.priority as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
        status: form.status,
        assigneeEmail: form.assigneeEmail,
        projectId: form.projectId ? parseInt(form.projectId) : 1
      };
      
      console.log('🔄 Creating task:', taskData);
      await tasksApi.createTask(taskData);
      console.log('✅ Task created successfully');
      
      // Reset form and reload data
      setForm({ 
        title: '', 
        description: '', 
        priority: '' as any,
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

  const openTaskModal = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTaskId(null);
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Bạn có chắc muốn xóa task này?')) return;
    
    try {
      await tasksApi.deleteTask(taskId);
      await loadData();
    } catch (error) {
      console.error('❌ Failed to delete task:', error);
      setError('Không thể xóa task');
    }
  };

  // ✅ Enhanced loading state
  if (loading && !tasks.length && !stats) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-lg">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Tổng quan dự án và nhiệm vụ</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            <div>
              <strong>Lỗi:</strong> {error}
              <button 
                onClick={loadData}
                className="ml-4 text-sm bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
              >
                Thử lại
              </button>
            </div>
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
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} />
              <span>New Task</span>
            </button>
          </div>

          {/* ✅ Safe tasks rendering with Array check */}
          <div className="space-y-4">
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.priority === 'HIGH' || task.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                          task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        {task.assigneeName && (
                          <span className="text-xs text-gray-500">
                            Assigned to: {task.assigneeName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openTaskModal(task.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTaskId(task.id);
                          setShowCreateForm(true);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        title="Edit Task"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No tasks available</p>
                <p className="text-sm">Create your first task!</p>
                {/* ✅ Debug info */}
                <p className="text-xs text-gray-400 mt-2">
                  Debug: tasks type = {typeof tasks}, length = {Array.isArray(tasks) ? tasks.length : 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Create/Edit Task Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {selectedTaskId ? 'Edit Task' : 'Tạo Task Mới'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setSelectedTaskId(null);
                }}
                className="text-gray-400 hover:text-gray-600"
                title="Đóng"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề
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
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Độ ưu tiên
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
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang tạo...' : 'Tạo Task'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setSelectedTaskId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {isTaskModalOpen && selectedTaskId !== null && (
        <TaskDetailModal 
          taskId={selectedTaskId}
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
          onUpdate={loadData}
        />
      )}
    </div>
  );
};