import {
  ApiBadRequestResponse,
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
import { FindInRadiusQueryParams } from './dto/find-in-radius-query-params.dto';
import { InvalidRequestResponse } from '../exception/dto/invalid-request-response.dto';
import { NotFoundResponse } from '../exception/dto/not-found-response.dto';

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
      return this.driverService.findAvailable(
        available.toString() == 'true' ? true : false,
      );
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
  @ApiBadRequestResponse({
    description: 'Request is invalid.',
    type: InvalidRequestResponse,
  })
  async findInRadius(
    @Query() params: FindInRadiusQueryParams,
  ): Promise<Driver[]> {
    return this.driverService.findInRadius(params.latitude, params.longitude);
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
