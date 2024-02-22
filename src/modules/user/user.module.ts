import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { IsEmailUnique } from './dto/constraints/email.constraint';
import { UserBirthdayAlertScheduleModule } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserBirthdayAlertScheduleModule],
  controllers: [UserController],
  providers: [UserService, IsEmailUnique, UserSubscriber],
})
export class UserModule {}
