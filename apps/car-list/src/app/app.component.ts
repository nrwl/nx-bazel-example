import 'rxjs/add/operator/map';

import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GetCarsResponse, Car} from '../../../../libs/api/src/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  carServiceUrl = 'http://localhost:8080/cars';
  cars: Observable<Array<Car>> = this.http
    .get(this.carServiceUrl)
    .map(res => res.json())
    .map((getCardReponse: GetCarsResponse) => getCardReponse.cars);

  constructor(private http: Http) {}
}
