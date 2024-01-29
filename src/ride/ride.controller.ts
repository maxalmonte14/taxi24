import {
  ApiParam,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRideDTO } from './dto/create-ride.dto';
import { RideService } from './ride.service';
import { Ride } from './entities/ride.entity';
import { UpdateRideDTO } from './dto/update-ride.dto';

@ApiTags('rides')
@Controller('rides')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  @ApiOperation({
    requestBody: { $ref: 'CreateRideDTO' },
    summary: 'Create a ride',
  })
  @ApiCreatedResponse({
    description: 'Ride has been created successfully.',
    type: Ride,
  })
  @ApiBadRequestResponse({ description: 'Request is invalid.' })
  async create(@Body() createRideDTO: CreateRideDTO): Promise<Ride> {
    const ride = await this.rideService.create(createRideDTO);

    return ride;
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiOperation({
    requestBody: { $ref: 'UpdateRideDTO' },
    summary: 'Update a ride',
  })
  @ApiOkResponse({
    description: 'Ride has been updated successfully.',
    type: Ride,
  })
  @ApiBadRequestResponse({ description: 'Request is invalid.' })
  async update(
    @Param() params: { id: number },
    @Body() updateRideDTO: UpdateRideDTO,
  ) {
    const ride = await this.rideService.update(params.id, updateRideDTO);

    return ride;
  }

  @Get('active')
  @ApiOperation({
    requestBody: { $ref: 'UpdateRideDTO' },
    summary: 'Get the all the active rides',
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Ride,
  })
  async findActive(): Promise<Ride[]> {
    const rides = await this.rideService.findActive();

    return rides;
  }
}
