import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Login } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateLoginDto, UpdateLoginDto } from './dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private loginRepository: Repository<Login>
  ) {}

  /**
   *  로그인 정보 생성
   * --
   * @param loginInfo
   * @returns
   */
  async createLogin(loginInfo: CreateLoginDto) {
    try {
      const { login_id } = loginInfo;
      const check = await this.loginRepository.findOne({
        where: { login_id },
      });
      if (check) {
        throw EntityBadRequestException();
      }

      const login_duration = new Date();
      login_duration.setMinutes(login_duration.getMinutes() + 5);
      const test = await this.loginRepository.create({
        ...loginInfo,
        login_duration,
      });
      const result = await this.loginRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 전체 목록 조회
   * --
   * @returns
   */
  async getLoginList() {
    try {
      const result = await this.loginRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 상세 정보 조회
   * @param login_id
   * @returns
   */
  async getLoginInfo(login_id: string) {
    try {
      const user = await this.loginRepository.findOneOrFail({
        where: { login_id: login_id, login_status: false },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저별 로그인 정보 조회
   * --
   * @param user_id
   * @returns
   */
  async getUserLoginInfo(user_id: string) {
    try {
      const result = await this.loginRepository.find({
        where: { user_id: user_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 중복 로그인 요청 체크
   * --
   * @param user_id
   * @returns
   */
  async checkLogin(user_id: string) {
    try {
      const result = await this.loginRepository.findOne({
        where: { user_id, login_status: false },
        order: { created_at: 'DESC' },
      });
      if (!result) {
        return false;
      }
      const { login_status } = result;
      return !login_status;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 정보 수정
   * --
   * @param loginInfo
   * @returns
   */
  async updateLogin(loginInfo: UpdateLoginDto) {
    try {
      const { login_id, ...updateInfo } = loginInfo;

      const result = await this.loginRepository.update(
        { login_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 정보 삭제
   * --
   * @param login_id
   * @returns
   */
  async deleteLogin(login_id: string) {
    try {
      await this.loginRepository.findOneOrFail({ where: { login_id } });

      const result = await this.loginRepository.delete({ login_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
