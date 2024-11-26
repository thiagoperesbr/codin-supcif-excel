import nodemailer from "nodemailer";

export const configEmail = async (sentFrom, sendTo, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtps2.webmail.rj.gov.br",
    port: 465,
    secure: true,
    auth: {
      user: "tperes@codin.rj.gov.br",
      pass: "Deinf00",
    },
  });

  const mailOptions = {
    from: sentFrom,
    to: sendTo,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail", error);
    } else {
      console.log("E-mail enviado com sucesso", info.response);
    }
  });
};
