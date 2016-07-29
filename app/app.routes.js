"use strict";
var router_1 = require('@angular/router');
var casse_tete_list_component_1 = require('./casse-tete-list.component');
var vignette_list_component_1 = require('./vignette-list.component');
exports.routes = [
    { path: 'casse-tete/:url', component: casse_tete_list_component_1.CasseTeteListComponent },
    { path: '', component: vignette_list_component_1.VignetteListComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
