import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { discussions: [] },
};

export const discussionsSlice = createSlice({
    name: "discssions",
    initialState,
    reducers: {
        chargeDiscussion: (state, action) => {
        state.value.discussions = action.payload;
      },
    }
});

export const { chargeDiscussion } =
  discussionsSlice.actions;
export default discussionsSlice.reducer;
