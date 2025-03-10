import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { discussion: [] },
};

export const discussionSlice = createSlice({
    name: "discssion",
    initialState,
    reducers: {
        chargeUneDiscussion: (state, action) => {
        state.value.discussion = action.payload;
      },
       addNewMessage: (state, action) => {
            state.value.discussion.push(action.payload);
          },
    }
});

export const { chargeUneDiscussion } =
  discussionSlice.actions;
export default discussionSlice.reducer;
