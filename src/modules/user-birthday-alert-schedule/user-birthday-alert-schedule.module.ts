import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBirthdayAlertSchedule } from './user-birthday-alert-schedule.entity';
import { UserBirthdayAlertScheduleService } from './user-birthday-alert-schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBirthdayAlertSchedule])],
  providers: [UserBirthdayAlertScheduleService],
  exports: [UserBirthdayAlertScheduleService],
})
export class UserBirthdayAlertScheduleModule {}
