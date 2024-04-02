import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FilterServiceDto } from './dto/filter-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}
  async findAll(query: FilterServiceDto): Promise<any> {
    const itemPerPage = Number(query.itemPerPage) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemPerPage;
    const search = query.search || '';
    const [result, total] = await this.serviceRepository.findAndCount({
      where: [
        { name: Like('%' + search + '%') },
        { description: Like('%' + search + '%') },
      ],
      order: { createdAt: 'DESC' },
      take: itemPerPage,
      skip: skip,
      select: [
        'id',
        'description',
        'dateTime',
        'price',
        'postAmount',
        'status',
        'createdAt',
        'updatedAt',
      ],
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
  async findOne(id:number):Promise<Service>{
    const service = await this.serviceRepository.findOneBy({id:id})
    return service;
  }
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.save(createServiceDto);
    return service;
  }
  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<UpdateResult> {
    const service = await this.serviceRepository.update(id, updateServiceDto);
    return service;
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.serviceRepository.delete(id);
  }
}
