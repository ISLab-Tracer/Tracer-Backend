import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entity/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    /**
     * 프로젝트 정보 생성
     * --
     * @param projectInfo 
     * @returns 
     */
    async createProject(projectInfo: CreateProjectDto) {
        try {
            const result = await this.projectRepository.save(projectInfo);
            return result;
        } catch (e) {
            throw e;
        }
    }

    /**
     * 과제 정보 조회
     * --
     * @returns 
     */
    async getProjectList() {
        try {
            const result = await this.projectRepository.find();
            return result;
        } catch (e) {
            throw e;
        }
    }

    /**
     * 과제 정보 수정
     * --
     * @param projectInfo 
     * @returns 
     */
    async updateProject(projectInfo: UpdateProjectDto) {
        try {
            const { project_id, ...updateInfo } = projectInfo;
            const result = await this.projectRepository.update({ project_id }, updateInfo);
            return result;
        } catch (e) {
            throw e;
        }
    }

    /**
     * 과제 정보 삭제
     * --
     * @param project_id 
     */
    async deleteProject(project_id: string) {
        try {
            await this.projectRepository.findOneOrFail({ where: { project_id } });
            const result = await this.projectRepository.delete({ project_id });

        } catch (e) {
            throw e;
        }
    }
}
