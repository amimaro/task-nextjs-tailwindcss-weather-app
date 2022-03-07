import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { fetchWeather } from "./WeatherPanelApi";
import { IWeatherData } from "./types/IWeatherData";
import { ICityLocation } from "../CitySelector/types/ICityLocation";

export interface WeatherState {
  weather_obj: IWeatherData | null;
  selectedForecast: number;
}

const initialState: WeatherState = { weather_obj: null, selectedForecast: 0 };

export const fetchWeatherAsync = createAsyncThunk(
  "weather/fetchWeather",
  async (city: ICityLocation) => {
    const response = await fetchWeather(city);
    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    return response;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setForecast: (state, action: PayloadAction<number>) => {
      state.selectedForecast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAsync.pending, (state, action) => {
        state.weather_obj = null;
      })
      .addCase(fetchWeatherAsync.fulfilled, (state, action) => {
        state.weather_obj = action.payload;
        state.selectedForecast = 0;
      });
  },
});

export const { setForecast } = weatherSlice.actions;

export const selectWeather = (state: AppState) => state.weather.weather_obj;
export const selectForecast = (state: AppState) =>
  state.weather.selectedForecast;

export default weatherSlice.reducer;
