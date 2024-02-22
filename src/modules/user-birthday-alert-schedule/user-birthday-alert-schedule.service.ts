import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserBirthdayAlertSchedule,
  UserBirthdayAlertScheduleStatus,
} from './user-birthday-alert-schedule.entity';
import { Repository } from 'typeorm';
import { CreateUserBirthdayAlertScheduleDto } from './dto/create-user-birthday-alert-schedule.dto';

@Injectable()
export class UserBirthdayAlertScheduleService {
  constructor(
    @InjectRepository(UserBirthdayAlertSchedule)
    private readonly userBirthdayAlertScheduleRepository: Repository<UserBirthdayAlertSchedule>,
  ) {}

  async create(
    data: CreateUserBirthdayAlertScheduleDto,
  ): Promise<UserBirthdayAlertSchedule> {
    const saveData = this.userBirthdayAlertScheduleRepository.create(data);

    return this.userBirthdayAlertScheduleRepository.save(saveData);
  }

  async getPendingSchedules(): Promise<UserBirthdayAlertSchedule[]> {
    return this.userBirthdayAlertScheduleRepository.find({
      where: { status: UserBirthdayAlertScheduleStatus.PENDING },
    });
  }
}
