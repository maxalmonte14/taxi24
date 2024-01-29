import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
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
    return await this.rideService.findActive();
  }
}
