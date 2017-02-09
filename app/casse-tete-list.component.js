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
var inputValues_1 = require('./inputValues');
var casse_tete_service_1 = require('./casse-tete.service');
var CasseTeteListComponent = (function () {
    function CasseTeteListComponent(route, _router, _casseTeteService) {
        this.route = route;
        this._router = _router;
        this._casseTeteService = _casseTeteService;
        this.puzzles = [];
        this._children = [];
    }
    CasseTeteListComponent.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    CasseTeteListComponent.prototype.getTotalWidth = function () {
        return this.imageTotalWidth + 'px';
    };
    CasseTeteListComponent.prototype.getFreeSpot = function () {
        return this._freeSpot;
    };
    CasseTeteListComponent.prototype.getControlPanel = function () {
        var element = document.getElementsByClassName('controlpanel')[0];
        return element;
    };
    CasseTeteListComponent.prototype.moveControlPanel = function (x, y) {
        var controlPanel = this.getControlPanel();
        controlPanel.style.left = x + "px";
        controlPanel.style.top = y + "px";
    };
    CasseTeteListComponent.prototype.setFreeSpot = function (value) {
        this._freeSpot = value;
        var controlPanel = this.getControlPanel();
    };
    CasseTeteListComponent.prototype.getRowCount = function () {
        return this._rowCount + 1;
    };
    CasseTeteListComponent.prototype.getTileOffsetWidth = function () {
        return this._tileOffsetWidth;
    };
    CasseTeteListComponent.prototype.getTileOffsetHeight = function () {
        return this._tileOffsetHeight;
    };
    CasseTeteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sub = this.route.params.subscribe(function (params) {
            _this.me = _this;
            _this.countererrors = 0;
            _this.imageTotalWidth = 0;
            _this._freeSpot = 1;
            _this._url = decodeURIComponent(params['url']); // (+) converts string 'id' to a number
            _this.noborder = true;
            _this.fullscreen = true;
            _this.showpos = false;
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
            _this.totalWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var fitWidth = Math.floor(_this.totalWidth / inputValues.count);
            console.log("fitWidth ==> " + fitWidth);
            var randomInt = +_this.getRandomInt(0, list.length);
            var imageSrc = _this._url;
            var inputValues = _this.getInputValues();
            var scope = _this;
            var p1 = scope._casseTeteService.getPieces(inputValues, _this._url);
            var p2 = scope._casseTeteService.getTileOffset(inputValues, _this._url);
            Promise.all([p1, p2]).then(function (values) {
                scope.puzzles = values[0].puzzles;
                scope._tileOffsetWidth = values[1].tileOffsetWidth;
                scope._tileOffsetHeight = values[1].tileOffsetHeight;
                scope._rowCount = Math.floor(inputValues.count / 4);
            });
            window.addEventListener("resize", _.bind(_this.resize, _this));
        });
    };
    CasseTeteListComponent.prototype.ngAfterViewInit = function () {
        console.log('AfterViewInit');
        var inputRowSlider = $("#inputRow").slider();
        inputRowSlider.on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        var inputMarginSlider = $("#inputMargin").slider();
        inputMarginSlider.on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        var inputWidthSlider = $("#inputWidth").slider();
        inputWidthSlider.on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        var inputHeightSlider = $("#inputHeight").slider();
        inputHeightSlider.on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        var inputScaleSlider = $("#inputScale").slider();
        inputScaleSlider.on('slide', _.bind(function (event) {
            this.onKeyRow(event);
            console.log(event.value);
        }, this))
            .data('slider');
        inputRowSlider.slider('destroy');
        inputMarginSlider.slider('destroy');
        inputWidthSlider.slider('destroy');
        inputHeightSlider.slider('destroy');
        inputScaleSlider.slider('destroy');
        $("#inputRow").hide();
        $("#inputMargin").hide();
        $("#inputWidth").hide();
        $("#inputHeight").hide();
        $("#inputScale").hide();
        document.getElementById('noborder').addEventListener('click', _.bind(function (event) {
            this.noborder = false;
            this.showOriginal();
        }, this));
        document.getElementById('withborder').addEventListener('click', _.bind(function (event) {
            this.noborder = true;
            this.showPuzzle();
        }, this));
        document.getElementById('showpos').addEventListener('click', _.bind(function (event) {
            this.showpos = false;
        }, this));
        document.getElementById('dontshowpos').addEventListener('click', _.bind(function (event) {
            this.showpos = true;
        }, this));
        document.getElementById('fullscreen').addEventListener('click', _.bind(function (event) {
            var element = document.getElementsByClassName("col-md-2")[0];
            var containerElement = document.getElementsByClassName("container-fluid")[0];
            containerElement.className = "container-fluid fullscreen";
            element.style.display = "none";
            this.fullscreen = true;
            document.getElementById('maincontainer').className = 'col-md-12';
            this.resize();
        }, this));
        this.resize();
    };
    CasseTeteListComponent.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    CasseTeteListComponent.prototype.shuffle = function () {
        var random = 0;
        for (var i = 0; i < this._children.length * 8; i++) {
            random = this.randomIntFromInterval(2, this._children.length);
            console.log("rand ==> " + random);
            this._children[random - 1].manualClick();
        }
    };
    CasseTeteListComponent.prototype.showOriginal = function () {
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].showOriginal();
        }
    };
    CasseTeteListComponent.prototype.showPuzzle = function () {
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].showPuzzle();
        }
    };
    CasseTeteListComponent.prototype.checkErrors = function () {
        var count = 0;
        for (var i = 0; i < this.puzzles.length; i++) {
            if (!this.puzzles[i].isCorrect()) {
                count++;
            }
        }
        this.countererrors = count;
    };
    CasseTeteListComponent.prototype.addChildren = function (casseTeteComponent) {
        this._children.push(casseTeteComponent);
        if (this._children.length === this.puzzles.length) {
            this.shuffle();
        }
    };
    CasseTeteListComponent.prototype.calcLeft = function (realPos) {
        return (this.getCol(realPos) * this._tileOffsetWidth);
    };
    CasseTeteListComponent.prototype.calcTop = function (realPos) {
        return (this.getRow(realPos) * this._tileOffsetHeight);
    };
    CasseTeteListComponent.prototype.merge = function (oldArray, newArray, incX, incY) {
        if (oldArray.length === 0 || oldArray.length !== newArray.length) {
            oldArray = newArray;
        }
        else {
            for (var i = 0; i < oldArray.length; i++) {
                oldArray[i].left = this.calcLeft(oldArray[i].realPos);
                oldArray[i].top = this.calcTop(oldArray[i].realPos);
                oldArray[i].width = this._tileOffsetWidth;
                oldArray[i].height = this._tileOffsetHeight;
                oldArray[i].bgLeft = newArray[i].bgLeft;
                oldArray[i].bgTop = newArray[i].bgTop;
                oldArray[i].src = newArray[i].src;
            }
        }
        return oldArray;
    };
    CasseTeteListComponent.prototype.resizeControlPanel = function () {
        var controlPanel = this.getControlPanel();
        //controlPanel.style.width  = Math.floor(inputValues.width * inputValues.scale / 100) + "px";
        controlPanel.style.width = this._tileOffsetWidth + "px";
        controlPanel.style.height = this._tileOffsetHeight + "px";
        var freeSpot = this.getFreeSpot();
        var row = this.getRow(freeSpot);
        var col = this.getCol(freeSpot);
        controlPanel.style.left = (this._tileOffsetWidth * (col)) + 'px';
        controlPanel.style.top = (this._tileOffsetHeight * (row)) + 'px';
    };
    CasseTeteListComponent.prototype.resize = function () {
        if (this._resizeTimeout)
            clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(_.bind(function () {
            var _this = this;
            this.checkErrors();
            var inputValues = this.getInputValues();
            this.totalWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var totalHeight = document.getElementsByTagName("body")[0].clientHeight;
            console.log("resize");
            console.log(this.totalWidth);
            console.log(totalHeight);
            this._casseTeteService.getImageNatural(this._url).then(function (imageNatural) {
                var containerFactor = 0.80;
                var heightOffset = 60;
                if (true === true) {
                    containerFactor = 1;
                    heightOffset = 0;
                    _this.totalWidth = window.innerWidth;
                    totalHeight = window.innerHeight;
                }
                _this.imageTotalWidth = Math.floor(_this.totalWidth * containerFactor);
                var factor = 1;
                if (imageNatural.width >= _this.imageTotalWidth) {
                    factor = Math.floor(_this.imageTotalWidth / imageNatural.width * 100);
                    console.log("FACTOR 1 ==> " + factor);
                    inputValues.scale = factor;
                }
                else if (_this.imageTotalWidth < imageNatural.width) {
                    factor = Math.floor(imageNatural.width / _this.imageTotalWidth * 100);
                    console.log("FACTOR 2 ==> " + factor);
                    inputValues.scale = factor;
                }
                else if (imageNatural.height >= totalHeight) {
                    factor = Math.floor(imageNatural.height / totalHeight * 100 - heightOffset);
                    console.log("FACTOR 3 ==> " + factor);
                    inputValues.scale = factor;
                    _this.imageTotalWidth = Math.floor(_this.totalWidth * containerFactor * factor / 100);
                }
                else if (totalHeight < imageNatural.Height) {
                    factor = Math.floor(totalHeight / imageNatural.height * 100 - heightOffset);
                    console.log("FACTOR 4 ==> " + factor);
                    inputValues.scale = factor;
                    _this.imageTotalWidth = Math.floor(_this.totalWidth * containerFactor * factor / 100);
                }
                else {
                    factor = Math.floor(_this.imageTotalWidth / imageNatural.width * 100);
                    console.log("FACTOR 5 ==> " + factor);
                    inputValues.scale = factor;
                }
                if (_this.fullscreen === true) {
                    inputValues.scaleY = Math.floor(totalHeight / imageNatural.height * 100);
                }
                var p1 = _this._casseTeteService.getPieces(inputValues, _this._url);
                var p2 = _this._casseTeteService.getTileOffset(inputValues, _this._url);
                Promise.all([p1, p2]).then(function (values) {
                    _this._tileOffsetWidth = values[1].tileOffsetWidth;
                    _this._tileOffsetHeight = values[1].tileOffsetHeight;
                    _this.puzzles = _this.merge(_this.puzzles, values[0].puzzles, values[0].incX, values[0].incY);
                    _this.resizeControlPanel();
                    _this._rowCount = Math.floor(inputValues.count / 4);
                    $("#puzzle").removeClass("invisible");
                });
            });
        }, this), 500);
    };
    CasseTeteListComponent.prototype.getRow = function (pos) {
        var rowCount = this.getRowCount();
        var row = Math.floor((pos - 1) / rowCount);
        console.log("pos ==> " + pos);
        console.log("row ==> " + row);
        console.log("cou ==> " + rowCount);
        return row;
    };
    CasseTeteListComponent.prototype.getCol = function (pos) {
        var rowCount = this.getRowCount();
        var col = (pos % rowCount);
        if (col === 0) {
            col = rowCount;
        }
        return col - 1;
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
        inputValues.scaleY = 0;
        return inputValues;
    };
    CasseTeteListComponent.prototype.onKeyRow = function (event) {
        var _this = this;
        var inputValues = this.getInputValues();
        var p1 = this._casseTeteService.getPieces(inputValues, this._url);
        var p2 = this._casseTeteService.getTileOffset(inputValues, this._url);
        Promise.all([p1, p2]).then(function (values) {
            _this.puzzles = values[0].puzzles;
            _this._tileOffsetWidth = values[1].tileOffsetWidth;
            _this._tileOffsetHeight = values[1].tileOffsetHeight;
            _this._rowCount = Math.floor(inputValues.count / 4);
        });
    };
    CasseTeteListComponent.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
    };
    CasseTeteListComponent = __decorate([
        core_1.Component({
            selector: 'casse-tete-list',
            templateUrl: 'app/dist/templates/casse-tete-list.html',
            styleUrls: ['assets/css/puzzle.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, casse_tete_service_1.CasseTeteService])
    ], CasseTeteListComponent);
    return CasseTeteListComponent;
}());
exports.CasseTeteListComponent = CasseTeteListComponent;
