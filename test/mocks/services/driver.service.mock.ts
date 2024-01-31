import { driverDataset } from '../../datasets/driver.dataset';
import { Driver } from '../../../src/driver/entities/driver.entity';

export class DriverServiceMock {
  private readonly driverDataset;

  constructor() {
    this.driverDataset = driverDataset;
  }

  async findAll(): Promise<Driver[]> {
    return Promise.resolve(this.driverDataset);
  }

  async findAvailable(available: boolean): Promise<Driver[]> {
    const result = available
      ? this.driverDataset.filter((driver) => driver.id % 2 == 0)
      : this.driverDataset.filter((driver) => driver.id % 2 != 0);
    return Promise.resolve(result);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findInRadius(latitude: string, longitude: string): Promise<Driver[]> {
    return Promise.resolve(
      this.driverDataset.filter((driver) => driver.id == 4),
    );
  }

  async find(id: number): Promise<Driver> {
    const driver = this.driverDataset.find((driver) => driver.id == id);

    if (!driver) {
      throw new Error(`We could not find a driver with id: ${id}.`);
    }

    return Promise.resolve(driver);
  }
}
