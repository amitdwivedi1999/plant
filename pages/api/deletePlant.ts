// pages/api/deletePlant.js or .ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db"; // Import the database connection
import { ResultSetHeader } from 'mysql2'; // Import the type for the result of a query

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { ids } = req.body; // Extract plant IDs from request body

    try {
      // Prepare the query to delete plants by their IDs
      const [result] = await db.query(
        "DELETE FROM plants WHERE plant_id IN (?)",
        [ids]
      );

      // Type assertion for accessing 'affectedRows' from the result of the query
      const affectedRows = (result as ResultSetHeader).affectedRows;

      if (affectedRows > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
