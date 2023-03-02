import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    DbModule,
    AuthModule,
    TeamModule,
    UserModule,
    CategoryModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
