import type { NextPage } from "next";
import Head from "next/head";
import { AppHeader } from "../features/components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppHeader />
      </main>
    </div>
  );
};

export default Home;
