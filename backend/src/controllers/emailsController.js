import Emails from "../models/Emails.js";
import dayjs from "dayjs";

export const createEmails = async (req, res, next) => {
  try {
    const { emails, date } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ message: "A lista de e-mails é obrigatória." });
    }

    if (!date) {
      return res.status(400).json({
        message: "A data é obrigatória.",
      });
    }

    const logDate = dayjs(date).startOf("day").toDate();

    console.log(logDate);

    const existingEmails = await Emails.find({ data: logDate });

    console.log(existingEmails);

    if (existingEmails.length > 0) {
      return res.status(400).json({
        message: "E-mails já foram salvos",
      });
    }

    const emailsWithDate = emails.map((email) => ({
      ...email,
      data: logDate,
    }));

    const newEmails = await Emails.insertMany(emailsWithDate);

    res.status(201).json({
      message: "E-mails salvos com sucesso.",
      emails: newEmails,
    });
  } catch (err) {
    next(err);
  }
};

export const getEmails = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 0 || limit <= 10) {
      return res.status(404).json({
        message: "Os parâmetros de paginação são inválidos.",
      });
    }

    const totalCount = await Emails.countDocuments();

    const emails = await Emails.find()
      .skip(page * limit)
      .limit(limit);

    if (emails.length === 0) {
      return res.status(400).json({
        message: "Nenhum email foi encontrado.",
        emails: [],
        totalCount,
      });
    }

    res.status(200).json({
      emails,
      totalCount,
    });
  } catch (err) {
    next(err);
  }
};
