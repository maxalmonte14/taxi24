import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Driver } from './entities/driver.entity';
import { DriverService } from './driver.service';
import { NotFoundResponse } from 'src/exception/dto/not-found-response.dto';

@ApiTags('drivers')
@Controller('drivers')
@UseInterceptors(ClassSerializerInterceptor)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  @ApiQuery({
    description: 'Filters the resultset by driverLocation.isAvailable',
    name: 'available',
    required: false,
    type: 'boolean',
  })
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  async findAll(@Query('available') available: boolean): Promise<Driver[]> {
    if (available != undefined) {
      return this.driverService.findAvailable(available);
    }

    return this.driverService.findAll();
  }

  @Get('nearby')
  @ApiOperation({
    summary:
      'Get all available drivers in a 3 kms radius from the specified coordinates',
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  async findInRadius(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<Driver[]> {
    return this.driverService.findInRadius(latitude, longitude);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the driver with the specified id' })
  @ApiOkResponse({ description: 'Request has been successful.', type: Driver })
  @ApiNotFoundResponse({
    description: 'We could not find a driver with the specified id.',
    type: NotFoundResponse,
  })
  async find(@Param('id') id: number): Promise<Driver> {
    try {
      return await this.driverService.find(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
