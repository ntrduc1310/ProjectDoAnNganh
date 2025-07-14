import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Định dạng email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

// Register schema với validation mạnh mẽ
export const registerSchema = z.object({
  firstName: z.string().min(2, { message: "Họ phải có ít nhất 2 ký tự" }),
  lastName: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Định dạng email không hợp lệ" }),
  password: z.string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số" 
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;

// Other interfaces...
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  manager: {
    id: string;
    fullName: string;
    email: string;
  };
  status?: 'active' | 'completed' | 'pending';
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  activeProjects: number;
  tasksInProgress: number;
  overdueTasks: number;
  completedThisWeek: number;
}

export interface TeamMember {
  id: string;
  name: string;
  workloadScore: number;
  maxCapacity: number;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  project?: string;
  timestamp: string;
  type: 'task_completed' | 'task_created' | 'project_updated' | 'user_assigned';
}