import { Expose } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class Ride {
  /**
   * The identifier of the resource
   */
  @IsInt()
  @Min(1)
  id: number;

  /**
   * A valid latitude represented as a floating point number
   * @example 18.4636960171801
   */
  @Expose({ name: 'originLatitude' })
  origin_latitude: string;

  /**
   * A valid longitude represented as a floating point number
   * @example -69.93474882920843
   */
  @Expose({ name: 'originLongitude' })
  origin_longitude: string;

  /**
   * A valid latitude represented as a floating point number
   * @example 18.47553627458603
   */
  @Expose({ name: 'destinationLatitude' })
  destination_latitude: string;

  /**
   * A valid longitude represented as a floating point number
   * @example -69.94349904538785
   */
  @Expose({ name: 'destinationLongitude' })
  destination_longitude: string;

  /**
   * A boolean representing if the ride has been completed
   */
  @Expose({ name: 'isCompleted' })
  is_completed: boolean;

  /**
   * The identifier of the driver associated with this resource
   */
  @Expose({ name: 'driverId' })
  driver_id: number;

  /**
   * The identifier of the passenger associated with this resource
   */
  @Expose({ name: 'passengerId' })
  passenger_id: number;

  constructor(partial: Partial<Ride>) {
    Object.assign(this, partial);
  }
}
