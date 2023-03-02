import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Handover } from 'src/entity/handover.entity';
import { HandoverController } from './handover.controller';
import { HandoverService } from './handover.service';

@Module({
  imports: [TypeOrmModule.forFeature([Handover])],
  controllers: [HandoverController],
  providers: [HandoverService],
})
export class HandoverModule {}
