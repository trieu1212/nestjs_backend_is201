import { ApiProperty } from '@nestjs/swagger';

export class FilterOrderDto {
  @ApiProperty()
  page: string;

  @ApiProperty()
  itemPerPage: string;
}
