import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { DynamicCronService } from 'src/services/dynamic-cron.service';
import { HttpModule } from '@nestjs/axios';
import { EmailConstraint } from './dto/constraints/email.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [UserController],
  providers: [UserService, EmailConstraint, DynamicCronService, UserSubscriber],
})
export class UserModule {}
