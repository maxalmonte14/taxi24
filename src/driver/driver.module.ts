import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  controllers: [DriverController],
  imports: [DatabaseModule],
  providers: [DriverService],
})
export class DriverModule {}
