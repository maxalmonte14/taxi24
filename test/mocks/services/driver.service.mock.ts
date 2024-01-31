import { Driver } from '../../../src/driver/entities/driver.entity';

export class DriverServiceMock {
  private readonly dataset: Driver[] = [
    new Driver({
      id: 1,
      name: 'John Doe',
      profile_picture: 'https://randomuser.me/api/portraits/men/76.jpg',
    }),
    new Driver({
      id: 2,
      name: 'Jane Smith',
      profile_picture: 'https://randomuser.me/api/portraits/women/16.jpg',
    }),
    new Driver({
      id: 3,
      name: 'Robert Johnson',
      profile_picture: null,
    }),
    new Driver({
      id: 4,
      name: 'Samantha White',
      profile_picture: 'https://randomuser.me/api/portraits/women/41.jpg',
    }),
    new Driver({
      id: 5,
      name: 'Michael Brown',
      profile_picture: 'https://randomuser.me/api/portraits/men/90.jpg',
    }),
  ];
  async findAll(): Promise<Driver[]> {
    return Promise.resolve(this.dataset);
  }

  async findAvailable(available: boolean): Promise<Driver[]> {
    const result = available
      ? this.dataset.filter((driver) => driver.id % 2 == 0)
      : this.dataset.filter((driver) => driver.id % 2 != 0);
    return Promise.resolve(result);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findInRadius(latitude: string, longitude: string): Promise<Driver[]> {
    return Promise.resolve(this.dataset.filter((driver) => driver.id == 4));
  }

  async find(id: number): Promise<Driver> {
    const driver = this.dataset.find((driver) => driver.id == id);

    if (!driver) {
      throw new Error(`We could not find a driver with id: ${id}.`);
    }

    return Promise.resolve(driver);
  }
}
