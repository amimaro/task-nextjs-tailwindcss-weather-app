// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { CityLocation } from "../../features/CitySelector/types/CityLocation";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CityLocation[]>
) {
  res.status(200).json([
    {
      name: "New York",
      lat: 40.7127281,
      lon: -74.0060152,
      country: "US",
      state: "New York",
    },
    {
      name: "London",
      lat: 51.5073219,
      lon: -0.1276474,
      country: "GB",
      state: "England",
    },
    {
      name: "Berlin",
      lat: 52.5170365,
      lon: 13.3888599,
      country: "DE",
      state: "Berlin",
    },
    {
      name: "Paris",
      lat: 48.8588897,
      lon: 2.3200410217200766,
      country: "FR",
      state: "Ile-de-France",
    },
    {
      name: "Tokyo",
      lat: 35.6828387,
      lon: 139.7594549,
      country: "JP",
      state: "",
    },
  ]);
}
