import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {CasseTeteAngular} from 'casse-tete-angular';
import {CasseTeteComponent} from 'casse-tete.component';

@Component({
  selector: 'main'
}) 

@View({
  directives: [CasseTeteAngular, CasseTeteComponent],
  template: `
    <casse-tete-angular></casse-tete-angular>
    <casse-tete></casse-tete>
  `
})

class Main {

}

bootstrap(Main);
