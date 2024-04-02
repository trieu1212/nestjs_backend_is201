import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { FilterServiceDto } from './dto/filter-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
    // eslint-disable-next-line prettier/prettier
    constructor(private serviceService:ServiceService ){}

    @Get()
    findAll(@Query() query:FilterServiceDto):Promise<Service[]>{
        return this.serviceService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    findOne(@Param('id') id:string):Promise<Service>{
        return this.serviceService.findOne(Number(id))
    }

    @UseGuards(AuthGuard)
    @Post('/create')
    create(@Body() createServiceDto:CreateServiceDto ):Promise<Service>{
        return this.serviceService.create(createServiceDto)
    }

    @UseGuards(AuthGuard)
    @Put('/update/:id')
    update(@Param('id') id:string, @Body() updateServiceDto:UpdateServiceDto){
        return this.serviceService.update(Number(id),updateServiceDto)
    }

    @UseGuards(AuthGuard)
    @Delete('/delete/:id')
    delete(@Param('id') id:string){
        return this.serviceService.delete(Number(id))
    }
}
