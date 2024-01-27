import { Controller, Get, Param } from '@nestjs/common';
import Driver from 'src/driver/driver';
import { PassengerService } from './passenger.service';
import Passenger from './passenger';

@Controller('passengers')
export class PassengerController {
  constructor(private passengerService: PassengerService) {}

  @Get()
  async findAll(): Promise<Passenger[]> {
    const passengers = await this.passengerService.findAll();

    return passengers;
  }

  @Get(':id')
  async find(@Param() params: { id: number }): Promise<Passenger> {
    const passenger = await this.passengerService.find(params.id);

    return passenger;
  }

  @Get(':id/near-drivers')
  async findNearDrivers(@Param() params: { id: number }): Promise<Driver[]> {
    const drivers = await this.passengerService.findNearDriversByPassengerId(
      params.id,
    );

    return drivers;
  }
}
