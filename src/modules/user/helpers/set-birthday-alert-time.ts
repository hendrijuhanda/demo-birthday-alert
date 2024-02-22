import 'moment-timezone';
import * as moment from 'moment';
import { config } from 'dotenv';
import { User } from '../user.entity';

config();

export default (user: User) => {
  const tzOffset = moment.tz((user.location as any).timezone).format('Z');

  // User birtday time in its timezone
  const birthdayTime = `${user.date_of_birth}T${process.env.BIRTHDAY_ALERT_EXECUTION_TIME || '09:00:00'}${tzOffset}`;

  console.log(birthdayTime);
  console.log(moment());
  console.log(moment(birthdayTime).utc());

  // Change its birthday time to UTC
  const tzDateTime = moment(birthdayTime).utc().toDate();

  // Date to cron expression
  const minutes = tzDateTime.getMinutes();
  const hours = tzDateTime.getHours();
  const days = tzDateTime.getDate();
  const months = tzDateTime.getMonth() + 1;

  const cronTime = `${minutes} ${hours} ${days} ${months} *`;

  return cronTime;
};
