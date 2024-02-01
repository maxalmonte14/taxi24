import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let module: TestingModule;
  let service: DatabaseService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [ConfigService, DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await module.close();
  });
});
