import { ApiProperty } from '@nestjs/swagger';

export class FilterServiceDto {
  @ApiProperty()
  page: string;

  @ApiProperty()
  itemPerPage: string;

  @ApiProperty()
  search: string;
}
