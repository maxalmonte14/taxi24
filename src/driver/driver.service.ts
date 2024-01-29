import { Injectable } from '@nestjs/common';
import sql from '../db';
import { Driver } from './entities/driver.entity';
import Coordinate from 'src/coordinate';

@Injectable()
export class DriverService {
  async findAll(): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT "id", "name", "profile_picture"
      FROM "drivers"
    `;

    return drivers.map((driver) => new Driver(driver));
  }

  async findAvailable(): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT
        "d"."id",
        "d"."name",
        "d"."profile_picture"
      FROM "drivers" "d"
      JOIN "drivers_location" "dl"
      ON "d"."id" = "dl"."driver_id"
      WHERE "dl"."is_available" = 'true'
    `;

    return drivers.map((driver) => new Driver(driver));
  }

  async findInRadius(coordinate: Coordinate): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT
        "d"."id",
        "d"."name",
        "d"."profile_picture"
      FROM "drivers" "d"
      JOIN "drivers_location" "dl"
      ON "d"."id" = "dl"."driver_id"
      WHERE "dl"."is_available" = 'true'
      AND
      (ST_DistanceSphere(
        ST_MakePoint("dl"."latitude"::float, "dl"."longitude"::float),
        ST_MakePoint(${coordinate.latitude}, ${coordinate.longitude})
      ) / 1000) <= 3
    `;

    return drivers.map((driver) => new Driver(driver));
  }

  async find(id: number): Promise<Driver> {
    const [result] = await sql<Driver[]>`
      SELECT "id", "name", "profile_picture"
      FROM "drivers"
      WHERE "id" = ${id}
    `;

    return new Driver(result);
  }
}
