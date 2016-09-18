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
var common_1 = require('@angular/common');
var casse_tete_list_component_1 = require('./casse-tete-list.component');
var vignette_component_1 = require('./vignette.component');
var casse_tete_component_1 = require('./casse-tete.component');
var vignette_list_component_1 = require('./vignette-list.component');
var casse_tete_service_1 = require('./casse-tete.service');
var CasseTeteModule = (function () {
    function CasseTeteModule() {
    }
    CasseTeteModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                casse_tete_list_component_1.CasseTeteListComponent,
                vignette_component_1.VignetteComponent,
                casse_tete_component_1.CasseTeteComponent,
                vignette_list_component_1.VignetteListComponent
            ],
            providers: [
                casse_tete_service_1.CasseTeteService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CasseTeteModule);
    return CasseTeteModule;
}());
exports.CasseTeteModule = CasseTeteModule;
