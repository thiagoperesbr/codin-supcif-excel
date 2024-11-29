import Logs from "../models/Logs.js";
import dayjs from "dayjs";

export const createLog = async (req, res, next) => {
  try {
    const { date, saved } = req.body;

    if (!date) {
      return res.status(400).json({
        message: "A data é obrigatória",
      });
    }

    const logDate = dayjs(date).startOf("day").toDate();

    const existingLog = await Logs.findOne({ date: logDate });

    if (existingLog) {
      return res.status(409).json({
        message: "Já existe um log para esta data.",
        log: existingLog,
      });
    }

    const newLog = new Logs({
      date: logDate,
      saved,
    });

    await newLog.save();

    res.status(201).json({
      message: "Log criado com sucesso",
      log: newLog,
    });
  } catch (err) {
    next(err);
  }
};

export const getLogByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        message: "A data é obrigatória",
      });
    }

    const logDate = dayjs(date).startOf("day").toDate();

    const log = await Logs.findOne({ date: logDate });

    let saved;

    if (!log) {
      saved = false;
    } else {
      saved = log.saved;
    }

    res.status(200).json({
      saved,
    });
  } catch (err) {
    next(err);
  }
};
