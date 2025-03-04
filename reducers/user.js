import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { curentPosition: null, photo: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePosition: (state, action) => {
      state.value.curentPosition = action.payload;
    },
    addPhoto: (state, action) => {
      state.value.photo.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.photo = state.value.photo.filter((data) => data !== action.payload);
    },
  },
});

export const { updatePosition, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;