import { Router } from "express";
export const router = Router();

import { askPerplexity } from "./services/perplexity.service.js";
import claim_form_model from "../masterData/claim_form_model.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

import { EXTRACT_DOCUMENT } from "../masterData/promts.js";


router.post("/extract", askPerplexity);

router.post("/upload", upload.single("file"), async (req, res) => {
  const result = await askPerplexity(claim_form_model, EXTRACT_DOCUMENT, req.file.path);
  res.send(result);
});


export default router;