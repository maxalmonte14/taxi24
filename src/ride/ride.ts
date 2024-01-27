type Ride = {
  id: number;
  originLatitude: string;
  originLongitude: string;
  destinationLatitude: string;
  destinationLongitude: string;
  isCompleted: boolean;
  driverId: number;
  passengerId: number;
};

export default Ride;
