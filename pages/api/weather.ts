import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IWeatherData } from "../../features/WeatherPanel/types/IWeatherData";

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
