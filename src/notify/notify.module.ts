import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from 'src/notify/entities/notify.entity';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Notify, User]),ConfigModule],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
