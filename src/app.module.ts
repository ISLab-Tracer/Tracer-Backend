import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import configEmail from './config/email';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { EquipmentModule } from './equipment/equipment.module';
import { HandoverModule } from './handover/handover.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';
import { ChargeModule } from './charge/charge.module';
import { TraceModule } from './trace/trace.module';
import { LocationModule } from './location/location.module';
import { ServiceExceptionToHttpExceptionFilter } from './entity';
import { APP_FILTER } from '@nestjs/core';
import { ProjectMemberModule } from './project_member/project_member.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configEmail] }),
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('===== write [.env] by config: network =====');
        console.log(config.get('email'));
        return {
          ...config.get('email'),
          template: {
            dir: path.join(__dirname + '/templates'),
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    DbModule,
    AuthModule,
    TeamModule,
    UserModule,
    CategoryModule,
    ProjectModule,
    VerificationModule,
    LoginModule,
    HandoverModule,
    EquipmentModule,
    ChargeModule,
    TraceModule,
    LocationModule,
    ProjectMemberModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServiceExceptionToHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
