import { Component,
         OnInit,
         AfterViewInit }                from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import { Piece }                        from './piece';
import { Vignette }                     from './vignette';
import { InputValues }                  from './inputValues';

import { CasseTeteComponent }           from './casse-tete.component';
import { ImageNatural }                 from './imagenatural';

import { CasseTeteService }             from './casse-tete.service';

@Component({
  selector: 'casse-tete-list',
  templateUrl: 'app/dist/templates/casse-tete-list.html',
  styleUrls: ['assets/css/puzzle.css']
})
export class CasseTeteListComponent implements OnInit, AfterViewInit {

  puzzles: Piece[];
  vignettes: Vignette[];
  me: CasseTeteListComponent;
  countererrors: number;
  totalWidth: number;
  imageTotalWidth: number;
  noborder: boolean;
  fullscreen: boolean;
  showpos: boolean;

  private _sub: any;
  private _url: string;
  private _resizeTimeout: any;
  private _freeSpot: number;
  private _rowCount: number;
  private _tileOffsetWidth: number;
  private _tileOffsetHeight: number;
  private _children: CasseTeteComponent[];

  constructor(

    private route: ActivatedRoute,
    private _router: Router,
    private _casseTeteService: CasseTeteService) {

      this.puzzles = [];
      this._children = [];

  }

  getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

  getTotalWidth() {
    return this.imageTotalWidth + 'px';
  }

  getFreeSpot() {
    return this._freeSpot;
  }

  getControlPanel() {
    let element =  <HTMLElement>document.getElementsByClassName('controlpanel')[0];
    return element;
  }


  moveControlPanel(x: number, y: number) {

    let controlPanel = this.getControlPanel();
    controlPanel.style.left = x + "px";
    controlPanel.style.top = y + "px";
  }

  setFreeSpot(value: number) {
    this._freeSpot = value;
    let controlPanel = this.getControlPanel();
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
    this._sub = this.route.params.subscribe(params => {

       this.me = this;
       this.countererrors = 0;
       this.imageTotalWidth = 0;
       this._freeSpot = 1;
       this._url = decodeURIComponent(params['url']); // (+) converts string 'id' to a number
       this.noborder = true;
       this.fullscreen = true;
       this.showpos = false;

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


       this.totalWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); 
       let fitWidth = Math.floor(this.totalWidth / inputValues.count);

       console.log("fitWidth ==> " + fitWidth);




       var randomInt = +this.getRandomInt(0, list.length);
       var imageSrc = this._url;

   
       var inputValues = this.getInputValues();
       var scope = this;
       var p1 = scope._casseTeteService.getPieces(inputValues, this._url);
       var p2 = scope._casseTeteService.getTileOffset(inputValues, this._url);


       Promise.all([p1, p2]).then(function(values: any) { 
         scope.puzzles = values[0].puzzles;
         scope._tileOffsetWidth = values[1].tileOffsetWidth;
         scope._tileOffsetHeight = values[1].tileOffsetHeight;
         scope._rowCount = Math.floor(inputValues.count / 4);
        });


       window.addEventListener("resize", _.bind(this.resize, this)); 
     });

  }


  ngAfterViewInit() {
    console.log('AfterViewInit');

    var inputRowSlider = $("#inputRow").slider();
    inputRowSlider.on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');

    var inputMarginSlider = $("#inputMargin").slider();
    inputMarginSlider.on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');


    var inputWidthSlider = $("#inputWidth").slider();
    inputWidthSlider.on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');
        

    var inputHeightSlider = $("#inputHeight").slider();
    inputHeightSlider.on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');

    var inputScaleSlider = $("#inputScale").slider();
    inputScaleSlider.on('slide', _.bind(function(event: any) {
          this.onKeyRow(event);
          console.log(event.value);   
        }, this))
        .data('slider');


    inputRowSlider.slider('destroy');
    inputMarginSlider.slider('destroy');
    inputWidthSlider.slider('destroy');
    inputHeightSlider.slider('destroy');
    inputScaleSlider.slider('destroy');

    $("#inputRow").hide();
    $("#inputMargin").hide();
    $("#inputWidth").hide();
    $("#inputHeight").hide();
    $("#inputScale").hide();



    document.getElementById('noborder').addEventListener('click', _.bind(function(event: any) {
      this.noborder = false;
      this.showOriginal();
    }, this));

    document.getElementById('withborder').addEventListener('click', _.bind(function(event: any) {
      this.noborder = true;
      this.showPuzzle();
    }, this));

    document.getElementById('showpos').addEventListener('click', _.bind(function(event: any) {
      this.showpos = false;
    }, this));

    document.getElementById('dontshowpos').addEventListener('click', _.bind(function(event: any) {
      this.showpos = true;
    }, this));

    document.getElementById('fullscreen').addEventListener('click', _.bind(function(event: any) {
      let element =  <HTMLElement>document.getElementsByClassName("col-md-2")[0];
      let containerElement =  <HTMLElement>document.getElementsByClassName("container-fluid")[0];
      containerElement.className = "container-fluid fullscreen";
      element.style.display = "none";
      this.fullscreen = true;

      document.getElementById('maincontainer').className = 'col-md-12';
      this.resize();
    }, this));


    this.resize();

  }

  randomIntFromInterval(min:number,max:number) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  shuffle() {
    let random = 0;
    for(var i = 0; i < this._children.length * 8; i++) {
      random = this.randomIntFromInterval(2, this._children.length);
      console.log("rand ==> " + random);
      this._children[random - 1].manualClick();
    }
  }

  showOriginal() {
    for(var i = 0; i < this._children.length; i++) {
      this._children[i].showOriginal();
    }
  }

  showPuzzle() {
    for(var i = 0; i < this._children.length; i++) {
      this._children[i].showPuzzle();
    }
  }

  checkErrors() {

    var count = 0;
    for(var i = 0; i < this.puzzles.length; i++) {
      if(!this.puzzles[i].isCorrect()) {
        count++;
      }
    }
    this.countererrors = count;
  }


  addChildren(casseTeteComponent: CasseTeteComponent) {
    this._children.push(casseTeteComponent);
    if(this._children.length === this.puzzles.length) {
      this.shuffle();
    }
  }

  calcLeft(realPos: number) {
    return (this.getCol(realPos) * this._tileOffsetWidth);
  }

  calcTop(realPos: number) {
    return (this.getRow(realPos) * this._tileOffsetHeight);
  }


  merge(oldArray: Piece[], newArray: Piece[], incX: number, incY: number) {

    if(oldArray.length === 0 || oldArray.length !== newArray.length) {
      oldArray = newArray;
    } else {

      for(var i = 0; i < oldArray.length; i++) {
        oldArray[i].left = this.calcLeft(oldArray[i].realPos);
        oldArray[i].top = this.calcTop(oldArray[i].realPos);
        oldArray[i].width = this._tileOffsetWidth;
        oldArray[i].height = this._tileOffsetHeight;
        oldArray[i].bgLeft = newArray[i].bgLeft;
        oldArray[i].bgTop = newArray[i].bgTop;
        oldArray[i].src = newArray[i].src;
      }
    }
    return oldArray;
  }

  resizeControlPanel() {
    let controlPanel = this.getControlPanel();
    //controlPanel.style.width  = Math.floor(inputValues.width * inputValues.scale / 100) + "px";
    controlPanel.style.width  = this._tileOffsetWidth + "px";
    controlPanel.style.height = this._tileOffsetHeight + "px";

    var freeSpot = this.getFreeSpot();
    var row = this.getRow(freeSpot);
    var col = this.getCol(freeSpot);

    controlPanel.style.left = (this._tileOffsetWidth * (col ) ) + 'px';
    controlPanel.style.top = (this._tileOffsetHeight * (row ) ) + 'px';





  }

  resize() {

    if(this._resizeTimeout) clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(_.bind(function () {

      this.checkErrors();
      let inputValues = this.getInputValues();
			this.totalWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      let totalHeight = ( <HTMLElement>document.getElementsByTagName("body")[0]).clientHeight;

      console.log("resize");
      console.log(this.totalWidth);
      console.log(totalHeight);




      this._casseTeteService.getImageNatural(this._url).then((imageNatural: ImageNatural) => {
          let containerFactor = 0.80;
          let heightOffset = 60;
          if (true === true) {
            containerFactor = 1;
            heightOffset = 0;

            this.totalWidth = window.innerWidth;
            totalHeight = window.innerHeight;
          }

          this.imageTotalWidth = Math.floor(this.totalWidth * containerFactor);

          let factor = 1;
          if(imageNatural.width >= this.imageTotalWidth) {
            factor = Math.floor(this.imageTotalWidth / imageNatural.width * 100);
            console.log("FACTOR 1 ==> "  + factor);
            inputValues.scale = factor;
          } else if(this.imageTotalWidth < imageNatural.width) {
            factor = Math.floor(imageNatural.width / this.imageTotalWidth * 100);
            console.log("FACTOR 2 ==> "  + factor);
            inputValues.scale = factor;
          } else if(imageNatural.height >= totalHeight) {
            factor = Math.floor(imageNatural.height / totalHeight * 100 - heightOffset);
            console.log("FACTOR 3 ==> "  + factor);
            inputValues.scale = factor;
            this.imageTotalWidth = Math.floor(this.totalWidth * containerFactor * factor / 100);
          } else if(totalHeight < imageNatural.Height) {
            factor = Math.floor(totalHeight / imageNatural.height * 100 - heightOffset);
            console.log("FACTOR 4 ==> "  + factor);
            inputValues.scale = factor;
            this.imageTotalWidth = Math.floor(this.totalWidth * containerFactor * factor / 100);
          } else {
            factor = Math.floor(this.imageTotalWidth / imageNatural.width * 100);
            console.log("FACTOR 5 ==> "  + factor);
            inputValues.scale = factor;
          }

          if(this.fullscreen === true) {
            inputValues.scaleY = Math.floor(totalHeight / imageNatural.height * 100);
          }

          var p1 = this._casseTeteService.getPieces(inputValues, this._url);
          var p2 = this._casseTeteService.getTileOffset(inputValues, this._url);
          Promise.all([p1, p2]).then((values: any) => { 

            this._tileOffsetWidth = values[1].tileOffsetWidth;
            this._tileOffsetHeight = values[1].tileOffsetHeight;

            this.puzzles = this.merge(this.puzzles, values[0].puzzles, 
                                        values[0].incX, values[0].incY);
            this.resizeControlPanel();

            this._rowCount = Math.floor(inputValues.count / 4);
            $("#puzzle").removeClass("invisible");
          });

        });


    }, this), 500);


  } 

  getRow(pos: number) {
    let rowCount = this.getRowCount();
    let row = Math.floor((pos - 1) / rowCount);

    console.log("pos ==> " + pos);
    console.log("row ==> " + row);
    console.log("cou ==> " + rowCount);
    return row;
  }

  getCol(pos: number) {
    let rowCount = this.getRowCount();
    let col = (pos % rowCount);

    if(col === 0) {
      col = rowCount;
    }
    return col - 1;
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
    inputValues.scaleY = 0;
    

    return inputValues;

  }

  onKeyRow(event:any) {
    var inputValues = this.getInputValues();
    var p1 = this._casseTeteService.getPieces(inputValues, this._url);
    var p2 = this._casseTeteService.getTileOffset(inputValues, this._url);


    Promise.all([p1, p2]).then((values: any) => { 
      this.puzzles = values[0].puzzles;
      this._tileOffsetWidth = values[1].tileOffsetWidth;
      this._tileOffsetHeight = values[1].tileOffsetHeight;
      this._rowCount = Math.floor(inputValues.count / 4);
     });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }


} 

