import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import { PassengerService } from './passenger.service';

@ApiTags('passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all passengers' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Passenger,
  })
  async findAll(): Promise<Passenger[]> {
    const passengers = await this.passengerService.findAll();

    return passengers;
  }

  @Get(':id')
  @ApiOperation({
    parameters: [{ in: 'path', name: 'id', required: true }],
    summary: 'Get the passenger with the specified id',
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    type: Passenger,
  })
  @ApiNotFoundResponse({
    description: 'We could not find a passenger with the specified id.',
  })
  async find(@Param() params: { id: number }): Promise<Passenger> {
    const passenger = await this.passengerService.find(params.id);

    return passenger;
  }

  @Get(':id/near-drivers')
  @ApiOperation({
    parameters: [{ in: 'path', name: 'id', required: true }],
    summary: "Get the three drivers nearest to the passenger's location",
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  @ApiNotFoundResponse({
    description: 'We could not find a passenger with the specified id.',
  })
  async findNearDrivers(@Param() params: { id: number }): Promise<Driver[]> {
    const drivers = await this.passengerService.findNearDriversByPassengerId(
      params.id,
    );

    return drivers;
  }
}
