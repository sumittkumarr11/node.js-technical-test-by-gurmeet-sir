import express from "express";
import dotenv from "dotenv";
import { randomBytes } from "node:crypto";
import pool from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;



app.post("/api/profiles", async (req, res) => {
  try {
    const { name, email, phone, address, age } = req.body;

    const result = await pool.query(
      `INSERT INTO profiles
       (id, name, email, phone, address, age)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        randomBytes(10).toString("hex"),
        name,
        email,
        phone,
        address,
        age
      ]
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Failed to create profile:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.get("/api/profiles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM profiles WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Failed to get profile:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.put("/api/profiles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, age } = req.body;

    const result = await pool.query(
      `UPDATE profiles
       SET name = $1,
           email = $2,
           phone = $3,
           address = $4,
           age = $5,
           "updatedAt" = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, email, phone, address, age, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Failed to update profile:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
