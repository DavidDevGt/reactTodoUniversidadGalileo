import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Goal } from "../models/Goal";
import { goalService } from "../services/goalService";
import type { CreateGoalRequest, UpdateGoalRequest, ApiError } from "../services/types";

interface GoalState {
    goals: Goal[];
    loading: boolean;
    error: string | null;
}

const initialState: GoalState = {
    goals: [],
    loading: false,
    error: null,
};

// Async thunks
const fetchGoals = createAsyncThunk(
    'goals/fetchGoals',
    async (_, { rejectWithValue }) => {
        try {
            const goals = await goalService.getAllGoals();
            return goals;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const createGoal = createAsyncThunk(
    'goals/createGoal',
    async (goalData: CreateGoalRequest, { rejectWithValue }) => {
        try {
            const newGoal = await goalService.createGoal(goalData);
            return newGoal;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const updateGoalAsync = createAsyncThunk(
    'goals/updateGoal',
    async ({ id, data }: { id: number; data: UpdateGoalRequest }, { rejectWithValue }) => {
        try {
            const updatedGoal = await goalService.updateGoal(id, data);
            return updatedGoal;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const deleteGoal = createAsyncThunk(
    'goals/deleteGoal',
    async (id: number, { rejectWithValue }) => {
        try {
            await goalService.deleteGoal(id);
            return id;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const toggleGoalCompletionAsync = createAsyncThunk(
    'goals/toggleCompletion',
    async (id: number, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { goals: GoalState };
            const goal = state.goals.goals.find(g => g.id === id);
            if (!goal) {
                return rejectWithValue('Goal not found');
            }
            const updatedGoal = await goalService.toggleGoalCompletion(id, !goal.completed);
            return updatedGoal;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        addGoal: (state, action: PayloadAction<Goal>) => {
            state.goals.push(action.payload);
        },
        removeGoal: (state, action: PayloadAction<number>) => {
            state.goals = state.goals.filter((goal) => goal.id !== action.payload);
        },
        toggleGoalCompletion: (state, action: PayloadAction<number>) => {
            const goal = state.goals.find((goal) => goal.id === action.payload);
            if (goal) {
                goal.completed = !goal.completed;
            }
        },
        updateGoal: (state, action: PayloadAction<Goal>) => {
            const index = state.goals.findIndex((goal) => goal.id === action.payload.id);
            if (index !== -1) {
                state.goals[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch goals
            .addCase(fetchGoals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create goal
            .addCase(createGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update goal
            .addCase(updateGoalAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGoalAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.goals.findIndex(goal => goal.id === action.payload.id);
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
            })
            .addCase(updateGoalAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete goal
            .addCase(deleteGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = state.goals.filter(goal => goal.id !== action.payload);
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Toggle completion
            .addCase(toggleGoalCompletionAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleGoalCompletionAsync.fulfilled, (state, action) => {
                const index = state.goals.findIndex(goal => goal.id === action.payload.id);
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
            })
            .addCase(toggleGoalCompletionAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { 
    clearError,
    addGoal, 
    removeGoal, 
    toggleGoalCompletion, 
    updateGoal 
} = goalSlice.actions;

export {
    fetchGoals,
    createGoal,
    updateGoalAsync,
    deleteGoal,
    toggleGoalCompletionAsync
};

export default goalSlice.reducer;
