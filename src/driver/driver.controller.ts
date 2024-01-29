import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Driver } from './entities/driver.entity';
import { DriverService } from './driver.service';

@ApiTags('drivers')
@Controller('drivers')
@UseInterceptors(ClassSerializerInterceptor)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all drivers',
    parameters: [{ name: 'available', in: 'query', required: false }],
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  async findAll(@Query() query): Promise<Driver[]> {
    if (query?.available === 'true') {
      return this.driverService.findAvailable();
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
  @ApiOperation({
    summary: 'Get the driver with the specified id',
  })
  @ApiOkResponse({ description: 'Request has been successful.', type: Driver })
  @ApiNotFoundResponse({
    description: 'We could not find a driver with the specified id.',
  })
  async find(@Param('id', ParseIntPipe) id: number): Promise<Driver> {
    return this.driverService.find(id);
  }
}
