import { Injectable } from '@nestjs/common';
import sql from '../db';
import Driver from './driver';
import Coordinate from 'src/coordinate';

@Injectable()
export class DriverService {
  async findAll(): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT id, name, profile_picture
      FROM drivers
    `;

    return drivers;
  }

  async findAvailable(): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT
      id,
      name,
      profile_picture
      FROM drivers
      WHERE id IN(
        SELECT driver_id
        FROM drivers_location
        WHERE
        is_available = 'true'
      )`;

    return drivers;
  }

  async findInRadius(coordinate: Coordinate): Promise<Driver[]> {
    const drivers = await sql<Driver[]>`
      SELECT
      id,
      name,
      profile_picture
      FROM drivers
      WHERE id IN(
        SELECT driver_id
        FROM drivers_location
        WHERE
        is_available = 'true'
        AND
        (ST_DistanceSphere(
          ST_MakePoint(drivers_location.latitude::float, drivers_location.longitude::float),
          ST_MakePoint(${coordinate.latitude}, ${coordinate.longitude})
        ) / 1000) <= 3
      )`;

    return drivers;
  }

  async find(id: number): Promise<Driver> {
    const driver = await sql<Driver[]>`
      SELECT id, name, profile_picture
      FROM drivers
      WHERE id = ${id}
  `;

    return driver[0];
  }
}
