import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Equipment, Project } from 'src/entity';
import { TeamModule } from 'src/team/team.module';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment, Category, Project]),
    TeamModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
