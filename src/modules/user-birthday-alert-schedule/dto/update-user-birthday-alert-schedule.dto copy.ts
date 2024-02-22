import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { UserBirthdayAlertScheduleStatus } from '../user-birthday-alert-schedule.entity';
import { User } from 'src/modules/user/user.entity';

export class UpdateUserBirthdayAlertScheduleDto {
  @IsOptional()
  user?: User;

  @IsOptional()
  @IsDateString()
  execution_time?: string;

  @IsOptional()
  @IsEnum(UserBirthdayAlertScheduleStatus)
  status?: UserBirthdayAlertScheduleStatus;
}
