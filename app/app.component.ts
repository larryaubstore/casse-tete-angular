import {Component} from '@angular/core';




@Component({
  selector: 'main',
  template: `

    <nav>
      <a style='display:none' routerLink='casse-tete/test'>Valeur par défaut</a>
    </nav>

    <router-outlet></router-outlet>
  `

})



export class AppComponent { }
