import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [DriverModule, PassengerModule, RideModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
