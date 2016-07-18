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
    var CasseTeteListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (casse_tete_service_1_1) {
                casse_tete_service_1 = casse_tete_service_1_1;
            }],
        execute: function() {
            CasseTeteListComponent = (function () {
                function CasseTeteListComponent(_router, _casseTeteService) {
                    this._router = _router;
                    this._casseTeteService = _casseTeteService;
                    this.cassetetes = [];
                }
                CasseTeteListComponent.prototype.ngOnInit = function () {
                    this.cassetetes = this._casseTeteService.getList();
                    console.log(JSON.stringify(this.cassetetes));
                };
                CasseTeteListComponent.prototype.gotoDetail = function (casseTete) {
                    var link = ['CasseTeteList', { id: casseTete.id }];
                    this._router.navigate(link);
                };
                CasseTeteListComponent = __decorate([
                    core_1.Component({
                        selector: 'casse-tete-list',
                        templateUrl: 'app/dist/templates/casse-tete-piece.html',
                        styleUrls: ['assets/css/puzzle.css'],
                        providers: [casse_tete_service_1.CasseTeteService]
                    })
                ], CasseTeteListComponent);
                return CasseTeteListComponent;
            }());
            exports_1("CasseTeteListComponent", CasseTeteListComponent);
        }
    }
});
