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

  getPieces(width: number, height: number, count: number, imageSrc: string) {

    return new Promise<Piece[]>((resolve, reject) => {

      var pieces: Piece[];

      let rows = count / 4;

      var image = new Image();
      var scope = this;
      image.onload = function (event: any) {

        var natWidth = this.naturalWidth;
        var natHeight = this.naturalHeight;

        var incX: number = natWidth / (rows + 1);
        var incY: number = natHeight / (rows + 1);
        
        var aPiece: Piece = null;
        for(var i = 0; i < rows + 1; i++) {

          aPiece = { id: i + 1, 
                     left: i * incX, 
                     top: incY * 1, 
                     width: incX - 9, 
                     height: incY - 9, 
                     bgLeft: 2, 
                     bgTop: 2 };
          pieces.push(aPiece);
        }

        //alert("w - h " + natWidth + " " + natHeight);
        //alert('test');
        resolve(pieces);
      }
      image.src = imageSrc;
    });
  }
}
