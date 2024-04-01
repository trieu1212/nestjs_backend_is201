import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  userId: number;

  @Column()
  serviceId: number;
}
