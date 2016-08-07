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

  public isCorrect() {
    return(this.id === this.realPos);
  }




}
