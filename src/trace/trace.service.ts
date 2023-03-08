import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Trace } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateTraceDto, UpdateTraceDto } from './dto';

@Injectable()
export class TraceService {
  constructor(
    @InjectRepository(Trace)
    private traceRepository: Repository<Trace>
  ) {}

  /**
   * 거래 정보 생성
   * --
   * @param traceInfo
   * @returns
   */
  async createTrace(traceInfo: CreateTraceDto) {
    try {
      const { trace_id } = traceInfo;
      const check = await this.traceRepository.findOne({
        where: { trace_id },
      });
      if (check) {
        throw EntityBadRequestException();
      }

      const test = await this.traceRepository.create(traceInfo);
      const result = await this.traceRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 거래 전체 목록 조회
   * --
   * @returns
   */
  async getTraceList() {
    try {
      const result = await this.traceRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 거래 상세 정보 조회
   * @param trace_id
   * @returns
   */
  async getTraceInfo(trace_id: string) {
    try {
      const trace = await this.traceRepository.findOneOrFail({
        where: { trace_id },
      });
      return trace;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 위치별 거래 정보 조회
   * --
   * @param location_id
   * @returns
   */
  async getLocationTraceInfo(location_id: string) {
    try {
      const result = await this.traceRepository.find({
        where: { location_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저별 거래 정보 조회
   * --
   * @param user_id
   * @returns
   */
  async getUserTraceInfo(user_id: string) {
    try {
      const result = await this.traceRepository.find({
        where: { user_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 기자재별 거래 정보 조회
   * --
   * @param equipment_id
   * @returns
   */
  async getEquipmentTraceInfo(equipment_id: string) {
    try {
      const result = await this.traceRepository.find({
        where: { equipment_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 거래 정보 수정
   * --
   * @param traceInfo
   */
  async updateTrace(traceInfo: UpdateTraceDto) {
    try {
      const { trace_id, ...updateInfo } = traceInfo;
      const result = await this.traceRepository.update(
        { trace_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 거래 정보 삭제
   * --
   * @param trace_id
   * @returns
   */
  async deleteTrace(trace_id: string) {
    try {
      await this.traceRepository.findOneOrFail({ where: { trace_id } });
      const result = await this.traceRepository.delete({ trace_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
