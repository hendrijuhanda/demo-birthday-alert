import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserBirthdayAlertSchedule,
  UserBirthdayAlertScheduleStatus,
} from './user-birthday-alert-schedule.entity';
import { Repository } from 'typeorm';
import { CreateUserBirthdayAlertScheduleDto } from './dto/create-user-birthday-alert-schedule.dto';
import { UpdateUserBirthdayAlertScheduleDto } from './dto/update-user-birthday-alert-schedule.dto copy';

@Injectable()
export class UserBirthdayAlertScheduleService {
  constructor(
    @InjectRepository(UserBirthdayAlertSchedule)
    private readonly userBirthdayAlertScheduleRepository: Repository<UserBirthdayAlertSchedule>,
  ) {}

  async getPendingSchedules(): Promise<UserBirthdayAlertSchedule[]> {
    return this.userBirthdayAlertScheduleRepository.find({
      where: { status: UserBirthdayAlertScheduleStatus.PENDING },
      relations: ['user'],
    });
  }

  async create(
    data: CreateUserBirthdayAlertScheduleDto,
  ): Promise<UserBirthdayAlertSchedule> {
    const saveData = this.userBirthdayAlertScheduleRepository.create(data);

    return this.userBirthdayAlertScheduleRepository.save(saveData);
  }

  async update(
    id: number,
    data: UpdateUserBirthdayAlertScheduleDto,
  ): Promise<UserBirthdayAlertSchedule> {
    await this.userBirthdayAlertScheduleRepository.update(id, data);

    return this.userBirthdayAlertScheduleRepository.findOne({ where: { id } });
  }
}
