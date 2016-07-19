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
var casse_tete_service_1 = require('./casse-tete.service');
var piece_1 = require('./piece');
var CasseTeteComponent = (function () {
    function CasseTeteComponent() {
        console.info('CasseTete Component Mounted Successfully');
    }
    CasseTeteComponent.prototype.setStyles = function (piece) {
        var styles = {
            'left': piece.left + 'px',
            'top': piece.top + 'px',
            'width': piece.width + 'px',
            'height': piece.height + 'px',
            'background-position': piece.bgLeft + 'px ' + piece.bgTop + 'px',
            'display': piece.id === 1 ? 'none' : 'block'
        };
        return styles;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', piece_1.Piece)
    ], CasseTeteComponent.prototype, "puzzle", void 0);
    CasseTeteComponent = __decorate([
        core_1.Component({
            selector: 'casse-tete',
            templateUrl: 'app/dist/templates/casse-tete.html',
            styleUrls: ['assets/css/puzzle.css'],
            providers: [casse_tete_service_1.CasseTeteService]
        }), 
        __metadata('design:paramtypes', [])
    ], CasseTeteComponent);
    return CasseTeteComponent;
}());
exports.CasseTeteComponent = CasseTeteComponent;
