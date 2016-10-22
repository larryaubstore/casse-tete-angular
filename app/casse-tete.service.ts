import { Injectable }       from '@angular/core';
import { CASSETETES }       from './mock-casse-tetes';
import { Piece }            from './piece';
import { InputValues }      from './inputValues';

import { ImageNatural }     from './imagenatural';
import { TileSetup }        from './tilesetup';


@Injectable()
export class CasseTeteService {
  getList() {
    return CASSETETES;
  }

  getVignettes() {

  }


  getImageNatural(url: string) {
    return new Promise<ImageNatural>((resolve, reject) => {
      let image = new Image();
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


      let count = inputValues.count;
      let rows = Math.floor(count / 4);


      let image = new Image();
      image.onload = function (event: any) {

        let factor = 1;

        let natWidth = this.naturalWidth * factor;
        let natHeight = this.naturalHeight * factor;
        let incX: number = Math.floor(+(natWidth  / (rows + 1)));
        let incY: number = Math.floor(+(natHeight  / (rows + 1)));
        resolve({ tileOffsetWidth: incX, tileOffsetHeight: incY});
      };

      if (inputValues.scaleY !== 0) {
        image.src = imageSrc + '?scale=' + inputValues.scale + '&scaleY=' + inputValues.scaleY;
      } else {
        image.src = imageSrc + '?scale=' + inputValues.scale;
      }
    });
  }

  getPieces(inputValues: InputValues, imageSrc: string) {



    return new Promise<TileSetup>((resolve, reject) => {

      let pieces: Piece[] = [];

      let count = inputValues.count;
      let rows = Math.floor(count / 4);
      let cols = Math.floor(count / 4);


      let image = new Image();
      image.onload = function (event: any) {

        let factor = 1;
        let natWidth = this.naturalWidth * factor;
        let natHeight = this.naturalHeight * factor;
        let incX: number = Math.floor(+(natWidth  / (rows + 1)));
        let incY: number = Math.floor(+(natHeight  / (rows + 1)));
        let aPiece: Piece = null;
        let counter = 0;

        for (let i = 0; i < rows + 1; i++) {
          for (let j = 0; j < cols + 1; j++) {

            aPiece = new Piece(  counter + 1,
                        j * incX,
                        i * incY,
                        incX,
                        incY,
                        (incX) * j * -1,
                        (incY) * i * -1,
												inputValues.scaleY !== 0 ? imageSrc + '?scale=' + inputValues.scale + '&scaleY=' + inputValues.scaleY : imageSrc + '?scale=' + inputValues.scale,
                        0,
                        incX,
                        incY);
            pieces.push(aPiece);
            counter++;
          }
        }
        resolve(new TileSetup(incX, incY, pieces));
      };

      if (inputValues.scaleY !== 0) {
        image.src = imageSrc + '?scale=' + inputValues.scale + '&scaleY=' + inputValues.scaleY;
      } else {
        image.src = imageSrc + '?scale=' + inputValues.scale;
      }
    });
  }
}
