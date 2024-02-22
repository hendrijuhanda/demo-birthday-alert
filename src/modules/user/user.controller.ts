import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoreUserDto } from './dto/store-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import findLocation from 'src/utils/find-location';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  store(@Body() body: StoreUserDto): Promise<User> {
    body.location = findLocation(body.location)[0];

    return this.userService.create(body);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
