import type { NextPage } from "next";
import Head from "next/head";
import { CitySelector } from "../features/CitySelector";
import { Title } from "../features/components/Title";
import { WeatherPanel } from "../features/WeatherPanel";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-28 mt-10">
        <Title />
        <CitySelector />
        <WeatherPanel />
      </main>
    </div>
  );
};

export default Home;
