import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    infos: {
      username: "",
      firstname: "",
      lastname: "",
      avatar: "",
      online: true,
      location: {
        type: "Point",
        coordinates: [50.6490435, 3.0644092],
      },
    },
    authentification: {
      token: "",
    },
    description: {
      work: "",
      bio: "",
    },
    preferences: {
      favBuddies: [],
      favRestaurant: [],
      favFood: [],
      hobbies: [],
      languages: [],
      holidays: false,
      lunchtime: [
        {
          name: "Lundi",
          start: "12:00",
          stop: "13:00",
          worked: true,
        },
        {
          name: "Mardi",
          start: "12:00",
          stop: "13:00",
          worked: true,
        },
        {
          name: "Mercredi",
          start: "12:00",
          stop: "13:00",
          worked: true,
        },
        {
          name: "Jeudi",
          start: "12:00",
          stop: "13:00",
          worked: true,
        },
        {
          name: "Vendredi",
          start: "12:00",
          stop: "13:00",
          worked: true,
        },
        {
          name: "Samedi",
          start: null,
          stop: null,
          worked: false,
        },
        {
          name: "Dimanche",
          start: null,
          stop: null,
          worked: false,
        },
      ],
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLunchTime: (state, action) => {
      state.value.preferences.lunchtime = action.payload;
    },
  },
});

export const { updateLunchTime } =
  userSlice.actions;
export default userSlice.reducer;
