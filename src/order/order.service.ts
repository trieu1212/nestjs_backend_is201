import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { FilterOrderDto } from './dto/filter-order.dto';

@Injectable()
export class OrderService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    // eslint-disable-next-line prettier/prettier
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
  async findAll(id: number, query: FilterOrderDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: id });
    const itemPerPage = Number(query.itemPerPage) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemPerPage;
    const [result, total] = await this.orderRepository.findAndCount({
      where: { user: { id: user.id}},
      order: { createdAt: 'DESC' },
      select: {
        user:{
          id:true,
          username:true,
          email:true,
          avatar:true
        },
      },
      relations:{
        user:true
      },
      take: itemPerPage,
      skip: skip,
    });
    const lastPage = Math.ceil(total / itemPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: result,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }
  async findOne(id: number):Promise<Order>{
    return await this.orderRepository.findOne(
      {
        where:{id:id},
        relations:{
          user:true,
          service:true
        },
        select:{
          user:{
            id:true,
            username:true,
            email:true,
            avatar:true
          },
          service:{
            id:true,
            name:true
          }
        }
      }
    )
  }
}
