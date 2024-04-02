import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Service)
  @JoinColumn()
  service: Service;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
