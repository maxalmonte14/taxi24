import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { Ride } from './entities/ride.entity';
import { RideService } from './ride.service';

describe('RideService', () => {
  let service: RideService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DatabaseService, RideService],
    }).compile();

    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get all rides', async () => {
    const rides: Array<Ride> = await service.findAll();

    expect(rides).toBeInstanceOf(Array<Ride>);
    expect(rides).toContainEqual(
      new Ride({
        id: 1,
        origin_latitude: '18.433921976987083',
        origin_longitude: '-69.95092447279306',
        destination_latitude: '18.48564900782328',
        destination_longitude: '-69.93931318010746',
        is_completed: true,
        driver_id: 1,
        passenger_id: 1,
        created_at: new Date('2024-01-30 20:22:44.803012'),
      }),
    );
    expect(rides).toHaveLength(10);
  });

  it('can get all active rides', async () => {
    const rides: Array<Ride> = await service.findWhereActive(true);

    expect(rides).toBeInstanceOf(Array<Ride>);
    expect(rides).toContainEqual(
      new Ride({
        id: 2,
        origin_latitude: '18.490596135413195',
        origin_longitude: '-69.97763326077538',
        destination_latitude: '18.487234641192863',
        destination_longitude: '-70.00017055080171',
        is_completed: false,
        driver_id: 2,
        passenger_id: 2,
        created_at: new Date('2024-01-30 20:22:44.805684'),
      }),
    );
    expect(rides).toHaveLength(5);
  });

  it('can get all inactive rides', async () => {
    const rides: Array<Ride> = await service.findWhereActive(false);

    expect(rides).toBeInstanceOf(Array<Ride>);
    expect(rides).toContainEqual(
      new Ride({
        id: 1,
        origin_latitude: '18.433921976987083',
        origin_longitude: '-69.95092447279306',
        destination_latitude: '18.48564900782328',
        destination_longitude: '-69.93931318010746',
        is_completed: true,
        driver_id: 1,
        passenger_id: 1,
        created_at: new Date('2024-01-30 20:22:44.803012'),
      }),
    );
    expect(rides).toHaveLength(5);
  });
});
