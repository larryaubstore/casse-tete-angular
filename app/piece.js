"use strict";
var Piece = (function () {
    function Piece(id, left, top, width, height, bgLeft, bgTop, src, realPos, fullWidth, fullHeight) {
        this.id = id;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.bgLeft = bgLeft;
        this.bgTop = bgTop;
        this.src = src;
        this.realPos = realPos;
        this.fullWidth = fullWidth;
        this.fullHeight = fullHeight;
    }
    Piece.prototype.isCorrect = function () {
        return (this.id === this.realPos);
    };
    return Piece;
}());
exports.Piece = Piece;
