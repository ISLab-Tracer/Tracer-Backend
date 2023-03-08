import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Location } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateLocationDto, UpdateLocationDto } from './dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ) {}

  /**
   * 위치 정보 생성
   * --
   * @param locationInfo
   * @returns
   */
  async createLocation(locationInfo: CreateLocationDto) {
    try {
      const { location_id } = locationInfo;
      const check = await this.locationRepository.findOne({
        where: { location_id },
      });
      if (check) {
        throw EntityBadRequestException();
      }

      const test = await this.locationRepository.create(locationInfo);
      const result = await this.locationRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 위치 정보 조회
   * --
   * @returns
   */
  async getLocationList() {
    try {
      const result = await this.locationRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 위치 상세 정보 조회
   * @param location_id
   * @returns
   */
  async getLocationInfo(location_id: string) {
    try {
      const user = await this.locationRepository.findOneOrFail({
        where: { location_id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 위치 정보 수정
   * --
   * @param locationInfo
   * @returns
   */
  async updateLocation(locationInfo: UpdateLocationDto) {
    try {
      const { location_id, ...updateInfo } = locationInfo;
      const result = await this.locationRepository.update(
        { location_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 위치 정보 삭제
   * --
   * @param location_id
   */
  async deleteLocation(location_id: string) {
    try {
      const location = await this.locationRepository.findOneOrFail({
        where: { location_id },
      });
      const result = await this.locationRepository.delete(location);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
