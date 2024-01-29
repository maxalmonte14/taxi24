import { Injectable } from '@nestjs/common';
import sql from 'src/db';
import { Ride } from './entities/ride.entity';
import CreateRideDTO from './dto/create-ride.dto';
import UpdateRideDTO from './dto/update-ride.dto';

@Injectable()
export class RideService {
  async create(createRideDTO: CreateRideDTO): Promise<Ride> {
    const result = await sql`
      INSERT INTO "rides"
      (
        "origin_latitude",
        "origin_longitude",
        "destination_latitude",
        "destination_longitude",
        "driver_id",
        "passenger_id"
      ) VALUES
      (
        ${createRideDTO.originLatitude},
        ${createRideDTO.originLongitude},
        ${createRideDTO.destinationLatitude},
        ${createRideDTO.destinationLongitude},
        ${createRideDTO.driverId},
        ${createRideDTO.passengerId}
      )
      RETURNING id
    `;

    const [{ id }] = result;
    const [ride] = await sql<Ride[]>`
      SELECT
      "id",
      "origin_latitude",
      "origin_longitude",
      "destination_latitude",
      "destination_longitude",
      "driver_id",
      "passenger_id",
      "is_completed"
      FROM "rides"
      WHERE "id" = ${id}
    `;

    return ride;
  }

  async update(id: number, updateRideDTO: UpdateRideDTO): Promise<Ride> {
    await sql<Ride[]>`
      UPDATE "rides" SET
      "is_completed" = ${updateRideDTO.isCompleted}
      WHERE "id" = ${id};
    `;

    const [ride] = await sql<Ride[]>`
      SELECT
      "id",
      "origin_latitude",
      "origin_longitude",
      "destination_latitude",
      "destination_longitude",
      "driver_id",
      "passenger_id",
      "is_completed"
      FROM "rides"
      WHERE "id" = ${id}
    `;

    return ride;
  }

  async findActive(): Promise<Ride[]> {
    const rides = await sql<Ride[]>`
      SELECT
      "id",
      "origin_latitude",
      "origin_longitude",
      "destination_latitude",
      "destination_longitude",
      "driver_id",
      "passenger_id",
      "is_completed"
      FROM "rides"
      WHERE "is_completed" = 'false'
    `;

    return rides;
  }
}
