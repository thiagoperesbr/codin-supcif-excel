import { configEmail } from "./configEmail.js";

export async function enviarEmail() {
  const dataAtual = new Date();

  try {
    const sentFrom = "tperes@codin.rj.gov.br";
    const sendTo = "tperes@codin.rj.gov.br";
    const subject = `Acompanhamento dos E-mails da SUPCIF - ${dataAtual}`;
    const message = `
          <html>
            <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px;">
              <table style="width: 100%; background-color: rgb(239, 239, 239);">
                <tbody>
                    <tr>
                      <td align="center" style="padding: 1rem 2rem; width: 100%;">
                        <table style="max-width: 600px;">
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
                                    <h1 style="font-size: 22px; margin-bottom: 20px">ACOMPANHAMENTO DE E-MAILS DA SUPCIF</h1>
                                    <p style="padding-top: 16px">
                                      <span style="font-weight: bold">Para abrir o Painel de Acompanhamento de E-mails, clicar no link abaixo</span><br>
                                      <span>"http://codin-supcif-excel.codin.gov/"</span>
                                    </p>
                                    <p style="padding-top: 18px">Atenciosamente,<br>Assessoria de Tecnologia da Informação.</p>
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

    configEmail(sentFrom, sendTo, subject, message);
  } catch (err) {
    console.log(err);
  }
}
