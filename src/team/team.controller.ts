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
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('/')
  async createTeam(@Res() res: Response, @Body() teamInfo: CreateTeamDto) {
    try {
      const result = await this.teamService.createTeam(teamInfo);
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
  async getTeamList(@Res() res: Response) {
    try {
      const result = await this.teamService.getTeamList();
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

  @Get('/:team_id')
  async getTraceInfo(@Res() res: Response, @Param('team_id') team_id: string) {
    try {
      const result = await this.teamService.getTeamInfo(team_id);
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
  async updateTeam(@Res() res: Response, @Body() teamInfo: UpdateTeamDto) {
    try {
      const result = await this.teamService.updateTeam(teamInfo);
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

  @Delete('/:team_id')
  async deleteTeam(@Res() res: Response, @Param('team_id') team_id: string) {
    try {
      const result = await this.teamService.deleteTeam(team_id);
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
