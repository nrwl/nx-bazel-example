import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NxModule} from '@nrwl/nx';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [BrowserModule, NxModule.forRoot(), HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
