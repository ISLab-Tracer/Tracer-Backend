import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Category, Project, Team, User } from 'src/entity';
import { ProjectModule } from 'src/project/project.module';
import { TeamModule } from 'src/team/team.module';
import { UserModule } from 'src/user/user.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [UserModule, TeamModule, CategoryModule, ProjectModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
