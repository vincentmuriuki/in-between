import sgmail from "@sendgrid/mail";
import ejs from "ejs";
import config from "../config";
import logger from "../utils/winston";

sgmail.setApiKey(config.SENDGRID_API_KEY);

/**
 * Mailing services class
 */
export default class Mailer {
  /**
   * @param {object} data
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * @param {object} mailOptionsObject - details to be sent
   * @return {object} status - of the sent mail
   */
  async sendEmail(mailOptionsObject) {
    let msg;
    ejs.renderFile(
      `${__dirname}/../../public/templates/emails/${mailOptionsObject.htmlPath}`,
      mailOptionsObject.data,
      {},
      (err, html) => {
        if (err) {
          logger.error(err);
        } else {
          msg = {
            to: mailOptionsObject.toAddress,
            from: "no-reply@barefoot.com",
            subject: mailOptionsObject.subject,
            html,
            mail_settings: {
              sandbox_mode: {
                enable: config.env !== "production",
              },
            },
          };
        }
      }
    );
    const status = await sgmail.send(msg);
    return status;
  }

  /**
   * Send verification email
   * @return {null} nothing
   */
  async sendResetPassword() {
    await this.sendEmail({
      toAddress: this.data.to,
      subject: "Reset Password",
      data: {
        name: this.data.name,
        message: "reset your password",
        link: `${this.data.host}/auth/reset-password?token_reset=${this.data.token}`,
      },
      htmlPath: "resetPassword.ejs",
    });
  }

  /**
   * Send reset success email
   * @return {null} nothing
   */
  async sendResetSuccess() {
    await this.sendEmail({
      toAddress: this.data.to,
      subject: "Reset password",
      data: {
        name: this.data.name,
      },
      htmlPath: "resetPasswordSuccess.ejs",
    });
  }

  /**
   * Send verification email
   * @param {string} name - name of the receiver
   * @param {string} hostUrl - the host url
   * @param {string} to - email of the receiver
   * @param {string} token - token to verify the email
   * @return {null} nothing
   */
  async sendVerificationEmail() {
    const { to, host, name, token } = this.data;
    await this.sendEmail({
      toAddress: to,
      subject: "Email Verification",
      data: {
        name,
        message: "Verify your email using the link below.",
        link: `${host}/api/v1/auth/verification?token=${token}`,
        regenerateLink: `${host}/api/v1/auth/reverifyUser?email=${to}`,
      },
      htmlPath: "emailVerification.ejs",
    });
    console.log("Email sent");
  }
}
