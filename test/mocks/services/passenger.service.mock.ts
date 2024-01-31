import { Invoice } from '../../../src/invoice/entities/invoice.entity';
import { Driver } from '../../../src/driver/entities/driver.entity';
import { Passenger } from '../../../src/passenger/entities/passenger.entity';
import { Ride } from '../../../src/ride/entities/ride.entity';
import { driverDataset } from '../../datasets/driver.dataset';
import { invoiceDataset } from '../../datasets/invoice.dataset';
import { passengerDataset } from '../../datasets/passenger.dataset';
import { rideDataset } from '../../datasets/ride.dataset';

export class PassengerServiceMock {
  private readonly passengerDataset: Passenger[];
  private readonly invoiceDataset: Invoice[];
  private readonly rideDataset: Ride[];
  private readonly driverDataset: Driver[];

  constructor() {
    this.driverDataset = driverDataset;
    this.invoiceDataset = invoiceDataset;
    this.passengerDataset = passengerDataset;
    this.rideDataset = rideDataset;
  }

  async findAll(): Promise<Passenger[]> {
    return Promise.resolve(this.passengerDataset);
  }

  async find(id: number): Promise<Passenger> {
    const passenger = this.passengerDataset.find(
      (passenger) => passenger.id == id,
    );

    if (!passenger) {
      throw new Error(`We could not find a passenger with id: ${id}.`);
    }

    return Promise.resolve(passenger);
  }

  async findNearDriversByPassengerId(passengerId: number): Promise<Driver[]> {
    const driver = this.passengerDataset.find(
      (passenger) => passenger.id == passengerId,
    );

    if (!driver) {
      throw new Error(`We could not find a passenger with id: ${passengerId}.`);
    }

    return this.driverDataset.filter((driver) => driver.id == 4);
  }

  async findInvoicesByPassengerId(passengerId: number): Promise<Invoice[]> {
    const driver = this.passengerDataset.find(
      (passenger) => passenger.id == passengerId,
    );

    if (!driver) {
      throw new Error(`We could not find a passenger with id: ${passengerId}.`);
    }

    const rideIds = this.rideDataset
      .filter((ride) => ride.passenger_id == passengerId)
      .map((ride) => ride.id);
    const invoices = this.invoiceDataset.filter((invoice) =>
      rideIds.includes(invoice.ride_id),
    );

    return Promise.resolve(invoices);
  }
}
