import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserBirthdayAlertScheduleService } from 'src/modules/user-birthday-alert-schedule/user-birthday-alert-schedule.service';
import { UserBirthdayAlertProducer } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.queue';
import * as moment from 'moment';

@Injectable()
export class CronJobService {
  constructor(
    private readonly userBirthdayAlertSchduleService: UserBirthdayAlertScheduleService,
    private readonly userBirthdayAlertProducer: UserBirthdayAlertProducer,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handlePendingSchedules() {
    const schedules =
      await this.userBirthdayAlertSchduleService.getPendingSchedules();

    schedules.forEach((schedule) => {
      if (
        moment().isSame(moment(schedule.execution_time), 'date') &&
        moment().isSame(moment(schedule.execution_time), 'hour')
      ) {
        this.userBirthdayAlertProducer.sendQueue(schedule);
      }
    });
  }
}
