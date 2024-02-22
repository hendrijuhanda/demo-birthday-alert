import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { queueConfig } from './queue.config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [queueConfig] })],
      useFactory: (configService: ConfigService) =>
        configService.get('queue-config'),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'birthday-alert' }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
