import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { CasseTeteListComponent }   from './casse-tete-list.component';
import { VignetteComponent }        from './vignette.component';
import { CasseTeteComponent }       from './casse-tete.component';

import { VignetteListComponent }    from './vignette-list.component';
import { CasseTeteService }         from './casse-tete.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CasseTeteListComponent,
    VignetteComponent,
    CasseTeteComponent,
    VignetteListComponent
  ],
  providers: [

    CasseTeteService
  ]
})


export class CasseTeteModule {}



