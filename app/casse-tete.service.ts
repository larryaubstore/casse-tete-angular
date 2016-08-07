import { Injectable }       from '@angular/core';
import { CasseTete }        from './casse-tete';
import { CASSETETES }       from './mock-casse-tetes';
import { Piece }            from './piece';
import { Vignette }         from './vignette';
import { InputValues }      from './inputValues';

import { ImageNatural }     from './imagenatural';


@Injectable()
export class CasseTeteService {
  getList() {
    return CASSETETES;
  }

  getVignettes() {

    var vignettes: Vignette[] = [

      { 'id': 1, 'imagesrc': 'colonne.jpg'}
    ];
  }


  getImageNatural(url: string) {
    return new Promise<ImageNatural>((resolve, reject) => {
      var image = new Image();
      var scope = this;
      image.onload = function (event: any) {
        let imageNatural = new ImageNatural();
        imageNatural.width = this.naturalWidth;
        imageNatural.height = this.naturalHeight;
        resolve(imageNatural);
      };
      
      image.src = url;
    });
  }


  getTileOffset(inputValues: InputValues, imageSrc: string) {
     return new Promise<any>((resolve, reject) => {


      var count = inputValues.count;
      var width = inputValues.width;
      var height = inputValues.height;
      var margin = inputValues.margin;


      let rows = Math.floor(count / 4);
      let cols = Math.floor(count / 4);


      var image = new Image();
      var scope = this;
      image.onload = function (event: any) {

        var factor = 1;

        var natWidth = this.naturalWidth * factor;
        var natHeight = this.naturalHeight * factor;
        var incX: number = Math.floor(+(natWidth  / (rows + 1)));
        var incY: number = Math.floor(+(natHeight  / (rows + 1)));
       
        resolve({ tileOffsetWidth: incX, tileOffsetHeight: incY});
      }

      image.src = imageSrc + '?scale=' + inputValues.scale;
    });
   
  }

  getPieces(inputValues: InputValues, imageSrc: string) {



    return new Promise<Piece[]>((resolve, reject) => {

      var pieces: Piece[] = [];

      var count = inputValues.count;
      var width = inputValues.width;
      var height = inputValues.height;
      var margin = inputValues.margin;


      let rows = Math.floor(count / 4);
      let cols = Math.floor(count / 4);


      var image = new Image();
      var scope = this;
      image.onload = function (event: any) {

        var factor = 1;

        var natWidth = this.naturalWidth * factor;
        var natHeight = this.naturalHeight * factor;
        var incX: number = Math.floor(+(natWidth  / (rows + 1)));
        var incY: number = Math.floor(+(natHeight  / (rows + 1)));
       
        var aPiece: Piece = null;
        var counter = 0;
      
        for(var i = 0; i < rows + 1; i++) {
        
          for(var j = 0; j < cols + 1; j++) {

            aPiece = { id: counter + 1, 
                       left: j * incX, 
                       top: i * incY, 
                       width: incX - margin, 
                       height: incY - margin, 
                       bgLeft: (incX) * j * -1, 
                       bgTop: (incY) * i * -1,
                       src: imageSrc + '?scale=' + inputValues.scale};
            pieces.push(aPiece);
            counter++;
          }
        }
        resolve(pieces);
      }

      image.src = imageSrc + '?scale=' + inputValues.scale;
    });
  }
}
