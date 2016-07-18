System.register(['@angular/core', './casse-tete-angular', './casse-tete.component', '@angular/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, casse_tete_angular_1, casse_tete_component_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (casse_tete_angular_1_1) {
                casse_tete_angular_1 = casse_tete_angular_1_1;
            },
            function (casse_tete_component_1_1) {
                casse_tete_component_1 = casse_tete_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'main',
                        directives: [casse_tete_angular_1.CasseTeteAngular, casse_tete_component_1.CasseTeteComponent, router_1.ROUTER_DIRECTIVES],
                        template: "\n\n    <nav>\n      <a [routerLink]=\"['casse-tete/test']\">Dashboard</a>\n    </nav>\n\n\n    <router-outlet></router-outlet>\n  "
                    })
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
