import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import { Invoice } from '../invoice/entities/invoice.entity';

@Injectable()
export class PassengerService {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<Passenger[]> {
    const passengers = await this.databaseService.connection<Passenger[]>`
      SELECT
        "id",
        "first_name",
        "last_name",
        "email",
        "profile_picture"
      FROM "passengers"
    `;

    return passengers.map((passenger) => new Passenger(passenger));
  }

  async find(id: number): Promise<Passenger> {
    const [passenger] = await this.databaseService.connection<Passenger[]>`
      SELECT
        "id",
        "first_name",
        "last_name",
        "email",
        "profile_picture"
      FROM "passengers"
      WHERE "id" = ${id}
    `;

    if (!passenger) {
      throw new Error(`We could not find a passenger with id: ${id}.`);
    }

    return new Passenger(passenger);
  }

  private async failIfPassengerDoesNotExist(id: number) {
    const [{ exists }] = await this.databaseService.connection<Passenger[]>`
      SELECT EXISTS(
        SELECT 1
        FROM "passengers"
        WHERE "id" = ${id}
      ) AS "exists"
    `;

    if (!exists) {
      throw new Error(`We could not find a passenger with id: ${id}.`);
    }
  }

  async findNearDriversByPassengerId(passengerId: number): Promise<Driver[]> {
    await this.failIfPassengerDoesNotExist(passengerId);

    const drivers = await this.databaseService.connection<Driver[]>`
      SELECT
        "d"."id",
        "d"."first_name",
        "d"."last_name",
        "d"."email",
        "d"."license_number",
        "d"."profile_picture"
      FROM "drivers" "d"
      INNER JOIN "driver_locations" "dl"
      ON "d"."id" = "dl"."driver_id"
      WHERE "dl"."is_available" = 'true'
      ORDER BY
      (ST_DistanceSphere(
        ST_MakePoint("dl"."latitude"::float, "dl"."longitude"::float),
        ST_MakePoint(
          (SELECT "longitude" FROM "passenger_locations" WHERE "passenger_id" = ${passengerId} LIMIT 1)::float,
          (SELECT "latitude" FROM "passenger_locations" WHERE "passenger_id" = ${passengerId} LIMIT 1)::float
        )
      ) / 1000)
      LIMIT 3`;

    return drivers.map((driver) => new Driver(driver));
  }

  async findInvoicesByPassengerId(passengerId: number): Promise<Invoice[]> {
    await this.failIfPassengerDoesNotExist(passengerId);

    const invoices = await this.databaseService.connection<Passenger[]>`
      SELECT
        "i"."id",
        "i"."price"::float,
        "i"."ride_id",
        "i"."created_at"
      FROM "invoices" "i"
      INNER JOIN "rides" "r"
      ON "i"."ride_id" = "r"."id"
      INNER JOIN "passengers" "p"
      ON "r"."passenger_id" = "p"."id"
      WHERE "r"."passenger_id" = ${passengerId}
    `;

    return invoices.map((invoice) => new Invoice(invoice));
  }
}
