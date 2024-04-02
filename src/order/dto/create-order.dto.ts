import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';

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
  user: User;

  @IsNotEmpty()
  @ApiProperty()
  service: Service;
}
