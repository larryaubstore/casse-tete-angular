import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import { AppComponent }     from './app.component';

import { routing }          from './app.routes';

import { CasseTeteModule }  from './app.casse-tete.module';

@NgModule({
  imports: [ 
    BrowserModule,
    routing,
    CasseTeteModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
