import { CreateSignInDto } from './dto/create-signin.dto';
import { CreateSignupDto } from './dto/create-signup.dto';
import { VerificationService } from './../verification/verification.service';
import { UserService } from './../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly verificationService: VerificationService
  ) {}

  /**
   * 회원가입 이메일 인증
   * --
   * @param signupInfo
   */
  async createSignup(signupInfo: CreateSignupDto) {
    try {
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
