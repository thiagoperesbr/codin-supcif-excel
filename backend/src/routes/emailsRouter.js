import express from "express";

import {
  createEmails,
  getEmailById,
  getEmails,
  getLatestEmails,
  getMonthlyTotals,
} from "../controllers/emailsController.js";

const router = express.Router();

router.post("/create", createEmails);
router.get("/latest", getLatestEmails);
router.get("/", getEmails);
router.get("/id/:id", getEmailById);
router.get("/monthly-totals", getMonthlyTotals);

export default router;
