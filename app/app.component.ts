import {Component} from '@angular/core';


import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'main',
  directives: [ ROUTER_DIRECTIVES],
  template: `

    <nav>
      <a [routerLink]="['casse-tete/test']">Valeur par défaut</a>
    </nav>


    <router-outlet></router-outlet>
  `

})



export class AppComponent { }
