import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import findLocation from 'src/utils/find-location';
import { UserBirthdayAlertScheduleService } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userBirthdayAlertScheduleService: UserBirthdayAlertScheduleService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  store(@Body() body: CreateUserDto): Promise<User> {
    body.location = findLocation(body.location)[0];

    return this.userService.create(body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    if (body.location) {
      body.location = findLocation(body.location)[0];
    }
    const user = await this.userService.update(id, body);

    await this.userBirthdayAlertScheduleService.updateByUser(user);

    return user;
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);

    const user = await this.userService.findById(id);

    if (!user) {
      await this.userBirthdayAlertScheduleService.abortByUserId(id);
    }
  }
}
