import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';

@Index('rent_client_id', ['rentClientId'], {})
@Index('rent_car_id', ['rentCarId'], {})
@Index('rent_user_id', ['rentUserId'], {})
@Entity('rent', { schema: 'rentacar' })
export class Rent {
  @PrimaryGeneratedColumn({ type: 'int', name: 'rent_id' })
  rentId: number;

  @Column('int', { name: 'rent_user_id' })
  rentUserId: number;

  @Column('int', { name: 'rent_client_id' })
  rentClientId: number;

  @Column('int', { name: 'rent_car_id' })
  rentCarId: number;

  @Column('datetime', {
    name: 'rent_datetime_from',
    default: () => 'CURRENT_TIMESTAMP',
  })
  rentDatetimeFrom: Date;

  @Column('datetime', { name: 'rent_datetime_to', nullable: true })
  rentDatetimeTo: Date | null;

  @Column({ type: 'decimal', name: 'rent_fuel_start', precision: 10, scale: 2 })
  rentFuelStart: string;

  @Column({
    type: 'decimal',
    name: 'rent_fuel_finish',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  rentFuelFinish: string | null;

  @Column({ type: 'decimal', name: 'rent_km_start', precision: 10, scale: 2 })
  rentKmStart: string;

  @Column({
    type: 'decimal',
    name: 'rent_km_finish',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  rentKmFinish: string | null;

  @ManyToOne(
    () => Car,
    car => car.rents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'rent_car_id', referencedColumnName: 'carId' }])
  rentCar: Car;

  @ManyToOne(
    () => Client,
    client => client.rents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'rent_client_id', referencedColumnName: 'clientId' }])
  rentClient: Client;

  @ManyToOne(
    () => User,
    user => user.rents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'rent_user_id', referencedColumnName: 'usersId' }])
  rentUser: User;
}
