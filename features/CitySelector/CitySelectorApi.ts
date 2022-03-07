import { ICityLocation } from "./types/ICityLocation";

export async function fetchCities(): Promise<ICityLocation[]> {
  const response = await fetch("/api/cities");
  const result = await response.json();
  return result;
}
