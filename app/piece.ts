export class Piece {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  bgLeft: number;
  bgTop: number;
  src: string;
  realPos: number;

  constructor(id: number, 
              left: number, 
              top: number, 
              width: number,
              height: number,
              bgLeft: number,
              bgTop: number,
              src: string, 
              realPos: number) {

                this.id = id;
                this.left = left;
                this.top = top;
                this.width = width;
                this.height = height;
                this.bgLeft = bgLeft;
                this.bgTop = bgTop;
                this.src = src;
                this.realPos = realPos;
              }

  public isCorrect() {
    return(this.id === this.realPos);
  }




}
