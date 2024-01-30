import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Injectable()
export class PassengerService {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<Passenger[]> {
    const passengers = await this.databaseService.connection<Passenger[]>`
      SELECT "id", "name", "profile_picture"
      FROM "passengers"
    `;

    return passengers.map((passenger) => new Passenger(passenger));
  }

  async find(id: number): Promise<Passenger> {
    const [passenger] = await this.databaseService.connection<Passenger[]>`
      SELECT "id", "name", "profile_picture"
      FROM "passengers"
      WHERE "id" = ${id}
    `;

    return new Passenger(passenger);
  }

  async findNearDriversByPassengerId(id: number): Promise<Driver[]> {
    const drivers = await this.databaseService.connection<Driver[]>`
      SELECT
        "d"."id",
        "d"."name",
        "d"."profile_picture"
      FROM "drivers" "d"
      INNER JOIN "driver_locations" "dl"
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

  async findInvoicesByPassengerId(passengerId: number): Promise<Invoice[]> {
    const invoices = await this.databaseService.connection<Passenger[]>`
      SELECT
        "i"."id",
        "i"."price",
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
