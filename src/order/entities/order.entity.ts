import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column()
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) // JoinColumn without 'unique'
  user: User;

  @ManyToOne(() => Service, (service) => service.orders)
  @JoinColumn({ name: 'serviceId', referencedColumnName: 'id' }) // JoinColumn without 'unique'
  service: Service;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
