export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: number;
    priority: Priority;
    status: Status;
    dueDate?: number; // timestamp
}

export type FilterType = 'all' | 'todo' | 'in-progress' | 'done';
