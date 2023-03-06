import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment, Location } from 'src/entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Equipment, Location])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
