import 'rxjs/add/operator/map';

import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  carServiceUrl = 'http://localhost:8080/cars';
  cars: Observable<Array<string>>;

  constructor(private http: Http) {}

  ngOnInit() {
    this.cars = this.http.get(this.carServiceUrl).map(res => res.json());
  }
}
