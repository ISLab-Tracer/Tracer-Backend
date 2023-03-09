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
import { CreateEquipmentDto, UpdateEquipmentDto } from './dto';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Post('/')
  async createEquipment(
    @Res() res: Response,
    @Body() equipmentInfo: CreateEquipmentDto
  ) {
    try {
      const result = await this.equipmentService.createEquipment(equipmentInfo);
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
  async getEquipmentList(@Res() res: Response) {
    try {
      const result = await this.equipmentService.getEquipmentList();
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

  @Get('/:equipment_id')
  async getEquipmentInfo(
    @Res() res: Response,
    @Param('equipment_id') equipment_id: string
  ) {
    try {
      const result = await this.equipmentService.getEquipmentInfo(equipment_id);
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

  @Get('category/:category_id')
  async getCategoryEquipmentInfo(
    @Res() res: Response,
    @Param('category_id') category_id: string
  ) {
    try {
      const result = await this.equipmentService.getCategoryEquipmentInfo(
        category_id
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

  @Get('project/:project_id')
  async getProjectEquipmentInfo(
    @Res() res: Response,
    @Param('project_id') project_id: string
  ) {
    try {
      const result = await this.equipmentService.getProjectEquipmentInfo(
        project_id
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
  async getUserEquipmentInfo(
    @Res() res: Response,
    @Param('user_id') user_id: string
  ) {
    try {
      const result = await this.equipmentService.getUserEquipmentInfo(user_id);
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
  async updateEquipment(
    @Res() res: Response,
    @Body() equipmentInfo: UpdateEquipmentDto
  ) {
    try {
      const result = await this.equipmentService.updateEquipment(equipmentInfo);
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

  @Delete('/:equipment_id')
  async deleteEquipment(
    @Res() res: Response,
    @Param('equipment_id') equipment_id: string
  ) {
    try {
      const result = await this.equipmentService.deleteEquipment(equipment_id);
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
