export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  manager: User;
}
