import express from "express";

import { getAcompanhamentos } from "../controllers/acompanhamentoController.js";

const router = express.Router();

router.get("/", getAcompanhamentos);

export default router;
