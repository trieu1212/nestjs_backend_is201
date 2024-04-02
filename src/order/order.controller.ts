import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  // eslint-disable-next-line prettier/prettier
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    console.log(createOrderDto);
    return this.orderService.create(createOrderDto);
  }
}
