import { useAppSelector } from "../../app/hooks";
import { AppLoader } from "../components/AppLoader";
import { AppSubtitle } from "../components/AppSubtitle";
import { WeatherItem } from "./components/WeatherItem";
import { IWeatherCurrentData, IWeatherDailyData } from "./types/IWeatherData";
import { selectForecast, selectWeather } from "./WeatherPanelSlice";

export const WeatherPanel = () => {
  const weather = useAppSelector(selectWeather);
  const selectedForecast = useAppSelector(selectForecast);

  if (!weather) {
    return (
      <div className="relative w-full h-96">
        <AppLoader />
      </div>
    );
  }

  const getFormattedDate = (dt: number) => {
    const date = new Date(dt * 1000);
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  return (
    <div className="flex flex-col gap-6 md:mt-4 w-full">
      <div className="md:my-0 my-2">
        <AppSubtitle>Current weather</AppSubtitle>
        <WeatherItem
          weather={weather.current as IWeatherCurrentData & IWeatherDailyData}
        />
      </div>
      <div className="md:my-0 my-2">
        <AppSubtitle>
          {selectedForecast === 0 && "Today's"} Forecast{" "}
          {getFormattedDate(weather.daily[selectedForecast].dt)}
        </AppSubtitle>
        <WeatherItem
          weather={
            weather.daily[selectedForecast] as IWeatherCurrentData &
              IWeatherDailyData
          }
        />
      </div>
    </div>
  );
};
