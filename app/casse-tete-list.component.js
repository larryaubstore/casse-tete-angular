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
var CasseTeteListComponent = (function () {
    function CasseTeteListComponent(route, _router, _casseTeteService) {
        this.route = route;
        this._router = _router;
        this._casseTeteService = _casseTeteService;
    }
    CasseTeteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var url = params['url']; // (+) converts string 'id' to a number
            console.log(url);
            var list = _this._casseTeteService.getList();
            var scope = _this;
            _this._casseTeteService.getPieces(100, 100, 16, 9, 'assets/css/20110403143837_rouedentelee.jpg')
                .then(function (puzzles) {
                scope.puzzles = puzzles;
                console.log(JSON.stringify(scope.puzzles));
            });
        });
    };
    CasseTeteListComponent.prototype.getInputValues = function () {
        var row = document.getElementById('inputRow').value;
        var margin = document.getElementById('inputMargin').value;
        var inputValues = new inputValues_1.InputValues();
        inputValues.count = +row;
        inputValues.margin = +margin;
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
        this._casseTeteService.getPieces(100, 100, inputValues.count, inputValues.margin, 'assets/css/20110403143837_rouedentelee.jpg')
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
        this._casseTeteService.getPieces(100, 100, inputValues.count, inputValues.margin, 'assets/css/20110403143837_rouedentelee.jpg')
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
            directives: [casse_tete_component_1.CasseTeteComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, casse_tete_service_1.CasseTeteService])
    ], CasseTeteListComponent);
    return CasseTeteListComponent;
}());
exports.CasseTeteListComponent = CasseTeteListComponent;
