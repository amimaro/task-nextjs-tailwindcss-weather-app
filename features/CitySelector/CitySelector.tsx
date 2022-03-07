import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCitiesAsync, selectCities } from "./CitySelectorSlice";
import { CitySelectorWrapper } from "./components";
import { CitySelectorItem } from "./components/CitySelectorItem";
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
    <CitySelectorWrapper>
      {cities.map((city, index) => (
        <CitySelectorItem
          key={city.name}
          selectedCity={selectedCityValue}
          index={index}
          city={city}
        >
          <button
            className="py-2 px-4 tracking-wide"
            onClick={() => setSelectedCity(city)}
          >
            {city.name}
          </button>
        </CitySelectorItem>
      ))}
    </CitySelectorWrapper>
  );
};
