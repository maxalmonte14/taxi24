import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({
  controllers: [PassengerController],
  imports: [DatabaseModule],
  providers: [PassengerService],
})
export class PassengerModule {}
