System.register(['@angular/router', './casse-tete.component', './casse-tete-list.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, casse_tete_component_1, casse_tete_list_component_1;
    var routes, APP_ROUTER_PROVIDERS;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (casse_tete_component_1_1) {
                casse_tete_component_1 = casse_tete_component_1_1;
            },
            function (casse_tete_list_component_1_1) {
                casse_tete_list_component_1 = casse_tete_list_component_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                { path: 'casse-tete/:url', component: casse_tete_component_1.CasseTeteComponent },
                { path: '', component: casse_tete_list_component_1.CasseTeteListComponent }
            ]);
            exports_1("APP_ROUTER_PROVIDERS", APP_ROUTER_PROVIDERS = [
                router_1.provideRouter(routes)
            ]);
        }
    }
});
