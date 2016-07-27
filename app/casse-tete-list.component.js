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
var router_1 = require('@angular/router');
var casse_tete_service_1 = require('./casse-tete.service');
var inputValues_1 = require('./inputValues');
var casse_tete_component_1 = require('./casse-tete.component');
var vignette_component_1 = require('./vignette.component');
var CasseTeteListComponent = (function () {
    function CasseTeteListComponent(route, _router, _casseTeteService) {
        this.route = route;
        this._router = _router;
        this._casseTeteService = _casseTeteService;
    }
    CasseTeteListComponent.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    CasseTeteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var url = params['url']; // (+) converts string 'id' to a number
            console.log(url);
            var list = _this._casseTeteService.getList();
            var scope = _this;
            var inputValues = new inputValues_1.InputValues();
            inputValues.width = 150;
            inputValues.height = 105;
            inputValues.count = 80;
            inputValues.margin = 2;
            inputValues.scale = 100;
            var randomInt = +_this.getRandomInt(0, list.length);
            console.log("random Int ==> " + randomInt);
            var imageSrc = list[randomInt].src;
            _this._casseTeteService.getPieces(inputValues, imageSrc)
                .then(function (puzzles) {
                scope.puzzles = puzzles;
                console.log(JSON.stringify(scope.puzzles));
            });
        });
    };
    CasseTeteListComponent.prototype.getInputValues = function () {
        var row = document.getElementById('inputRow').value;
        var margin = document.getElementById('inputMargin').value;
        var width = document.getElementById('inputWidth').value;
        var height = document.getElementById('inputHeight').value;
        var scale = document.getElementById('inputScale').value;
        var inputValues = new inputValues_1.InputValues();
        inputValues.count = +row;
        inputValues.margin = +margin;
        inputValues.width = +width;
        inputValues.height = +height;
        inputValues.scale = +scale;
        return inputValues;
    };
    //  gotoDetail(casseTete: CasseTete) { 
    //    let link = ['CasseTeteList', { id: casseTete.id }];                                                       
    //    this._router.navigate(link);
    //  } 
    CasseTeteListComponent.prototype.onKeyRow = function (event) {
        //var row = +event.target.value;
        //console.log("row ==> " + row);
        var inputValues = this.getInputValues();
        var scope = this;
        this._casseTeteService.getPieces(inputValues, 'assets/css/20110403143837_rouedentelee.jpg')
            .then(function (puzzles) {
            scope.puzzles = puzzles;
            console.log(JSON.stringify(scope.puzzles));
        });
    };
    CasseTeteListComponent.prototype.onKeyMargin = function (event) {
        //var margin = +event.target.value;
        //console.log("margin ==> " + margin);
        var inputValues = this.getInputValues();
        var scope = this;
        this._casseTeteService.getPieces(inputValues, 'assets/css/20110403143837_rouedentelee.jpg')
            .then(function (puzzles) {
            scope.puzzles = puzzles;
            console.log(JSON.stringify(scope.puzzles));
        });
    };
    CasseTeteListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    CasseTeteListComponent = __decorate([
        core_1.Component({
            selector: 'casse-tete-list',
            templateUrl: 'app/dist/templates/casse-tete-list.html',
            styleUrls: ['assets/css/puzzle.css'],
            providers: [casse_tete_service_1.CasseTeteService],
            directives: [casse_tete_component_1.CasseTeteComponent, vignette_component_1.VignetteComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, casse_tete_service_1.CasseTeteService])
    ], CasseTeteListComponent);
    return CasseTeteListComponent;
}());
exports.CasseTeteListComponent = CasseTeteListComponent;
