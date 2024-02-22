import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserBirthdayAlertSchedule,
  UserBirthdayAlertScheduleStatus,
} from './user-birthday-alert-schedule.entity';
import { Repository } from 'typeorm';
import { CreateUserBirthdayAlertScheduleDto } from './dto/create-user-birthday-alert-schedule.dto';
import { UpdateUserBirthdayAlertScheduleDto } from './dto/update-user-birthday-alert-schedule.dto copy';
import { User } from '../user/user.entity';
import setBirthdayAlertTime from 'src/utils/set-birthday-alert-time';

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

  async abortByUserId(userId: number): Promise<void> {
    const schedules = await this.userBirthdayAlertScheduleRepository.find({
      where: {
        user_id: userId,
        status: UserBirthdayAlertScheduleStatus.PENDING,
      },
    });

    for (const schedule of schedules) {
      await this.userBirthdayAlertScheduleRepository.update(schedule.id, {
        status: UserBirthdayAlertScheduleStatus.ABORTED,
      });
    }
  }

  async updateByUser(user: User): Promise<void> {
    await this.abortByUserId(user.id);

    const executionTime = setBirthdayAlertTime(user);

    await this.create({
      user,
      execution_time: executionTime,
    });
  }
}
