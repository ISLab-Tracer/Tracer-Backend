import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { VerificationModule } from './verification/verification.module';
import configEmail from './config/email';
import { LoginModule } from './login/login.module';
import { HandoverModule } from './handover/handover.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
