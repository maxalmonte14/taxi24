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
  UseInterceptors,
} from '@nestjs/common';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import { PassengerService } from './passenger.service';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@ApiTags('passengers')
@Controller('passengers')
@UseInterceptors(ClassSerializerInterceptor)
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all passengers' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Passenger,
  })
  async findAll(): Promise<Passenger[]> {
    return this.passengerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the passenger with the specified id' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    type: Passenger,
  })
  @ApiNotFoundResponse({
    description: 'We could not find a passenger with the specified id.',
  })
  async find(@Param('id') id: number): Promise<Passenger> {
    return this.passengerService.find(id);
  }

  @Get(':id/near-drivers')
  @ApiOperation({
    summary: "Get the three drivers nearest to the passenger's location",
  })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Driver,
  })
  @ApiNotFoundResponse({
    description: 'We could not find a passenger with the specified id.',
  })
  async findNearDrivers(@Param('id') id: number): Promise<Driver[]> {
    return this.passengerService.findNearDriversByPassengerId(id);
  }

  @Get(':id/invoices')
  @ApiOperation({ summary: 'Get all invoices belonging to a given passenger.' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Invoice,
  })
  async findInvoicesByPassengerId(@Param('id') id: number): Promise<Invoice[]> {
    return this.passengerService.findInvoicesByPassengerId(id);
  }
}
