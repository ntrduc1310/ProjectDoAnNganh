import axios from 'axios';

// ✅ FIXED: Use port 8081 to match backend
export const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',  // Changed from 8080 to 8081
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`🌐 Full URL: ${config.baseURL}${config.url}`);
    console.log(`📤 Request data:`, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`);
    console.log(`📥 Response data:`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  assigneeEmail?: string;
  assigneeName?: string;
  projectId: number;
  projectName?: string;
  progress?: number;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  commentCount?: number;
}

export interface TaskComment {
  id: number;
  taskId: number;
  userId: number;
  userFullName: string;
  userEmail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  taskId: number;
  content: string;
}

// ✅ FIXED: Tasks API - Return List<Task> directly
export const tasksApi = {
  getAllTasks: () =>
    apiClient.get<Task[]>('/tasks'),  // Expect List<Task> directly

  getTaskById: (id: number) =>
    apiClient.get<Task>(`/tasks/${id}`),

  createTask: (task: Omit<Task, 'id'>) => {
    const requestData = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      projectId: task.projectId,
      assigneeEmail: task.assigneeEmail || null,
      estimatedHours: null,
      dueDate: null
    };
    
    console.log('📤 Sending task creation request:', requestData);
    return apiClient.post('/tasks', requestData);
  },

  updateTask: (id: number, task: Partial<Task>) =>
    apiClient.put<Task>(`/tasks/${id}`, task),

  updateTaskStatus: (id: number, status: string) =>
    apiClient.put(`/tasks/${id}/status?status=${status}`),

  deleteTask: (id: number) =>
    apiClient.delete(`/tasks/${id}`)
};

// ✅ Task Comments API
export const taskCommentsApi = {
  getCommentsByTask: (taskId: number) =>
    apiClient.get<TaskComment[]>(`/task-comments/task/${taskId}`),

  createComment: (data: CreateCommentRequest) =>
    apiClient.post('/task-comments', data, {
      headers: { 'User-Email': 'admin@example.com' }
    }),

  updateComment: (commentId: number, content: string) =>
    apiClient.put(`/task-comments/${commentId}`, { content }, {
      headers: { 'User-Email': 'admin@example.com' }
    }),

  deleteComment: (commentId: number) =>
    apiClient.delete(`/task-comments/${commentId}`, {
      headers: { 'User-Email': 'admin@example.com' }
    }),

  getRecentComments: (hours: number = 24) =>
    apiClient.get<TaskComment[]>(`/task-comments/recent?hours=${hours}`)
};

// ✅ Dashboard API
export const dashboardApi = {
  getStats: () =>
    apiClient.get('/dashboard/stats'),
};

// ✅ Projects API
export const projectsApi = {
  getAllProjects: () =>
    apiClient.get('/projects'),

  getProjectById: (id: number) =>
    apiClient.get(`/projects/${id}`),

  createProject: (project: any) =>
    apiClient.post('/projects', project),

  updateProject: (id: number, project: any) =>
    apiClient.put(`/projects/${id}`, project),

  deleteProject: (id: number) =>
    apiClient.delete(`/projects/${id}`)
};

// ✅ Analytics API
export const analyticsApi = {
  getDashboardAnalytics: () =>
    apiClient.get('/analytics/dashboard'),

  getProjectAnalytics: (projectId: number) =>
    apiClient.get(`/analytics/project/${projectId}`),

  getUserAnalytics: (userId: number) =>
    apiClient.get(`/analytics/user/${userId}`),

  getRecentActivity: (hours: number = 24) =>
    apiClient.get(`/analytics/recent?hours=${hours}`)
};

// Default export
export default apiClient;