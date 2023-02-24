import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateAdminDTO } from './dto';

@Injectable()
export class AdminService {
  // Repository
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>
  ) {}

  async createAdmin(adminInfo: CreateAdminDTO) {
    try {
      console.log(adminInfo);
      // const check = await this.adminRepository.find({
      //   where: { user_email: adminInfo.user_email },
      // });

      // if (check) {
      //   throw new Error('Admin ID is invalid');
      // }

      const result = await this.adminRepository.save(adminInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAdminList() {
    const result = await this.adminRepository.find();
    return result;
  }
}
