import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    roomType: string;
  
    @ApiProperty()
    price: number;
  
    @ApiProperty()
    address: string;
  
    @ApiProperty()
    arcreage: number;
}