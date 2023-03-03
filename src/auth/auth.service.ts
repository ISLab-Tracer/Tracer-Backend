import { CreateSignInDto } from './dto/create-signin.dto';
import { CreateSignupDto } from './dto/create-signup.dto';
import { VerificationService } from './../verification/verification.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly verificationService: VerificationService
  ) {}

  /**
   * 회원가입 이메일 인증
   * --
   * @param signupInfo
   */
  async createSignup(signupInfo: CreateSignupDto) {
    try {
      const { user_email, user_nm } = signupInfo;
      const check = await this.userService.checkEmail(user_email);
      if (check) {
        throw new Error('이미 가입된 이메일입니다.');
      }
      const signup = await this.userService.createTempUser(signupInfo);

      if (!signup) {
        throw new Error('이메일 정보가 올바르지 않습니다.');
      }

      const result = await this.verificationService.signup(user_email, user_nm);

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 이메일 인증
   * --
   * @param signinInfo
   */
  async createSignin(signinInfo: CreateSignInDto) {
    try {
    } catch (e) {
      throw e;
    }
  }
}
