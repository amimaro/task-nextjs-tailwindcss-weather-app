import type { NextPage } from "next";
import Head from "next/head";
import { CitySelector } from "../features/CitySelector";
import { Title } from "../features/components/Title";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title />
        <CitySelector />
      </main>
    </div>
  );
};

export default Home;
