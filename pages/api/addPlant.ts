// import { NextApiRequest, NextApiResponse } from "next";
// import db from "../../lib/db";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { plantName, scientificName, description } = req.body;

//   if (!plantName || !scientificName || !description) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const [result] = await db.query(
//       "INSERT INTO plants (plant_name, scientific_name, description) VALUES (?, ?, ?)",
//       [plantName, scientificName, description]
//     );
//     res.status(201).json({ message: "Plant added successfully", plantId: result.insertId });
//   } catch (error) {
//     console.error("Error adding plant:", error);
//     res.status(500).json({ message: "Error adding plant" });
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db"; // MySQL database connection pool

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { plantName, scientificName, description } = req.body;

    if (!plantName || !scientificName || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Insert the new plant into the database
      const [result] = await db.execute(
        "INSERT INTO plants (plant_name, scientific_name, description) VALUES (?, ?, ?)",
        [plantName, scientificName, description]
      );

      // Return the newly inserted plant object
      const newPlant = {
        // plant_id: result.insertId, // Auto-generated ID from MySQL
        plant_name: plantName,
        scientific_name: scientificName,
        description,
      };

      // Return a success response with a message
      res.status(200).json({
        message: "Plant added successfully!", // Success message
        plant: newPlant, // The newly added plant data
      });
    } catch (error) {
      console.error("Error adding plant:", error);
      res.status(500).json({ message: "Failed to add plant." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
