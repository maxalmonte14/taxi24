import { Injectable } from '@nestjs/common';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import sql from 'src/db';

@Injectable()
export class PassengerService {
  async findAll(): Promise<Passenger[]> {
    const passengers = await sql<Passenger[]>`
      SELECT id, name, profile_picture
      FROM passengers
    `;

    return passengers;
  }

  async find(id: number): Promise<Passenger> {
    const passenger = await sql<Passenger[]>`
      SELECT id, name, profile_picture
      FROM passengers
      WHERE id = ${id}
  `;

    return passenger[0];
  }

  async findNearDriversByPassengerId(id: number): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT
      drivers.id,
      drivers.name,
      drivers.profile_picture
      FROM drivers
      INNER JOIN drivers_location
      ON drivers.id = drivers_location.driver_id
      WHERE drivers_location.is_available = 'true'
      ORDER BY
      (ST_DistanceSphere(
        ST_MakePoint(drivers_location.latitude::float, drivers_location.longitude::float),
        ST_MakePoint(
          (SELECT longitude FROM passengers_location WHERE passenger_id = ${id} LIMIT 1)::float,
          (SELECT latitude FROM passengers_location WHERE passenger_id = ${id} LIMIT 1)::float
        )
      ) / 1000)
      LIMIT 3`;

    return drivers;
  }
}
