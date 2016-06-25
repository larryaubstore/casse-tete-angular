import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {CasseTeteAngular} from 'casse-tete-angular';

@Component({
  selector: 'main'
})

@View({
  directives: [CasseTeteAngular],
  template: `
    <casse-tete-angular></casse-tete-angular>
  `
})

class Main {

}

bootstrap(Main);
