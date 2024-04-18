import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send-email')
  async sendEmail() {
    try {
      await this.appService.sendEmail(
        'chandrasekaranbrte@gmail.com',
        'Nodemailer Test',
        'Test <button>Got it</button> Hello cr!',
      );
      return 'Email sent successfully';
    } catch (error) {
      return 'Failed to send email';
    }
  }
}
