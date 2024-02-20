import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  @Post()
  @UsePipes(new ValidationPipe())
  store(@Body() body: any): any {
    return `this is store: ${JSON.stringify(body)}`;
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number): any {
    return `this is delete: ${id}`;
  }
}
