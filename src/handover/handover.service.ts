import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Handover } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateHandoverDto, UpdateHandoverDto } from './dto';

@Injectable()
export class HandoverService {
  constructor(
    @InjectRepository(Handover) private handoverRepository: Repository<Handover>
  ) {}

  /**
   * 핸드오버 정보 생성
   * --
   * @param handoverInfo
   * @returns
   */
  async createHandover(handoverInfo: CreateHandoverDto) {
    try {
      const { handover_id } = handoverInfo;
      const check = await this.handoverRepository.findOne({
        where: { handover_id },
      });
      if (check) {
        throw EntityBadRequestException();
      }

      const test = await this.handoverRepository.create(handoverInfo);
      const result = await this.handoverRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 핸드오버 전체 목록 조회
   * --
   * @returns
   */
  async getHandoverList() {
    try {
      const result = await this.handoverRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 핸드오버 상세 정보 조회
   * @param handover_id
   * @returns
   */
  async getHandoverInfo(handover_id: string) {
    try {
      const handover = await this.handoverRepository.findOneOrFail({
        where: { handover_id },
      });
      return handover;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장비별 핸드오버 정보 조회
   * --
   * @param equipment_id
   * @returns
   */
  async getEquipmentHandoverInfo(equipment_id: string) {
    try {
      const result = await this.handoverRepository.find({
        where: { equipment_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저별 핸드오버 정보 조회
   * --
   * @param user_id
   * @returns
   */
  async getUserHandoverInfo(user_id: string) {
    try {
      const result = await this.handoverRepository.find({
        where: { user_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 핸드오버 정보 수정
   * --
   * @param handoverInfo
   */
  async updateHandover(handoverInfo: UpdateHandoverDto) {
    try {
      const { handover_id, ...updateInfo } = handoverInfo;

      const result = await this.handoverRepository.update(
        { handover_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 핸드오버 정보 삭제
   * --
   * @param handover_id
   * @returns
   */
  async deleteHandover(handover_id: string) {
    try {
      await this.handoverRepository.findOneOrFail({
        where: { handover_id },
      });
      const result = await this.handoverRepository.delete({ handover_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
