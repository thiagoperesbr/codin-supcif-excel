import express from "express";

import {
  createEmails,
  getEmailById,
  getEmails,
  getLatestEmails,
} from "../controllers/emailsController.js";

const router = express.Router();

router.post("/create", createEmails);
router.get("/latest", getLatestEmails);
router.get("/", getEmails);
router.get("/:id", getEmailById);

export default router;
