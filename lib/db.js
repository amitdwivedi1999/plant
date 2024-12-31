// lib/db.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", // Replace with your database host
  user: "root", // Replace with your MySQL username
  password: "Giveme1$", // Replace with your MySQL password
  database: "plant_db", // Replace with your database name
});

export default db;
