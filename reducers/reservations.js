import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { reservations: [] },
};

export const userSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
displayReservations: (state, action) => {
      state.value.reservations = action.payload
    },
    addNewReservation: (state, action) => {
      state.value.reservations.push(action.payload)
    },
    deleteReservation: (state, action) => {
        state.value.reservations = state.value.reservations.filter(e => e.reservationId !== action.payload)
    }
  },
});

export const { addNewReservation, deleteReservation, displayReservations } = userSlice.actions;
export default userSlice.reducer;