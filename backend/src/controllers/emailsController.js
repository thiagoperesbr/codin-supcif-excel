import Emails from "../models/Emails.js";
import dayjs from "dayjs";

export const createEmails = async (req, res, next) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ message: "A lista de e-mails é obrigatória." });
    }

    const emailsWithFormattedFields = emails.map((email) => ({
      origem: email["Origem"] || "",
      dataSolicitacao: email["Data da solicitação"]
        ? dayjs(email["Data da solicitação"]).startOf("day").toDate()
        : null,
      dia: email["Dia"] || "",
      semanaSolicitacao: email["Semana da Solicitação"] || "",
      solicitacao: email["Solicitação"] || "",
      duvida: email["Dúvida"] || "",
      duvidaDetalhamento: email["Dúvidas - Detalhamento"] || "",
      nomeEmpresa: email["Nome da empresa"] || "",
      cnpj: email["CNPJ"] || "",
      leiDecreto: email["Lei/Decreto"] || "",
      setor: email["Setor"] || "",
      dataResposta: email["Data da resposta"]
        ? dayjs(email["Data da resposta"]).startOf("day").toDate()
        : null,
      dias: email["Dias"] || null,
      semanaResposta: email["Semana da Resposta"] || "",
      acao: email["Ação"] || "",
      processoSEI: email["Processo SEI"] || "",
    }));

    try {
      const newEmails = await Emails.insertMany(emailsWithFormattedFields, {
        ordered: false,
      });

      res.status(201).json({
        message: "E-mails salvos com sucesso.",
        emails: newEmails,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: "Alguns e-maisls já existem no banco de dados",
          error: err.writeErrors,
        });
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

export const getEmails = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const pageIndex = page ? parseInt(page, 10) : 0;
    const perPage = limit ? parseInt(limit, 10) : 25;

    const totalCount = await Emails.countDocuments();

    const emails = await Emails.find()
      .sort({ _id: 1 })
      .skip(pageIndex * perPage)
      .limit(perPage);

    if (totalCount === 0) {
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

export const getLatestEmails = async (req, res, next) => {
  try {
    const { semanaResposta } = req.query;

    const query = semanaResposta
      ? { semanaResposta: new RegExp(`^${semanaResposta}$`, "i") }
      : {};

    const totalEmailsCount = await Emails.countDocuments(query);

    const countsBySolicitacao = await Emails.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$solicitacao",
          count: { $sum: 1 },
        },
      },
    ]);

    const emails = await Emails.find(query).sort({ _id: -1 }).limit(10);

    const reversedEmails = emails.reverse();

    const countPedidoAberturaProcesso =
      countsBySolicitacao.find(
        (item) => item._id === "Pedido de Abertura de processo"
      )?.count || 0;

    const countPedidoTacito =
      countsBySolicitacao.find((item) => item._id === "Pedido Tácito")?.count ||
      0;

    if (totalEmailsCount === 0) {
      return res.status(400).json({
        message: "Nenhum email foi encontrado.",
      });
    }

    res.status(200).json({
      emails: reversedEmails,
      totalCount: totalEmailsCount,
      countPedidoAberturaProcesso,
      countPedidoTacito,
    });
  } catch (err) {
    next(err);
  }
};

export const getEmailById = async (req, res, next) => {
  try {
    const email = await Emails.findById(req.params.id);

    res.status(200).json({
      email,
    });
  } catch (err) {
    next(err);
  }
};
