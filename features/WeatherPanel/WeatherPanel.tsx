import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppLoader } from "../components/AppLoader";
import { AppSubtitle } from "../components/AppSubtitle";
import { WeatherItem } from "./components/WeatherItem";
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
    <div className="w-full">
      <div>
        <AppSubtitle>Current weather</AppSubtitle>
        <WeatherItem weather={weather} />
      </div>
    </div>
  );
};
