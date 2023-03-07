import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateProjectmemberDto, UpdateProjectmemberDto } from './dto';
import { ProjectMemberService } from './project_member.service';

@Controller('project-member')
export class ProjectMemberController {
    constructor(private projectmemberService: ProjectMemberService) {}

    @Post('/')
    async createProjectmember(@Res() res: Response, @Body() projectmemberInfo: CreateProjectmemberDto) {
    try {
        const result = await this.projectmemberService.creatProjectmember(projectmemberInfo);
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
    async getProjectmemberList(@Res() res: Response) {
    try {
        const result = await this.projectmemberService.getProjectmemberInfo();
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
    async updateProjectmember(@Res() res: Response, @Body() projectmemberInfo:UpdateProjectmemberDto) {
    try {
        const result = await this.projectmemberService.updateProjectmember(projectmemberInfo);
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

    @Delete('/:user_id/:project_id')
    async deleteProjectmember(@Res() res: Response, @Param('user_id') user_id:string, @Param('project_id') project_id:string) {
    try {
        const result = await this.projectmemberService.deleteProjectmember(
            user_id,
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
}
