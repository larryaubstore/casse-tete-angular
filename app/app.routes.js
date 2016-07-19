"use strict";
var router_1 = require('@angular/router');
var casse_tete_list_component_1 = require('./casse-tete-list.component');
exports.routes = [
    { path: 'casse-tete/:url', component: casse_tete_list_component_1.CasseTeteListComponent },
    { path: '', component: casse_tete_list_component_1.CasseTeteListComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
