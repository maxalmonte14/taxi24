import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateRideDTO from './dto/create-ride-dto';
import { RideService } from './ride.service';
import Ride from './ride';
import UpdateRideDTO from './dto/update-ride-dto';

@Controller('rides')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRideDTO: CreateRideDTO): Promise<Ride> {
    const ride = await this.rideService.create(createRideDTO);

    return ride;
  }

  @Put(':id')
  async update(
    @Param() params: { id: number },
    @Body() updateRideDTO: UpdateRideDTO,
  ) {
    const ride = await this.rideService.update(params.id, updateRideDTO);

    return ride;
  }

  @Get('active')
  async findActive(): Promise<Ride[]> {
    const rides = await this.rideService.findActive();

    return rides;
  }
}
