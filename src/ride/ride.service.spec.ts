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
    expect(rides).toHaveLength(10);
  });

  it('can get all active rides', async () => {
    const rides: Array<Ride> = await service.findWhereActive(true);

    expect(rides).toBeInstanceOf(Array<Ride>);
    expect(rides).toHaveLength(5);
  });

  it('can get all inactive rides', async () => {
    const rides: Array<Ride> = await service.findWhereActive(false);

    expect(rides).toBeInstanceOf(Array<Ride>);
    expect(rides).toHaveLength(5);
  });
});
