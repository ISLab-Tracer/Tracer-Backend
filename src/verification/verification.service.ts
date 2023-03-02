import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  constructor(private readonly mailerService: MailerService) {}

  async _send(
    tos: string[],
    subject: string,
    templateName: string,
    context: any = {}
  ): Promise<boolean> {
    try {
      const result = await this.mailerService.sendMail({
        to: tos.join(', '),
        subject,
        template: `${templateName}`,
        context,
      });

      console.log(result);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async signin(to: string) {
    await this._send([to], '로그인 시도', 'signin.ejs', {
      email: to,
      datetime: new Date(),
    });
  }

  async signup(to: string) {
    await this._send([to], '회원가입 완료', 'signup.ejs', {
      email: to,
    });
  }
}
