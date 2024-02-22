import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { UserBirthdayAlertScheduleModule } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.module';
import { UserBirthdayAlertProducer } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.queue';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [UserBirthdayAlertScheduleModule, QueueModule],
  providers: [CronJobService, UserBirthdayAlertProducer],
})
export class CronJobModule {}
