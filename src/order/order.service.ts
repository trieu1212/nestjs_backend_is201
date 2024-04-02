import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    // eslint-disable-next-line prettier/prettier
    constructor(@InjectRepository(Order) private orderRepository:Repository<Order>){}

    // async create(userId:number, createOrderDto:CreateOrderDto):Promise<Order>{
    //     return this.orderRepository.save
    // }
}
