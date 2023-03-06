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
import { CreateTraceDto, UpdateTraceDto } from './dto';
import { TraceService } from './trace.service';

@Controller('trace')
export class TraceController {
  constructor(private traceService: TraceService) {}

  @Post('/')
  async createTrace(@Res() res: Response, @Body() traceInfo: CreateTraceDto) {
    try {
      const result = await this.traceService.createTrace(traceInfo);
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
  async getTraceList(@Res() res: Response) {
    try {
      const result = await this.traceService.getTraceList();
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

  @Get('/:trace_id')
  async getTraceInfo(
    @Res() res: Response,
    @Param('trace_id') trace_id: string
  ) {
    try {
      const result = await this.traceService.getTraceInfo(trace_id);
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

  @Get('location/:location_id')
  async getLocationTraceInfo(
    @Res() res: Response,
    @Param('location_id') location_id: string
  ) {
    try {
      const result = await this.traceService.getLocationTraceInfo(location_id);
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
  async getUserTraceInfo(
    @Res() res: Response,
    @Param('user_id') user_id: string
  ) {
    try {
      const result = await this.traceService.getUserTraceInfo(user_id);
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
  async getEquipmentTraceInfo(
    @Res() res: Response,
    @Param('equipment_id') equipment_id: string
  ) {
    try {
      const result = await this.traceService.getEquipmentTraceInfo(
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
  async updateTrace(@Res() res: Response, @Body() traceInfo: UpdateTraceDto) {
    try {
      const result = await this.traceService.updateTrace(traceInfo);
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

  @Delete('/:trace_id')
  async deleteTrace(@Res() res: Response, @Param('trace_id') trace_id: string) {
    try {
      const result = await this.traceService.deleteTrace(trace_id);
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
