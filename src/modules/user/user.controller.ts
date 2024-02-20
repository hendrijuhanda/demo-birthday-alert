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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  store(@Body() body: StoreUserDto): any {
    return this.userService.create(body);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number): any {
    return `this is delete: ${id}`;
  }
}
