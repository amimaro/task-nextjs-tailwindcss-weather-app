import type { NextPage } from "next";
import Head from "next/head";
import { CitySelector } from "../features/CitySelector";
import { AppCalendar } from "../features/AppCalendar";
import { AppTitle } from "../features/components/AppTitle";
import { WeatherPanel } from "../features/WeatherPanel";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-4 md:mx-28 mt-10 h-full">
        <AppTitle>Weather App</AppTitle>
        <CitySelector />
        <div className="flex md:flex-row flex-col gap-4 h-full mt-6">
          <WeatherPanel />
          <AppCalendar />
        </div>
      </main>
    </div>
  );
};

export default Home;
