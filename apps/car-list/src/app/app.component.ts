import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';

import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as blah from 'cars/libs/api/src/car';

console.log(blah);
debugger;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  carServiceUrl = 'http://localhost:8080/cars';
  cars: Observable<Array<blah.ICar>>;
  // = this.http
  //   .get(this.carServiceUrl)
  //   // Retry if the call fails since the server may be starting up
  //   .retryWhen(errors => errors.delay(3000).take(3))
  //   .map(res => GetCarsResponse.encode(res.json()))
  //   .map((getCarsReponse: GetCarsResponse) => getCarsReponse.cars);

  constructor(private http: Http) {}
}
