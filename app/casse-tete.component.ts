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



  constructor(
  ) {
    console.info('CasseTete Component Mounted Successfully');
  }

  ngOnInit() {
    this.puzzle.realPos = this.puzzle.id;
  }

  public manualClick() {
    this._onClick(null, true);
  }



  private _onClick(event: any, dontAnimate: boolean) {

    let freeSpot = this.parent.getFreeSpot();
    let rowCount = this.parent.getRowCount();

    let tileSelector = $("#TILE_" + this.puzzle.id + ",#REALPOS_" + this.puzzle.id);
    let offset = this.parent.getTileOffsetHeight();
    var currentLeft = tileSelector.position().left;
    var currentTop = tileSelector.position().top;

    if(this.puzzle.realPos - 1 === freeSpot && 
      this.parent.getRow(this.puzzle.realPos) === this.parent.getRow(freeSpot)) {

      this.parent.moveControlPanel(currentLeft, currentTop);
      if(typeof(dontAnimate) !== "undefined") {
        tileSelector.css("left",  currentLeft - this.parent.getTileOffsetWidth() + "px");
      } else { 
        tileSelector.animate({left : '-=' + this.parent.getTileOffsetWidth()}, 250);
      }
      this.parent.setFreeSpot(this.puzzle.realPos);
      this.puzzle.realPos = freeSpot;
    } else if(this.puzzle.realPos + 1 === freeSpot &&
             this.parent.getRow(this.puzzle.realPos) === this.parent.getRow(freeSpot)) {
      this.parent.moveControlPanel(currentLeft, currentTop);
      if(typeof(dontAnimate) !== "undefined") {
        tileSelector.css("left",  currentLeft + this.parent.getTileOffsetWidth() + "px");
      } else { 
        tileSelector.animate({left : '+=' + this.parent.getTileOffsetWidth()}, 250);
      }
      this.parent.setFreeSpot(this.puzzle.realPos);
      this.puzzle.realPos = freeSpot;
    } else if(this.puzzle.realPos - rowCount === freeSpot &&
     Math.abs(this.parent.getRow(this.puzzle.realPos) - this.parent.getRow(freeSpot)) === 1 &&
            this.parent.getCol(this.puzzle.realPos) === this.parent.getCol(freeSpot)) {
      /**/
      this.parent.moveControlPanel(currentLeft, currentTop);
      if(typeof(dontAnimate) !== "undefined") {
        tileSelector.css("top",  currentTop - this.parent.getTileOffsetHeight() + "px");
      } else { 
        tileSelector.animate({ top : '-=' + this.parent.getTileOffsetHeight()}, 250);
      }
      this.parent.setFreeSpot(this.puzzle.realPos);
      this.puzzle.realPos = freeSpot;
      /**/
    } else if(this.puzzle.realPos + rowCount === freeSpot && 
      Math.abs(this.parent.getRow(this.puzzle.realPos) - this.parent.getRow(freeSpot)) === 1 &&
             this.parent.getCol(this.puzzle.realPos) === this.parent.getCol(freeSpot)) {
      this.parent.moveControlPanel(currentLeft, currentTop );
      if(typeof(dontAnimate) !== "undefined") {
        tileSelector.css("top",  currentTop + this.parent.getTileOffsetHeight() + "px");
      } else { 
        tileSelector.animate({ top : '+=' + this.parent.getTileOffsetHeight()}, 250);
      }
      this.parent.setFreeSpot(this.puzzle.realPos);
      this.puzzle.realPos = freeSpot;
    } else {

    }

    this.parent.checkErrors();
  }


  getSelector() {
    return document.getElementById("TILE_" + this.puzzle.id);
  }

  ngAfterViewInit() {
    document.getElementById("TILE_" + this.puzzle.id).addEventListener("click", 
      _.bind(this._onClick, this));
  
    document.getElementById("REALPOS_" + this.puzzle.id).addEventListener("click", 
      _.bind(this._onClick, this));

    this.parent.addChildren(this);


  }

  showOriginal() {
    //this.getSelector().style.width = this.puzzle.fullWidth + 'px';
    //this.getSelector().style.height = this.puzzle.fullHeight + 'px';

    $("#TILE_" + this.puzzle.id).removeClass("border");
    $("#TILE_" + this.puzzle.id).addClass("noborder");

  }

  showPuzzle() {
    $("#TILE_" + this.puzzle.id).addClass("border");
    $("#TILE_" + this.puzzle.id).removeClass("noborder");

  }

  setStyles(piece: Piece) {
    console.log("SET STYLE");
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

  setStylesReal(piece: Piece) {
    let styles = {
      'left': piece.left + 'px',
      'top' : piece.top + 'px',
      'width' : piece.width + 'px',
      'height' : piece.height + 'px',
      'line-height': piece.height + 'px',
      'text-align': 'center'
      //'display' : piece.id === 1 ? 'none' : 'block',
      //'zIndex': piece.id === 1 ? 0 : 1000
      //'zIndex': 0
    };
    return styles;
  };
}
