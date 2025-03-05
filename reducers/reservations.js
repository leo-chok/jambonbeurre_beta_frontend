import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { reservations: [] },
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    displayReservations: (state, action) => {
      state.value.reservations = action.payload;
    },
    addNewReservation: (state, action) => {
      state.value.reservations.push(action.payload);
    },
    deleteReservation: (state, action) => {
      state.value.reservations = state.value.reservations.filter(
        (reservation) => reservation._id !== action.payload
      );
    },
    
  },
});

export const { addNewReservation, deleteReservation, displayReservations } =
  reservationsSlice.actions;
export default reservationsSlice.reducer;
