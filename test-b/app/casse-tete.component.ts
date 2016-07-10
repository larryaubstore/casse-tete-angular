import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class CasseTeteComponent implements OnInit, OnDestroy {

  puzzles: Piece[]; 

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _casseTeteService:  CasseTeteService
  ) {
    console.info('CasseTete Component Mounted Successfully');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

       let url = params['url']; // (+) converts string 'id' to a number
       console.log(url);
       let list = this._casseTeteService.getList();

       var scope = this;
       this._casseTeteService.getPieces(100, 100, 16, 9, 'assets/css/20110403143837_rouedentelee.jpg')
        .then(function(puzzles) { 
          scope.puzzles = puzzles;
          console.log(JSON.stringify(scope.puzzles));
        });
     });
  }

      //left : {{item.left}}px;top: {{item.top}}px;width: {{item.width}}px; height: {{item.height}}px;

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

  getInputValues() {

    var row = (<HTMLInputElement>document.getElementById('inputRow')).value;
    var margin = (<HTMLInputElement>document.getElementById('inputMargin')).value;

    var inputValues = new InputValues();

    inputValues.count = +row;
    inputValues.margin = +margin;
    

    return inputValues;
//    return InputValues { 
//      count : row;
//      margin: margin;
//      width: 0;
//      height: 0;          
//    };

  }

  onKeyRow(event:any) {

    //var row = +event.target.value;
    //console.log("row ==> " + row);

    var inputValues = this.getInputValues();
    var scope = this;
    this._casseTeteService.getPieces(100, 
                                     100, 
                                     inputValues.count, 
                                     inputValues.margin, 
                                     'assets/css/20110403143837_rouedentelee.jpg')
     .then(function(puzzles) { 
       scope.puzzles = puzzles;
       console.log(JSON.stringify(scope.puzzles));
     });
  }

  onKeyMargin(event:any) {

    //var margin = +event.target.value;
    //console.log("margin ==> " + margin);
    
    var inputValues = this.getInputValues();
    var scope = this;
    this._casseTeteService.getPieces(100, 
                                     100, 
                                     inputValues.count, 
                                     inputValues.margin,
                                     'assets/css/20110403143837_rouedentelee.jpg')
     .then(function(puzzles) { 
       scope.puzzles = puzzles;
       console.log(JSON.stringify(scope.puzzles));
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
