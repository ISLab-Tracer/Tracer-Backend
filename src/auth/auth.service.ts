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

  async createSignup(signupInfo: CreateSignupDto) {
    try {
    } catch (e) {
      throw e;
    }
  }

  async createSignin(signinInfo: CreateSignInDto) {
    try {
    } catch (e) {
      throw e;
    }
  }
}
