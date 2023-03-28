import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CommonService } from './common.service';

@UseGuards(JwtGuard)
@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get()
  async getCommonData(@Res() res: Response) {
    try {
      const result = await this.commonService.getCommonData();
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
