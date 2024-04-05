import { IsNotEmpty } from 'class-validator';

export class FilterPostDto {
  @IsNotEmpty()
  itemPerPage: string;

  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  search: string;

  @IsNotEmpty()
  roomType: string;

  @IsNotEmpty()
  address: string;
}
