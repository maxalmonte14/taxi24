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
  originLatitude: string;

  /**
   * A valid longitude represented as a floating point number
   * @example -69.93474882920843
   */
  originLongitude: string;

  /**
   * A valid latitude represented as a floating point number
   * @example 18.47553627458603
   */
  destinationLatitude: string;

  /**
   * A valid longitude represented as a floating point number
   * @example -69.94349904538785
   */
  destinationLongitude: string;

  /**
   * A boolean representing if the ride has been completed
   */
  isCompleted: boolean;

  /**
   * The identifier of the driver associated with this resource
   */
  @IsInt()
  @Min(1)
  driverId: number;

  /**
   * The identifier of the passenger associated with this resource
   */
  @IsInt()
  @Min(1)
  passengerId: number;
}
