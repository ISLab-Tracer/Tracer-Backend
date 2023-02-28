import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  Put,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/')
  async createUser(@Res() res: Response, @Body() userInfo: CreateUserDto) {
    try {
      const result = await this.userService.createUser(userInfo);
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
  async getUserList(@Res() res: Response) {
    try {
      const result = await this.userService.getUserList();
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

  // 팀별 유저 정보 조회
  @Get('team/:team_id')
  async getUserTeamInfo(@Res() res: Response, @Param('team_id') team_id: string) {
    try {
      const result = await this.userService.getUserTeamInfo(team_id)
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
  async updateUser(@Res() res: Response, @Body() userInfo: UpdateUserDto) {
    try {
      const result = await this.userService.updateUser(userInfo);
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

  @Delete('/:user_id')
  async deleteUser(@Res() res: Response, @Param('user_id') user_id: string) {
    try {
      const result = await this.userService.deleteUser(user_id);
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
