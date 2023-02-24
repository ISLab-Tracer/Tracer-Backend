import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/')
  async createAdmin(@Res() res: Response, @Body() adminInfo: CreateAdminDTO) {
    try {
      const result = await this.adminService.createAdmin(adminInfo);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: 'Success',
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failure',
      });
    }
  }

  @Get('/')
  async getAdminlist(@Res() res: Response) {
    try {
      const result = await this.adminService.getAdminList();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: 'Success',
      });
    } catch (error) {
      // 400 -> Client Fault
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failure',
      });
    }
  }
}
