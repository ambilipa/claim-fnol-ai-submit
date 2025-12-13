import { Router } from "express";
import multer from "multer"; // Add this import
import { askPerplexity } from "./services/perplexity.service.js";
import claim_form_model from "../masterData/claim_form_model.js";


export const router = Router();

// const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit
const upload = multer({ dest: "uploads/" });

// Test route
router.get("/ping", (req, res) => {
  res.json({ message: "Express + TypeScript + Perplexity is working!" });
});


router.post("/extract", askPerplexity);

router.post("/upload", upload.single("file"), async (req, res) => {
  const result = await askPerplexity(claim_form_model, "extract information in this document into the provided model structure and return only valid JSON.", req.file.path);
  res.send(result);
});


// router.post("/get-policy-data",getPolicyData)

// File upload route (NEW)
// router.post("/ask-file", upload.single('file'), async (req, res) => {
//   try {
//     const { instruction } = req.body;
//     if (!instruction) return res.status(400).json({ error: "instruction is required" });
//     if (!req.file) return res.status(400).json({ error: "file is required" });

//     const result = await askPerplexity({
//       instruction,
//       fileBuffer: req.file.buffer,
//       filename: req.file.originalname,
//       contentType: req.file.mimetype
//     });
    
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Failed to process file request" });
//   }
// });

//   // Image prompt route (URL or Base64)
//   router.post("/ask-image", async (req, res) => {
//     try {
//       const { question, imageUrl, imageBase64 } = req.body;
//       if (!question) return res.status(400).json({ error: "question is required" });
//       if (!imageUrl && !imageBase64) return res.status(400).json({ error: "imageUrl or imageBase64 is required" });

//       const content = [{ type: "text", text: question }];

//       if (imageUrl) {
//         content.push({ type: "image_url", image_url: { url: imageUrl } });
//       }

//       if (imageBase64) {
//         content.push({ type: "image_url", image_url: { url: `data:image/png;base64,${imageBase64}` } });
//       }

//       const result = await askPerplexity(content);
//       res.json(result);
//     } catch (err) {
//       res.status(500).json({ error: err.message || "Failed to process image request" });
//     }
//   });

export default router;
