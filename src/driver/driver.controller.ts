import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import Coordinate from 'src/coordinate';
import { Driver } from './entities/driver.entity';
import { DriverService } from './driver.service';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverService.findAll();

    return drivers;
  }

  @Get('available')
  @ApiOperation({ summary: 'Get all available drivers' })
  @ApiOkResponse({
    isArray: true,
    description: 'Request has been successful.',
    type: Driver,
  })
  async findAvailable(): Promise<Driver[]> {
    const drivers = await this.driverService.findAvailable();

    return drivers;
  }

  @Get('in-radius/:latitude/:longitude')
  @ApiOperation({
    parameters: [
      { in: 'path', name: 'latitude' },
      { in: 'path', name: 'longitude' },
    ],
    summary:
      'Get all available drivers in a 3 kms radius from the specified coordinates',
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  async findInRadius(@Param() params: Coordinate): Promise<Driver[]> {
    const drivers = await this.driverService.findInRadius(params);

    return drivers;
  }

  @Get(':id')
  @ApiOperation({
    parameters: [{ in: 'path', name: 'id' }],
    summary: 'Get the driver with the specified id',
  })
  @ApiOkResponse({ description: 'Request has been successful.', type: Driver })
  @ApiNotFoundResponse({
    description: 'We could not find a driver with the specified id.',
  })
  async find(@Param() params: { id: number }): Promise<Driver> {
    const driver = await this.driverService.find(params.id);

    return driver;
  }
}
