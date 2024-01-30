import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRideDTO } from './dto/create-ride.dto';
import { RideService } from './ride.service';
import { Ride } from './entities/ride.entity';
import { UpdateRideDTO } from './dto/update-ride.dto';

@ApiTags('rides')
@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
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
    return await this.rideService.create(createRideDTO);
  }

  @Put(':id')
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
    @Param('id') id: number,
    @Body() updateRideDTO: UpdateRideDTO,
  ): Promise<Ride> {
    return this.rideService.update(id, updateRideDTO);
  }

  @Get()
  @ApiQuery({
    description: 'Filters the resultset by isCompleted',
    name: 'active',
    required: false,
    type: 'boolean',
  })
  @ApiOperation({ summary: 'Get all the rides' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Ride,
  })
  async findActive(@Query('active') active: boolean): Promise<Ride[]> {
    if (active != undefined) {
      return await this.rideService.findActive(active);
    }

    return await this.rideService.findAll();
  }
}
