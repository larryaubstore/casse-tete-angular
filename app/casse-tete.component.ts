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

    let tileSelector = $("#TILE_" + this.puzzle.id);
    let offset = this.parent.getTileOffsetHeight();

    if(this._realPos - 1 === freeSpot) {
      tileSelector.animate({left : '-=' + this.parent.getTileOffsetWidth()}, 250);
      this.parent.setFreeSpot(this._realPos);
      this._realPos = freeSpot;
    } else if(this._realPos + 1 === freeSpot) {
      tileSelector.animate({left : '+=' + this.parent.getTileOffsetWidth()}, 250);
      this.parent.setFreeSpot(this._realPos);
      this._realPos = freeSpot;
    } else if(this._realPos - rowCount === freeSpot) {
      tileSelector.animate({ top : '-=' + this.parent.getTileOffsetHeight()}, 250);
      this.parent.setFreeSpot(this._realPos);
      this._realPos = freeSpot;
    } else if(this._realPos + rowCount === freeSpot) {
      tileSelector.animate({ top : '+=' + this.parent.getTileOffsetHeight()}, 250);
      this.parent.setFreeSpot(this._realPos);
      this._realPos = freeSpot;
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
