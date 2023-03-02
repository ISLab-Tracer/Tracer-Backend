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
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  // 과제 정보 등록
  @Post('/')
  async creaeteProject(
    @Res() res: Response,
    @Body() projectInfo: CreateProjectDto
  ) {
    try {
      const result = await this.projectService.createProject(projectInfo);
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

  // 과제 정보 조회
  @Get('/')
  async getProjectList(@Res() res: Response) {
    try {
      const result = await this.projectService.getProjectList();
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

  //과제 정보 수정
  @Put()
  async updateProject(
    @Res() res: Response,
    @Body() projectInfo: UpdateProjectDto
  ) {
    try {
      const result = await this.projectService.updateProject(projectInfo);
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

  //과제 정보 삭제
  @Delete('/:project_id')
  async deleteProject(
    @Res() res: Response,
    @Param('project_id') project_id: string
  ) {
    try {
      const result = await this.projectService.deleteProject(project_id);
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
