import express from "express";

import { createEmails } from "../controllers/emailsController.js";

const router = express.Router();

router.post("/create", createEmails);

export default router;
