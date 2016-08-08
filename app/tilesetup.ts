import { Piece } from './piece';

export class TileSetup {

  incX: number;
  incY: number;
  puzzles: Piece[];

  constructor(incX: number, incY: number, puzzles: Piece[]) {
    this.incX = incX;
    this.incY = incY;
    this.puzzles = puzzles;
  }

}
