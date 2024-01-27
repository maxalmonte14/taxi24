import { Injectable } from '@nestjs/common';
import sql from 'src/db';
import Trip from './trip';
import CreateTripDTO from './dto/create-trip-dto';
import UpdateTripDTO from './dto/update-trip-dto';

@Injectable()
export class TripService {
  async create(createTripDTO: CreateTripDTO): Promise<Trip> {
    const result = await sql`
      INSERT INTO "trips"
      (
        "origin_latitude",
        "origin_longitude",
        "destination_latitude",
        "destination_longitude",
        "driver_id",
        "passenger_id"
      ) VALUES
      (
        ${createTripDTO.originLatitude},
        ${createTripDTO.originLongitude},
        ${createTripDTO.destinationLatitude},
        ${createTripDTO.destinationLongitude},
        ${createTripDTO.driverId},
        ${createTripDTO.passengerId}
      )
      RETURNING id
    `;

    const [{ id }] = result;
    const [trip] = await sql<Trip[]>`
      SELECT
      "id",
      "origin_latitude",
      "origin_longitude",
      "destination_latitude",
      "destination_longitude",
      "driver_id",
      "passenger_id",
      "is_completed"
      FROM "trips"
      WHERE "id" = ${id}
    `;

    return trip;
  }

  async update(id: number, updateTripDTO: UpdateTripDTO): Promise<Trip> {
    await sql<Trip[]>`
      UPDATE "trips" SET
      "is_completed" = ${updateTripDTO.isCompleted}
      WHERE "id" = ${id};
    `;

    const [trip] = await sql<Trip[]>`
      SELECT
      "id",
      "origin_latitude",
      "origin_longitude",
      "destination_latitude",
      "destination_longitude",
      "driver_id",
      "passenger_id",
      "is_completed"
      FROM "trips"
      WHERE "id" = ${id}
    `;

    return trip;
  }

  async findActive(): Promise<Trip[]> {
    const trips = await sql<Trip[]>`
      SELECT
      "id",
      "origin_latitude",
      "origin_longitude",
      "destination_latitude",
      "destination_longitude",
      "driver_id",
      "passenger_id",
      "is_completed"
      FROM "trips"
      WHERE "is_completed" = 'false'
    `;

    return trips;
  }
}
