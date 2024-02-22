import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserBirthdayAlertScheduleService } from 'src/modules/user-birthday-alert-schedule/user-birthday-alert-schedule.service';

@Injectable()
export class CronJobService {
  constructor(
    private readonly userBirthdayAlertSchduleService: UserBirthdayAlertScheduleService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handlePendingSchedules() {
    const schedules =
      await this.userBirthdayAlertSchduleService.getPendingSchedules();

    schedules.forEach((schedule) => {
      console.log(schedule);
    });
  }
}
