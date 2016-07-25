import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { CasseTeteService }       from './casse-tete.service';

import { Vignette } from './vignette';

import { InputValues } from './inputValues';

@Component({
  selector: 'vignette',
  templateUrl: 'app/dist/templates/casse-tete.html',
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService]
})

export class VignetteComponent {

  @Input() vignette: Vignette; 


  constructor(
  ) {
    console.info('Vignette Component Mounted Successfully');
  }
}
