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
    CasseTeteComponent.prototype.manualClick = function () {
        this._onClick(null, true);
    };
    CasseTeteComponent.prototype._onClick = function (event, dontAnimate) {
        var freeSpot = this.parent.getFreeSpot();
        var rowCount = this.parent.getRowCount();
        var tileSelector = $("#TILE_" + this.puzzle.id);
        var offset = this.parent.getTileOffsetHeight();
        var currentLeft = tileSelector.position().left;
        var currentTop = tileSelector.position().top;
        if (this.puzzle.realPos - 1 === freeSpot &&
            this.parent.getRow(this.puzzle.realPos) === this.parent.getRow(freeSpot)) {
            this.parent.moveControlPanel(currentLeft, currentTop);
            if (typeof (dontAnimate) !== "undefined") {
                tileSelector.css("left", currentLeft - this.parent.getTileOffsetWidth() + "px");
            }
            else {
                tileSelector.animate({ left: '-=' + this.parent.getTileOffsetWidth() }, 250);
            }
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else if (this.puzzle.realPos + 1 === freeSpot &&
            this.parent.getRow(this.puzzle.realPos) === this.parent.getRow(freeSpot)) {
            this.parent.moveControlPanel(currentLeft, currentTop);
            if (typeof (dontAnimate) !== "undefined") {
                tileSelector.css("left", currentLeft + this.parent.getTileOffsetWidth() + "px");
            }
            else {
                tileSelector.animate({ left: '+=' + this.parent.getTileOffsetWidth() }, 250);
            }
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else if (this.puzzle.realPos - rowCount === freeSpot &&
            Math.abs(this.parent.getRow(this.puzzle.realPos) - this.parent.getRow(freeSpot)) === 1 &&
            this.parent.getCol(this.puzzle.realPos) === this.parent.getCol(freeSpot)) {
            /**/
            this.parent.moveControlPanel(currentLeft, currentTop);
            if (typeof (dontAnimate) !== "undefined") {
                tileSelector.css("top", currentTop - this.parent.getTileOffsetHeight() + "px");
            }
            else {
                tileSelector.animate({ top: '-=' + this.parent.getTileOffsetHeight() }, 250);
            }
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else if (this.puzzle.realPos + rowCount === freeSpot &&
            Math.abs(this.parent.getRow(this.puzzle.realPos) - this.parent.getRow(freeSpot)) === 1 &&
            this.parent.getCol(this.puzzle.realPos) === this.parent.getCol(freeSpot)) {
            this.parent.moveControlPanel(currentLeft, currentTop);
            if (typeof (dontAnimate) !== "undefined") {
                tileSelector.css("top", currentTop + this.parent.getTileOffsetHeight() + "px");
            }
            else {
                tileSelector.animate({ top: '+=' + this.parent.getTileOffsetHeight() }, 250);
            }
            this.parent.setFreeSpot(this.puzzle.realPos);
            this.puzzle.realPos = freeSpot;
        }
        else {
        }
        this.parent.checkErrors();
    };
    CasseTeteComponent.prototype.getSelector = function () {
        return document.getElementById("TILE_" + this.puzzle.id);
    };
    CasseTeteComponent.prototype.ngAfterViewInit = function () {
        this.puzzle.realPos = this.puzzle.id;
        document.getElementById("TILE_" + this.puzzle.id).addEventListener("click", _.bind(this._onClick, this));
        this.parent.addChildren(this);
    };
    CasseTeteComponent.prototype.showOriginal = function () {
        //this.getSelector().style.width = this.puzzle.fullWidth + 'px';
        //this.getSelector().style.height = this.puzzle.fullHeight + 'px';
        $("#TILE_" + this.puzzle.id).removeClass("border");
        $("#TILE_" + this.puzzle.id).addClass("noborder");
    };
    CasseTeteComponent.prototype.showPuzzle = function () {
        $("#TILE_" + this.puzzle.id).addClass("border");
        $("#TILE_" + this.puzzle.id).removeClass("noborder");
    };
    CasseTeteComponent.prototype.setStyles = function (piece) {
        console.log("SET STYLE");
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
