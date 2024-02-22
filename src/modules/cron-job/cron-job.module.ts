import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { UserBirthdayAlertScheduleModule } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.module';

@Module({
  imports: [UserBirthdayAlertScheduleModule],
  providers: [CronJobService],
})
export class CronJobModule {}
