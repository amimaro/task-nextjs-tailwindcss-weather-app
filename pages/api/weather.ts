import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface IWeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: IWeatherInfo[];
  };
  daily: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: IWeatherInfo[];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
  }[];
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IWeatherData | { cod: number; message: string }>
) => {
  const { lat, lon, units = "metric" } = req.query;

  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=${units}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );

  res.status(weatherData.status).json(await weatherData.json());
};

export default handler;
