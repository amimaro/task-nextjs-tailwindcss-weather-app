import { CityLocation } from "../../types/CityLocation";

export const CitySelectorItem: React.FC<{
  selectedCity: CityLocation;
  index: number;
  city: CityLocation;
}> = ({ selectedCity, index, city, children }) => {
  return (
    <div
      key={city.name}
      className={`text-lg border-t-2 border-r-2 ${
        selectedCity?.name !== city.name ? "border-b-2" : "scale-105"
      } ${index === 0 ? "border-l-2" : ""}`}
    >
      {children}
    </div>
  );
};
