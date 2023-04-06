import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Charge } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateChargeDto, UpdateChargeDto } from './dto';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private chargeRepository: Repository<Charge>
  ) {}

  /**
   * 책임자 정보 생성
   * --
   * @param chargeInfo
   * @returns
   */
  async createCharge(chargeInfo: CreateChargeDto) {
    try {
      const { user_id, equipment_id } = chargeInfo;
      if (user_id && equipment_id) {
        const check = await this.chargeRepository.findOne({
          where: { user_id, equipment_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }

      const test = await this.chargeRepository.create(chargeInfo);
      const result = await this.chargeRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 책임자 전체 목록 조회
   * --
   * @returns
   */
  async getChargeList() {
    try {
      const result = await this.chargeRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 책임자 상세 정보 조회
   * @param user_id
   * @param equipment_id
   * @returns
   */
  async getChargeInfo(user_id: string, equipment_id: string) {
    try {
      const result = await this.chargeRepository.find({
        where: { user_id, equipment_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저별 책임자 정보 조회
   * --
   * @param user_id
   * @returns
   */
  async getChargeUserInfo(user_id: string) {
    try {
      const result = await this.chargeRepository.find({
        where: { user_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 기자재별 책임자 정보 조회
   * --
   * @param equipment_id
   * @returns
   */
  async getChargeEquipmentInfo(equipment_id: string) {
    try {
      const result = await this.chargeRepository.find({
        where: { equipment_id },
        relations: ['user'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 책임자 정보 수정
   * --
   * @param chargeInfo
   */
  async updateCharge(chargeInfo: UpdateChargeDto) {
    try {
      const { user_id, equipment_id, ...updateInfo } = chargeInfo;
      const result = await this.chargeRepository.update(
        { user_id, equipment_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 책임자 정보 삭제
   * --
   * @param user_id
   * @param equipment_id
   * @returns
   */
  async deleteCharge(user_id: string, equipment_id: string) {
    try {
      const charge = await this.chargeRepository.findOneOrFail({
        where: { user_id, equipment_id },
      });
      const result = await this.chargeRepository.delete(charge);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
