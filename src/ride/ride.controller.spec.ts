import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { Ride } from './entities/ride.entity';

describe('RideController', () => {
  let controller: RideController;
  let service: RideService;
  const resultset = [
    new Ride({
      id: 1,
      origin_latitude: '18.433921976987083',
      origin_longitude: '-69.95092447279306',
      destination_latitude: '18.48564900782328',
      destination_longitude: '-69.93931318010746',
      driver_id: 1,
      passenger_id: 1,
      is_completed: true,
      created_at: new Date('2024-01-31T19:09:57.820Z'),
    }),
    new Ride({
      id: 2,
      origin_latitude: '18.490596135413195',
      origin_longitude: '-69.97763326077538',
      destination_latitude: '18.487234641192863',
      destination_longitude: '-70.00017055080171',
      driver_id: 2,
      passenger_id: 2,
      is_completed: false,
      created_at: new Date('2024-01-31T19:09:57.823Z'),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [ConfigService, DatabaseService, RideService],
    }).compile();

    controller = module.get<RideController>(RideController);
    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can get all rides', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(resultset));

    expect(controller.findAll(undefined)).resolves.toBe(resultset);
  });

  it('can get all active rides', async () => {
    const result = resultset.filter((ride) => ride.id == 1);

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findAll(undefined)).resolves.toBe(result);
  });

  it('can get all inactive rides', async () => {
    const result = resultset.filter((ride) => ride.id == 2);

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));

    expect(controller.findAll(undefined)).resolves.toBe(result);
  });
});
