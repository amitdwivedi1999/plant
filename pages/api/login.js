// pages/api/login.js
import db from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM admin_users WHERE username = ? AND password = ?", [username, password]);

    if (rows.length > 0) {
      // Login successful
      return res.status(200).json({ message: "Login successful" });
    } else {
      // Invalid credentials
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
