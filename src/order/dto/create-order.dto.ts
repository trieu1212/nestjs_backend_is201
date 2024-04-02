import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  dateStart: Date;

  @IsNotEmpty()
  @ApiProperty()
  dateEnd: Date;

  @IsNotEmpty()
  @ApiProperty()
  totalPrice: number;

  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  serviceId: number;
}
