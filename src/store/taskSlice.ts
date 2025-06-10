import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../models/Task";
import { taskService } from "../services/taskService";
import type { CreateTaskRequest, UpdateTaskRequest, ApiError } from "../services/types";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

// Async thunks
const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const tasks = await taskService.getAllTasks();
            return tasks;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: CreateTaskRequest, { rejectWithValue }) => {
        try {
            const newTask = await taskService.createTask(taskData);
            return newTask;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const updateTaskAsync = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, data }: { id: number; data: UpdateTaskRequest }, { rejectWithValue }) => {
        try {
            const updatedTask = await taskService.updateTask(id, data);
            return updatedTask;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id: number, { rejectWithValue }) => {
        try {
            await taskService.deleteTask(id);
            return id;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const toggleTaskCompletionAsync = createAsyncThunk(
    'tasks/toggleCompletion',
    async (id: number, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { tasks: TaskState };
            const task = state.tasks.tasks.find(t => t.id === id);
            if (!task) {
                return rejectWithValue('Task not found');
            }
            const updatedTask = await taskService.toggleTaskCompletion(id, !task.completed);
            return updatedTask;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.error);
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        toggleTaskCompletion: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create task
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update task
            .addCase(updateTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete task
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Toggle completion
            .addCase(toggleTaskCompletionAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleTaskCompletionAsync.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(toggleTaskCompletionAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { 
    clearError,
    addTask, 
    removeTask, 
    toggleTaskCompletion, 
    updateTask 
} = taskSlice.actions;

export {
    fetchTasks,
    createTask,
    updateTaskAsync,
    deleteTask,
    toggleTaskCompletionAsync
};

export default taskSlice.reducer;