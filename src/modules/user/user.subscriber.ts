import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';
import { DynamicCronService } from 'src/services/dynamic-cron.service';
import setBirthdayAlertTime from './helpers/set-birthday-alert-time';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dynamicCronService: DynamicCronService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>) {
    const insertedUser = event.entity;

    const jobName = `birthday-alert-${insertedUser.id}`;
    const cronTime = setBirthdayAlertTime(insertedUser);

    this.dynamicCronService.addCronJob(jobName, cronTime, () => {
      console.log('cronnn timeeee');
    });
  }
}
