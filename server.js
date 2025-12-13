import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "15mb" }));

// API routes
app.use("/api", router);


app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      success: true,
      time: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
