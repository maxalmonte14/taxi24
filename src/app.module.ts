import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    DriverModule,
    PassengerModule,
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
