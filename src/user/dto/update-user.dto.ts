import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  isAdmin: number;
}
