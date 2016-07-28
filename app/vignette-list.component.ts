import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { CasseTeteService }       from './casse-tete.service';

import { Vignette } from './vignette';


@Component({
  selector: 'vignette-list',
  templateUrl: 'app/dist/templates/vignettes.html',
  styleUrls: ['assets/css/puzzle.css'],
  providers: []
})

export class VignetteListComponent {



  constructor(
  ) {
    console.info('Vignette List Component Mounted Successfully');
  }
}
