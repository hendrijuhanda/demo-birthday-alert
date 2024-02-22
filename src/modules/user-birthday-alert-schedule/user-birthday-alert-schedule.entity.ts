import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum UserBirthdayAlertScheduleStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  ABORTED = 'aborted',
}

@Entity({ name: 'user_birthday_alert_schedules' })
export class UserBirthdayAlertSchedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.birthdayAlertSchedules)
  user: User;

  @Column('integer')
  user_id: number;

  @Column('datetime')
  execution_time: string;

  @Column({
    type: 'enum',
    enum: UserBirthdayAlertScheduleStatus,
    default: UserBirthdayAlertScheduleStatus.PENDING,
  })
  status: UserBirthdayAlertScheduleStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
