import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    "hamburger_restaurant",
    "bakery",
    "sports_activity_location",
    "coffee_shop",
    "video_arcade",
    "hotel",
    "bar",
    "italian_restaurant",
    "movie_theater",
    "shopping_mall",
    "supermarket",
    "store",
    "brunch_restaurant",
    "casino",
    "pizza_restaurant",
    "restaurant",
    "thai_restaurant",
    "food_store",
    "chinese_restaurant",
    "french_restaurant",
    "sandwich_shop",
    "fast_food_restaurant",
    "tea_house",
    "meal_takeaway",
    "japanese_restaurant",
  ],
};

export const restaurantFilterSlice = createSlice({
  name: "restaurantFilter",

  initialState,
  reducers: {
    setFilter: (state, action) => {
      if (state.value.includes(action.payload)) {
        const index = state.value.indexOf(action.payload);
        state.value.splice(index, 1);
      } else {
        state.value = [...state.value, action.payload];
      }
    },
    emptyFilter: (state, action) => {
      state.value = [];
    },
    fillFilter: (state, action) => {
      state.value = [
        "hamburger_restaurant",
        "bakery",
        "sports_activity_location",
        "coffee_shop",
        "video_arcade",
        "hotel",
        "bar",
        "italian_restaurant",
        "movie_theater",
        "shopping_mall",
        "supermarket",
        "store",
        "brunch_restaurant",
        "casino",
        "pizza_restaurant",
        "restaurant",
        "thai_restaurant",
        "food_store",
        "chinese_restaurant",
        "french_restaurant",
        "sandwich_shop",
        "fast_food_restaurant",
        "tea_house",
        "meal_takeaway",
        "japanese_restaurant",
      ];
    },
  },
});

export const { setFilter, emptyFilter, fillFilter } = restaurantFilterSlice.actions;
export default restaurantFilterSlice.reducer;
