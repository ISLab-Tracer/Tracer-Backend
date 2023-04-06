import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Charge, Equipment, Project } from 'src/entity';
import { TeamModule } from 'src/team/team.module';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { ChargeModule } from 'src/charge/charge.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment, Category, Project, Charge]),
    TeamModule,
    ChargeModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
