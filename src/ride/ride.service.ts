import { Injectable } from '@nestjs/common';
import sql from 'src/db';
import { Ride } from './entities/ride.entity';
import { CreateRideDTO } from './dto/create-ride.dto';
import { UpdateRideDTO } from './dto/update-ride.dto';

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
        ${createRideDTO.origin_latitude},
        ${createRideDTO.origin_longitude},
        ${createRideDTO.destination_latitude},
        ${createRideDTO.destination_longitude},
        ${createRideDTO.driver_id},
        ${createRideDTO.passenger_id}
      )
      RETURNING id
    `;

    const [{ id }] = result;
    const [createdRide] = await sql<Ride[]>`
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

    return new Ride(createdRide);
  }

  async update(id: number, updateRideDTO: UpdateRideDTO): Promise<Ride> {
    await sql<Ride[]>`
      UPDATE "rides" SET
      "is_completed" = ${updateRideDTO.is_completed}
      WHERE "id" = ${id};
    `;

    const [result] = await sql<Ride[]>`
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

    return new Ride(result);
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

    return rides.map((ride) => new Ride(ride));
  }
}
