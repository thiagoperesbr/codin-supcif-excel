import mongoose from "mongoose";

const EmailsSchema = new mongoose.Schema(
  {
    origem: {
      type: String,
    },
    dataSolicitacao: {
      type: Date,
    },
    dia: {
      type: String,
    },
    semanaSolicitacao: {
      type: String,
    },
    solicitacao: {
      type: String,
    },
    duvida: {
      type: String,
    },
    duvidaDetalhamento: {
      type: String,
    },
    nomeEmpresa: {
      type: String,
    },
    cnpj: {
      type: String,
    },
    leiDecreto: {
      type: String,
    },
    setor: {
      type: String,
    },
    dataResposta: {
      type: Date,
    },
    dias: {
      type: Number,
    },
    semanaResposta: {
      type: String,
    },
    acao: {
      type: String,
    },
    processoSEI: {
      type: String,
    },
  },
  { timestamps: true }
);

EmailsSchema.index(
  {
    origem: 1,
    dataSolicitacao: 1,
    dia: 1,
    semanaSolicitacao: 1,
    solicitacao: 1,
    nomeEmpresa: 1,
    dataResposta: 1,
    dias: 1,
    semanaResposta: 1,
    acao: 1,
    processoSEI: 1,
  },
  { unique: true }
);

export default mongoose.model("Emails", EmailsSchema);
