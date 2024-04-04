import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  status: number;
}
