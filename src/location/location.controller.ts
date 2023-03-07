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
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post('/')
  async createLocation(
    @Res() res: Response,
    @Body() locationInfo: CreateLocationDto
  ) {
    try {
      const result = await this.locationService.createLocation(locationInfo);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: 'Success',
      });
    } catch (e) {
      console.log(e);
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failure',
      });
    }
  }

  @Get('/')
  async getLocationList(@Res() res: Response) {
    try {
      const result = await this.locationService.getLocationList();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: 'Success',
      });
    } catch (e) {
      console.log(e);
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failure',
      });
    }
  }

  @Get('/:location_id')
  async getLoginInfo(
    @Res() res: Response,
    @Param('location_id') location_id: string
  ) {
    try {
      const result = await this.locationService.getLocationInfo(location_id);
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
  async updateLocation(
    @Res() res: Response,
    @Body() locationInfo: UpdateLocationDto
  ) {
    try {
      const result = await this.locationService.updateLocation(locationInfo);
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

  @Delete('/:location_id')
  async deleteLocation(
    @Res() res: Response,
    @Param('location_id') location_id: string
  ) {
    try {
      const result = await this.locationService.deleteLocation(location_id);
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
