import { Router } from "express";
export const router = Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });

import { claimfnolCreateCaseData } from "./controllers.js";

//routes
router.post("/submit-claim", upload.single("file"), claimfnolCreateCaseData);

export default router;