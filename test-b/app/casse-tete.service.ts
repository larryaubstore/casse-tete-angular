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

    //return new Promise<Piece[]>((resolve, reject) => {

      var pieces: Piece[];

      let rows = count / 4;

      var image = new Image();
      var scope = this;
      image.onload = _.bind(function () {

        alert('test');
        //resolve(pieces);
      }, this);
      image.src = imageSrc;
    //});
  }
}
