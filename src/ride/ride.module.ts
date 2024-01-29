import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';

@Module({
  controllers: [RideController],
  imports: [DatabaseModule],
  providers: [RideService],
})
export class RideModule {}
