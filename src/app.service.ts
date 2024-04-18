import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { LoggerService } from './shared/logger.service';

@Injectable()
export class AppService {

  private transporter;
  
  private logger = new LoggerService()
  private readonly tag = AppService.name
  
  getHello(): string {
    return 'Hello from root!';
  }

  //email using smtp
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD, 
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string){
    try {
      this.logger.log(this.tag, `ENTRY: ${to}, ${subject}, ${html}`)
      const mailOptions = {
        from: 'haristarsmail22@gmail.com',
        to,
        subject,
        html,
      };

      this.logger.log(this.tag, `MAIL-OPTIONS: ${JSON.stringify(mailOptions)}`)

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(this.tag,'EMAIL SENT: ' + info.response);
    } catch (error) {
      this.logger.error(this.tag,'ERROR SENDING MAIL ' + error);
    }
  }
}
