import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRideDTO } from './dto/create-ride.dto';
import { GetRidesQueryParams } from './dto/get-rides-query-params.dto';
import { InvalidRequestResponse } from '../exception/dto/invalid-request-response.dto';
import { NotFoundResponse } from '../exception/dto/not-found-response.dto';
import { PatchRideDTO } from './dto/patch-ride.dto';
import { Ride } from './entities/ride.entity';
import { RideService } from './ride.service';

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
  @ApiBadRequestResponse({
    description: 'Request is invalid.',
    type: InvalidRequestResponse,
  })
  async create(@Body() createRideDTO: CreateRideDTO): Promise<Ride> {
    return await this.rideService.create(createRideDTO);
  }

  @Patch(':id')
  @ApiOperation({
    requestBody: { $ref: 'UpdateRideDTO' },
    summary: 'Update a ride',
  })
  @ApiOkResponse({
    description: 'Ride has been updated successfully.',
    type: Ride,
  })
  @ApiBadRequestResponse({
    description: 'Request is invalid.',
    type: InvalidRequestResponse,
  })
  @ApiNotFoundResponse({
    description: 'We could not find a ride with the specified id.',
    type: NotFoundResponse,
  })
  async patch(
    @Param('id') id: number,
    @Body() updateRideDTO: PatchRideDTO,
  ): Promise<Ride> {
    return this.rideService.patch(id, updateRideDTO);
  }

  @Get()
  @ApiQuery({
    description:
      'Filters the resultset by status: pending, active, completed, cancelled',
    name: 'status',
    required: false,
    type: 'RideStatus',
  })
  @ApiOperation({ summary: 'Get all the rides' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Ride,
  })
  async findAll(@Query() params: GetRidesQueryParams): Promise<Ride[]> {
    if (params?.status != undefined) {
      return await this.rideService.findWhereActive(params.status);
    }

    return await this.rideService.findAll();
  }
}
