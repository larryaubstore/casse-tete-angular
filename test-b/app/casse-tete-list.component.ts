import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { CasseTeteService }       from './casse-tete.service';

import { Piece } from './piece';
import { InputValues } from './inputValues';

import { CasseTeteComponent } from './casse-tete.component';
 
@Component({
  selector: 'casse-tete-list',
  templateUrl: 'app/dist/templates/casse-tete-list.html', 
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService],
  directives: [CasseTeteComponent]
}) 
export class CasseTeteListComponent implements OnInit {
  
  puzzles: Piece[]; 

  private sub: any;

  constructor(                                                                                        

    private route: ActivatedRoute,
    private _router: Router, 
    private _casseTeteService: CasseTeteService) {
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

  getInputValues() {

    var row = (<HTMLInputElement>document.getElementById('inputRow')).value;
    var margin = (<HTMLInputElement>document.getElementById('inputMargin')).value;

    var inputValues = new InputValues();

    inputValues.count = +row;
    inputValues.margin = +margin;
    

    return inputValues;

  }

  
//  gotoDetail(casseTete: CasseTete) { 
//    let link = ['CasseTeteList', { id: casseTete.id }];                                                       
//    this._router.navigate(link);
//  } 

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

