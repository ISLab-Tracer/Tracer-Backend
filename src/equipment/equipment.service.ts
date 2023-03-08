import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Equipment } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateEquipmentDto, UpdateEquipmentDto } from './dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>
  ) {}

  /**
   * 기자재 정보 생성
   * --
   * @param equipmentInfo
   * @returns
   */
  async createEquipment(equipmentInfo: CreateEquipmentDto) {
    try {
      const { equipment_id } = equipmentInfo;
      const check = await this.equipmentRepository.findOne({
        where: { equipment_id },
      });
      if (check) {
        throw EntityBadRequestException();
      }

      const test = await this.equipmentRepository.create(equipmentInfo);
      const result = await this.equipmentRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 기자재 전체 목록 조회
   * --
   * @returns
   */
  async getEquipmentList() {
    try {
      const result = await this.equipmentRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 기자재 상세 정보 조회
   * @param equipment_id
   * @returns
   */
  async getEquipmentInfo(equipment_id: string) {
    try {
      const equipment = await this.equipmentRepository.findOneOrFail({
        where: { equipment_id },
      });
      return equipment;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카테고리별 기자재 정보 조회
   * --
   * @param category_id
   * @returns
   */
  async getCategoryEquipmentInfo(category_id: string) {
    try {
      const result = await this.equipmentRepository.find({
        where: { category_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 프로젝트별 기자재 정보 조회
   * --
   * @param project_id
   * @returns
   */
  async getProjectEquipmentInfo(project_id: string) {
    try {
      const result = await this.equipmentRepository.find({
        where: { project_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저별 기자재 정보 조회
   * --
   * @param user_id
   * @returns
   */
  async getUserEquipmentInfo(user_id: string) {
    try {
      const result = await this.equipmentRepository.find({
        where: { user_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 기자재 정보 수정
   * --
   * @param equipmentInfo
   */
  async updateEquipment(equipmentInfo: UpdateEquipmentDto) {
    try {
      const { equipment_id, ...updateInfo } = equipmentInfo;
      const result = await this.equipmentRepository.update(
        { equipment_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 기자재 정보 삭제
   * --
   * @param equipment_id
   * @returns
   */
  async deleteEquipment(equipment_id: string) {
    try {
      await this.equipmentRepository.findOneOrFail({ where: { equipment_id } });
      const result = await this.equipmentRepository.delete({ equipment_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
