import { CreateNotifyDto } from './dto/create-notify-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notify } from 'src/notify/entities/notify.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotifyService {
    constructor(
        @InjectRepository(Notify) private notifyRepository: Repository<Notify>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async create(CreateNotifyDto:CreateNotifyDto): Promise<Notify>{
        const user = await this.userRepository.findOne({
            where: { id: CreateNotifyDto.userId }
        });
        
        const notify = new Notify();
        notify.title = CreateNotifyDto.title;
        notify.message = CreateNotifyDto.message;
        notify.type = CreateNotifyDto.type;
        notify.user = user;
        return await this.notifyRepository.save(notify);
    }

    async findAllByUser(id:number): Promise<any>{
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ['notifications'],
        });
        const result = await this.notifyRepository.find({
            where: { user: { id: user.id } },
            order: { createdAt: 'DESC' },
            relations: ['user'],
            select: {
                id: true,
                title: true,
                message: true,
                type: true,
                createdAt: true,
                user: {
                    id: true,
                    username: true,
                    email: true,
                    avatar: true
                }
            }
        });
        return result;
    }
}
