import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';

import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ICar, GetCarsResponse} from 'cars/libs/api/src/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  carServiceUrl = 'http://localhost:8080/cars';
  carsDisplayStrings: Observable<Array<string>> = this.http
    .get(this.carServiceUrl)
    // Retry if the call fails since the server may be starting up
    .retryWhen(errors => errors.delay(3000).take(3))
    .map(res => GetCarsResponse.create(res.json()))
    .map((getCarsReponse: GetCarsResponse) =>
      getCarsReponse.cars.map(car => `${car.make} - ${car.model} - ${car.year}`),
    );

  constructor(private http: Http) {}
}
