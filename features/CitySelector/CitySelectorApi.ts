import { CityLocation } from "./types/CityLocation";

export async function fetchCities(): Promise<CityLocation[]> {
  const response = await fetch("/api/cities");
  const result = await response.json();
  return result;
}
