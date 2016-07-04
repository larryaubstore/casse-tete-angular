import {Component} from '@angular/core';

import {CasseTeteAngular} from './casse-tete-angular';
import {CasseTeteComponent} from './casse-tete.component';

import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'main',
  directives: [CasseTeteAngular, CasseTeteComponent, ROUTER_DIRECTIVES],
  template: `

    <nav>
      <a [routerLink]="['casse-tete/test']">Dashboard</a>
    </nav>


    <router-outlet></router-outlet>
  `

})



export class AppComponent { }
