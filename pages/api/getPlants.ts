// pages/api/getPlants.ts

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [plants] = await db.query("SELECT * FROM plants");

    console.log(plants); // Log the data to check if it is fetched correctly

    res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ success: false });
  }
}
