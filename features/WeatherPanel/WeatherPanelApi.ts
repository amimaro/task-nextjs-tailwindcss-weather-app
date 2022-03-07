import { ICityLocation } from "../CitySelector/types/ICityLocation";
import { IWeatherData } from "./types/IWeatherData";

export async function fetchWeather(
  city: ICityLocation,
  unit: "metric" | "imperial" = "metric"
): Promise<IWeatherData> {
  const response = await fetch(
    `/api/weather?lat=${city.lat}&lon=${city.lon}&unit=${unit}`
  );
  const result = await response.json();
  return result;
}
