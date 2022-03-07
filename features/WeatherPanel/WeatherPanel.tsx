import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppLoader } from "../components/AppLoader";
import { AppSubtitle } from "../components/AppSubtitle";
import { WeatherItem } from "./components/WeatherItem";
import { IWeatherCurrentData, IWeatherDailyData } from "./types/IWeatherData";
import { selectWeather } from "./WeatherPanelSlice";

export const WeatherPanel = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector(selectWeather);

  if (!weather) {
    return (
      <div className="relative w-full h-96">
        <AppLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:mt-4 w-full">
      <div className="md:my-0 my-2">
        <AppSubtitle>Current weather</AppSubtitle>
        <WeatherItem
          weather={weather.current as IWeatherCurrentData & IWeatherDailyData}
        />
      </div>
      <div className="md:my-0 my-2">
        <AppSubtitle>Forcast 01/01/2022</AppSubtitle>
        <WeatherItem
          weather={weather.daily[0] as IWeatherCurrentData & IWeatherDailyData}
        />
      </div>
    </div>
  );
};
