import { CreateNotifyDto } from 'src/notify/dto/create-notify-dto';
import { NotifyService } from './notify.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('notify')
export class NotifyController {
    constructor(
        private notifyService: NotifyService
    ){}

    @Post('/create')
    create(@Body() createNotifyDto:CreateNotifyDto){
        return this.notifyService.create(createNotifyDto)
    }
    @Get('/:id')
    findAllByUser(@Param('id') id:string){
        return this.notifyService.findAllByUser(Number(id))
    }
}
