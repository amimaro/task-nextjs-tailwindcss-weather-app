import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { fetchCities } from "./CitySelectorApi";
import { ICityLocation } from "./types/ICityLocation";

export interface CityState {
  cities_list: ICityLocation[];
}

const initialState: CityState = { cities_list: [] };

export const fetchCitiesAsync = createAsyncThunk(
  "city/fetchCities",
  async () => {
    const response = await fetchCities();
    return response;
  }
);

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesAsync.fulfilled, (state, action) => {
      state.cities_list = action.payload;
    });
  },
});

export const selectCities = (state: AppState) => state.city.cities_list;

export default citySlice.reducer;
