import { useAppSelector } from "../../app/hooks";
import { AppLoader } from "../components/AppLoader";
import { AppSubtitle } from "../components/AppSubtitle";
import { WeatherItem } from "./components/WeatherItem";
import { IWeatherCurrentData, IWeatherDailyData } from "./types/IWeatherData";
import { selectForecast, selectWeather } from "./WeatherPanelSlice";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AppModal = dynamic<any>(
  () => import("../components/AppModal").then((mod) => mod.AppModal),
  { ssr: false }
);

export const WeatherPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weather = useAppSelector(selectWeather);
  const selectedForecast = useAppSelector(selectForecast);

  useEffect(() => {
    if (!selectedForecast && !!weather) {
      setIsModalOpen(true);
    }
  }, [selectedForecast, weather]);

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
      {!!selectedForecast && (
        <div className="md:my-0 my-2">
          <AppSubtitle>
            Forecast {getFormattedDate(selectedForecast.dt)}
          </AppSubtitle>
          <WeatherItem
            weather={
              selectedForecast as IWeatherCurrentData & IWeatherDailyData
            }
          />
        </div>
      )}
      <AppModal isOpen={isModalOpen} modalClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <span className="text-2xl font-medium tracking-wider text-center">
            There are no forecast for this day
          </span>
        </div>
      </AppModal>
    </div>
  );
};
