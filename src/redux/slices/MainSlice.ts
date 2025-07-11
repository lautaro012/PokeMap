// src/redux/slices/pokedexSlice.ts
import { createSlice } from '@reduxjs/toolkit';


interface initialState {
}

const initialState: initialState = {
 
};

const MainSlice = createSlice({
  name: 'MainSlice',
  initialState,
  reducers: {
    startLoading() {
    },
  },
});

export const {
  startLoading,
} = MainSlice.actions;

export default MainSlice.reducer;
