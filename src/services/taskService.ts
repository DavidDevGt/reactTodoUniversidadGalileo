import { apiClient } from './api';
import type { CreateTaskRequest, DeleteResponse, TaskResponse, UpdateTaskRequest } from './types';

export class TaskService {
  private readonly endpoint = '/api/tasks';

  async getAllTasks(): Promise<TaskResponse[]> {
    return apiClient.get<TaskResponse[]>(this.endpoint);
  }

  async getTaskById(id: number): Promise<TaskResponse> {
    return apiClient.get<TaskResponse>(`${this.endpoint}/${id}`);
  }

  async createTask(taskData: CreateTaskRequest): Promise<TaskResponse> {
    const data = {
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
    };

    return apiClient.post<TaskResponse>(this.endpoint, data);
  }

  async updateTask(id: number, updateData: UpdateTaskRequest): Promise<TaskResponse> {
    const data = {
      ...updateData,
      ...(updateData.dueDate && {
        dueDate: new Date(updateData.dueDate).toISOString(),
      }),
    };

    return apiClient.put<TaskResponse>(`${this.endpoint}/${id}`, data);
  }

  async deleteTask(id: number): Promise<DeleteResponse> {
    return apiClient.delete<DeleteResponse>(`${this.endpoint}/${id}`);
  }

  async toggleTaskCompletion(id: number, completed: boolean): Promise<TaskResponse> {
    return this.updateTask(id, { completed });
  }
}

// Export singleton instance
export const taskService = new TaskService();
