import express from "express";

import { getReportsByYear } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/:year", getReportsByYear);

export default router;
