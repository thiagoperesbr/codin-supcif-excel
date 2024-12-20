import dayjs from "dayjs";

const generatePrompt = (currentData, lastMonthData, startDate, endDate) => {
  const geral = currentData.geral[0] || {};
  const lastMonthMetrics = lastMonthData.geral[0] || {};
  const growthRate = lastMonthMetrics.totalRecebidos
    ? ((geral.totalRecebidos - lastMonthMetrics.totalRecebidos) /
        lastMonthMetrics.totalRecebidos) *
      100
    : 0;

  const categorias = currentData.categorias
    .map((c) => `- ${c._id}: ${c.total}`)
    .join("\n");

  const duvidas = currentData.duvidas
    .map((d) => `- ${d._id} (${d.total})`)
    .join("\n");

  const setores = currentData.setores
    .map((s) => `- ${s._id}: ${s.total}`)
    .join("\n");

  const empresas = currentData.empresas
    .map((e) => `- ${e._id}: ${e.total}`)
    .join("\n");

  const origens = currentData.origens
    .map((o) => `- ${o._id}: ${o.total}`)
    .join("\n");

  const leis = currentData.leis.map((l) => `- ${l._id}: ${l.total}`).join("\n");

  return `Relatório Mensal de E-mails (${dayjs(startDate).format(
    "DD/MM/YYYY"
  )} a ${dayjs(endDate).format("DD/MM/YYYY")})

  **Resumo Geral**
  - Total de e-mails recebidos: ${geral.totalRecebidos || 0}.
  - Total de e-mails respondidos: ${geral.totalRespondidos || 0}.
  - Tempo médio de resposta: ${
    geral.tempoMedio ? geral.tempoMedio.toFixed(2) : "0"
  } dias.
  - Taxa de crescimento no volume de e-mails (comparado ao mês anterior): ${growthRate.toFixed(
    2
  )}%.
  
  **Classificação dos E-mails**
  Categorias:
  ${categorias}

  Dúvidas mais recorrentes:
  ${duvidas}

  **Setores Mais Envolvidos**
  ${setores}

  **Empresas com Maior Frequência**
  ${empresas}

  **Origens dos E-mails**
  ${origens}

  **Leis e Decretos mais Citados**
  ${leis}
    `;
};

export default generatePrompt;
