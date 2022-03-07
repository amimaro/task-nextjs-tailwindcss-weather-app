import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCitiesAsync, selectCities } from "./CitySelectorSlice";
import { CityLocation } from "./types/CityLocation";

export const CitySelector = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);

  const [selectedCity, setSelectedCity] = useState<CityLocation | null>(null);

  useEffect(() => {
    dispatch(fetchCitiesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCityValue = selectedCity || cities[0] || null;

  return (
    <div className="flex">
      <div className="w-10 border-b-2"></div>
      <div className="flex">
        {cities.map((city, index) => (
          <div
            key={city.name}
            className={`text-lg border-t-2 border-r-2 ${
              selectedCityValue?.name !== city.name ? "border-b-2" : "scale-105"
            } ${index === 0 ? "border-l-2" : ""}`}
          >
            <button className="py-2 px-4" onClick={() => setSelectedCity(city)}>
              {city.name}
            </button>
          </div>
        ))}
      </div>
      <div className="flex-grow border-b-2"></div>
    </div>
  );
};
