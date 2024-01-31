import { Injectable } from '@nestjs/common';
import { CreateRideDTO } from './dto/create-ride.dto';
import { DatabaseService } from '../database/database.service';
import { Ride } from './entities/ride.entity';
import { PatchRideDTO } from './dto/patch-ride.dto';

@Injectable()
export class RideService {
  constructor(private databaseService: DatabaseService) {}

  async create(createRideDTO: CreateRideDTO): Promise<Ride> {
    const [{ id }] = await this.databaseService.connection`
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

    const [createdRide] = await this.databaseService.connection<Ride[]>`
      SELECT
        "id",
        "origin_latitude",
        "origin_longitude",
        "destination_latitude",
        "destination_longitude",
        "driver_id",
        "passenger_id",
        "is_completed",
        "created_at"
      FROM "rides"
      WHERE "id" = ${id}
    `;

    return new Ride(createdRide);
  }

  async patch(id: number, updateRideDTO: PatchRideDTO): Promise<Ride> {
    await this.databaseService.connection<Ride[]>`
      UPDATE "rides" SET
      "is_completed" = ${updateRideDTO.is_completed}
      WHERE "id" = ${id};
    `;

    const [result] = await this.databaseService.connection<Ride[]>`
      SELECT
        "id",
        "origin_latitude",
        "origin_longitude",
        "destination_latitude",
        "destination_longitude",
        "driver_id",
        "passenger_id",
        "is_completed",
        "created_at"
      FROM "rides"
      WHERE "id" = ${id}
    `;

    return new Ride(result);
  }

  async findWhereActive(active: boolean): Promise<Ride[]> {
    const rides = await this.databaseService.connection<Ride[]>`
      SELECT
        "id",
        "origin_latitude",
        "origin_longitude",
        "destination_latitude",
        "destination_longitude",
        "driver_id",
        "passenger_id",
        "is_completed",
        "created_at"
      FROM "rides"
      WHERE "is_completed" = ${!active}
    `;

    return rides.map((ride) => new Ride(ride));
  }

  async findAll(): Promise<Ride[]> {
    const rides = await this.databaseService.connection<Ride[]>`
      SELECT
        "id",
        "origin_latitude",
        "origin_longitude",
        "destination_latitude",
        "destination_longitude",
        "driver_id",
        "passenger_id",
        "is_completed",
        "created_at"
      FROM "rides"
    `;

    return rides.map((ride) => new Ride(ride));
  }
}
