import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserBirthdayAlertSchedule } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  name: string;

  @Column('date')
  date_of_birth: string;

  @Column('json')
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => UserBirthdayAlertSchedule,
    (userBirthdayAlertSchedule: UserBirthdayAlertSchedule) =>
      userBirthdayAlertSchedule.user,
  )
  schedules: UserBirthdayAlertSchedule[];
}
