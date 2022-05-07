import { MailAdapter, sendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e96813884ec19a",
    pass: "8005d41d44de37"
  }
});

export class NodeMailAdapter implements MailAdapter {
  async sendMail ({subject, body}: sendMailData) {
    await transport.sendMail({
    from: 'Equipe feedget <oi@feedget.com>',
    to: 'Arlison Macedo <a7xdev@gmail.com>',
    subject,
    html: body
  })
  };
}