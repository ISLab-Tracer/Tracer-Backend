import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Team } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto';

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
      const result = await this.teamRepository.save(teamInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 팀 전체 목록 조회
   * --
   * @returns
   */
  async getTeamList() {
    const result = await this.teamRepository.find();
    return result;
  }
}
