import 'moment-timezone';
import * as moment from 'moment';
import { config } from 'dotenv';
import { User } from 'src/modules/user/user.entity';

config();

export default (user: User): string => {
  const now = moment().utc();

  // Compose birthday alert time
  const tzOffset = moment.tz((user.location as any).timezone).format('Z');
  const birthdayDate = moment(user.date_of_birth).format('MM-DD');
  const alertTime = `${now.get('year')}-${birthdayDate}T${process.env.BIRTHDAY_ALERT_EXECUTION_TIME || '09:00:00'}${tzOffset}`;

  // Change its birthday time to UTC
  let tzDateTime = moment(alertTime).utc();

  // If the date is in the past, add 1 year
  if (tzDateTime.isBefore(now)) {
    tzDateTime = tzDateTime.add(1, 'year');
  }

  return tzDateTime.toISOString();
};
