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
        from: process.env.EMAIL_AUTH_ADDRESS,
        subject,
        template: `${templateName}`,
        context,
      });
      const { accepted } = result;
      if (accepted.length === 0) {
        throw new Error('이메일 전송에 실패했습니다.');
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async signin(to: string, login: string) {
    try {
      const signin_url = `${process.env.FRONTEND_URL}/login/${login}`;
      const result = await this._send(
        [to],
        'ISLab Tracer 로그인',
        'signin.ejs',
        {
          signin_url,
        }
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  async signup(to: string, name: string, signup_id: string) {
    try {
      const signup_url = `${process.env.FRONTEND_URL}/register/${signup_id}`;

      const result = await this._send(
        [to],
        'ISLab Tracer 회원가입',
        'signup.ejs',
        {
          email: to,
          name,
          signup_url,
        }
      );
      return result;
    } catch (e) {
      throw e;
    }
  }
}
