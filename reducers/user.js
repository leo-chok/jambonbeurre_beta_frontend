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
      state.value.preferences.lunchtime = action.payload;},
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

export const { updatePosition, addPhoto, removePhoto, updateLunchTime } = userSlice.actions;
export default userSlice.reducer;
