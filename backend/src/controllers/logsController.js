import Logs from "../models/Logs.js";

export const createLog = async (req, res, next) => {
  try {
    const { date, saved } = req.body;

    if (!date) {
      return res.status(400).json({
        message: "A data é obrigatória",
      });
    }

    const logDate = new Date(date).setHours(0, 0, 0, 0);

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

    const logDate = new Date(date).setHours(0, 0, 0, 0);

    const log = await Logs.findOne({ date: logDate });

    if (!log) {
      return res.status(404).json({
        message: "Nenhum log encontrado para esta data.",
      });
    }

    res.status(200).json({
      message: "Log encontrado.",
      log,
    });
  } catch (err) {
    next(err);
  }
};
