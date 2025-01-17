import nodemailer from "nodemailer";

export const configEmail = async (
  sentFrom,
  sendTo,
  sendCopy,
  subject,
  message
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: sentFrom,
    to: sendTo,
    cc: sendCopy,
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
