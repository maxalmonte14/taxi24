import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppStatus } from './app-status.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const result = appController.status();

      expect(result).toBeInstanceOf(AppStatus);
      expect(result.status).toBe('up');
    });
  });
});
