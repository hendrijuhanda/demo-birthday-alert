import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class DynamicCronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, cronTime: string | Date, callback: () => any) {
    const job = new CronJob(cronTime, () => {
      callback();
    });

    this.schedulerRegistry.addCronJob(name, job);

    job.start();
  }

  removeCronJob(name: string) {
    try {
      const job = this.schedulerRegistry.getCronJob(name);

      if (job) {
        job.stop();

        this.schedulerRegistry.deleteCronJob(name);
      }
    } catch (_e) {}
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((value, key) => {
      let next;

      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }

      console.log(`job: ${key} -> next: ${next}`);
    });
  }
}
