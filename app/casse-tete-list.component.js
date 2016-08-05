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
            _this._url = decodeURIComponent(params['url']); // (+) converts string 'id' to a number
            var marker = _this._url.indexOf('?');
            _this._url = _this._url.substr(0, marker);
            var list = _this._casseTeteService.getList();
            var scope = _this;
            var inputValues = new inputValues_1.InputValues();
            inputValues.width = 150;
            inputValues.height = 105;
            inputValues.count = 80;
            inputValues.margin = 2;
            inputValues.scale = 100;
            var totalWidth = document.getElementsByClassName("col-md-10")[0].offsetWidth;
            var fitWidth = Math.floor(totalWidth / inputValues.count);
            console.log("fitWidth ==> " + fitWidth);
            var randomInt = +_this.getRandomInt(0, list.length);
            var imageSrc = _this._url;
            _this._casseTeteService.getPieces(inputValues, imageSrc)
                .then(function (puzzles) {
                scope.puzzles = puzzles;
            });
            window.addEventListener("resize", _.bind(_this.resize, _this));
        });
    };
    CasseTeteListComponent.prototype.ngAfterViewInit = function () {
        console.log('AfterViewInit');
        $("#inputRow").slider().on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        $("#inputMargin").slider().on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        $("#inputWidth").slider().on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        $("#inputHeight").slider().on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        $("#inputScale").slider().on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        this.resize();
    };
    CasseTeteListComponent.prototype.resize = function () {
        if (this._resizeTimeout)
            clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(_.bind(function () {
            var inputValues = this.getInputValues();
            var totalWidth = document.getElementsByClassName("col-md-10")[0].clientWidth;
            //let totalHeight = ( <HTMLElement>document.getElementsByClassName("col-md-10")[0]).clientHeight;
            var totalHeight = document.getElementsByTagName("body")[0].clientHeight;
            console.log("resize");
            console.log(totalWidth);
            console.log(totalHeight);
            var scope = this;
            this._casseTeteService.getImageNatural(this._url)
                .then(function (imageNatural) {
                if (imageNatural.width >= totalWidth) {
                    var factor = Math.floor(totalWidth / imageNatural.width * 100 - 20);
                    console.log("FACTOR ==> " + factor);
                    inputValues.scale = factor;
                    scope._casseTeteService.getPieces(inputValues, scope._url)
                        .then(function (puzzles) {
                        scope.puzzles = puzzles;
                    });
                }
                else {
                    var factor = Math.floor(totalHeight / imageNatural.height * 100 - 20);
                    console.log("FACTOR ==> " + factor);
                    inputValues.scale = factor;
                    scope._casseTeteService.getPieces(inputValues, scope._url)
                        .then(function (puzzles) {
                        scope.puzzles = puzzles;
                    });
                }
            });
        }, this), 100);
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
    CasseTeteListComponent.prototype.onKeyRow = function (event) {
        var inputValues = this.getInputValues();
        var scope = this;
        this._casseTeteService.getPieces(inputValues, this._url)
            .then(function (puzzles) {
            scope.puzzles = puzzles;
        });
    };
    CasseTeteListComponent.prototype.onKeyMargin = function (event) {
        var inputValues = this.getInputValues();
        var scope = this;
        this._casseTeteService.getPieces(inputValues, this._url)
            .then(function (puzzles) {
            scope.puzzles = puzzles;
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
