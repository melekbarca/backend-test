import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
import { MailOptions } from "nodemailer/lib/json-transport";
@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'SMTP',
            auth: {
                user: process.env.WEBSITE_USER,
                pass: process.env.WEBSITE_PASS,
            },
        });
    }
    async sendMail(to: string, subject: string, content: string): Promise<void> {
        const mailOptions= {
          from: process.env.WEBSITE_MAIL,
          to,
          subject,
          text: content,
        };
    
        await this.transporter.sendMail(mailOptions);
      }
}