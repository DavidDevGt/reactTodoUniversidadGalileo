import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type ActiveView = 'tasks' | 'goals';

interface NavigationState {
  activeView: ActiveView;
}

const initialState: NavigationState = {
  activeView: 'tasks',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveView: (state, action: PayloadAction<ActiveView>) => {
      state.activeView = action.payload;
    },
  },
});

export const { setActiveView } = navigationSlice.actions;
export default navigationSlice.reducer;
