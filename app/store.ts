import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import cityReducer from "../features/CitySelector/CitySelectorSlice";
import weatherReducer from "../features/WeatherPanel/WeatherPanelSlice";

export function makeStore() {
  return configureStore({
    reducer: { city: cityReducer, weather: weatherReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
