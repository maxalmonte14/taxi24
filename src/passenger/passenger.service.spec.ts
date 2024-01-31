import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let service: PassengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DatabaseService, PassengerService],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
