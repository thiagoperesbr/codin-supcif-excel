import Emails from "../models/Emails.js";
import dayjs from "dayjs";
import OpenAI from "openai";
import generatePrompt from "./generatePrompt.js";
import { savePDF } from "./pdfGenerator.js";

export const generateMonthlyReport = async () => {
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const startDate = dayjs().startOf("month");
    const endDate = dayjs().endOf("month");

    const currentData = await Emails.aggregate([
      {
        $match: {
          dataSolicitacao: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate(),
          },
        },
      },
      {
        $facet: {
          geral: [
            {
              $group: {
                _id: null,
                totalRecebidos: { $sum: 1 },
                totalRespondidos: {
                  $sum: {
                    $cond: [
                      {
                        $expr: {
                          $and: [
                            {
                              $gte: ["$dataResposta", startDate.toDate()],
                            },
                            { $lt: ["$dataResposta", endDate.toDate()] },
                          ],
                        },
                      },
                      1,
                      0,
                    ],
                  },
                },
                tempoMedio: { $avg: "$dias" },
              },
            },
          ],
          categorias: [
            { $group: { _id: "$solicitacao", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
          ],
          duvidas: [
            { $group: { _id: "$duvidaDetalhamento", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 5 },
          ],
          semanas: [
            {
              $group: { _id: "semanaSolicitacao", totalRecebidos: { $sum: 1 } },
            },
            { $sort: { _id: 1 } },
          ],
          respostasSemanais: [
            {
              $group: { _id: "semanaResposta", totalRespondidos: { $sum: 1 } },
            },
            { $sort: { _id: 1 } },
          ],
          empresas: [
            { $group: { _id: "$nomeEmpresa", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 5 },
          ],
          setores: [
            { $group: { _id: "$setor", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
          ],
          origens: [
            { $group: { _id: "$origem", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
          ],
          leis: [
            { $group: { _id: "$leiDecreto", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
          ],
          processoSei: [
            { $match: { processoSei: { $ne: "Não se aplica" } } },
            { $count: "totalProcessosSEI" },
          ],
        },
      },
    ]);

    const lastMonthStart = startDate.subtract(1, "month").startOf("month");
    const lastMonthEnd = startDate.subtract(1, "month").endOf("month");

    const lastMonthData = await Emails.aggregate([
      {
        $match: {
          dataSolicitacao: {
            $gte: lastMonthStart.toDate(),
            $lt: lastMonthEnd.toDate(),
          },
        },
      },
      {
        $facet: {
          geral: [{ $group: { _id: null, totalRecebidos: { $sum: 1 } } }],
        },
      },
    ]);

    if (!currentData.length) {
      return res
        .status(404)
        .json({ message: "Nenhum dado encontrado para o mês atual." });
    }

    const prompt = generatePrompt(
      currentData[0],
      lastMonthData[0] || { geral: [{ totalRecebidos: 0 }] },
      startDate,
      endDate
    );

    const completion = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              content:
                "Você é um Assessor que trabalha no setor de Concessão de Incentivos Fiscais. Estou aqui para te ajudar a gerar um relatório mensal de e-mails recebidos e respondidos pela sua equipe, de acordo com algumas métricas pré-definidas. Você precisa gerar um relatório com insights sobre o volume de e-mails recebidos, respondidos, tempo médio de resposta, taxa de crescimento, categorias, dúvidas mais recorrentes, setores mais envolvidos, empresas com maior frequência, origens dos e-mails e leis e decretos mais citados.",
            },
          ],
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const report = completion.choices[0].message.content;

    const year = startDate.year();
    const month = startDate.format("MM");

    await savePDF(report, year, month);

    console.log("Relatório gerado e salvo com sucesso!");
  } catch (err) {
    next(err);
  }
};
