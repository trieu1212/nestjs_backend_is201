import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Service]), ConfigModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
