import { IsArray, IsDateString, IsNotEmpty } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @IsNotEmpty()
  @IsArray()
  location: string;
}
