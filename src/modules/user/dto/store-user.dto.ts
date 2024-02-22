import { IsDateString, IsNotEmpty, Validate } from 'class-validator';
import { Location } from './constraints/location.constraint';

export class StoreUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @IsNotEmpty()
  @Validate(Location)
  location: string;
}
