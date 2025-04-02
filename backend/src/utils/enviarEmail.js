import { configEmail } from "./configEmail.js";

export async function enviarEmail() {
  try {
    const sentFrom = "incentivos@codin.rj.gov.br";
    const sendTo = "fabio@codin.rj.gov.br";
    const sendCopy = [
      "bmoreira@codin.rj.gov.br",
      "mgomes@codin.rj.gov.br",
      "rcoelho@codin.rj.gov.br",
      "mjardim@codin.rj.gov.br",
      "tperes@codin.rj.gov.br",
      "incentivos@codin.rj.gov.br",
    ];
    const subject = "Acompanhamento dos E-mails da SUPCIF";
    const message = `
          <html>
      <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px;">
        <table style="width: 100%; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; width: 100%;">
                <table style="min-width: 600px;">
                  <tbody>
                    <tr>
                      <td style="padding: 20px 0px 0px;">
                        <div style="text-align: center;">
                          <div style="padding-bottom: 20px;">
                            <img src="https://static.wixstatic.com/media/c74752_174ff3e0c0194b9fb358b8a9f45cb202~mv2.png/v1/fill/w_433,h_147,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20codin%205.png" alt="Codin - Rio" style="width: 160px;">
                          </div>
                        </div>
                        <div style="padding: 30px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(17,24,39); text-align: center;">
                            <h1 style="font-size: 22px">Acompanhamento de E-mails</h1>
                            <p style="font-size: 14px; margin-top: -10px">Diretoria de Incentivos Fiscais</p>
                            <p style="padding-top: 16px; font-size: 15px">
                              <span>Prezado Sr. <span style="font-weight: bold">Diretor-Presidente, Fabio Picanço,</span><br> Informo que o Painel de Acompanhamento de E-mails <br>da Diretoria de Incentivos Fiscais foi atualizado. <br>Para acessá-lo, por gentileza, clique no link abaixo:</span>
                            </p>
                            <p style="padding-top: 16px; font-size: 15px">
                              <span style="font-weight: bold">Painel de Acompanhamento de E-mails</span>
                              <br><br>
                              <a href="http://supcif-excel.codin.gov" style="text-decoration: none;">
                                <button style="background-color: #007BFF; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 20px;">
                                  ACESSAR
                                </button>
                              </a>
                            </p>
                            <p style="padding-top: 18px">Atenciosamente,<br>Assessoria de Tecnologia da Informação e <br>Diretoria de Incentivos Fiscais.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>`;

    configEmail(sentFrom, sendTo, sendCopy, subject, message);
  } catch (err) {
    console.log(err);
  }
}
