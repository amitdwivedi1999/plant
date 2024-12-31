import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { plant_id, plant_name, scientific_name, description } = req.body;

    if (!plant_id || !plant_name || !scientific_name || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
      const [result] = await db.query(
        "UPDATE plants SET plant_name = ?, scientific_name = ?, description = ? WHERE plant_id = ?",
        [plant_name, scientific_name, description, plant_id]
      );

      if (result.affectedRows > 0) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, message: "No plants found to update." });
      }
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Failed to update plant." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
