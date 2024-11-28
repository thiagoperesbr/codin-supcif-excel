import express from "express";

import { createLog, getLogByDate } from "../controllers/logsController.js";

const router = express.Router();

router.post("/create", createLog);
router.get("/:date", getLogByDate);

export default router;
