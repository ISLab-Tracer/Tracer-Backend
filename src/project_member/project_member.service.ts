import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectMember } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateProjectmemberDto, UpdateProjectmemberDto } from './dto';

@Injectable()
export class ProjectMemberService {
    constructor(
        @InjectRepository(ProjectMember)
        private projectmemberRepository: Repository<ProjectMember>
    ) {}
    
    /**
     * 과제별 멤버 등록
     * --
     * @param ProjectmemberInfo
     */
    async creatProjectmember(ProjectmemberInfo: CreateProjectmemberDto) {
    try {
        const result = await this.projectmemberRepository.save(ProjectmemberInfo);
        return result;
    } catch (e) {
    throw e;
    }
    }

    /**
     * 과제별 멤버 정보 전체 조회
     * --
     * @returns 
     */
    async getProjectmemberInfo() {
    try {
        const result = await this.projectmemberRepository.find();
        return result;
    } catch (e) {
    throw e;
    }
    }

    /**
     * 과제별 멤버 정보 수정
     * --
     * @param projectmemberInfo 
     */
    async updateProjectmember(projectmemberInfo: UpdateProjectmemberDto) {
    try {
        const{user_id, project_id, ...updateInfo} = projectmemberInfo;
        const result = await this.projectmemberRepository.update(
            { user_id, project_id },
            updateInfo
        );
    } catch (e) {
    throw e;
    }
    }

    /**
     * 과제별 멤버 정보 삭제
     * --
     * @param user_id 
     * @param project_id 
     * @returns 
     */
    async deleteProjectmember(user_id: string, project_id: string) {
    try {
        const projectmember = await this.projectmemberRepository.findOneOrFail({
            where: { user_id, project_id },
        });
        const result = await this.projectmemberRepository.delete(projectmember);
        return result;
    } catch (e) {
    throw e;
    }
    }
}
