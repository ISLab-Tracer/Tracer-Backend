import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uploadFileURL } from 'src/config/multer.options';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Equipment } from 'src/entity';
import { DataSource, Repository } from 'typeorm';
import { CreateEquipmentDto, UpdateEquipmentDto } from './dto';
import * as fs from 'fs';
import { TeamService } from 'src/team/team.service';
import { ChargeService } from 'src/charge/charge.service';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    private teamService: TeamService,
    private chargeService: ChargeService,
    private dataSource: DataSource
  ) {}

  /**
   * 기자재 정보 생성
   * --
   * @param equipmentInfo
   * @returns
   */
  async createEquipment(
    equipmentInfo: CreateEquipmentDto,
    file: Express.Multer.File
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (equipmentInfo.equipment_id) {
        const { equipment_id } = equipmentInfo;
        const check = await this.equipmentRepository.findOne({
          where: { equipment_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }

      const equipInfo = this.equipmentRepository.create(equipmentInfo);
      let result = await queryRunner.manager.save(equipInfo);

      // const result = await this.equipmentRepository.save(test);
      const { equipment_id } = result;

      const f = this.uploadFile(file, equipment_id);

      if (f) {
        const equipFileInfo = this.equipmentRepository.create({
          ...result,
          equipment_thumbnail: f,
        });
        result = await queryRunner.manager.save(equipFileInfo);
      }

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 기자재 전체 목록 조회
   * --
   * @returns
   */
  async getEquipmentList() {
    try {
      const equipList = await this.equipmentRepository.find({
        relations: ['category', 'user', 'project'],
        order: { created_at: 'DESC' },
      });

      const resultPromise = equipList.map(async (item) => {
        const {
          user: { team_id },
        } = item;
        const team = await this.teamService.getTeamInfo(team_id);
        return { ...item, team };
      });

      const result = await Promise.all(resultPromise);

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
        relations: ['category', 'user', 'project'],
      });

      const {
        user: { team_id },
      } = equipment;

      const team = await this.teamService.getTeamInfo(team_id);

      const charge = await this.chargeService.getChargeEquipmentInfo(
        equipment_id
      );

      return { ...equipment, team, charge };
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

  /**
   * 파일 업로드
   * --
   * @param file
   * @param equipment_id
   * @returns
   */
  uploadFile(file: Express.Multer.File, equipment_id: string) {
    try {
      const uploadFilePath = `uploads/equipment`;

      //파일 이름
      const fileName = `${equipment_id}.png`;
      //파일 업로드 경로
      const uploadPath =
        __dirname + `/../../${uploadFilePath + '/' + fileName}`;

      //파일 생성
      fs.writeFileSync(uploadPath, file.buffer); // file.path 임시 파일 저장소

      return uploadFileURL(uploadFilePath + '/' + fileName);
    } catch (e) {
      throw e;
    }
  }
}
