import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserBirthdayAlertScheduleModule } from './modules/user-birthday-alert-schedule/user-birthday-alert-schedule.module';
import { CronJobModule } from './modules/cron-job/cron-job.module';
import { QueueModule } from './modules/queue/queue.module';
import { BirthdayAlertProcessor } from './modules/user-birthday-alert-schedule/user-birthday-alert-schedule.queue';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    CronJobModule,
    QueueModule,
    HttpModule,
    UserModule,
    UserBirthdayAlertScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, BirthdayAlertProcessor],
})
export class AppModule {}
