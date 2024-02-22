import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsLocationExist } from './constraints/location.constraint';
import { IsEmailUnique } from './constraints/email.constraint';

export class UpdateUserDto {
  @IsOptional()
  @Validate(IsEmailUnique)
  email?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @Validate(IsLocationExist)
  location?: string;
}
