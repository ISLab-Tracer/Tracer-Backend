import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
  // Repository
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>
  ) {}

  async getAdminList() {
    const result = await this.adminRepository.find();
    return result;
  }
}
