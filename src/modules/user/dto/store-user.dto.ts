import { IsDateString, IsNotEmpty, Validate } from 'class-validator';
import { LocationConstraint } from './constraints/location.constraint';
import { EmailConstraint } from './constraints/email.constraint';

export class StoreUserDto {
  @IsNotEmpty()
  @Validate(EmailConstraint)
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @IsNotEmpty()
  @Validate(LocationConstraint)
  location: string;
}
