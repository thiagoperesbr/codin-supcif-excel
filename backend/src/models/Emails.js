import mongoose from "mongoose";

const EmailsSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: true,
    },
    origem: {
      type: String,
    },
    dataSolicitacao: {
      type: Date,
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
      type: String,
    },
    semanaReposta: {
      type: String,
    },
    acao: {
      type: String,
    },
    processoSei: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Emails", EmailsSchema);
