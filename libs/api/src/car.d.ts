export interface Car {
  readonly make: string;
  readonly model: string;
  readonly year: number;
}

export interface GetCarsResponse {
  readonly cars: Array<Car>;
}
