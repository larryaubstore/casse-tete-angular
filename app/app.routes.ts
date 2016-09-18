import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CasseTeteListComponent} from './casse-tete-list.component';
import {VignetteListComponent} from './vignette-list.component';

export const appRoutes: Routes = [
  { path: 'casse-tete/:url', component: CasseTeteListComponent  },
  { path: '', component: VignetteListComponent  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
;
