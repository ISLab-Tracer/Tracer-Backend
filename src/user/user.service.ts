import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { EntityBadRequestException } from 'src/config/service.exception';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateSignupDto } from './../auth/dto/create-signup.dto';
import { USER_RANK } from './../entity/user.entity';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  /**
   * 회원 정보 생성
   * --
   * @param userInfo
   * @returns
   */
  async createUser(userInfo: CreateUserDto) {
    try {
      const { user_email, user_password } = userInfo;
      const check = await this.userRepository.findOne({
        where: { user_email: user_email },
      });

      if (check) {
        EntityBadRequestException();
      }

      const hash = await argon.hash(user_password);

      const result = await this.userRepository.save({
        ...userInfo,
        user_password: hash,
      });

      delete result.user_password;
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 임시 생성
   * --
   * @param userInfo
   * @returns
   */
  async createTempUser(userInfo: CreateSignupDto) {
    try {
      const result = await this.userRepository.save({
        ...userInfo,
        user_usage: false,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 전체 목록 조회
   * --
   * @returns
   */
  async getUserList() {
    try {
      const result = await this.userRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 팀별 회원 정보 조회
   * --
   * @param team_id
   * @returns
   */
  async getUserTeamInfo(team_id: string) {
    try {
      const result = await this.userRepository.find({ where: { team_id } });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 수정
   * --
   * @param userInfo
   */
  async updateUser(userInfo: UpdateUserDto) {
    try {
      const { user_id, ...updateInfo } = userInfo;
      if (updateInfo.user_password) {
        updateInfo.user_password = await argon.hash(updateInfo.user_password);
      }

      const result = await this.userRepository.update({ user_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 삭제
   * --
   * @param user_id
   * @returns
   */
  async deleteUser(user_id: string) {
    try {
      await this.userRepository.findOneOrFail({ where: { user_id } });

      const result = await this.userRepository.update(
        { user_id },
        { user_usage: false }
      );

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 상세 정보 조회
   * @param user_id
   * @returns
   */
  async getUserInfo(user_id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { user_id: user_id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 비밀번호 확인 및 수정
   * --
   * @param userInfo
   */
  async updateUserPassword(userInfo: ChangePasswordDto) {
    try {
      const { user_id, ...updateInfo } = userInfo;
      const targeUser = await this.userRepository.findOneOrFail({
        where: { user_id },
      });
      if (
        await argon.verify(
          targeUser.user_password,
          updateInfo.user_pre_password
        )
      ) {
        const newPassword = await argon.hash(updateInfo.user_new_password);
        const result = await this.userRepository.update(
          { user_id },
          { user_password: newPassword }
        );
        return result;
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  // Utils
  /**
   * 회원 이메일 체크
   * --
   * @param user_email
   * @returns
   */
  async checkEmail(user_email: string): Promise<User | boolean> {
    try {
      const result = await this.userRepository.findOne({
        where: { user_email },
      });
      if (result) {
        return result;
      }

      return false;
    } catch (e) {
      throw e;
    }
  }

  getUserRank(user_divide: USER_RANK) {
    switch (user_divide) {
      case USER_RANK.ASSISTANT:
        return '주임 연구원';
      case USER_RANK.RESEARCH:
        return '선임 연구원';
      case USER_RANK.SENIOR:
        return '책임 연구원';
      case USER_RANK.PRINCIPAL:
        return '수석 연구원';
      case USER_RANK.PHD:
        return '박사(과정)';
      case USER_RANK.ETC:
        return '';
      case USER_RANK.MASTER:
      default:
        return '석사(과정)';
    }
  }
}
