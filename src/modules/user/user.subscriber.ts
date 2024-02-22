import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';
import { UserBirthdayAlertScheduleService } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.service';
import setBirthdayAlertTime from 'src/utils/set-birthday-alert-time';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly userBirthdayAlertScheduleService: UserBirthdayAlertScheduleService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>): void | Promise<any> {
    const insertedUser = event.entity;

    this.userBirthdayAlertScheduleService.create({
      user: insertedUser,
      execution_time: setBirthdayAlertTime(insertedUser),
    });
  }
}
