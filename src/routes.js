import { Router } from "express";
export const router = Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });

import { claimfnolCreateCaseData } from "./controllers/claimfnol.js";

router.post("/fnol", upload.single("file"), claimfnolCreateCaseData);

export default router;