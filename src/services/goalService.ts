import { apiClient } from './api';
import type {
    CreateGoalRequest,
    UpdateGoalRequest,
    GoalResponse,
    DeleteResponse
} from './types';

export class GoalService {
    private readonly endpoint = '/api/goals';

    async getAllGoals(): Promise<GoalResponse[]> {
        return apiClient.get<GoalResponse[]>(this.endpoint);
    }

    async getGoalById(id: number): Promise<GoalResponse> {
        return apiClient.get<GoalResponse>(`${this.endpoint}/${id}`);
    }

    async createGoal(goalData: CreateGoalRequest): Promise<GoalResponse> {
        const data = {
            ...goalData,
            targetDate: new Date(goalData.targetDate).toISOString(),
        };

        return apiClient.post<GoalResponse>(this.endpoint, data);
    }

    async updateGoal(id: number, updateData: UpdateGoalRequest): Promise<GoalResponse> {
        const data = {
            ...updateData,
            ...(updateData.targetDate && {
                targetDate: new Date(updateData.targetDate).toISOString()
            }),
        };

        return apiClient.put<GoalResponse>(`${this.endpoint}/${id}`, data);
    }

    async deleteGoal(id: number): Promise<DeleteResponse> {
        return apiClient.delete<DeleteResponse>(`${this.endpoint}/${id}`);
    }

    async toggleGoalCompletion(id: number, completed: boolean): Promise<GoalResponse> {
        return this.updateGoal(id, { completed });
    }
}

// Export singleton instance
export const goalService = new GoalService();
