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
import { CreateHandoverDto, UpdateHandoverDto } from './dto';
import { HandoverService } from './handover.service';

@Controller('handover')
export class HandoverController {
  constructor(private handoverService: HandoverService) {}

  @Post('/')
  async createHandover(
    @Res() res: Response,
    @Body() handoverInfo: CreateHandoverDto
  ) {
    try {
      const result = await this.handoverService.createHandover(handoverInfo);
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
  async getHandoverList(@Res() res: Response) {
    try {
      const result = await this.handoverService.getHandoverList();
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

  @Get('/:handover_id')
  async getHandoverInfo(
    @Res() res: Response,
    @Param('handover_id') handover_id: string
  ) {
    try {
      const result = await this.handoverService.getHandoverInfo(handover_id);
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
  async getEquipmentHandoverInfo(
    @Res() res: Response,
    @Param('equipment_id') equipment_id: string
  ) {
    try {
      const result = await this.handoverService.getEquipmentHandoverInfo(
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
  async getUserHandoverInfo(
    @Res() res: Response,
    @Param('user_id') user_id: string
  ) {
    try {
      const result = await this.handoverService.getUserHandoverInfo(user_id);
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
  async updateHandover(
    @Res() res: Response,
    @Body() handoverInfo: UpdateHandoverDto
  ) {
    try {
      const result = await this.handoverService.updateHandover(handoverInfo);
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

  @Delete('/:handover_id')
  async deleteHandover(
    @Res() res: Response,
    @Param('handover_id') handover_id: string
  ) {
    try {
      const result = await this.handoverService.deleteHandover(handover_id);
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
