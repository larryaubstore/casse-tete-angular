import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { AppComponent }     from './app.component';
import { routing }          from './app.routes';
import { CasseTeteModule }  from './app.casse-tete.module';
import { Logger }           from 'angular2-logger/core';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    CasseTeteModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers:    [ Logger ]
})
export class AppModule { }
