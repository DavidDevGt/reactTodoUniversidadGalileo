import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Goal } from "../models/Goal";

interface GoalState {
    goals: Goal[];
}

const initialState: GoalState = {
    goals: [],
};

const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
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
});

export const { addGoal, removeGoal, toggleGoalCompletion, updateGoal } = goalSlice.actions;
export default goalSlice.reducer;
