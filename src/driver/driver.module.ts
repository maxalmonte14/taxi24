import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [DriverController],
  imports: [DatabaseModule],
  providers: [DriverService],
})
export class DriverModule {}
