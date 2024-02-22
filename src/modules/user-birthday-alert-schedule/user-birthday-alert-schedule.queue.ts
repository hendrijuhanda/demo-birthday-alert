import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserBirthdayAlertScheduleService } from './user-birthday-alert-schedule.service';
import {
  UserBirthdayAlertSchedule,
  UserBirthdayAlertScheduleStatus,
} from './user-birthday-alert-schedule.entity';
import * as moment from 'moment';

@Injectable()
export class UserBirthdayAlertProducer {
  constructor(
    @InjectQueue('birthday-alert')
    private readonly sendBirthdayAlertQueue: Queue,
  ) {}
  async sendQueue(schedule: UserBirthdayAlertSchedule) {
    await this.sendBirthdayAlertQueue.add({ schedule });
  }
}

@Processor('birthday-alert')
export class BirthdayAlertProcessor {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userBirthdayAlertScheduleService: UserBirthdayAlertScheduleService,
  ) {}
  @Process()
  async birthdayAlert(job: Job) {
    const schedule: UserBirthdayAlertSchedule = job.data.schedule;
    const { user } = schedule;

    this.httpService.axiosRef
      .post(
        this.configService.get('BIRTHDAY_ALERT_HANDLER'),
        {
          email: user.email,
          message: `Hey, ${user.name} it's you birthday!`,
        },
        { timeout: 10000 },
      )
      .then(() => {
        // Set current schedule status to failed.
        // Then create a new one for the next year.
        this.userBirthdayAlertScheduleService.update(schedule.id, {
          status: UserBirthdayAlertScheduleStatus.SUCCESS,
        });

        const executionTime = moment(schedule.execution_time)
          .add(1, 'year')
          .toISOString();

        this.userBirthdayAlertScheduleService.create({
          user,
          execution_time: executionTime,
        });
      })
      .catch(() => {
        // Set current schedule status to failed.
        // Then create a new one with one hour later exec time.
        this.userBirthdayAlertScheduleService.update(schedule.id, {
          status: UserBirthdayAlertScheduleStatus.FAILED,
        });

        let executionTime = moment(schedule.execution_time)
          .add(1, 'hour')
          .toISOString();

        // If date is not same anymore, create for next year.
        if (!moment().isSame(moment(executionTime), 'date')) {
          executionTime = moment(schedule.execution_time)
            .add(1, 'year')
            .toISOString();
        }

        this.userBirthdayAlertScheduleService.create({
          user,
          execution_time: executionTime,
        });
      });
  }
}
