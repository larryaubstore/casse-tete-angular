System.register(['@angular/core', './casse-tete.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, casse_tete_service_1;
    var CasseTeteComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (casse_tete_service_1_1) {
                casse_tete_service_1 = casse_tete_service_1_1;
            }],
        execute: function() {
            CasseTeteComponent = (function () {
                function CasseTeteComponent(route, router, _casseTeteService) {
                    this.route = route;
                    this.router = router;
                    this._casseTeteService = _casseTeteService;
                    console.info('CasseTete Component Mounted Successfully');
                }
                CasseTeteComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        var url = params['url']; // (+) converts string 'id' to a number
                        console.log(url);
                        var list = _this._casseTeteService.getList();
                        _this._casseTeteService.getPieces(100, 100, 16, 'assets/css/20110403143837_rouedentelee.jpg');
                        //this.service.getHero(id).then(hero => this.hero = hero);
                    });
                };
                CasseTeteComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                CasseTeteComponent = __decorate([
                    core_1.Component({
                        selector: 'casse-tete',
                        templateUrl: 'app/dist/templates/casse-tete.html',
                        styleUrls: ['assets/css/puzzle.css'],
                        providers: [casse_tete_service_1.CasseTeteService]
                    })
                ], CasseTeteComponent);
                return CasseTeteComponent;
            }());
            exports_1("CasseTeteComponent", CasseTeteComponent);
        }
    }
});
