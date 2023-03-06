import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trace } from 'src/entity';
import { TraceController } from './trace.controller';
import { TraceService } from './trace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trace])],
  controllers: [TraceController],
  providers: [TraceService],
})
export class TraceModule {}
