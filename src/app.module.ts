import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DynamicCronService } from './services/dynamic-cron.service';

@Module({
  imports: [DatabaseModule, UserModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, DynamicCronService],
})
export class AppModule {}
