import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  startDate: string;
  endDate?: string;
  ownerId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assigneeId?: string;
  projectId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
}

// Context Types
interface AppContextType {
  // Tasks
  tasks: Task[];
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  
  // Projects
  projects: Project[];
  createProject: (project: Partial<Project>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Users
  users: User[];
  currentUser: User | null;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Props
interface AppProviderProps {
  children: ReactNode;
}

// Sample data
const sampleUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Tester' },
];

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce platform with React and Node.js',
    status: 'ACTIVE',
    startDate: '2024-01-01',
    ownerId: '3',
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Cross-platform mobile application',
    status: 'ACTIVE',
    startDate: '2024-02-01',
    ownerId: '3',
  },
];

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Setup project structure',
    description: 'Initialize React project with TypeScript and Vite',
    status: 'DONE',
    priority: 'HIGH',
    assigneeId: '1',
    projectId: '1',
    dueDate: '2024-12-20',
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Design user interface',
    description: 'Create wireframes and mockups for the main pages',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    assigneeId: '2',
    projectId: '1',
    dueDate: '2024-12-25',
    createdAt: '2024-12-02T00:00:00Z',
    updatedAt: '2024-12-02T00:00:00Z',
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Add login and registration functionality',
    status: 'TODO',
    priority: 'HIGH',
    assigneeId: '1',
    projectId: '1',
    dueDate: '2024-12-30',
    createdAt: '2024-12-03T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z',
  },
  {
    id: '4',
    title: 'Write unit tests',
    description: 'Create comprehensive test suite',
    status: 'TODO',
    priority: 'MEDIUM',
    assigneeId: '4',
    projectId: '1',
    createdAt: '2024-12-04T00:00:00Z',
    updatedAt: '2024-12-04T00:00:00Z',
  },
  {
    id: '5',
    title: 'API Integration',
    description: 'Connect frontend with backend APIs',
    status: 'REVIEW',
    priority: 'HIGH',
    assigneeId: '1',
    projectId: '2',
    dueDate: '2024-12-22',
    createdAt: '2024-12-05T00:00:00Z',
    updatedAt: '2024-12-05T00:00:00Z',
  },
];

const sampleNotifications: Notification[] = [
  {
    id: '1',
    message: 'Task "Setup project structure" has been completed',
    type: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    read: false,
  },
  {
    id: '2',
    message: 'New comment added to "Design user interface"',
    type: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: '3',
    message: 'Deadline approaching for "API Integration"',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: true,
  },
  {
    id: '4',
    message: 'Server maintenance scheduled for tonight',
    type: 'error',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: false,
  }
];

// Provider Component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [users] = useState<User[]>(sampleUsers);
  const [currentUser] = useState<User | null>(sampleUsers[0]);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  // Tasks functions
  const createTask = async (taskData: Partial<Task>): Promise<void> => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || 'TODO',
      priority: taskData.priority || 'MEDIUM',
      assigneeId: taskData.assigneeId,
      projectId: taskData.projectId,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    addNotification({
      message: `Task "${newTask.title}" created successfully`,
      type: 'success',
    });
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<void> => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    
    addNotification({
      message: 'Task updated successfully',
      type: 'success',
    });
  };

  const deleteTask = async (id: string): Promise<void> => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    
    addNotification({
      message: `Task "${task?.title}" deleted successfully`,
      type: 'success',
    });
  };

  // Projects functions
  const createProject = async (projectData: Partial<Project>): Promise<void> => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name || '',
      description: projectData.description || '',
      status: projectData.status || 'ACTIVE',
      startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      endDate: projectData.endDate,
      ownerId: projectData.ownerId || currentUser?.id || '',
    };
    
    setProjects(prev => [...prev, newProject]);
    addNotification({
      message: `Project "${newProject.name}" created successfully`,
      type: 'success',
    });
  };

  const updateProject = async (id: string, updates: Partial<Project>): Promise<void> => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
    
    addNotification({
      message: 'Project updated successfully',
      type: 'success',
    });
  };

  const deleteProject = async (id: string): Promise<void> => {
    const project = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(project => project.id !== id));
    
    addNotification({
      message: `Project "${project?.name}" deleted successfully`,
      type: 'success',
    });
  };

  // Notifications functions
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const markNotificationRead = (id: string): void => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const clearNotifications = (): void => {
    setNotifications([]);
  };

  const value: AppContextType = {
    // Tasks
    tasks,
    createTask,
    updateTask,
    deleteTask,
    
    // Projects
    projects,
    createProject,
    updateProject,
    deleteProject,
    
    // Users
    users,
    currentUser,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationRead,
    clearNotifications,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hooks
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const useTasks = () => {
  const { tasks, createTask, updateTask, deleteTask } = useAppContext();
  return { tasks, createTask, updateTask, deleteTask };
};

export const useProjects = () => {
  const { projects, createProject, updateProject, deleteProject } = useAppContext();
  return { projects, createProject, updateProject, deleteProject };
};

export const useUsers = () => {
  const { users, currentUser } = useAppContext();
  return { users, currentUser };
};

export const useNotifications = () => {
  const { notifications, addNotification, markNotificationRead, clearNotifications } = useAppContext();
  return { notifications, addNotification, markNotificationRead, clearNotifications };
};
