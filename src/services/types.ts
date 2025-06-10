// API Response types
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface ApiError {
    error: string;
    statusCode: number;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    dueDate: string; // ISO8601 format
    completed?: boolean;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    dueDate?: string;
    completed?: boolean;
}

export interface TaskResponse {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    createdAt: string;
}

export interface CreateGoalRequest {
    title: string;
    description: string;
    targetDate: string; // ISO8601 format
    completed?: boolean;
}

export interface UpdateGoalRequest {
    title?: string;
    description?: string;
    targetDate?: string;
    completed?: boolean;
}

export interface GoalResponse {
    id: number;
    title: string;
    description: string;
    targetDate: string;
    completed: boolean;
    createdAt: string;
}

export interface DeleteResponse {
    message: string;
}
