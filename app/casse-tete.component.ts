import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { CasseTeteService }       from './casse-tete.service';
import { CasseTeteListComponent }       from './casse-tete-list.component';

import { Piece } from './piece';
import { Vignette } from './vignette';

import { InputValues } from './inputValues';

@Component({
  selector: 'casse-tete',
  templateUrl: 'app/dist/templates/casse-tete.html',
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService]
})

export class CasseTeteComponent {

  @Input() puzzle: Piece;
  @Input() parent: CasseTeteListComponent;
  private _realPos: number;


  constructor(
  ) {
    console.info('CasseTete Component Mounted Successfully');
  }

  private _onClick() {


    //alert(this.parent.getFreeSpot());

    let freeSpot = this.parent.getFreeSpot();
    let rowCount = this.parent.getRowCount();
    if(this.puzzle.id - 1 === freeSpot) {
      alert("GO LEFT");
    } else if(this.puzzle.id + 1 === freeSpot) {
      alert("GO RIGHT");
    } else if(this.puzzle.id - rowCount === freeSpot) {
      alert("GO UP");
    } else if(this.puzzle.id + rowCount === freeSpot) {
      alert("GO DOWN");
    } else {

    }


    //alert(this.puzzle.id); 
  }

  ngAfterViewInit() {
    this._realPos = this.puzzle.id;
    document.getElementById("TILE_" + this.puzzle.id).addEventListener("click", 
      _.bind(this._onClick, this));

  }


  setStyles(piece: Piece) {
    let styles = {
      'left': piece.left + 'px',
      'top' : piece.top + 'px',
      'width' : piece.width + 'px',
      'height' : piece.height + 'px',
      'background-position': piece.bgLeft + 'px ' + piece.bgTop + 'px',
      'display' : piece.id === 1 ? 'none' : 'block',
      'background-image': 'url(' + piece.src + ')'

    };
    return styles;
  }




}
