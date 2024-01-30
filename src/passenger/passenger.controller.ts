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
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from './entities/passenger.entity';
import { PassengerService } from './passenger.service';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { NotFoundResponse } from 'src/exception/dto/not-found-response.dto';

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
    type: NotFoundResponse,
  })
  async find(@Param('id') id: number): Promise<Passenger> {
    try {
      return await this.passengerService.find(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
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
    type: NotFoundResponse,
  })
  async findNearDrivers(@Param('id') id: number): Promise<Driver[]> {
    try {
      return await this.passengerService.findNearDriversByPassengerId(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id/invoices')
  @ApiOperation({ summary: 'Get all invoices belonging to a given passenger.' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    isArray: true,
    type: Invoice,
  })
  @ApiNotFoundResponse({
    description: 'We could not find a passenger with the specified id.',
    type: NotFoundResponse,
  })
  async findInvoicesByPassengerId(@Param('id') id: number): Promise<Invoice[]> {
    try {
      return await this.passengerService.findInvoicesByPassengerId(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
