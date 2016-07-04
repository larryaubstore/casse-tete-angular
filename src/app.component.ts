import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {CasseTeteAngular} from './casse-tete-angular';
import {CasseTeteComponent} from './casse-tete.component';
//import {CasseTeteListComponent} from 'casse-tete-list.component';

@Component({
  selector: 'main',
  directives: [ROUTER_DIRECTIVES, CasseTeteAngular, CasseTeteComponent],
  template: `
    <casse-tete></casse-tete>
  `,
  providers: [
    ROUTER_PROVIDERS
  ]

})

@RouteConfig([
  {
    path: '/test',
    name: 'Test',
    component: CasseTeteComponent,
    useAsDefault: true
  }
])

export class AppComponent {
  title = 'CasseTete';
}

