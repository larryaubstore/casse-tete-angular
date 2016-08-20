"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var mock_casse_tetes_1 = require('./mock-casse-tetes');
var piece_1 = require('./piece');
var imagenatural_1 = require('./imagenatural');
var tilesetup_1 = require('./tilesetup');
var CasseTeteService = (function () {
    function CasseTeteService() {
    }
    CasseTeteService.prototype.getList = function () {
        return mock_casse_tetes_1.CASSETETES;
    };
    CasseTeteService.prototype.getVignettes = function () {
        var vignettes = [
            { 'id': 1, 'imagesrc': 'colonne.jpg' }
        ];
    };
    CasseTeteService.prototype.getImageNatural = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var image = new Image();
            var scope = _this;
            image.onload = function (event) {
                var imageNatural = new imagenatural_1.ImageNatural();
                imageNatural.width = this.naturalWidth;
                imageNatural.height = this.naturalHeight;
                resolve(imageNatural);
            };
            image.src = url;
        });
    };
    CasseTeteService.prototype.getTileOffset = function (inputValues, imageSrc) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var count = inputValues.count;
            var width = inputValues.width;
            var height = inputValues.height;
            var margin = inputValues.margin;
            var rows = Math.floor(count / 4);
            var cols = Math.floor(count / 4);
            var image = new Image();
            var scope = _this;
            image.onload = function (event) {
                var factor = 1;
                var natWidth = this.naturalWidth * factor;
                var natHeight = this.naturalHeight * factor;
                var incX = Math.floor(+(natWidth / (rows + 1)));
                var incY = Math.floor(+(natHeight / (rows + 1)));
                resolve({ tileOffsetWidth: incX, tileOffsetHeight: incY });
            };
            if (inputValues.scaleY !== 0) {
                image.src = imageSrc + '?scale=' + inputValues.scale + '&scaleY=' + inputValues.scaleY;
            }
            else {
                image.src = imageSrc + '?scale=' + inputValues.scale;
            }
        });
    };
    CasseTeteService.prototype.getPieces = function (inputValues, imageSrc) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var pieces = [];
            var count = inputValues.count;
            var width = inputValues.width;
            var height = inputValues.height;
            var margin = inputValues.margin;
            var rows = Math.floor(count / 4);
            var cols = Math.floor(count / 4);
            var image = new Image();
            var scope = _this;
            image.onload = function (event) {
                var factor = 1;
                var natWidth = this.naturalWidth * factor;
                var natHeight = this.naturalHeight * factor;
                var incX = Math.floor(+(natWidth / (rows + 1)));
                var incY = Math.floor(+(natHeight / (rows + 1)));
                var aPiece = null;
                var counter = 0;
                for (var i = 0; i < rows + 1; i++) {
                    for (var j = 0; j < cols + 1; j++) {
                        aPiece = new piece_1.Piece(counter + 1, j * incX, i * incY, incX, incY, (incX) * j * -1, (incY) * i * -1, inputValues.scaleY !== 0 ? imageSrc + '?scale=' + inputValues.scale + '&scaleY=' + inputValues.scaleY : imageSrc + '?scale=' + inputValues.scale, 0, incX, incY);
                        pieces.push(aPiece);
                        counter++;
                    }
                }
                resolve(new tilesetup_1.TileSetup(incX, incY, pieces));
            };
            if (inputValues.scaleY !== 0) {
                image.src = imageSrc + '?scale=' + inputValues.scale + '&scaleY=' + inputValues.scaleY;
            }
            else {
                image.src = imageSrc + '?scale=' + inputValues.scale;
            }
        });
    };
    CasseTeteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CasseTeteService);
    return CasseTeteService;
}());
exports.CasseTeteService = CasseTeteService;
