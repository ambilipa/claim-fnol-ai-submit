import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes.js";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();

const app = express();
app.use(express.json({ limit: "15mb" }));

app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// Serve index.html at /submit-claim
app.get("/submit-claim", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API routes
app.use("/", router);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});