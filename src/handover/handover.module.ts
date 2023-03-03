import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment, Handover } from 'src/entity';
import { HandoverController } from './handover.controller';
import { HandoverService } from './handover.service';

@Module({
  imports: [TypeOrmModule.forFeature([Handover, Equipment])],
  controllers: [HandoverController],
  providers: [HandoverService],
})
export class HandoverModule {}
