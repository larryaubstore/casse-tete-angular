import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { CasseTeteService }       from './casse-tete.service';

import { Piece } from './piece';
import { InputValues } from './inputValues';

@Component({
  selector: 'casse-tete',
  templateUrl: 'app/dist/templates/casse-tete.html',
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService]
})

export class CasseTeteComponent {

  @Input() puzzle: Piece; 


  constructor(
  ) {
    console.info('CasseTete Component Mounted Successfully');
  }



  setStyles(piece: Piece) {
    let styles = {
      'left': piece.left + 'px',
      'top' : piece.top + 'px',
      'width' : piece.width + 'px',
      'height' : piece.height + 'px',
      'background-position': piece.bgLeft + 'px ' + piece.bgTop + 'px',
      'display' : piece.id === 1 ? 'none' : 'block'

    };
    return styles;
  }




}
