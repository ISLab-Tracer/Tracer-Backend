import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Equipment, Project } from 'src/entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, Category, Project])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
