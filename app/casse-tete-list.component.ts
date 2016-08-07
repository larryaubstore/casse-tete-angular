import { Component, OnInit, OnDestroy, AfterViewInit }  from '@angular/core';
import { Router, ActivatedRoute }                       from '@angular/router';
import { CasseTeteService }                             from './casse-tete.service';

import { Piece }                                        from './piece';
import { Vignette }                                     from './vignette';
import { InputValues }                  from './inputValues';

import { CasseTeteComponent }           from './casse-tete.component';
import { VignetteComponent }            from './vignette.component';
import { ImageNatural }                 from './imagenatural';
 
@Component({
  selector: 'casse-tete-list',
  templateUrl: 'app/dist/templates/casse-tete-list.html', 
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService],
  directives: [CasseTeteComponent, VignetteComponent]
}) 
export class CasseTeteListComponent implements OnInit, AfterViewInit {
  
  puzzles: Piece[];
  vignettes: Vignette[]; 
  me: CasseTeteListComponent;
  countererrors: number;

  private sub: any;
  private _url: string;
  private _resizeTimeout: any;
  private _freeSpot: number;
  private _rowCount: number;
  private _tileOffsetWidth: number;
  private _tileOffsetHeight:number;

  constructor(                                                                                        

    private route: ActivatedRoute,
    private _router: Router,
    private _casseTeteService: CasseTeteService) {

  } 
  
  getRandomInt(min: number, max:number) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

  getFreeSpot() {
    return this._freeSpot;
  }

  setFreeSpot(value: number) {
    this._freeSpot = value;
  }

  getRowCount() {
    return this._rowCount + 1;
  }

  getTileOffsetWidth() {
    return this._tileOffsetWidth;
  }

  getTileOffsetHeight() {
    return this._tileOffsetHeight;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

       this.me = this;
       this.countererrors = 0;
       this._freeSpot = 1;
       this._url = decodeURIComponent(params['url']); // (+) converts string 'id' to a number

       let marker = this._url.indexOf('?');
       this._url = this._url.substr(0, marker);

       let list = this._casseTeteService.getList();

       var scope = this;

       var inputValues = new InputValues();
       inputValues.width = 150;
       inputValues.height = 105;
       inputValues.count = 80;
       inputValues.margin = 2;
       inputValues.scale = 100;


       let totalWidth = ( <HTMLElement>document.getElementsByClassName("col-md-10")[0]).offsetWidth;
       let fitWidth = Math.floor(totalWidth / inputValues.count);

       console.log("fitWidth ==> " + fitWidth);




       var randomInt = +this.getRandomInt(0, list.length);
       var imageSrc = this._url;

   
       var inputValues = this.getInputValues();
       var scope = this;
       var p1 = scope._casseTeteService.getPieces(inputValues, this._url);
       var p2 = scope._casseTeteService.getTileOffset(inputValues, this._url);


       Promise.all([p1, p2]).then(function(values: any) { 
         scope.puzzles = values[0];
         scope._tileOffsetWidth = values[1].tileOffsetWidth;
         scope._tileOffsetHeight = values[1].tileOffsetHeight;
         scope._rowCount = Math.floor(inputValues.count / 4);
        });


       window.addEventListener("resize", _.bind(this.resize, this)); 
     });

  }


  ngAfterViewInit() {
    console.log('AfterViewInit');
    $("#inputRow").slider().on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');
    $("#inputMargin").slider().on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');
    $("#inputWidth").slider().on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');
    $("#inputHeight").slider().on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');

    $("#inputScale").slider().on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');
    this.resize();


  }

  checkErrors() {

    var count = 0;
    for(var i = 0; i < this.puzzles.length; i++) {

      if(!this.puzzles[i].isCorrect()) {
        count++;
      }

    }

    return count;
  }

  resize() {

    if(this._resizeTimeout) clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(_.bind(function () {

      this.countererrors = this.checkErrors();
      let inputValues = this.getInputValues();
      let totalWidth = ( <HTMLElement>document.getElementsByClassName("col-md-10")[0]).clientWidth;
      let totalHeight = ( <HTMLElement>document.getElementsByTagName("body")[0]).clientHeight;

      console.log("resize");
      console.log(totalWidth);
      console.log(totalHeight);




      var scope = this;
      this._casseTeteService.getImageNatural(this._url)
        .then(function(imageNatural: ImageNatural) {


          if(imageNatural.width >= totalWidth) {
            let factor = Math.floor(totalWidth / imageNatural.width * 100 - 20);
            console.log("FACTOR ==> "  + factor);
            inputValues.scale = factor;
            var p1 = scope._casseTeteService.getPieces(inputValues, scope._url);
            var p2 = scope._casseTeteService.getTileOffset(inputValues, scope._url);
            Promise.all([p1, p2]).then(function(values: any) { 
              scope.puzzles = values[0];
              scope._tileOffsetWidth = values[1].tileOffsetWidth;
              scope._tileOffsetHeight = values[1].tileOffsetHeight;

              scope._rowCount = Math.floor(inputValues.count / 4);
              $("#puzzle").removeClass("invisible");
            });
          } else {
            let factor = Math.floor(totalHeight / imageNatural.height * 100 - 20);
            console.log("FACTOR ==> "  + factor);
            inputValues.scale = factor;

            var p1 = scope._casseTeteService.getPieces(inputValues, scope._url);
            var p2 = scope._casseTeteService.getTileOffset(inputValues, scope._url);


            Promise.all([p1, p2]).then(function(values: any) { 
              scope.puzzles = values[0];
              scope._tileOffsetWidth = values[1].tileOffsetWidth;
              scope._tileOffsetHeight = values[1].tileOffsetHeight;

              scope._rowCount = Math.floor(inputValues.count / 4);
              $("#puzzle").removeClass("invisible");
            });

          }

        });


    }, this), 500);


  } 


  getInputValues() {

    var row = (<HTMLInputElement>document.getElementById('inputRow')).value;
    var margin = (<HTMLInputElement>document.getElementById('inputMargin')).value;
    var width = (<HTMLInputElement>document.getElementById('inputWidth')).value;
    var height = (<HTMLInputElement>document.getElementById('inputHeight')).value;
    var scale = (<HTMLInputElement>document.getElementById('inputScale')).value;

    var inputValues = new InputValues();

    inputValues.count = +row;
    inputValues.margin = +margin;
    inputValues.width = +width;
    inputValues.height = +height;
    inputValues.scale = +scale;
    

    return inputValues;

  }

  onKeyRow(event:any) {
    var inputValues = this.getInputValues();
    var scope = this;
    var p1 = scope._casseTeteService.getPieces(inputValues, this._url);
    var p2 = scope._casseTeteService.getTileOffset(inputValues, this._url);


    Promise.all([p1, p2]).then(function(values: any) { 
      scope.puzzles = values[0];
      scope._tileOffsetWidth = values[1].tileOffsetWidth;
      scope._tileOffsetHeight = values[1].tileOffsetHeight;
      scope._rowCount = Math.floor(inputValues.count / 4);
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


} 

