import { CreateSignInDto } from './dto/create-signin.dto';
import { CreateSignupDto } from './dto/create-signup.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { VerificationService } from './../verification/verification.service';
import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/send/signup')
  async createSignup(
    @Res() res: Response,
    @Body() signupInfo: CreateSignupDto
  ) {
    try {
      const result = await this.authService.createSignup(signupInfo);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Post('/send/signin')
  async createSignin(
    @Res() res: Response,
    @Body() signinInfo: CreateSignInDto
  ) {
    try {
      const result = await this.authService.createSignin(signinInfo);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: true,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
