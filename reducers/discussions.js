import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { discussions: [] },
};

export const discussionsSlice = createSlice({
    name: "discssions",
    initialState,
    reducers: {
        chargeDiscussions: (state, action) => {
        state.value.discussions = action.payload;
      },
    }
});

export const { chargeDiscussions } =
  discussionsSlice.actions;
export default discussionsSlice.reducer;
