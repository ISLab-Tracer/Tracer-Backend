import { VerificationService } from './verification.service';
import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post()
  async createVerification(@Res() res: Response) {
    try {
      const result = 1;
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
