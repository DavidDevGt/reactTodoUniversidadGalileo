import { configureStore} from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import goalReducer from "./goalSlice";
import navigationReducer from "./navigationSlice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        goals: goalReducer,
        navigation: navigationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
