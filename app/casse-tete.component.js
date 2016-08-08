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
var casse_tete_list_component_1 = require('./casse-tete-list.component');
var piece_1 = require('./piece');
var CasseTeteComponent = (function () {
    function CasseTeteComponent() {
        console.info('CasseTete Component Mounted Successfully');
    }
    CasseTeteComponent.prototype._onClick = function () {
        var freeSpot = this.parent.getFreeSpot();
        var rowCount = this.parent.getRowCount();
        var tileSelector = $("#TILE_" + this.puzzle.id);
        var offset = this.parent.getTileOffsetHeight();
        if (this.puzzle.realPos - 1 === freeSpot) {
            tileSelector.animate({ left: '-=' + this.parent.getTileOffsetWidth() }, 250);
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else if (this.puzzle.realPos + 1 === freeSpot) {
            tileSelector.animate({ left: '+=' + this.parent.getTileOffsetWidth() }, 250);
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else if (this.puzzle.realPos - rowCount === freeSpot) {
            tileSelector.animate({ top: '-=' + this.parent.getTileOffsetHeight() }, 250);
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else if (this.puzzle.realPos + rowCount === freeSpot) {
            tileSelector.animate({ top: '+=' + this.parent.getTileOffsetHeight() }, 250);
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else {
        }
        this.parent.checkErrors();
    };
    CasseTeteComponent.prototype.ngAfterViewInit = function () {
        this.puzzle.realPos = this.puzzle.id;
        document.getElementById("TILE_" + this.puzzle.id).addEventListener("click", _.bind(this._onClick, this));
    };
    CasseTeteComponent.prototype.setStyles = function (piece) {
        var styles = {
            'left': piece.left + 'px',
            'top': piece.top + 'px',
            'width': piece.width + 'px',
            'height': piece.height + 'px',
            'background-position': piece.bgLeft + 'px ' + piece.bgTop + 'px',
            'display': piece.id === 1 ? 'none' : 'block',
            'background-image': 'url(' + piece.src + ')'
        };
        return styles;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', piece_1.Piece)
    ], CasseTeteComponent.prototype, "puzzle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', casse_tete_list_component_1.CasseTeteListComponent)
    ], CasseTeteComponent.prototype, "parent", void 0);
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
