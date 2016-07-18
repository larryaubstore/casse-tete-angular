import { provideRouter, RouterConfig } from '@angular/router';

import {CasseTeteComponent} from './casse-tete.component';
import {CasseTeteListComponent} from './casse-tete-list.component';

export const routes: RouterConfig = [
  { path: 'casse-tete/:url', component: CasseTeteListComponent  },
  { path: '', component: CasseTeteListComponent  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
