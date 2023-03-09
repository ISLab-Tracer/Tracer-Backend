import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from 'src/entity';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Charge])],
  controllers: [ChargeController],
  providers: [ChargeService],
})
export class ChargeModule {}
