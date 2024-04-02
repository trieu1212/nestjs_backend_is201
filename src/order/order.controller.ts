import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
    // eslint-disable-next-line prettier/prettier
    constructor( private orderService:OrderService) {}
    
    @Post('/create')
    create(@Req() req:any, @Body() createOrderDto:CreateOrderDto):Promise<Order>{
        return this.orderService.create(req.user.id, createOrderDto)
    }
}
