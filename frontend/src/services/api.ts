import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// ✅ Request cache to prevent duplicate calls
const requestCache = new Map<string, Promise<any>>();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // ✅ Reduced timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// ✅ DISABLED Request interceptor for debugging
/*
apiClient.interceptors.request.use(
  (config) => {
    // Add cache key for GET requests
    if (config.method === 'get') {
      const cacheKey = `${config.method}:${config.url}`;
      if (requestCache.has(cacheKey)) {
        return Promise.reject({ __CANCEL__: true, cache: requestCache.get(cacheKey) });
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
*/

// ✅ DISABLED Response interceptor for debugging  
/*
apiClient.interceptors.response.use(
  (response) => {
    // Clear cache for this request
    const cacheKey = `${response.config.method}:${response.config.url}`;
    requestCache.delete(cacheKey);
    return response;
  },
  (error) => {
    if (error.__CANCEL__) {
      return error.cache;
    }
    return Promise.reject(error);
  }
);
*/

// ✅ Types with required properties only
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  assigneeEmail?: string;
  assigneeName?: string;
  projectId: number;
  createdAt?: string;
  updatedAt?: string;
  progress?: number;
  dueDate?: string;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalProjects: number;
  teamMembers: number;
}

export interface TaskComment {
  id: number;
  content: string;
  userId: number;
  taskId: number;
  createdAt: string;
  updatedAt: string;
  userFullName?: string;
}

// ✅ Optimized API methods with caching
export const tasksApi = {
  getAllTasks: (): Promise<Task[]> => {
    // ✅ BYPASS CACHE FOR DEBUGGING
    console.log('🔍 Calling getAllTasks...');
    const promise = apiClient.get<Task[]>('/tasks').then(response => {
      console.log('✅ Tasks response:', response.data);
      return response.data;
    }).catch(error => {
      console.error('❌ Tasks API error:', error);
      throw error;
    });
    return promise;
  },

  getTaskById: (id: number): Promise<Task> =>
    apiClient.get<Task>(`/tasks/${id}`).then(response => response.data),

  createTask: (task: Omit<Task, 'id'>): Promise<Task> => {
    // Clear tasks cache when creating
    requestCache.delete('get:/tasks');
    
    const requestData = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      projectId: task.projectId,
      assigneeEmail: task.assigneeEmail || null,
    };
    
    return apiClient.post<{task: Task}>('/tasks', requestData)
      .then(response => response.data.task);
  },

  updateTaskStatus: (id: number, status: Task['status']): Promise<Task> => {
    // Clear cache when updating
    requestCache.delete('get:/tasks');
    
    return apiClient.put<{task: Task}>(`/tasks/${id}/status?status=${status}`)
      .then(response => response.data.task);
  }
};

export const dashboardApi = {
  getStats: (): Promise<DashboardStats> => {
    const cacheKey = 'get:/dashboard/stats';
    if (requestCache.has(cacheKey)) {
      return requestCache.get(cacheKey)!;
    }
    
    const promise = apiClient.get<DashboardStats>('/dashboard/stats')
      .then(response => response.data)
      .catch(() => ({
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        totalProjects: 0,
        teamMembers: 0
      }));
    
    requestCache.set(cacheKey, promise);
    return promise;
  }
};

export const taskCommentsApi = {
  getCommentsByTask: (taskId: number): Promise<TaskComment[]> =>
    apiClient.get<TaskComment[]>(`/tasks/${taskId}/comments`)
      .then(response => response.data)
      .catch(() => []),

  createComment: (request: { taskId: number; content: string }): Promise<TaskComment> =>
    apiClient.post<TaskComment>('/comments', request).then(response => response.data)
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, { timeout: 3000 });
    return response.status === 200;
  } catch {
    return false;
  }
};

export default apiClient;