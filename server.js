import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "15mb" }));

// API routes
app.use("/api", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
