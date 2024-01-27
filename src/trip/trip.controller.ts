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
import CreateTripDTO from './dto/create-trip-dto';
import { TripService } from './trip.service';
import Trip from './trip';
import UpdateTripDTO from './dto/update-trip-dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTripDTO: CreateTripDTO): Promise<Trip> {
    const trip = await this.tripService.create(createTripDTO);

    return trip;
  }

  @Put(':id')
  async update(
    @Param() params: { id: number },
    @Body() updateTripDTO: UpdateTripDTO,
  ) {
    const trip = await this.tripService.update(params.id, updateTripDTO);

    return trip;
  }

  @Get('active')
  async findActive(): Promise<Trip[]> {
    const trips = await this.tripService.findActive();

    return trips;
  }
}
