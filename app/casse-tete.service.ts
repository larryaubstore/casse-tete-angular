import { Injectable } from '@angular/core';

import { CasseTete } from './casse-tete';
import { CASSETETES } from './mock-casse-tetes';
//import { PIECES } from './mock-casse-tete';
//
import { Piece } from './piece';



@Injectable()
export class CasseTeteService {
  getList() {
    return CASSETETES;
  }

  getPieces(width: number, height: number, count: number, margin: number, imageSrc: string) {

    return new Promise<Piece[]>((resolve, reject) => {

      var pieces: Piece[] = [];

      let rows = count / 4;
      let cols = count / 4;

      var image = new Image();
      var scope = this;
      image.onload = function (event: any) {

        var natWidth = this.naturalWidth;
        var natHeight = this.naturalHeight;

        var incX: number = Math.floor(+(natWidth / (rows + 1)));
        var incY: number = Math.floor(+(natHeight / (rows + 1)));
       
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
                       bgTop: (incY) * i * -1};
            pieces.push(aPiece);
            counter++;
          }
        }

        //alert("w - h " + natWidth + " " + natHeight);
        //alert('test');
        resolve(pieces);
      }
      image.src = imageSrc;
    });
  }
}
