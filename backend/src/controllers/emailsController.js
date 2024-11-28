import Emails from "../models/Emails.js";

export const createEmails = async (req, res, next) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ message: "A lista de e-mails é obrigatória." });
    }

    if (!emails.every((email) => email.data)) {
      return res.status(400).json({
        message: "Todos os e-mails devem conter a propriedade 'data'.",
      });
    }

    const newEmails = await Emails.insertMany(emails);

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
