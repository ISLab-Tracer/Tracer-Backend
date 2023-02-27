import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    AdminModule,
    DbModule,
    AuthModule,
    TeamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
