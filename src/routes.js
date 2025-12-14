import { Router } from "express";
export const router = Router();

import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

import { claimfnolCreateCaseData } from "./controllers.js";

//routes
router.post("/submit-claim", upload.single("file"), claimfnolCreateCaseData);

export default router;