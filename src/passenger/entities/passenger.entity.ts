import { IsInt, IsUrl, Min } from 'class-validator';

export class Passenger {
  /**
   * The identifier of the resource
   */
  @IsInt()
  @Min(1)
  id: number;

  /**
   * The full name of the passenger
   * @example John Doe
   */
  name: string;

  /**
   * A URL pointing to an image file
   * @example https://example.com/picture.jpeg
   */
  @IsUrl()
  profilePicture?: string;
}
