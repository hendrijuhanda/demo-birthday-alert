import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserBirthdayAlertScheduleStatus } from '../user-birthday-alert-schedule.entity';
import { User } from 'src/modules/user/user.entity';

export class CreateUserBirthdayAlertScheduleDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsDateString()
  execution_time: string;

  @IsOptional()
  @IsEnum(UserBirthdayAlertScheduleStatus)
  status?: UserBirthdayAlertScheduleStatus;
}
