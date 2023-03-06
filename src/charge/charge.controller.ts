import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ChargeService } from './charge.service';
import { CreateChargeDto, UpdateChargeDto } from './dto';

@Controller('charge')
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  @Post('/')
  async createCharge(
    @Res() res: Response,
    @Body() chargeInfo: CreateChargeDto
  ) {
    try {
      const result = await this.chargeService.createCharge(chargeInfo);
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

  @Get('/')
  async getChargeList(@Res() res: Response) {
    try {
      const result = await this.chargeService.getChargeList();
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

  @Get('/user/:user_id/equipment/:equipment_id')
  async getChargeInfo(
    @Res() res: Response,
    @Param() user_id: string,
    equipment_id: string
  ) {
    try {
      const result = await this.chargeService.getChargeInfo(
        user_id,
        equipment_id
      );
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

  @Get('user/:user_id')
  async getChargeUserInfo(
    @Res() res: Response,
    @Param('user_id') user_id: string
  ) {
    try {
      const result = await this.chargeService.getChargeUserInfo(user_id);
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

  @Get('equipment/:equipment_id')
  async getChargeProjectInfo(
    @Res() res: Response,
    @Param('equipment_id') equipment_id: string
  ) {
    try {
      const result = await this.chargeService.getChargeEquipmentInfo(
        equipment_id
      );
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

  @Put()
  async updateCharge(
    @Res() res: Response,
    @Body() chargeInfo: UpdateChargeDto
  ) {
    try {
      const result = await this.chargeService.updateCharge(chargeInfo);
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

  @Delete('/:user_id/:equipment_id')
  async deleteCharge(
    @Res() res: Response,
    @Param() user_id: string,
    equipment_id: string
  ) {
    try {
      const result = await this.chargeService.deleteCharge(
        user_id,
        equipment_id
      );
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
