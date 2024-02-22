import { IsDateString, IsNotEmpty, Validate } from 'class-validator';
import { IsLocationExist } from './constraints/location.constraint';
import { IsEmailUnique } from './constraints/email.constraint';

export class CreateUserDto {
  @IsNotEmpty()
  @Validate(IsEmailUnique)
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @IsNotEmpty()
  @Validate(IsLocationExist)
  location: string;
}
