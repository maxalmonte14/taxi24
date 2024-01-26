import { Controller, Get, Param } from '@nestjs/common';
import Driver from './driver';
import { DriverService } from './driver.service';
import Coordinate from 'src/coordinate';

@Controller('drivers')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Get()
  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverService.findAll();

    return drivers;
  }

  @Get('available')
  async findAvailable(): Promise<Driver[]> {
    const drivers = await this.driverService.findAvailable();

    return drivers;
  }

  @Get('in-radius/:latitude/:longitude')
  async findInRadius(@Param() params: Coordinate): Promise<Driver[]> {
    const drivers = await this.driverService.findInRadius(params);

    return drivers;
  }

  @Get(':id')
  async find(@Param() params: { id: number }): Promise<Driver> {
    const driver = await this.driverService.find(params.id);

    return driver;
  }
}
