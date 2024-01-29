import { Injectable } from '@nestjs/common';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import sql from 'src/db';

@Injectable()
export class PassengerService {
  async findAll(): Promise<Passenger[]> {
    const passengers = await sql<Passenger[]>`
      SELECT "id", "name", "profile_picture"
      FROM "passengers"
    `;

    return passengers.map((passenger) => new Passenger(passenger));
  }

  async find(id: number): Promise<Passenger> {
    const [passenger] = await sql<Passenger[]>`
      SELECT "id", "name", "profile_picture"
      FROM "passengers"
      WHERE "id" = ${id}
    `;

    return new Passenger(passenger);
  }

  async findNearDriversByPassengerId(id: number): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT
        "d"."id",
        "d"."name",
        "d"."profile_picture"
      FROM "drivers" "d"
      INNER JOIN "drivers_location" "dl"
      ON "d"."id" = "dl"."driver_id"
      WHERE "dl"."is_available" = 'true'
      ORDER BY
      (ST_DistanceSphere(
        ST_MakePoint("dl"."latitude"::float, "dl"."longitude"::float),
        ST_MakePoint(
          (SELECT "longitude" FROM "passengers_location" WHERE "passenger_id" = ${id} LIMIT 1)::float,
          (SELECT "latitude" FROM "passengers_location" WHERE "passenger_id" = ${id} LIMIT 1)::float
        )
      ) / 1000)
      LIMIT 3`;

    return drivers.map((driver) => new Driver(driver));
  }
}
