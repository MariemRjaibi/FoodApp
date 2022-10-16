import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    favorite: (state, action) => {
      state.value.push(action.payload);
    },
    unfavorite: (state, action) => {
      state.value = state.value.filter(e => e.id !== action.payload);
    },
    updateServings: (state, action) => {
      state.value.find(e => e.id === action.payload.id).servingNb = action.payload.servingNb;
    },
  },
});

export const { favorite, unfavorite, updateServings } = favoritesSlice.actions;
export default favoritesSlice.reducer;
