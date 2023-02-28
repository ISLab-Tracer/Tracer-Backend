import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  /**
   * 유저 정보 생성
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
        throw new Error('User Email is Invalid');
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
   * 유저 전체 목록 조회
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
   * 유저 정보 수정
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
   * 유저 정보 삭제
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
   * 유저 상세 정보 조회
   * @param user_id
   * @returns
   */
  async getUserInfo(user_id: string) {
    try {
      const user = await this.userRepository.find({
        where: { user_id: user_id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }
}
