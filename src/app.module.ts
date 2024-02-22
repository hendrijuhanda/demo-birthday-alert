import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserBirthdayAlertScheduleModule } from './modules/user-birthday-alert-schedule/user-birthday-alert-schedule.module';
import { CronJobModule } from './modules/cron-job/cron-job.module';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    CronJobModule,
    UserModule,
    UserBirthdayAlertScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
