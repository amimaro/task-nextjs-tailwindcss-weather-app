/* eslint-disable @next/next/no-img-element */
import {
  IWeatherCurrentData,
  IWeatherDailyData,
} from "../../types/IWeatherData";

export const WeatherItem: React.FC<{
  weather: IWeatherCurrentData & IWeatherDailyData;
}> = ({ weather }) => {
  return (
    <div className="flex flex-col md:flex-row text-center md:text-left items-center text-2xl gap-4">
      <img
        className="w-28 h-28"
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div className="flex flex-col">
        <div className=" font-medium">
          {weather.temp.day ? weather.temp.day : weather.temp}°C
        </div>
        <div className="capitalize tracking-wide">
          {weather.weather[0].description}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between w-52">
          <span>Humidity:</span>
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex justify-between w-52">
          <span>Wind:</span>
          <span>{weather.wind_speed}KpH</span>
        </div>
      </div>
    </div>
  );
};
