import { ApiProperty } from "@nestjs/swagger";

export class UpdateServiceDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dateTime: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  postAmount: number;

  @ApiProperty()
  status: boolean;
}
