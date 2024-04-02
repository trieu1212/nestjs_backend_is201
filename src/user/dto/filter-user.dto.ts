import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty()
  page: string;

  @ApiProperty()
  itemPerPage: string;

  @ApiProperty()
  search: string;
}
