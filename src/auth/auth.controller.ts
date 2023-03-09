import { RequestSigninDto } from './dto/request-signin.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { CreateSignInDto } from './dto/create-signin.dto';
import { CreateSignupDto } from './dto/create-signup.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
} from '@nestjs/common';

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

  @Get('/u/:signup_id')
  async getSignup(@Res() res: Response, @Param('signup_id') signup_id: string) {
    try {
      const result = await this.authService.getSignup(signup_id);
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

  @Get('/i/:signin_id')
  async getSignin(@Res() res: Response, @Param('signin_id') signin_id: string) {
    try {
      const result = await this.authService.getSignin(signin_id);
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

  @Post('signup')
  async requestSignup(@Res() res: Response, @Body() userInfo: CreateUserDto) {
    try {
      const result = await this.authService.requestSignup(userInfo);
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

  @Post('signin')
  async requestSignin(@Res() res: Response, @Body() signin: RequestSigninDto) {
    try {
      const result = await this.authService.requestSignin(signin);
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
}
