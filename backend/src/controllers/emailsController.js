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
          message: "Alguns e-mails já existem no banco de dados",
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
  console.log("Iniciando...");

  try {
    const { page, limit, cnpj, tipo, dataSolicitacao, dataResposta } =
      req.query;

    const pageInt = parseInt(page, 10) || 1;
    const limitInt = Math.min(parseInt(limit, 10) || 25);

    const filter = {};

    if (cnpj) filter.cnpj = cnpj;

    if (tipo && tipo !== "all") {
      filter.solicitacao = new RegExp(tipo, "i");
    }

    if (dataSolicitacao) {
      if (dayjs(dataSolicitacao).isValid()) {
        filter.dataSolicitacao = dayjs(dataSolicitacao).startOf("day").toDate();
      }
    }

    if (dataResposta) {
      if (dayjs(dataResposta).isValid()) {
        filter.dataResposta = dayjs(dataResposta).startOf("day").toDate();
      }
    }

    const totalCount = await Emails.countDocuments(filter);

    if (totalCount === 0) {
      return res.status(400).json({
        message: "Nenhum email foi encontrado com os filtros fornecidos.",
        emails: [],
        totalCount: 0,
      });
    }

    const emails = await Emails.find(filter)
      .sort({ _id: 1 })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);

    res.status(200).json({
      emails,
      totalCount,
      currentPage: pageInt,
      totalPages: Math.ceil(totalCount / limitInt),
    });
  } catch (err) {
    next(err);
  }
};

export const getLatestEmails = async (req, res, next) => {
  try {
    const { semanaResposta } = req.query;

    const filter = semanaResposta
      ? { semanaResposta: new RegExp(`^${semanaResposta}$`, "i") }
      : {};

    const totalEmailsCount = await Emails.countDocuments(filter);

    if (totalEmailsCount === 0) {
      return res.status(400).json({
        message: "Nenhum e-mail foi encontrado.",
      });
    }

    const countsBySolicitacao = await Emails.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$solicitacao",
          count: { $sum: 1 },
        },
      },
    ]);

    const emails = await Emails.find(filter).sort({ _id: -1 }).limit(10);

    const countPedidoAberturaProcesso =
      countsBySolicitacao.find(
        (item) => item._id === "Pedido de Abertura de processo"
      )?.count || 0;

    const countPedidoTacito =
      countsBySolicitacao.find((item) => item._id === "Pedido Tácito")?.count ||
      0;

    res.status(200).json({
      emails: emails.reverse(),
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
    const { id } = req.params;

    const email = await Emails.findById(id);

    if (!email) {
      return res.status(404).json({
        message: "E-mail não encontrado.",
      });
    }

    res.status(200).json({
      email,
    });
  } catch (err) {
    next(err);
  }
};

export const getMonthlyTotals = async (req, res, next) => {
  try {
    const emailTotals = await Emails.aggregate([
      {
        $group: {
          _id: { $month: "$dataResposta" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const result = emailTotals.map((item) => ({
      month: months[item._id - 1],
      total: item.total,
    }));

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
