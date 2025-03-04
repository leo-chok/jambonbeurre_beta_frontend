import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { currentPosition: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePosition: (state, action) => {
      state.value.currentPosition = action.payload;
    },
  },
});

export const { updatePosition } = userSlice.actions;
export default userSlice.reducer;