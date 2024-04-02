import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  name: string;
  description: string;
  status: boolean;
  roomType: string;
  price: number;
  address: string;
  arcreage: number;
  user: User;
  service: Service;
  imageUrls: string[];
}
