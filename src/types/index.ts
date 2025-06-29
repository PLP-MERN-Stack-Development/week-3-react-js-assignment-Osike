export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';