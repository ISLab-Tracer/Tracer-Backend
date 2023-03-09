import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Team } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}

  /**
   * 팀 정보 생성
   * --
   * @param teamInfo
   * @returns
   */
  async createTeam(teamInfo: CreateTeamDto) {
    try {
      const { team_id } = teamInfo;
      if (team_id) {
        const check = await this.teamRepository.findOne({
          where: { team_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }

      const result = await this.teamRepository.save(teamInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 팀 전체 목록 조회
   * --
   * @returns
   */
  async getTeamList() {
    try {
      const result = await this.teamRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 팀 상세 정보 조회
   * @param team_id
   * @returns
   */
  async getTeamInfo(team_id: string) {
    try {
      const trace = await this.teamRepository.findOneOrFail({
        where: { team_id },
      });
      return trace;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 팀 정보 수정
   * --
   * @param teamInfo
   * @returns
   */
  async updateTeam(teamInfo: UpdateTeamDto) {
    try {
      const { team_id, ...updateInfo } = teamInfo;

      const result = await this.teamRepository.update({ team_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 팀 정보 삭제
   * --
   * @param team_id
   * @returns
   */
  async deleteTeam(team_id: string) {
    try {
      await this.teamRepository.findOneOrFail({ where: { team_id } });

      const result = await this.teamRepository.delete({ team_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
