import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<Driver[]> {
    const drivers = await this.databaseService.connection<Driver[]>`
      SELECT
        "id",
        "first_name",
        "last_name",
        "email",
        "license_number",
        "profile_picture"
      FROM "drivers"
    `;

    return drivers.map((driver) => new Driver(driver));
  }

  async findAvailable(available: boolean): Promise<Driver[]> {
    const drivers = await this.databaseService.connection<Driver[]>`
      SELECT
        "d"."id",
        "d"."first_name",
        "d"."last_name",
        "d"."email",
        "d"."license_number",
        "d"."profile_picture"
      FROM "drivers" "d"
      JOIN "driver_locations" "dl"
      ON "d"."id" = "dl"."driver_id"
      WHERE "dl"."is_available" = ${available}
    `;

    return drivers.map((driver) => new Driver(driver));
  }

  async findInRadius(latitude: string, longitude: string): Promise<Driver[]> {
    const drivers = await this.databaseService.connection<Driver[]>`
      SELECT
        "d"."id",
        "d"."first_name",
        "d"."last_name",
        "d"."email",
        "d"."license_number",
        "d"."profile_picture"
      FROM "drivers" "d"
      JOIN "driver_locations" "dl"
      ON "d"."id" = "dl"."driver_id"
      WHERE "dl"."is_available" = 'true'
      AND
      (ST_DistanceSphere(
        ST_MakePoint("dl"."latitude"::float, "dl"."longitude"::float),
        ST_MakePoint(${latitude}, ${longitude})
      ) / 1000) <= 3
    `;

    return drivers.map((driver) => new Driver(driver));
  }

  async find(id: number): Promise<Driver> {
    const [driver] = await this.databaseService.connection<Driver[]>`
      SELECT 
        "id",
        "first_name",
        "last_name",
        "email",
        "license_number",
        "profile_picture"
      FROM "drivers"
      WHERE "id" = ${id}
    `;

    if (!driver) {
      throw new Error(`We could not find a driver with id: ${id}.`);
    }

    return new Driver(driver);
  }
}
