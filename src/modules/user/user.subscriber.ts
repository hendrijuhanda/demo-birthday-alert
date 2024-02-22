import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { User } from './user.entity';
import { DynamicCronService } from 'src/services/dynamic-cron.service';
import setBirthdayAlertTime from './helpers/set-birthday-alert-time';
import { HttpService } from '@nestjs/axios';
import * as moment from 'moment';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dynamicCronService: DynamicCronService,
    private readonly httpService: HttpService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>): void | Promise<any> {
    const insertedUser = event.entity;

    const jobName = `birthday-alert-${insertedUser.id}`;
    const cronTime = setBirthdayAlertTime(insertedUser);

    const sendEmailRecursive = () => {
      const fullName = `${insertedUser.first_name} ${insertedUser.last_name}`;

      this.httpService.axiosRef
        .post(
          'https://email-service.digitalenvision.com.au/send-email',
          {
            email: 'test@digitalenvision.com.au',
            message: `Hey, ${fullName} it's your birthday`,
          },
          { timeout: 10000 },
        )
        .catch(() => {
          const retryJobName = `${jobName}-retry`;

          // Delete if exist
          this.dynamicCronService.removeCronJob(retryJobName);

          // Execute new cron on next day
          const cronTime = moment().add(1, 'day').toDate();

          this.dynamicCronService.addCronJob(retryJobName, cronTime, () => {
            sendEmailRecursive();
          });
        });
    };

    this.dynamicCronService.addCronJob(jobName, cronTime, () => {
      sendEmailRecursive();
    });
  }

  afterRemove(event: RemoveEvent<User>): void | Promise<any> {
    const removedUser = event.entity;

    const jobName = `birthday-alert-${removedUser.id}`;

    this.dynamicCronService.removeCronJob(jobName);
  }
}
