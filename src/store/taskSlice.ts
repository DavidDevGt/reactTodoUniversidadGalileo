import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../models/Task";

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;