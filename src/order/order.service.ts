import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';

@Injectable()
export class OrderService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = new Order();
      newOrder.dateStart = createOrderDto.dateStart;
      newOrder.dateEnd = createOrderDto.dateEnd;
      newOrder.totalPrice = createOrderDto.totalPrice;
      newOrder.status = 'Thành công';
      const user = await this.userRepository.findOneBy({
        id: createOrderDto.userId,
      });
      const service = await this.serviceRepository.findOneBy({
        id: createOrderDto.serviceId,
      });
      const order = await this.orderRepository.save({
        ...newOrder,
        user,
        service,
      });
      return await this.orderRepository.findOneBy({ id: order.id });
    } catch (error) {
      throw new HttpException('Không thể tạo đơn hàng', HttpStatus.BAD_REQUEST);
    }
  }
}
