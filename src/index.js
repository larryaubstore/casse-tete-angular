import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {CasseTeteAngular} from 'casse-tete-angular';
import {CasseTete} from 'casse-tete';

@Component({
  selector: 'main'
}) 

@View({
  directives: [CasseTeteAngular, CasseTete],
  template: `
    <casse-tete-angular></casse-tete-angular>
    <casse-tete></casse-tete>
  `
})

class Main {

}

bootstrap(Main);
