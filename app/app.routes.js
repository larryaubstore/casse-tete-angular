"use strict";
var router_1 = require('@angular/router');
var casse_tete_list_component_1 = require('./casse-tete-list.component');
var vignette_list_component_1 = require('./vignette-list.component');
exports.appRoutes = [
    { path: 'casse-tete/:url', component: casse_tete_list_component_1.CasseTeteListComponent },
    { path: '', component: vignette_list_component_1.VignetteListComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.appRoutes);
;
